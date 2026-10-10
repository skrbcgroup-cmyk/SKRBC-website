import type { Metadata } from "next";

import { CanadianExperience } from "@/components/home/canadian-experience";
import { FounderIntro } from "@/components/home/founder-intro";
import { Hero } from "@/components/home/hero";
import { ServicesOverview } from "@/components/home/services-overview";
import { StatsStrip } from "@/components/home/stats-strip";
import { WhySkrbc } from "@/components/home/why-skrbc";
import { ContactCta } from "@/components/sections/contact-cta";
import { ProcessSteps } from "@/components/sections/process-steps";
import { siteConfig } from "@/config/site";
import { approachSteps } from "@/content/services";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | Risk Management & Business Consulting in Pakistan`,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <CanadianExperience />
      <ServicesOverview />
      <WhySkrbc />
      <ProcessSteps
        eyebrow="Our Approach"
        title="A clear, five-step process."
        intro="Every engagement follows the same disciplined method, so clients always know where things stand and what comes next."
        steps={approachSteps}
      />
      <FounderIntro />
      <ContactCta />
    </>
  );
}
