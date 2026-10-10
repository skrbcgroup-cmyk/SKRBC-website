import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page/service-page";
import { routes } from "@/config/navigation";
import { siteImages } from "@/content/images.generated";
import { riskManagementPage } from "@/content/service-pages";

export const metadata: Metadata = {
  title: "Risk Management Consulting",
  description:
    "Business, operational, project and event risk assessments in Pakistan, with practical recommendations, risk registers and mitigation planning.",
};

export default function RiskManagementPage() {
  return (
    <ServicePage
      content={riskManagementPage}
      href={routes.riskManagement}
      heroImage={siteImages.blueprintReview}
    />
  );
}
