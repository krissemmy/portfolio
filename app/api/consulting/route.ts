import { Resend } from "resend";
import { profile } from "@/data/profile";
import { qualificationFields } from "@/data/consulting";
import { validateInquiry } from "@/util/consulting-inquiry";

export const runtime = "nodejs";

export async function POST(request: Request) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid request body." }, { status: 400 });
	}

	const result = validateInquiry(body);
	if (!result.ok) {
		return Response.json({ error: result.error }, { status: 400 });
	}
	const { fields } = result;
	const { name, email, company, message, hp_check } = fields;

	if (hp_check) {
		// Honeypot tripped — pretend success so bots don't learn to skip this field.
		// Logged (not silent) so a false positive from autofill/an extension is visible in Vercel logs.
		console.warn("Consulting form honeypot tripped, message not sent");
		return Response.json({ ok: true });
	}

	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		return Response.json(
			{
				error:
					"The contact form isn't configured yet — please email me directly instead.",
			},
			{ status: 503 },
		);
	}

	const resend = new Resend(apiKey);
	const to = process.env.CONSULTING_CONTACT_EMAIL || profile.consultingEmail;
	// krissemmy.com is a verified Resend sending domain, so the default sender is
	// the real consulting address rather than Resend's shared sandbox.
	const from =
		process.env.RESEND_FROM_EMAIL ||
		`Portfolio Contact <${profile.consultingEmail}>`;

	try {
		const { error } = await resend.emails.send({
			from,
			to,
			reply_to: email,
			subject: `Infrastructure review inquiry from ${name}`,
			text: [
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
				.join("\n"),
		});

		if (error) {
			console.error("Resend rejected the consulting inquiry email", error);
			return Response.json(
				{
					error:
						"Something went wrong sending your message. Please email me directly.",
				},
				{ status: 502 },
			);
		}
	} catch (err) {
		console.error("Failed to send consulting inquiry email", err);
		return Response.json(
			{
				error:
					"Something went wrong sending your message. Please email me directly.",
			},
			{ status: 502 },
		);
	}

	return Response.json({ ok: true });
}
