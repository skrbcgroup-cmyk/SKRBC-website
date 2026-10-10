import { approachSteps } from "@/content/services";
import type { ServicePageContent } from "@/content/service-pages";

export const businessOperationalPage: ServicePageContent = {
  hero: {
    eyebrow: "Business & Operational Consulting",
    title: "Better decisions. Stronger operations.",
    lead: "Practical support for owners and managers who want clearer decisions, smoother day-to-day operations and fewer avoidable risks.",
  },
  intro: {
    title: "How we help businesses improve",
    paragraphs: [
      "Most business problems show up in two places: the decisions that set direction, and the daily operations that carry them out. SKRBC helps with both.",
      "On the business side, we review where the company stands, support planning and partnerships, and help prepare proposals and negotiations. On the operational side, we look at how work actually gets done and where processes, responsibilities or risks are holding the business back.",
      "The aim is always practical: recommendations that fit the business as it is today and can be put into practice by the people who run it.",
    ],
    aside: {
      title: "Who this helps",
      items: [
        "Business owners and managing directors",
        "Growing businesses",
        "Companies taking on new projects",
        "Businesses entering partnerships",
        "Teams facing operational problems",
      ],
    },
  },
  offerings: {
    title: "What this service can include",
    intro:
      "Engagements can focus on a single decision or a wider review of how the business operates.",
    items: [
      "Business assessments",
      "Operational reviews",
      "Process improvement",
      "Business planning",
      "Partnership assessments",
      "Proposal development",
      "Negotiation support",
      "Strategic advisory",
      "Project advisory",
      "Operational risk management",
    ],
  },
  process: {
    title: "How we work with you.",
    intro:
      "The same disciplined method as every SKRBC engagement, so you always know where things stand and what comes next.",
    steps: approachSteps,
  },
  cta: {
    title: "Facing an important business decision?",
    text: "Tell us what you are working on and we will discuss how practical consulting support can help.",
    buttonLabel: "Request a Consultation",
  },
};

/** The two halves of this service, explained side by side. */
export const businessOperationalFocus = [
  {
    title: "Business Consulting",
    text: "Strategy, planning and decision-making support. We help owners and managers assess the business, plan ahead, evaluate partnerships and prepare for negotiations.",
    points: ["Direction and strategy", "Partnerships and proposals", "Projects and planning"],
  },
  {
    title: "Operational Consulting",
    text: "A close look at how the business runs every day. We review processes and responsibilities, identify operational risks and recommend improvements that make operations more reliable.",
    points: ["Processes and workflows", "Roles and responsibilities", "Operational risk"],
  },
];
