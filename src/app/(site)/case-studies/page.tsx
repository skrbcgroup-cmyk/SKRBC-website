import type { Metadata } from "next";

import { CaseStudyList, CaseStudyStructure } from "@/components/case-studies/case-study-list";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { getPublishedCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Case studies showing how SK Risk & Business Consulting applies risk management, business and security consulting to real client projects.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getPublishedCaseStudies();

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="How we apply our experience."
        lead="Client projects showing how SKRBC approaches risk, operations and decision-making in practice."
      />
      <CaseStudyList caseStudies={caseStudies} />
      <CaseStudyStructure />
      <ContactCta />
    </>
  );
}
