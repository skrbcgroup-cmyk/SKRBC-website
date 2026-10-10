/** Insights articles (spec section 13), managed from the CMS. */

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date, e.g. "2026-10-10". */
  publishedAt: string;
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

/**
 * Published articles, newest first.
 * Phase 4 replaces this with a D1 query managed from the admin panel.
 */
export async function getPublishedArticles(): Promise<ArticleSummary[]> {
  return [];
}

export function formatArticleDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}
