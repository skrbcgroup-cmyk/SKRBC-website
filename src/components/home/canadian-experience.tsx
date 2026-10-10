import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/text-link";
import { routes } from "@/config/navigation";
import { siteImages } from "@/content/images.generated";

const experience = [
  "9+ years of insurance experience",
  "Property claims",
  "Claims operations",
  "Desk adjusting",
  "Catastrophe field adjusting",
  "Claims documentation",
  "Property damage assessment",
  "Estimate and file review",
  "Working with clients and stakeholders",
  "High-volume, rapidly changing environments",
];

export function CanadianExperience() {
  return (
    <section className="py-20 lg:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[7fr_5fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Canadian Experience</Eyebrow>
          <h2 className="mt-5 text-[2rem] leading-[1.14] text-navy-900 sm:text-4xl lg:text-[2.75rem]">
            Canadian Experience. International Perspective. Local Expertise.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-slate">
            SKRBC brings professional experience gained in Canada&apos;s insurance and
            property-claims industry to its consulting work in Pakistan. Years of handling claims,
            documentation and property losses have shaped a practical way of looking at risk.
          </p>

          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {experience.map((item) => (
              <li
                key={item}
                className="relative border-t border-line py-3.5 pl-6 text-[0.9375rem] text-ink before:absolute before:top-[1.6rem] before:left-0 before:h-px before:w-2.5 before:bg-gold-500"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-4 border-t border-line pt-8">
            <Image
              {...siteImages.saudKhan}
              alt="Saud Khan"
              sizes="56px"
              className="size-14 rounded-full object-cover object-top"
            />
            <div>
              <p className="font-serif text-lg leading-tight text-navy-900">Saud Khan</p>
              <p className="text-sm text-slate">Founder &amp; Consultant</p>
            </div>
            <div className="ml-auto hidden sm:block">
              <TextLink href={routes.about}>Learn About Our Experience</TextLink>
            </div>
          </div>
          <div className="mt-4 sm:hidden">
            <TextLink href={routes.about}>Learn About Our Experience</TextLink>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative isolate hidden lg:block">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 translate-x-5 translate-y-5 border border-gold-500"
          />
          <Image
            {...siteImages.canadaProperty}
            alt="Detached residential house in a quiet neighbourhood"
            sizes="(min-width: 1200px) 460px, 40vw"
            placeholder="blur"
            className="aspect-[4/5] w-full object-cover grayscale-[20%]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
