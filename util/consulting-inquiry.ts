import { qualificationFields } from "../data/consulting";

const textLimits = {
	name: 100,
	email: 254,
	company: 200,
	website: 500,
	infrastructure: 1000,
	message: 5000,
	hp_check: 500,
};

type InquiryResult =
	| { ok: true; fields: Record<string, string> }
	| { ok: false; error: string };

export function validateInquiry(body: unknown): InquiryResult {
	if (!body || typeof body !== "object" || Array.isArray(body)) {
		return { ok: false, error: "Invalid request body." };
	}
	const input = body as Record<string, unknown>;
	const fields: Record<string, string> = {};
	for (const [name, limit] of Object.entries(textLimits)) {
		const value = input[name];
		if (value !== undefined && typeof value !== "string") {
			return { ok: false, error: `Invalid ${name} field.` };
		}
		if (typeof value === "string" && value.length > limit) {
			return {
				ok: false,
				error: `${name} is too long (maximum ${limit} characters).`,
			};
		}
		fields[name] = typeof value === "string" ? value.trim() : "";
	}
	// Preserve the existing honeypot behavior without logging user-provided values.
	if (fields.hp_check) return { ok: true, fields };
	if (!fields.name || !fields.email || !fields.company) {
		return { ok: false, error: "Name, work email, and company are required." };
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
		return { ok: false, error: "Enter a valid email address." };
	}
	if (/[\r\n]/.test(fields.name)) {
		return { ok: false, error: "Enter your name on one line." };
	}
	if (fields.website) {
		try {
			const url = new URL(fields.website);
			if (!["http:", "https:"].includes(url.protocol)) {
				return {
					ok: false,
					error: "Company website must start with http:// or https://.",
				};
			}
		} catch {
			return {
				ok: false,
				error: "Enter a complete company website URL, including https://.",
			};
		}
	}
	for (const field of qualificationFields) {
		const value = input[field.name];
		if (
			value !== undefined &&
			(typeof value !== "string" ||
				(value !== "" && !field.options.some((option) => option === value)))
		) {
			return {
				ok: false,
				error: `Choose a valid answer for ${field.label.toLowerCase()}.`,
			};
		}
		fields[field.name] = typeof value === "string" ? value : "";
	}
	return { ok: true, fields };
}
