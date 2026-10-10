import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteImages } from "@/content/images.generated";

const facts = [
  { value: "9+ years", label: "Canadian insurance industry" },
  { value: "Desk & field", label: "Desk and catastrophe field adjusting" },
  { value: "Rawalpindi", label: "Consulting across Pakistan" },
];

export function FounderProfile() {
  return (
    <section className="bg-ivory py-20 lg:py-32">
      <Container className="grid items-start gap-14 lg:grid-cols-[5fr_7fr] lg:gap-24">
        <Reveal className="relative isolate mr-5 max-w-md lg:sticky lg:top-32 lg:mr-0">
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
          <Eyebrow>Our Founder</Eyebrow>
          <h2 className="mt-5 text-[2rem] leading-[1.14] text-navy-900 sm:text-4xl lg:text-[2.75rem]">
            Saud Khan: Founder &amp; Consultant
          </h2>
          <div className="mt-8 space-y-5 text-lg text-slate">
            <p>
              Saud Khan is the Founder and Consultant of SK Risk &amp; Business Consulting
              (SMC-Private) Limited.
            </p>
            <p>
              With more than 9 years of experience in the Canadian insurance industry, he brings
              practical, hands-on experience across property claims, desk adjusting, catastrophe
              field adjusting, claims operations, documentation, damage assessment and file review.
            </p>
            <p>
              His career in Canada began in document imaging and claims support. It moved through
              claims assistance and desk adjusting to catastrophe field adjusting, where he was
              deployed to disaster-impacted areas to assess property damage and manage high volumes
              of claims under demanding timelines.
            </p>
            <p>
              This experience forms the foundation of SKRBC&apos;s practical approach to risk
              management, operational consulting and business advisory services.
            </p>
          </div>

          <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.value}>
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-serif text-2xl text-navy-900">{fact.value}</dd>
                <dd className="mt-1 text-sm text-slate">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
