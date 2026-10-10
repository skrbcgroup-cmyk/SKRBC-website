import type { ReactNode } from "react";

import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process-steps";
import { RelatedServices } from "@/components/service-page/related-services";
import { ServiceIntro } from "@/components/service-page/service-intro";
import { ServiceOfferings } from "@/components/service-page/service-offerings";
import type { SiteImage } from "@/content/images.generated";
import type { ServicePageContent } from "@/content/service-pages";

type ServicePageProps = {
  content: ServicePageContent;
  href: string;
  heroImage: SiteImage;
  /** Extra page-specific sections, placed after the offerings. */
  children?: ReactNode;
};

/** Shared layout for the four dedicated service pages. */
export function ServicePage({ content, href, heroImage, children }: ServicePageProps) {
  const { hero, intro, offerings, process, cta } = content;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} image={heroImage} />
      <ServiceIntro
        eyebrow="Overview"
        title={intro.title}
        paragraphs={intro.paragraphs}
        aside={intro.aside}
      />
      <ServiceOfferings
        eyebrow="Services"
        title={offerings.title}
        intro={offerings.intro}
        items={offerings.items}
        note={offerings.note}
      />
      {children}
      {process && (
        <ProcessSteps
          eyebrow="Our Process"
          title={process.title}
          intro={process.intro}
          steps={process.steps}
        />
      )}
      <RelatedServices currentHref={href} />
      <ContactCta title={cta.title} text={cta.text} buttonLabel={cta.buttonLabel} />
    </>
  );
}
