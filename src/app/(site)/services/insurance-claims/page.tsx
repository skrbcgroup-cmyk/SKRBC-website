import type { Metadata } from "next";

import { CanadianExpertise } from "@/components/service-page/canadian-expertise";
import { ServicePage } from "@/components/service-page/service-page";
import { routes } from "@/config/navigation";
import { siteImages } from "@/content/images.generated";
import { insuranceClaimsPage } from "@/content/insurance-claims";

export const metadata: Metadata = {
  title: "Insurance & Claims Consulting",
  description:
    "Claims process, documentation and property loss consulting in Pakistan, informed by more than 9 years of Canadian insurance and property-claims experience.",
};

export default function InsuranceClaimsPage() {
  return (
    <ServicePage
      content={insuranceClaimsPage}
      href={routes.insuranceClaims}
      heroImage={siteImages.canadaProperty}
    >
      <CanadianExpertise />
    </ServicePage>
  );
}
