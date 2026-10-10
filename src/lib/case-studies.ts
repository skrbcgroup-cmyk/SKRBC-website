/** Case studies (spec section 12). Every case study follows the same six-part structure. */

export type CaseStudySummary = {
  slug: string;
  title: string;
  client: string;
  service: string;
  summary: string;
};

export const caseStudySections = [
  { title: "Client / Project", text: "Who or what the project involved." },
  { title: "Challenge", text: "What problem or situation required consulting." },
  { title: "Assessment", text: "What SKRBC reviewed." },
  { title: "Recommendations", text: "What risks, opportunities or improvements were identified." },
  { title: "Consulting Support", text: "What SKRBC actually provided." },
  { title: "Outcome", text: "What was accomplished, where disclosure is permitted." },
];

/**
 * Published case studies, newest first.
 * Phase 4 replaces this with a D1 query managed from the admin panel; until the client
 * approves the first case study for publication, the page shows its empty state.
 */
export async function getPublishedCaseStudies(): Promise<CaseStudySummary[]> {
  return [];
}
