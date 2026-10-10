/**
 * Site routes and navigation, kept in one place so header, footer and
 * internal links never drift apart.
 */

export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  riskManagement: "/services/risk-management",
  insuranceClaims: "/services/insurance-claims",
  businessOperational: "/services/business-operational",
  securityRisk: "/services/security-risk",
  trainingAdvisory: "/services#training-advisory",
  caseStudies: "/case-studies",
  insights: "/insights",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
} as const;

export type NavLink = { label: string; href: string };

/** Pages with their own detail page, shown in the Services dropdown. */
export const serviceNav: NavLink[] = [
  { label: "Risk Management Consulting", href: routes.riskManagement },
  { label: "Insurance & Claims Consulting", href: routes.insuranceClaims },
  { label: "Business & Operational Consulting", href: routes.businessOperational },
  { label: "Security Risk Consulting", href: routes.securityRisk },
];

export const mainNav: NavLink[] = [
  { label: "About", href: routes.about },
  { label: "Services", href: routes.services },
  { label: "Case Studies", href: routes.caseStudies },
  { label: "Insights", href: routes.insights },
  { label: "Contact", href: routes.contact },
];

export const footerNav = {
  quickLinks: [
    { label: "Home", href: routes.home },
    { label: "About", href: routes.about },
    { label: "Services", href: routes.services },
    { label: "Case Studies", href: routes.caseStudies },
    { label: "Insights", href: routes.insights },
    { label: "Contact", href: routes.contact },
  ],
  services: [
    { label: "Risk Management", href: routes.riskManagement },
    { label: "Insurance & Claims", href: routes.insuranceClaims },
    { label: "Business Consulting", href: routes.businessOperational },
    { label: "Operational Consulting", href: routes.businessOperational },
    { label: "Security Risk Consulting", href: routes.securityRisk },
  ],
  legal: [
    { label: "Privacy Policy", href: routes.privacy },
    { label: "Terms & Conditions", href: routes.terms },
  ],
} satisfies Record<string, NavLink[]>;
