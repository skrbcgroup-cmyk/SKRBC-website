import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyForm } from "@/components/admin/case-study-form";
import { caseStudySectionFields, type SectionKey } from "@/content/case-study-options";
import { getDb } from "@/db/client";
import { caseStudies } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { sanitizeDoc, toEditorJson } from "@/lib/rich-text";

export const metadata: Metadata = { title: "Edit Case Study" };

const emptyDoc = { type: "doc", content: [{ type: "paragraph" }] };

export default async function EditCaseStudyPage({
  params,
  searchParams,
}: PageProps<"/admin/case-studies/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const db = await getDb();
  const [row] = await db.select().from(caseStudies).where(eq(caseStudies.id, id)).limit(1);
  if (!row) notFound();

  const saved = (await searchParams).saved;
  const docs = Object.fromEntries(
    caseStudySectionFields.map((field) => [field.key, sanitizeDoc(row[field.key])]),
  ) as Record<SectionKey, ReturnType<typeof sanitizeDoc>>;

  return (
    <CaseStudyForm
      savedNotice={saved === "draft" || saved === "published" ? saved : undefined}
      initial={{
        id: row.id,
        title: row.title,
        slug: row.slug,
        client: row.client,
        service: row.service,
        summary: row.summary,
        ...(Object.fromEntries(
          caseStudySectionFields.map((field) => [
            field.key,
            JSON.stringify(toEditorJson(docs[field.key])),
          ]),
        ) as Record<SectionKey, string>),
        coverImageKey: row.coverImageKey,
        coverImageAlt: row.coverImageAlt ?? "",
        seoTitle: row.seoTitle ?? "",
        seoDescription: row.seoDescription ?? "",
        status: row.status,
      }}
      initialSections={
        Object.fromEntries(
          caseStudySectionFields.map((field) => [
            field.key,
            docs[field.key].length > 0 ? toEditorJson(docs[field.key]) : emptyDoc,
          ]),
        ) as Record<SectionKey, object>
      }
    />
  );
}
