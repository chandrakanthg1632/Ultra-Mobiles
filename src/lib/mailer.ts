import { Resend } from "resend";

const CONTACT_EMAIL = "ultramobiles07@gmail.com";
// Resend requires a verified sending domain to send "from" your own address.
// Until RESEND_FROM_EMAIL is set to something on a verified domain, this
// falls back to Resend's shared onboarding address, which works out of the
// box with no domain setup.
const FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL || "Ultra Mobiles Website <onboarding@resend.dev>";

export async function sendLeadEmail(subject: string, lines: [string, string][]) {
  const text = lines.map(([label, value]) => `${label}: ${value}`).join("\n");
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Resend isn't configured yet — log server-side so the submission isn't
    // silently lost, but don't pretend an email actually went out.
    console.warn(
      "[mailer] RESEND_API_KEY not set — logging submission instead of emailing it:",
    );
    console.warn(`Subject: ${subject}\n${text}`);
    return { delivered: false as const };
  }

  const resend = new Resend(apiKey);
  const replyTo = lines.find(([label]) => label === "Email")?.[1];

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: CONTACT_EMAIL,
    ...(replyTo ? { replyTo } : {}),
    subject,
    text,
  });

  if (error) {
    console.error(
      `[mailer] Resend failed to send: ${error.name} — ${error.message}`,
    );
    return { delivered: false as const };
  }

  console.log(`[mailer] Resend accepted the email (id: ${data?.id}) — from=${FROM_ADDRESS}`);
  return { delivered: true as const };
}
