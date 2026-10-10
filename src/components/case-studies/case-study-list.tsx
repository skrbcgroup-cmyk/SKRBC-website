import { ArrowRight, FolderOpen } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routes } from "@/config/navigation";
import { caseStudySectionFields } from "@/content/case-study-options";
import type { CaseStudySummary } from "@/lib/case-studies";

function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudySummary }) {
  return (
    <Link
      href={`${routes.caseStudies}/${caseStudy.slug}`}
      className="group flex h-full flex-col border border-line bg-white p-8 transition-colors duration-200 hover:border-navy-900"
    >
      <p className="text-xs font-semibold tracking-[0.16em] text-gold-700 uppercase">
        {caseStudy.service}
      </p>
      <h2 className="mt-4 text-2xl leading-snug text-navy-900">{caseStudy.title}</h2>
      <p className="mt-2 text-sm text-slate">{caseStudy.client}</p>
      <p className="mt-5 flex-1 text-slate">{caseStudy.summary}</p>
      <span className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-gold-700">
        Read case study
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

function EmptyState() {
  return (
    <Reveal className="mx-auto max-w-3xl border-t-2 border-gold-500 bg-ivory px-6 py-12 text-center sm:px-14 sm:py-16">
      <FolderOpen aria-hidden="true" strokeWidth={1.25} className="mx-auto size-12 text-gold-700" />
      <h2 className="mt-6 text-[1.875rem] leading-tight text-navy-900 sm:text-4xl">
        Case studies are being prepared
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-lg text-slate">
        We are documenting recent consulting work, with each client&apos;s permission. Detailed case
        studies will be published here soon.
      </p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href={routes.contact} arrow>
          Discuss Your Project
        </ButtonLink>
        <ButtonLink href={routes.services} variant="outline-dark">
          Explore Our Services
        </ButtonLink>
      </div>
    </Reveal>
  );
}

export function CaseStudyList({ caseStudies }: { caseStudies: CaseStudySummary[] }) {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        {caseStudies.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((caseStudy) => (
              <li key={caseStudy.slug}>
                <CaseStudyCard caseStudy={caseStudy} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState />
        )}
      </Container>
    </section>
  );
}

/** The six-part structure every case study follows (spec section 12). */
export function CaseStudyStructure() {
  return (
    <section className="bg-navy-900 py-20 text-white lg:py-28">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            <Eyebrow tone="dark">Our Format</Eyebrow>
            <h2 className="mt-5 text-[2rem] leading-[1.14] sm:text-4xl lg:text-5xl">
              How each case study is structured.
            </h2>
          </div>
          <p className="max-w-xl text-mist lg:justify-self-end">
            Every project is presented the same way, so it is easy to see what the challenge was,
            what we did and what changed.
          </p>
        </Reveal>

        <Reveal as="ol" className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {caseStudySectionFields.map((section, index) => (
            <li key={section.title} className="border-t border-white/12 py-7">
              <span aria-hidden="true" className="font-serif text-lg text-gold-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[1.375rem]">{section.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-mist">{section.hint}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
