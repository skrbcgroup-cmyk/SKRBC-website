import { count, desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";

import { getDb } from "@/db/client";
import { articles, caseStudies, inquiries } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Dashboard" };

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Karachi",
});

export default async function DashboardPage() {
  const admin = await requireAdmin();
  const db = await getDb();

  const [articleCounts, caseStudyCounts, [newInquiries], recentInquiries] = await Promise.all([
    db.select({ status: articles.status, total: count() }).from(articles).groupBy(articles.status),
    db
      .select({ status: caseStudies.status, total: count() })
      .from(caseStudies)
      .groupBy(caseStudies.status),
    db.select({ total: count() }).from(inquiries).where(eq(inquiries.status, "new")),
    db
      .select({
        id: inquiries.id,
        fullName: inquiries.fullName,
        companyName: inquiries.companyName,
        service: inquiries.service,
        status: inquiries.status,
        createdAt: inquiries.createdAt,
      })
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt))
      .limit(5),
  ]);

  const tally = (rows: { status: string; total: number }[], status: string) =>
    rows.find((row) => row.status === status)?.total ?? 0;

  const stats = [
    {
      label: "Published insights",
      value: tally(articleCounts, "published"),
      note: `${tally(articleCounts, "draft")} drafts`,
    },
    {
      label: "Published case studies",
      value: tally(caseStudyCounts, "published"),
      note: `${tally(caseStudyCounts, "draft")} drafts`,
    },
    { label: "New inquiries", value: newInquiries?.total ?? 0, note: "Waiting for a reply" },
  ];

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl text-navy-900 sm:text-4xl">Welcome, {admin.name.split(" ")[0]}</h1>
      <p className="mt-2 text-slate">Here is an overview of the website content.</p>

      <dl className="mt-10 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="border-t-2 border-gold-500 bg-white p-6">
            <dt className="text-sm text-slate">{stat.label}</dt>
            <dd className="mt-2 font-serif text-4xl text-navy-900">{stat.value}</dd>
            <dd className="mt-1 text-sm text-slate">{stat.note}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-12 bg-white p-6 sm:p-8">
        <h2 className="text-2xl text-navy-900">Latest inquiries</h2>
        {recentInquiries.length === 0 ? (
          <p className="mt-4 text-slate">
            No inquiries yet. Messages sent through the contact form will appear here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {recentInquiries.map((inquiry) => (
              <li key={inquiry.id}>
                <Link
                  href={`/admin/inquiries/${inquiry.id}`}
                  className="-mx-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-xs px-3 py-4 transition-colors hover:bg-ivory"
                >
                  <span
                    className={
                      inquiry.status === "new" ? "font-semibold text-navy-900" : "text-navy-900"
                    }
                  >
                    {inquiry.fullName}
                  </span>
                  <span className="text-sm text-slate">{inquiry.companyName}</span>
                  <span className="text-sm text-slate">{inquiry.service}</span>
                  <span className="ml-auto text-sm text-slate">
                    {dateFormat.format(inquiry.createdAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
