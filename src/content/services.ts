import {
  BriefcaseBusiness,
  House,
  LockKeyhole,
  Presentation,
  ShieldCheck,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { FiveSteps } from "@/components/sections/process-steps";
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

export type ServiceDetail = {
  /** Anchor on the Services page, e.g. /services#risk-management. */
  id: string;
  title: string;
  description: string;
  keyServices: string[];
  icon: LucideIcon;
  /** Dedicated service page. Services without one are covered fully on the Services page. */
  href?: string;
};

/** The seven service areas on the Services page (spec section 7). */
export const services: ServiceDetail[] = [
  {
    id: "risk-management",
    title: "Risk Management Consulting",
    description:
      "Knowing where a business is exposed before something goes wrong. We identify, assess and prioritise business, operational and project risks, then help put practical controls in place.",
    keyServices: [
      "Business risk assessments",
      "Operational risk assessments",
      "Project risk assessments",
      "Event risk assessments",
      "Risk identification",
      "Risk analysis",
      "Risk mitigation",
      "Risk registers",
      "Business continuity considerations",
      "Partnership risk review",
      "Contract risk review",
      "Security risk assessment",
    ],
    icon: ShieldCheck,
    href: routes.riskManagement,
  },
  {
    id: "insurance-claims",
    title: "Insurance & Claims Consulting",
    description:
      "Consulting informed by more than 9 years of Canadian insurance and property-claims experience. We help businesses understand claims processes, organise documentation and prepare for property losses, as a consulting and advisory service.",
    keyServices: [
      "Claims process consulting",
      "Claims documentation review",
      "Property claims consulting",
      "Property loss documentation",
      "Claims file organization",
      "Risk identification",
      "Claims process improvement",
      "Insurance-related business advisory",
      "Property risk considerations",
    ],
    icon: House,
    href: routes.insuranceClaims,
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    description:
      "Business strategy, advisory and decision-making support. We work with owners and managers on assessments, planning, partnerships and proposals, giving clear input on the decisions that shape the business.",
    keyServices: [
      "Business assessments",
      "Business planning",
      "Partnership assessments",
      "Proposal development",
      "Negotiation support",
      "Strategic advisory",
      "Project advisory",
    ],
    icon: BriefcaseBusiness,
    href: routes.businessOperational,
  },
  {
    id: "operational-consulting",
    title: "Operational Consulting",
    description:
      "Reviewing how a business runs day to day and identifying improvements that make operations more reliable. The focus is on processes, responsibilities and the operational risks that hold a business back.",
    keyServices: [
      "Operational reviews",
      "Process improvement",
      "Operational risk assessments",
      "Operational risk management",
    ],
    icon: Workflow,
    href: routes.businessOperational,
  },
  {
    id: "security-risk",
    title: "Security Risk Consulting",
    description:
      "Identifying security-related risks and developing mitigation strategies for businesses, sites and events. This is advisory work covering assessments, planning and procedures, not guarding services.",
    keyServices: [
      "Security risk assessments",
      "Business security reviews",
      "Event security risk assessments",
      "Site risk assessments",
      "Security planning",
      "Security procedures",
      "Incident preparedness",
      "Risk mitigation",
      "Security operations advisory",
    ],
    icon: LockKeyhole,
    href: routes.securityRisk,
  },
  {
    id: "training-advisory",
    title: "Training & Advisory",
    description:
      "Professional training and customized advisory support. Sessions draw on practical risk and claims experience and are shaped around the needs of each team and organization.",
    keyServices: [
      "Risk awareness training",
      "Documentation and record-keeping practices",
      "Customized advisory sessions",
      "Ongoing advisory support",
    ],
    icon: Presentation,
  },
  {
    id: "business-development-advisory",
    title: "Business Development Advisory",
    description:
      "Support for businesses looking to grow, form partnerships or take on new projects. We help assess opportunities, prepare proposals and approach negotiations with a clear view of the risks involved.",
    keyServices: [
      "Opportunity assessment",
      "Partnership risk review",
      "Proposal development",
      "Negotiation support",
    ],
    icon: TrendingUp,
  },
];

/** How an engagement starts (spec section 18). */
export const engagementSteps = [
  "Initial consultation",
  "Understand your business and requirements",
  "Identify the scope of work",
  "Provide a customized proposal and fee",
  "Begin the engagement upon approval",
];

/** SKRBC's general approach (spec 5.5), shown on the homepage. */
export const approachSteps: FiveSteps = [
  { name: "Understand", text: "Understand the client's business, objectives and concerns." },
  {
    name: "Assess",
    text: "Identify relevant business, operational, financial, security and strategic risks.",
  },
  { name: "Analyze", text: "Evaluate the risks and their potential impact." },
  { name: "Recommend", text: "Develop practical recommendations and risk mitigation strategies." },
  { name: "Support", text: "Provide ongoing advisory support where required." },
];
