import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { caseStudySectionFields, type SectionKey } from "@/content/case-study-options";
import { getDb } from "@/db/client";
import { caseStudies } from "@/db/schema";
import { mediaUrl } from "@/lib/media";
import { imageKeysIn, plainText, sanitizeDoc, type RichDoc } from "@/lib/rich-text";

/** Case studies (spec section 12), managed from the admin panel. */

export type CaseStudySummary = {
  slug: string;
  title: string;
  client: string;
  service: string;
  summary: string;
};

export type CaseStudyDetail = CaseStudySummary & {
  sections: { key: SectionKey; title: string; doc: RichDoc }[];
  coverImage: { src: string; alt: string } | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

/** Published case studies, newest first. */
export async function getPublishedCaseStudies(): Promise<CaseStudySummary[]> {
  const db = await getDb();
  return db
    .select({
      slug: caseStudies.slug,
      title: caseStudies.title,
      client: caseStudies.client,
      service: caseStudies.service,
      summary: caseStudies.summary,
    })
    .from(caseStudies)
    .where(eq(caseStudies.status, "published"))
    .orderBy(desc(caseStudies.publishedAt));
}

export async function getPublishedCaseStudy(slug: string): Promise<CaseStudyDetail | null> {
  const db = await getDb();
  const [row] = await db
    .select()
    .from(caseStudies)
    .where(and(eq(caseStudies.slug, slug), eq(caseStudies.status, "published")))
    .limit(1);
  if (!row) return null;

  return {
    slug: row.slug,
    title: row.title,
    client: row.client,
    service: row.service,
    summary: row.summary,
    sections: caseStudySectionFields
      .map((field) => ({ key: field.key, title: field.title, doc: sanitizeDoc(row[field.key]) }))
      // Hide sections left empty; a section with only an image still counts.
      .filter(
        (section) => plainText(section.doc).length > 0 || imageKeysIn(section.doc).length > 0,
      ),
    coverImage: row.coverImageKey
      ? { src: mediaUrl(row.coverImageKey), alt: row.coverImageAlt ?? "" }
      : null,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
  };
}
