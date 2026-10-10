import { count, desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";

import { getDb } from "@/db/client";
import { inquiries, inquiryStatus } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Inquiries" };

type Filter = (typeof inquiryStatus)[number];

const filters: { value: Filter; label: string }[] = [
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "archived", label: "Archived" },
];

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Karachi",
});

export default async function InquiriesPage({ searchParams }: PageProps<"/admin/inquiries">) {
  await requireAdmin();
  const requested = (await searchParams).status;
  const status: Filter = inquiryStatus.includes(requested as Filter)
    ? (requested as Filter)
    : "new";

  const db = await getDb();
  const [counts, rows] = await Promise.all([
    db
      .select({ status: inquiries.status, total: count() })
      .from(inquiries)
      .groupBy(inquiries.status),
    db
      .select({
        id: inquiries.id,
        fullName: inquiries.fullName,
        companyName: inquiries.companyName,
        service: inquiries.service,
        message: inquiries.message,
        createdAt: inquiries.createdAt,
      })
      .from(inquiries)
      .where(eq(inquiries.status, status))
      .orderBy(desc(inquiries.createdAt)),
  ]);
  const tally = (value: Filter) => counts.find((row) => row.status === value)?.total ?? 0;

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl text-navy-900 sm:text-4xl">Inquiries</h1>
      <p className="mt-2 text-slate">Messages sent through the contact form on the website.</p>

      <nav aria-label="Filter inquiries" className="mt-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Link
            key={filter.value}
            href={`/admin/inquiries?status=${filter.value}`}
            aria-current={filter.value === status ? "page" : undefined}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-xs px-4 text-[0.9375rem] transition-colors",
              filter.value === status
                ? "bg-navy-900 text-white"
                : "bg-white text-navy-900 hover:bg-white/70",
            )}
          >
            {filter.label}
            <span
              className={cn(
                "rounded-xs px-1.5 text-xs",
                filter.value === status ? "bg-white/15" : "bg-ivory",
              )}
            >
              {tally(filter.value)}
            </span>
          </Link>
        ))}
      </nav>

      {rows.length === 0 ? (
        <div className="mt-6 bg-white p-10 text-center">
          <p className="text-lg text-navy-900">
            {status === "new" ? "No new inquiries." : `No ${status} inquiries.`}
          </p>
          <p className="mt-2 text-slate">
            New messages from the contact form will appear here and arrive by email.
          </p>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-line bg-white">
          {rows.map((row) => (
            <li key={row.id}>
              <Link
                href={`/admin/inquiries/${row.id}`}
                className="block px-5 py-4 transition-colors hover:bg-ivory sm:px-6"
              >
                <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className={cn("text-navy-900", status === "new" && "font-semibold")}>
                    {row.fullName}
                  </span>
                  <span className="text-sm text-slate">{row.companyName}</span>
                  <span className="ml-auto text-sm text-slate">
                    {dateFormat.format(row.createdAt)}
                  </span>
                </span>
                <span className="mt-1 block text-sm text-gold-700">{row.service}</span>
                <span className="mt-1 line-clamp-1 block text-sm text-slate">{row.message}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
