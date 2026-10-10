import type { Metadata } from "next";

import { FocusAreas } from "@/components/service-page/focus-areas";
import { ServicePage } from "@/components/service-page/service-page";
import { routes } from "@/config/navigation";
import { businessOperationalFocus, businessOperationalPage } from "@/content/business-operational";
import { siteImages } from "@/content/images.generated";

export const metadata: Metadata = {
  title: "Business & Operational Consulting",
  description:
    "Business assessments, planning, partnership and proposal support, operational reviews and process improvement for businesses in Rawalpindi, Islamabad and across Pakistan.",
};

export default function BusinessOperationalPage() {
  return (
    <ServicePage
      content={businessOperationalPage}
      href={routes.businessOperational}
      heroImage={siteImages.conferenceRoom}
    >
      <FocusAreas
        eyebrow="Two Areas of Focus"
        title="Business and operations, working together."
        areas={businessOperationalFocus}
      />
    </ServicePage>
  );
}
