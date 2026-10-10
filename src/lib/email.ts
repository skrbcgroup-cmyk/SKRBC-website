import "server-only";

import { siteConfig } from "@/config/site";
import type { Inquiry } from "@/lib/inquiry-schema";

/**
 * Until the company domain is verified in Resend, emails are sent from Resend's shared
 * address and can only be delivered to the Resend account's own email, which is the
 * company inbox. After the domain is verified in Resend (Phase 8), change this to an
 * address on that domain, for example "SKRBC Website <website@your-domain>".
 */
const DEFAULT_FROM = "SKRBC Website <onboarding@resend.dev>";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

function inquiryRows(inquiry: Inquiry): [string, string][] {
  return [
    ["Name", inquiry.fullName],
    ["Company", inquiry.companyName],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone],
    ["Service", inquiry.service],
    ["Preferred contact", inquiry.contactMethod || "No preference"],
    ["Best time", inquiry.bestTime || "No preference"],
  ];
}

/** Notifies the company inbox about a new contact form inquiry. Returns true when sent. */
export async function sendInquiryNotification(
  inquiry: Inquiry,
  options: { apiKey: string | undefined; adminUrl: string },
): Promise<boolean> {
  if (!options.apiKey) return false;

  const rows = inquiryRows(inquiry);
  const text = [
    "New inquiry from the website",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    inquiry.message,
    "",
    `View in the admin panel: ${options.adminUrl}`,
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f6f4ef;font-family:Arial,sans-serif;color:#1f2933">
<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-top:3px solid #c9a253">
<tr><td style="padding:24px 28px;background:#0f1c2e;color:#ffffff;font-family:Georgia,serif;font-size:20px">New website inquiry</td></tr>
<tr><td style="padding:24px 28px">
<table role="presentation" width="100%" style="border-collapse:collapse;font-size:15px">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:8px 0;color:#5b6673;width:150px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 0">${escapeHtml(value)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin:24px 0 8px;color:#5b6673;font-size:15px">Message</p>
<p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>
<p style="margin:28px 0 0"><a href="${escapeHtml(options.adminUrl)}" style="display:inline-block;padding:12px 20px;background:#c9a253;color:#0f1c2e;text-decoration:none;font-size:14px">Open in admin panel</a></p>
</td></tr></table>
<p style="max-width:600px;margin:16px auto 0;color:#5b6673;font-size:12px">Reply to this email to answer ${escapeHtml(inquiry.fullName)} directly.</p>
</body></html>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: DEFAULT_FROM,
        to: [siteConfig.contact.email],
        reply_to: inquiry.email,
        subject: `New inquiry from ${inquiry.fullName} (${inquiry.companyName})`,
        text,
        html,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
