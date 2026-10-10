"use server";

import { z } from "zod";

import { inquirySchema } from "@/lib/inquiry-schema";

export type InquiryResult =
  { ok: true } | { ok: false; fieldErrors?: Partial<Record<string, string[]>>; message: string };

/**
 * Receives a contact form submission and validates it again on the server.
 *
 * Phase 5 adds the delivery steps here: Cloudflare Turnstile verification,
 * saving the inquiry to D1, an email notification via Resend and rate limiting.
 */
export async function submitInquiry(input: unknown): Promise<InquiryResult> {
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

  // Phase 5: verify Turnstile, store in D1 and send the notification email here.
  return { ok: true };
}
