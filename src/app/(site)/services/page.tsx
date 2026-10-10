import type { Metadata } from "next";

import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { FeesProcess } from "@/components/services/fees-process";
import { ServiceIndex, ServiceList } from "@/components/services/service-list";
import { siteImages } from "@/content/images.generated";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Risk management, insurance and claims consulting, business and operational consulting, security risk consulting, training and business development advisory in Pakistan.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Consulting services built around your business."
        lead="Seven service areas, one practical approach: understand the business, identify the risks and recommend what will actually work."
        image={siteImages.officeInterior}
      />
      <ServiceIndex />
      <ServiceList />
      <FeesProcess />
      <ContactCta />
    </>
  );
}
