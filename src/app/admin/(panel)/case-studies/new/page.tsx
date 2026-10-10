import type { Metadata } from "next";

import { CaseStudyForm } from "@/components/admin/case-study-form";
import { caseStudySectionFields, type SectionKey } from "@/content/case-study-options";
import { requireAdmin } from "@/lib/auth/session";

export const metadata: Metadata = { title: "New Case Study" };

const emptyDoc = { type: "doc", content: [{ type: "paragraph" }] };

export default async function NewCaseStudyPage() {
  await requireAdmin();

  const sections = Object.fromEntries(
    caseStudySectionFields.map((field) => [field.key, ""]),
  ) as Record<SectionKey, string>;
  const initialSections = Object.fromEntries(
    caseStudySectionFields.map((field) => [field.key, emptyDoc]),
  ) as Record<SectionKey, object>;

  return (
    <CaseStudyForm
      initial={{
        title: "",
        slug: "",
        client: "",
        service: "",
        summary: "",
        ...sections,
        coverImageKey: null,
        coverImageAlt: "",
        seoTitle: "",
        seoDescription: "",
        status: "draft",
      }}
      initialSections={initialSections}
    />
  );
}
