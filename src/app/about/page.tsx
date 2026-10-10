import type { Metadata } from "next";

import { CareerTimeline } from "@/components/about/career-timeline";
import { CompanyPhilosophy } from "@/components/about/company-philosophy";
import { CompanyProfile } from "@/components/about/company-profile";
import { FounderProfile } from "@/components/about/founder-profile";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { siteImages } from "@/content/images.generated";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SK Risk & Business Consulting is a Rawalpindi-based consulting company built on more than 9 years of Canadian insurance and property-claims experience.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Canadian experience, applied to business in Pakistan."
        lead="SKRBC is a consulting company built on years of hands-on work in Canada's insurance and property-claims industry, now focused on helping businesses manage risk and make better decisions."
        image={siteImages.torontoSkyline}
      />
      <CompanyProfile />
      <FounderProfile />
      <CareerTimeline />
      <CompanyPhilosophy />
      <ContactCta />
    </>
  );
}
