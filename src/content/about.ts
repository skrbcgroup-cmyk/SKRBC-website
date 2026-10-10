/** About page content (spec section 6 and the client's career timeline). */

export const serviceAreas = [
  "Risk management",
  "Business consulting",
  "Insurance and claims consulting",
  "Operational consulting",
  "Security risk consulting",
  "Training",
  "Business advisory",
];

export type CareerStage = {
  role: string;
  summary: string;
  highlights: string[];
};

/** "Canadian Professional Experience" timeline, from the client's own outline. */
export const careerStages: CareerStage[] = [
  {
    role: "Document Imaging / Claims Support",
    summary:
      "Handled document imaging, file organization and administrative support to ensure claims were processed efficiently and accurately.",
    highlights: [
      "Document scanning & indexing",
      "File organization",
      "Data entry & record keeping",
      "Supporting claims teams",
    ],
  },
  {
    role: "Claims Assistant",
    summary:
      "Supported adjusters by gathering information, reviewing documentation and communicating with clients and stakeholders, while ensuring claims met deadlines and company standards.",
    highlights: [
      "Information gathering",
      "Documentation review",
      "Client & stakeholder communication",
      "Deadline management",
    ],
  },
  {
    role: "Desk Adjuster",
    summary:
      "Managed claims from start to finish, including coverage analysis, liability assessment, negotiation and settlement of property claims, all from the office.",
    highlights: [
      "Coverage & liability analysis",
      "Negotiation & settlement",
      "File management",
      "Client support",
    ],
  },
  {
    role: "Catastrophe Field Adjuster",
    summary:
      "Deployed to disaster-impacted areas for up to 4 weeks, handling high volumes of claims, assessing property damage and coordinating with stakeholders on on-site estimates and file reviews.",
    highlights: [
      "Disaster response & deployment",
      "Damage assessment",
      "On-site estimates & inspections",
      "Stakeholder coordination",
    ],
  },
  {
    role: "Risk & Business Consultant",
    summary:
      "Now focused on risk management and business consulting, helping organizations reduce risk, improve operations and create long-term value through strategic advice and practical solutions.",
    highlights: [
      "Risk management",
      "Business advisory",
      "Process improvement",
      "Strategic planning",
    ],
  },
];

export const principles = [
  {
    title: "Practical",
    text: "Advice should be realistic and capable of being implemented.",
  },
  {
    title: "Professional",
    text: "Work should be conducted with professionalism and accountability.",
  },
  {
    title: "Risk-Aware",
    text: "Potential risks should be identified before they become major problems.",
  },
  {
    title: "Client-Focused",
    text: "Recommendations should be tailored to the client's actual circumstances.",
  },
];
