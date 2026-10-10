import type { FiveSteps } from "@/components/sections/process-steps";

/** Content for the dedicated service pages (spec sections 8 to 11). */
export type ServicePageContent = {
  hero: { eyebrow: string; title: string; lead: string };
  intro: {
    title: string;
    paragraphs: string[];
    aside: { title: string; items: string[] };
  };
  offerings: { title: string; intro: string; items: string[]; note?: string };
  process?: { title: string; intro: string; steps: FiveSteps };
  cta: { title: string; text: string; buttonLabel: string };
};

export const riskManagementPage: ServicePageContent = {
  hero: {
    eyebrow: "Risk Management Consulting",
    title: "Understand your risks before they become problems.",
    lead: "Practical risk assessments for businesses, projects and events, with clear recommendations that owners and managers can act on.",
  },
  intro: {
    title: "What we mean by risk management",
    paragraphs: [
      "Risk management is the work of identifying what could go wrong in a business, understanding how likely and how serious it is, and deciding in advance what to do about it.",
      "For SKRBC, that means practical work rather than paperwork. We look at how the business actually operates, including its projects, events, partnerships and contracts, and give recommendations that fit its size, resources and goals.",
      "The approach is shaped by years in Canada's property-claims industry, where the cost of a missed risk shows up as losses, gaps in documentation and decisions made without the full picture.",
    ],
    aside: {
      title: "Areas we review",
      items: [
        "Business and strategic risk",
        "Operational risk",
        "Projects",
        "Events",
        "Partnerships and contracts",
        "Security",
      ],
    },
  },
  offerings: {
    title: "What this service can include",
    intro:
      "Every engagement is scoped to the client's needs. A review may cover one area or several.",
    items: [
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
  },
  process: {
    title: "How a risk assessment works.",
    intro:
      "A structured, five-step method that moves from finding risks to keeping them under control.",
    steps: [
      {
        name: "Identify",
        text: "Identify the business, operational, project and security risks that could affect the organization.",
      },
      {
        name: "Assess",
        text: "Assess how likely each risk is and how seriously it could affect the business.",
      },
      {
        name: "Analyze",
        text: "Analyze causes, connections and priorities so attention goes where it matters most.",
      },
      {
        name: "Mitigate",
        text: "Recommend practical controls and actions to reduce or manage each priority risk.",
      },
      {
        name: "Monitor",
        text: "Review risks over time and update the risk register as the business changes.",
      },
    ],
  },
  cta: {
    title: "Ready to understand your risks?",
    text: "Tell us about your business, project or event and we will discuss the right scope for a risk assessment.",
    buttonLabel: "Request a Risk Assessment",
  },
};
