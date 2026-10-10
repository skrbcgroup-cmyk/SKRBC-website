import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routes } from "@/config/navigation";
import { siteImages } from "@/content/images.generated";

export function FounderIntro() {
  return (
    <section className="py-20 lg:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[5fr_7fr] lg:gap-24">
        <Reveal className="relative isolate mr-5 max-w-md lg:mr-0">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 translate-x-5 translate-y-5 border border-gold-500"
          />
          <Image
            {...siteImages.saudKhan}
            alt="Saud Khan, Founder and Consultant of SK Risk & Business Consulting"
            sizes="(min-width: 640px) 448px, 100vw"
            placeholder="blur"
            className="aspect-[4/5] w-full object-cover object-top"
          />
        </Reveal>

        <Reveal delay={120}>
          <Eyebrow>Founder</Eyebrow>
          <h2 className="mt-5 text-4xl leading-tight text-navy-900 lg:text-5xl">Saud Khan</h2>
          <p className="mt-2 text-lg text-gold-700">Founder &amp; Consultant</p>
          <div className="mt-8 max-w-2xl space-y-5 text-lg text-slate">
            <p>
              Saud Khan is the Founder and Consultant of SK Risk &amp; Business Consulting
              (SMC-Private) Limited.
            </p>
            <p>
              He brings more than 9 years of professional experience in the Canadian insurance and
              property-claims industry, including experience in claims support, desk adjusting and
              catastrophe field adjusting.
            </p>
            <p>
              His experience provides SKRBC with practical knowledge of risk, claims, documentation,
              property losses, operational challenges and business problem-solving.
            </p>
          </div>
          <ButtonLink href={routes.about} variant="outline-dark" arrow className="mt-10">
            Meet Our Founder
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
