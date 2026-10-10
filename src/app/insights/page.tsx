import type { Metadata } from "next";

import { ArticleList } from "@/components/insights/article-list";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceOfferings } from "@/components/service-page/service-offerings";
import { getPublishedArticles, plannedTopics } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles and resources on business risk management, insurance claims, operational risk and security for businesses in Pakistan.",
};

export default async function InsightsPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical thinking on risk and business."
        lead="Articles and resources on risk management, insurance claims, operations and security, written from real-world experience."
      />
      <ArticleList articles={articles} />
      {articles.length === 0 && (
        <ServiceOfferings
          eyebrow="Coming Up"
          title="Topics we will cover"
          intro="A first set of articles drawing on Canadian claims experience and consulting work in Pakistan."
          items={plannedTopics}
        />
      )}
      <ContactCta />
    </>
  );
}
