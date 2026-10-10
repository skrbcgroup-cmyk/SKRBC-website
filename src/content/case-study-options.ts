import { services } from "@/content/services";

/** Services a case study can be filed under, taken from the Services page. */
export const serviceOptions: readonly string[] = services.map((service) => service.title);

/** The six-part structure every case study follows (spec section 12). */
export const caseStudySectionFields = [
  { key: "clientProject", title: "Client / Project", hint: "Who or what the project involved." },
  { key: "challenge", title: "Challenge", hint: "What problem or situation required consulting." },
  { key: "assessment", title: "Assessment", hint: "What SKRBC reviewed." },
  {
    key: "recommendations",
    title: "Recommendations",
    hint: "What risks, opportunities or improvements were identified.",
  },
  { key: "consultingSupport", title: "Consulting Support", hint: "What SKRBC actually provided." },
  {
    key: "outcome",
    title: "Outcome",
    hint: "What was accomplished, where disclosure is permitted.",
  },
] as const;

export type SectionKey = (typeof caseStudySectionFields)[number]["key"];
export const sectionKeys: SectionKey[] = caseStudySectionFields.map((field) => field.key);
