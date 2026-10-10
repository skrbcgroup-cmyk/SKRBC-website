import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { getDb } from "@/db/client";
import { caseStudies } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Case Studies" };

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Karachi",
});

export default async function CaseStudiesAdminPage() {
  await requireAdmin();
  const db = await getDb();
  const rows = await db
    .select({
      id: caseStudies.id,
      title: caseStudies.title,
      client: caseStudies.client,
      status: caseStudies.status,
      updatedAt: caseStudies.updatedAt,
    })
    .from(caseStudies)
    .orderBy(desc(caseStudies.updatedAt));

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-navy-900 sm:text-4xl">Case Studies</h1>
          <p className="mt-2 text-slate">Client projects shown on the Case Studies page.</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="inline-flex min-h-11 items-center gap-2 rounded-xs bg-gold-500 px-5 font-medium text-navy-900 hover:bg-gold-400"
        >
          <Plus aria-hidden="true" strokeWidth={2} className="size-4" />
          New case study
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="mt-10 bg-white p-10 text-center">
          <p className="text-lg text-navy-900">No case studies yet.</p>
          <p className="mt-2 text-slate">
            Add a case study once the client has approved it for publication.
          </p>
        </div>
      ) : (
        <ul className="mt-10 divide-y divide-line bg-white">
          {rows.map((row) => (
            <li key={row.id}>
              <Link
                href={`/admin/case-studies/${row.id}`}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 transition-colors hover:bg-ivory sm:px-6"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-navy-900">{row.title}</span>
                  <span className="text-sm text-slate">{row.client}</span>
                </span>
                <span
                  className={cn(
                    "rounded-xs px-2.5 py-0.5 text-xs font-medium",
                    row.status === "published"
                      ? "bg-[#e6f4ea] text-[#1e6b34]"
                      : "bg-ivory text-slate",
                  )}
                >
                  {row.status === "published" ? "Published" : "Draft"}
                </span>
                <span className="w-28 text-right text-sm text-slate">
                  {dateFormat.format(row.updatedAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
