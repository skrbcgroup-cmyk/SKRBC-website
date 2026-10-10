"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { and, count, eq, gt } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

import { siteConfig } from "@/config/site";
import { getDb } from "@/db/client";
import { inquiries } from "@/db/schema";
import { sha256 } from "@/lib/auth/session";
import { sendInquiryNotification } from "@/lib/email";
import { inquirySchema } from "@/lib/inquiry-schema";
import { verifyTurnstile } from "@/lib/turnstile";

/** One visitor can send at most this many inquiries per hour. */
const MAX_PER_HOUR = 5;

export type InquiryResult =
  | { ok: true }
  | {
      ok: false;
      fieldErrors?: Partial<Record<string, string[]>>;
      message: string;
      /** The spam check must be completed again before the next attempt. */
      resetChallenge?: boolean;
    };

/**
 * Handles a contact form submission:
 * validate, check the honeypot, verify Turnstile, rate limit, save to D1, then email.
 */
export async function submitInquiry(
  input: unknown,
  turnstileToken: string,
): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      message: "Please check the highlighted fields and try again.",
    };
  }

  // A filled honeypot means a bot; reply as if it worked so it learns nothing.
  if (parsed.data.website) {
    return { ok: true };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("cf-connecting-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "";
  const { env } = await getCloudflareContext({ async: true });

  if (!(await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, ip || undefined))) {
    return {
      ok: false,
      message: "We could not confirm that you are not a robot. Please try again.",
      resetChallenge: true,
    };
  }

  const db = await getDb();
  const ipHash = await sha256(ip || "unknown");
  const [recent] = await db
    .select({ total: count() })
    .from(inquiries)
    .where(
      and(
        eq(inquiries.ipHash, ipHash),
        gt(inquiries.createdAt, new Date(Date.now() - 60 * 60 * 1000)),
      ),
    );
  if ((recent?.total ?? 0) >= MAX_PER_HOUR) {
    return {
      ok: false,
      message: `We have already received several inquiries from you. Please try again later, or message us on WhatsApp at ${siteConfig.contact.whatsapp.display}.`,
      resetChallenge: true,
    };
  }

  const inquiry = parsed.data;
  const [row] = await db
    .insert(inquiries)
    .values({
      fullName: inquiry.fullName,
      companyName: inquiry.companyName,
      email: inquiry.email,
      phone: inquiry.phone,
      service: inquiry.service,
      message: inquiry.message,
      contactMethod: inquiry.contactMethod || null,
      bestTime: inquiry.bestTime || null,
      ipHash,
    })
    .returning({ id: inquiries.id });

  // The inquiry is already saved, so a failed email never loses it: it stays in the admin panel.
  const host = requestHeaders.get("host") ?? "localhost";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const sent = await sendInquiryNotification(inquiry, {
    apiKey: env.RESEND_API_KEY,
    adminUrl: `${protocol}://${host}/admin/inquiries/${row!.id}`,
  });
  if (!sent) console.error(`Inquiry ${row!.id} saved, but the notification email failed.`);

  return { ok: true };
}
