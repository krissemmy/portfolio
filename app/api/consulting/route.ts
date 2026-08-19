import { Resend } from "resend";
import { profile } from "@/data/profile";

export const runtime = "nodejs";

interface ConsultingInquiryBody {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  // Honeypot: real visitors never fill this in; bots that fill every field do.
  hp_check?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "The contact form isn't configured yet — please email me directly instead." },
      { status: 503 },
    );
  }

  let body: ConsultingInquiryBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, company, message, hp_check } = body;

  if (hp_check) {
    // Honeypot tripped — pretend success so bots don't learn to skip this field.
    // Logged (not silent) so a false positive from autofill/an extension is visible in Vercel logs.
    console.warn("Consulting form honeypot tripped, message not sent", { hp_check });
    return Response.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (message.length > 5000) {
    return Response.json({ error: "Message is too long." }, { status: 400 });
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
      subject: `New consulting inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company?.trim() ? `Company: ${company.trim()}` : null,
        "",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });

    if (error) {
      console.error("Resend rejected the consulting inquiry email", error);
      return Response.json(
        { error: "Something went wrong sending your message. Please email me directly." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Failed to send consulting inquiry email", err);
    return Response.json(
      { error: "Something went wrong sending your message. Please email me directly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
