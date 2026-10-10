import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { articles } from "@/db/schema";
import { mediaUrl } from "@/lib/media";
import { sanitizeDoc, type RichDoc } from "@/lib/rich-text";

/** Insights articles (spec section 13), managed from the admin panel. */

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date, e.g. "2026-10-10". */
  publishedAt: string;
};

export type ArticleDetail = ArticleSummary & {
  doc: RichDoc;
  coverImage: { src: string; alt: string } | null;
  seoTitle: string | null;
  seoDescription: string | null;
  updatedAt: string;
};

/** Planned topics from the spec, shown until the first articles are published. */
export const plannedTopics = [
  "What Is Business Risk Management?",
  "Why Small Businesses Need Risk Assessments",
  "Common Operational Risks",
  "Understanding Property Risk",
  "Insurance Claims: Common Documentation Issues",
  "Security Risk Management for Businesses",
  "Partnership Risk",
  "Event Risk Management",
  "Lessons From the Canadian Insurance Industry",
];

const isoDate = (date: Date | null) => (date ?? new Date(0)).toISOString().slice(0, 10);

/** Published articles, newest first. */
export async function getPublishedArticles(): Promise<ArticleSummary[]> {
  const db = await getDb();
  const rows = await db
    .select({
      slug: articles.slug,
      title: articles.title,
      excerpt: articles.excerpt,
      category: articles.category,
      publishedAt: articles.publishedAt,
    })
    .from(articles)
    .where(eq(articles.status, "published"))
    .orderBy(desc(articles.publishedAt));

  return rows.map((row) => ({ ...row, publishedAt: isoDate(row.publishedAt) }));
}

export async function getPublishedArticle(slug: string): Promise<ArticleDetail | null> {
  const db = await getDb();
  const [row] = await db
    .select()
    .from(articles)
    .where(and(eq(articles.slug, slug), eq(articles.status, "published")))
    .limit(1);
  if (!row) return null;

  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    publishedAt: isoDate(row.publishedAt),
    updatedAt: isoDate(row.updatedAt),
    doc: sanitizeDoc(row.content),
    coverImage: row.coverImageKey
      ? { src: mediaUrl(row.coverImageKey), alt: row.coverImageAlt ?? "" }
      : null,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
  };
}

export function formatArticleDate(isoDateValue: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDateValue));
}
