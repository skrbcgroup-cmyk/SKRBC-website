import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { getDb } from "@/db/client";
import { articles } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Insights" };

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Karachi",
});

export default async function ArticlesPage() {
  await requireAdmin();
  const db = await getDb();
  const rows = await db
    .select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      category: articles.category,
      status: articles.status,
      updatedAt: articles.updatedAt,
    })
    .from(articles)
    .orderBy(desc(articles.updatedAt));

  return (
    <div className="max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-navy-900 sm:text-4xl">Insights</h1>
          <p className="mt-2 text-slate">Articles shown on the Insights page of the website.</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex min-h-11 items-center gap-2 rounded-xs bg-gold-500 px-5 font-medium text-navy-900 hover:bg-gold-400"
        >
          <Plus aria-hidden="true" strokeWidth={2} className="size-4" />
          New article
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="mt-10 bg-white p-10 text-center">
          <p className="text-lg text-navy-900">No articles yet.</p>
          <p className="mt-2 text-slate">
            Write your first article and publish it when it is ready.
          </p>
        </div>
      ) : (
        <ul className="mt-10 divide-y divide-line bg-white">
          {rows.map((row) => (
            <li key={row.id}>
              <Link
                href={`/admin/articles/${row.id}`}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 transition-colors hover:bg-ivory sm:px-6"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-navy-900">{row.title}</span>
                  <span className="text-sm text-slate">{row.category}</span>
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
