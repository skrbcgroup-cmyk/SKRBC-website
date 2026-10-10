import type { ServicePageContent } from "@/content/service-pages";

export const securityRiskPage: ServicePageContent = {
  hero: {
    eyebrow: "Security Risk Consulting",
    title: "Security decisions based on a clear assessment.",
    lead: "Advisory support to identify security risks across businesses, sites and events, and to plan practical ways of reducing them.",
  },
  intro: {
    title: "Security as part of risk management",
    paragraphs: [
      "Security risk consulting looks at what could harm a business's people, premises, assets or operations, how likely that is, and what can reasonably be done about it.",
      "SKRBC approaches security the same way it approaches every other risk: by understanding how the business or event actually works, assessing where it is exposed, and recommending plans and procedures that fit its size and resources.",
      "The work is advisory. We assess, plan and advise, so that decisions about security are based on evidence rather than guesswork.",
    ],
    aside: {
      title: "What we look at",
      items: [
        "People and visitors",
        "Premises and sites",
        "Assets and information",
        "Events and gatherings",
        "Procedures and incident response",
      ],
    },
  },
  offerings: {
    title: "What this service can include",
    intro:
      "Engagements range from a single site or event review to a wider look at how a business manages security risk.",
    items: [
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
    note: "SKRBC provides security risk consulting and advisory services. It does not provide guarding or manned security services.",
  },
  process: {
    title: "How a security assessment works.",
    intro:
      "A structured approach that moves from understanding the setting to a plan the client can put into practice.",
    steps: [
      {
        name: "Understand",
        text: "Understand the business, site or event, how it operates and what concerns the client has.",
      },
      {
        name: "Survey",
        text: "Review the premises, layout, access points and existing security arrangements.",
      },
      {
        name: "Assess",
        text: "Identify threats and vulnerabilities and assess their likelihood and potential impact.",
      },
      {
        name: "Plan",
        text: "Recommend practical security measures, plans and procedures to reduce priority risks.",
      },
      {
        name: "Prepare",
        text: "Support incident preparedness so people know what to do if something goes wrong.",
      },
    ],
  },
  cta: {
    title: "Planning a site review or an event?",
    text: "Tell us about the business, site or event and we will discuss the right scope for a security risk assessment.",
    buttonLabel: "Request a Security Assessment",
  },
};

/** Where security risk consulting is applied. */
export const securityFocus = [
  {
    title: "Businesses",
    text: "Security reviews for offices and operations, covering access, assets, information and the procedures staff follow day to day.",
    points: ["Business security reviews", "Security procedures", "Operations advisory"],
  },
  {
    title: "Sites",
    text: "Assessments of specific premises and locations, looking at layout, access points, surroundings and existing arrangements.",
    points: ["Site risk assessments", "Access and perimeter", "Risk mitigation"],
  },
  {
    title: "Events",
    text: "Risk assessments for events and gatherings, so organisers can plan for crowds, access and incidents before the day.",
    points: ["Event risk assessments", "Security planning", "Incident preparedness"],
  },
];
