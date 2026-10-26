import { qualificationFields } from "../data/consulting";
import { profile } from "../data/profile";
import { validateInquiry } from "../util/consulting-inquiry";

// `_headers` is applied to static assets only. Worker responses set the same
// HSTS policy themselves.
const SECURITY_HEADERS = {
	"Strict-Transport-Security": "max-age=63072000",
	"X-Content-Type-Options": "nosniff",
	"Cache-Control": "no-store",
};

// Above the sum of the field limits in util/consulting-inquiry.ts.
const MAX_BODY_BYTES = 32_000;

type ConsultingEnv = Env & {
	RESEND_API_KEY?: string;
	CONSULTING_CONTACT_EMAIL?: string;
	RESEND_FROM_EMAIL?: string;
};

function json(body: unknown, status = 200, extra?: Record<string, string>) {
	return Response.json(body, {
		status,
		headers: { ...SECURITY_HEADERS, ...extra },
	});
}

async function readBody(request: Request): Promise<string | null> {
	if (!request.body) return "";
	const reader = request.body.getReader();
	const chunks: Uint8Array[] = [];
	let total = 0;
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		if (!value) continue;
		total += value.byteLength;
		if (total > MAX_BODY_BYTES) {
			await reader.cancel();
			return null;
		}
		chunks.push(value);
	}
	const merged = new Uint8Array(total);
	let offset = 0;
	for (const chunk of chunks) {
		merged.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return new TextDecoder().decode(merged);
}

function inquiryText(fields: Record<string, string>) {
	const { name, email, company, message } = fields;
	return [
		`Name: ${name}`,
		`Email: ${email}`,
		`Company: ${company}`,
		fields.website ? `Website: ${fields.website}` : null,
		...qualificationFields.map((field) =>
			fields[field.name] ? `${field.label}: ${fields[field.name]}` : null,
		),
		fields.infrastructure
			? `Current infrastructure: ${fields.infrastructure}`
			: null,
		"",
		message || "No additional message provided.",
	]
		.filter((line) => line !== null)
		.join("\n");
}

export async function handleConsulting(
	request: Request,
	env: ConsultingEnv,
): Promise<Response> {
	const raw = await readBody(request);
	if (raw === null) {
		return json({ error: "Invalid request body." }, 400);
	}

	let body: unknown;
	try {
		body = JSON.parse(raw);
	} catch {
		return json({ error: "Invalid request body." }, 400);
	}

	const result = validateInquiry(body);
	if (!result.ok) {
		return json({ error: result.error }, 400);
	}
	const { fields } = result;
	const { name, email } = fields;

	if (fields.hp_check) {
		// Pretend success so bots don't learn to skip the field. Logged so a
		// false positive from autofill or an extension is visible in Worker logs.
		console.warn(
			JSON.stringify({
				event: "consulting_honeypot",
				message: "Consulting form honeypot tripped, message not sent",
			}),
		);
		return json({ ok: true });
	}

	if (env.CONSULTING_RATE_LIMITER) {
		const ip = request.headers.get("CF-Connecting-IP") || "unknown";
		const { success } = await env.CONSULTING_RATE_LIMITER.limit({
			key: `consulting:${ip}`,
		});
		if (!success) {
			return json(
				{
					error:
						"Too many inquiries. Please try again shortly or email me directly.",
				},
				429,
				{ "Retry-After": "60" },
			);
		}
	} else {
		console.warn(
			JSON.stringify({
				event: "consulting_rate_limit_unconfigured",
				message: "CONSULTING_RATE_LIMITER binding is missing",
			}),
		);
	}

	const apiKey = env.RESEND_API_KEY;
	if (!apiKey) {
		return json(
			{
				error:
					"The contact form isn't configured yet — please email me directly instead.",
			},
			503,
		);
	}

	const to = env.CONSULTING_CONTACT_EMAIL || profile.consultingEmail;
	const from =
		env.RESEND_FROM_EMAIL || `Portfolio Contact <${profile.consultingEmail}>`;
	const payload = {
		from,
		to,
		reply_to: email,
		subject: `Infrastructure review inquiry from ${name}`,
		text: inquiryText(fields),
	};

	try {
		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		if (!response.ok) {
			let error: unknown = null;
			try {
				error = await response.json();
			} catch {
				error = { status: response.status };
			}
			console.error(
				JSON.stringify({ event: "consulting_resend_rejected", error }),
			);
			return json(
				{
					error:
						"Something went wrong sending your message. Please email me directly.",
				},
				502,
			);
		}
	} catch (err) {
		console.error(
			JSON.stringify({
				event: "consulting_resend_failed",
				message: err instanceof Error ? err.message : "unknown",
			}),
		);
		return json(
			{
				error:
					"Something went wrong sending your message. Please email me directly.",
			},
			502,
		);
	}

	return json({ ok: true });
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname !== "/api/consulting") {
			return json({ error: "Not found." }, 404);
		}
		if (request.method !== "POST") {
			return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
		}
		return handleConsulting(request, env);
	},
} satisfies ExportedHandler<ConsultingEnv>;
