import type { ReactNode } from "react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

export type LegalSection = { id: string; title: string; content: ReactNode };

type LegalPageProps = {
  title: string;
  lead: string;
  /** Human-readable date, e.g. "10 October 2026". */
  lastUpdated: string;
  sections: LegalSection[];
};

/** Shared layout for the Privacy Policy and Terms & Conditions pages. */
export function LegalPage({ title, lead, lastUpdated, sections }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={lead} />
      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.16em] text-gold-700 uppercase">
              On this page
            </p>
            <ol className="mt-4 space-y-1 border-l border-line">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px flex min-h-9 items-center border-l border-transparent pl-4 text-[0.9375rem] text-slate transition-colors hover:border-gold-500 hover:text-navy-900"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="max-w-3xl">
            <p className="text-sm text-slate">Last updated: {lastUpdated}</p>
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="mt-10 scroll-mt-28 border-t border-line pt-10 first-of-type:mt-8 [&_a]:text-gold-700 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-navy-900 [&_li]:pl-1 [&_p+p]:mt-4 [&_p+ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-gold-700 [&_ul+p]:mt-4"
              >
                <h2
                  id={`${section.id}-title`}
                  className="text-2xl leading-snug text-navy-900 sm:text-[1.75rem]"
                >
                  {section.title}
                </h2>
                <div className="mt-5 text-ink">{section.content}</div>
              </section>
            ))}
          </article>
        </Container>
      </section>
    </>
  );
}
