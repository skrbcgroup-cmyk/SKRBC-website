/* eslint-disable @next/next/no-img-element -- media images are served as-is from R2 */
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { RichText } from "@/components/rich-text/rich-text";
import { ContactCta } from "@/components/sections/contact-cta";
import { Container } from "@/components/ui/container";
import { routes } from "@/config/navigation";
import { getPublishedCaseStudy } from "@/lib/case-studies";

export const dynamic = "force-dynamic";

const loadCaseStudy = cache(getPublishedCaseStudy);

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const caseStudy = await loadCaseStudy((await params).slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.seoTitle || caseStudy.title,
    description: caseStudy.seoDescription || caseStudy.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const caseStudy = await loadCaseStudy((await params).slug);
  if (!caseStudy) notFound();

  return (
    <>
      <section className="bg-navy-900 text-white">
        <Container className="pt-36 pb-14 sm:pt-44 sm:pb-20">
          <Link
            href={routes.caseStudies}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-mist transition-colors hover:text-gold-400"
          >
            <ArrowLeft aria-hidden="true" strokeWidth={1.75} className="size-4" />
            All case studies
          </Link>
          <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-gold-500 uppercase">
            {caseStudy.service}
          </p>
          <h1 className="mt-5 max-w-4xl text-[2.25rem] leading-[1.1] sm:text-5xl lg:text-[3.5rem]">
            {caseStudy.title}
          </h1>
          {caseStudy.summary && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              {caseStudy.summary}
            </p>
          )}
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t border-white/15 pt-6 text-sm">
            <div>
              <dt className="text-mist">Client / Project</dt>
              <dd className="mt-1 text-white">{caseStudy.client}</dd>
            </div>
            <div>
              <dt className="text-mist">Service</dt>
              <dd className="mt-1 text-white">{caseStudy.service}</dd>
            </div>
          </dl>
        </Container>
        <div
          aria-hidden="true"
          className="h-px bg-linear-to-r from-gold-500/70 via-gold-500/20 to-transparent"
        />
      </section>

      <article className="py-14 lg:py-20">
        <Container className="max-w-3xl">
          {caseStudy.coverImage && (
            <figure className="mb-14">
              <img
                src={caseStudy.coverImage.src}
                alt={caseStudy.coverImage.alt}
                className="aspect-[16/9] w-full object-cover"
              />
            </figure>
          )}

          {caseStudy.sections.map((section, index) => (
            <section
              key={section.key}
              aria-labelledby={`section-${section.key}`}
              className="border-t border-line py-10 first-of-type:border-t-0 first-of-type:pt-0"
            >
              <p aria-hidden="true" className="font-serif text-lg text-gold-700">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2
                id={`section-${section.key}`}
                className="mt-2 text-[1.75rem] leading-tight text-navy-900 sm:text-[2rem]"
              >
                {section.title}
              </h2>
              <RichText doc={section.doc} className="mt-5" />
            </section>
          ))}
        </Container>
      </article>

      <ContactCta />
    </>
  );
}
