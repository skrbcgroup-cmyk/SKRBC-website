import type { Metadata } from "next";

import { CanadianExperience } from "@/components/home/canadian-experience";
import { FounderIntro } from "@/components/home/founder-intro";
import { Hero } from "@/components/home/hero";
import { OurApproach } from "@/components/home/our-approach";
import { ServicesOverview } from "@/components/home/services-overview";
import { StatsStrip } from "@/components/home/stats-strip";
import { WhySkrbc } from "@/components/home/why-skrbc";
import { ContactCta } from "@/components/sections/contact-cta";
import { siteConfig } from "@/config/site";

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
      <OurApproach />
      <FounderIntro />
      <ContactCta />
    </>
  );
}
