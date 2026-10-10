import { eq } from "drizzle-orm";
import { Mail, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InquiryActions } from "@/components/admin/inquiry-actions";
import { getDb } from "@/db/client";
import { inquiries } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Inquiry" };

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Asia/Karachi",
});

export default async function InquiryPage({ params }: PageProps<"/admin/inquiries/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const db = await getDb();
  const [inquiry] = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  if (!inquiry) notFound();

  // Opening a new inquiry marks it as read.
  if (inquiry.status === "new") {
    await db.update(inquiries).set({ status: "read" }).where(eq(inquiries.id, id));
    inquiry.status = "read";
  }

  const whatsappNumber = inquiry.phone.replace(/[^\d]/g, "");
  const details: [string, string][] = [
    ["Company", inquiry.companyName],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone],
    ["Service", inquiry.service],
    ["Preferred contact", inquiry.contactMethod ?? "No preference"],
    ["Best time", inquiry.bestTime ?? "No preference"],
    ["Received", dateFormat.format(inquiry.createdAt)],
  ];

  return (
    <div className="max-w-4xl">
      <Link href="/admin/inquiries" className="text-sm text-gold-700 hover:underline">
        Back to inquiries
      </Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl text-navy-900">{inquiry.fullName}</h1>
        <span className="rounded-xs bg-white px-3 py-1 text-sm text-slate capitalize">
          {inquiry.status}
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_18rem]">
        <section aria-label="Message" className="bg-white p-6 sm:p-8">
          <h2 className="text-xl text-navy-900">Message</h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed whitespace-pre-wrap text-ink">
            {inquiry.message}
          </p>
        </section>

        <aside className="space-y-6">
          <dl className="space-y-4 bg-white p-6 text-[0.9375rem]">
            {details.map(([label, value]) => (
              <div key={label}>
                <dt className="text-sm text-slate">{label}</dt>
                <dd className="mt-0.5 break-words text-navy-900">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="space-y-2 bg-white p-6">
            <a
              href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Re: Your inquiry to SK Risk & Business Consulting`)}`}
              className="flex min-h-11 items-center justify-center gap-2 rounded-xs bg-navy-900 px-4 text-[0.9375rem] font-medium text-white hover:bg-navy-800"
            >
              <Mail aria-hidden="true" strokeWidth={1.75} className="size-4" />
              Reply by email
            </a>
            {whatsappNumber.length >= 7 && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-center gap-2 rounded-xs border border-line px-4 text-[0.9375rem] text-navy-900 hover:border-navy-900"
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-4" />
                Message on WhatsApp
              </a>
            )}
          </div>
        </aside>
      </div>

      <div className="mt-6">
        <InquiryActions id={inquiry.id} status={inquiry.status} />
      </div>
    </div>
  );
}
