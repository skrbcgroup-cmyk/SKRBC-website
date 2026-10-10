import type { Metadata } from "next";

import { FocusAreas } from "@/components/service-page/focus-areas";
import { ServicePage } from "@/components/service-page/service-page";
import { routes } from "@/config/navigation";
import { siteImages } from "@/content/images.generated";
import { securityFocus, securityRiskPage } from "@/content/security-risk";

export const metadata: Metadata = {
  title: "Security Risk Consulting",
  description:
    "Security risk assessments, business security reviews, event and site risk assessments, security planning and incident preparedness advisory in Pakistan.",
};

export default function SecurityRiskPage() {
  return (
    <ServicePage
      content={securityRiskPage}
      href={routes.securityRisk}
      heroImage={siteImages.securityCameras}
    >
      <FocusAreas
        eyebrow="Where We Apply It"
        title="Businesses, sites and events."
        areas={securityFocus}
      />
    </ServicePage>
  );
}
