import {
  BriefcaseBusiness,
  House,
  LockKeyhole,
  Presentation,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { routes } from "@/config/navigation";

export type ServiceSummary = {
  title: string;
  /** 2 to 3 sentences, used on the homepage service cards (spec 5.3). */
  summary: string;
  href: string;
  icon: LucideIcon;
};

/** The six homepage service cards, in the order given in the spec. */
export const homeServices: ServiceSummary[] = [
  {
    title: "Risk Management",
    summary:
      "Identifying, assessing and mitigating business and operational risks. We help clients see where they are exposed and what to do about it before small issues grow.",
    href: routes.riskManagement,
    icon: ShieldCheck,
  },
  {
    title: "Insurance & Claims Consulting",
    summary:
      "Consulting based on Canadian insurance and property-claims experience. Practical guidance on claims processes, documentation and property loss records.",
    href: routes.insuranceClaims,
    icon: House,
  },
  {
    title: "Business Consulting",
    summary:
      "Business strategy, advisory and decision-making support. Clear, practical input for owners and managers facing important business choices.",
    href: routes.businessOperational,
    icon: BriefcaseBusiness,
  },
  {
    title: "Operational Consulting",
    summary:
      "Reviewing business processes and identifying operational improvements. The focus is on realistic changes that make daily operations more reliable.",
    href: routes.businessOperational,
    icon: Workflow,
  },
  {
    title: "Security Risk Consulting",
    summary:
      "Identifying security-related risks and developing mitigation strategies. Recommendations are shaped around each client's premises, people and operations.",
    href: routes.securityRisk,
    icon: LockKeyhole,
  },
  {
    title: "Training & Advisory",
    summary:
      "Professional training and customized advisory support. Sessions and guidance are built around the needs of each team and organization.",
    href: routes.trainingAdvisory,
    icon: Presentation,
  },
];
