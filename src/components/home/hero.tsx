import Image from "next/image";
import { Fragment } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/content/images.generated";

/** "Risk. Strategy. Experience. Results." with each full stop in gold. */
function Tagline() {
  const words = siteConfig.tagline.split(". ").map((word) => word.replace(/\.$/, ""));
  return words.map((word, index) => (
    <Fragment key={word}>
      {index > 0 && " "}
      <span className="whitespace-nowrap">
        {word}
        <span className="text-gold-500">.</span>
      </span>
    </Fragment>
  ));
}

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[clamp(40rem,100svh,58rem)] items-end overflow-hidden bg-navy-900 text-white">
      <Image
        src={siteImages.heroOfficeTowers.src}
        blurDataURL={siteImages.heroOfficeTowers.blurDataURL}
        alt=""
        fill
        preload
        sizes="100vw"
        placeholder="blur"
        className="-z-20 scale-[1.03] object-cover grayscale-[35%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(15_28_46/0.96)_0%,rgb(15_28_46/0.86)_45%,rgb(15_28_46/0.5)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-navy-900/80 via-transparent via-45% to-transparent"
      />

      <Container className="pt-36 pb-10 sm:pt-44 sm:pb-14">
        <div className="max-w-3xl">
          <Eyebrow tone="dark">Risk Management &amp; Business Consulting</Eyebrow>
          <h1 className="mt-6 text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-[5.25rem]">
            <Tagline />
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-[1.1875rem]">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={routes.services} arrow>
              Explore Our Services
            </ButtonLink>
            <ButtonLink href={routes.contact} variant="outline-light">
              Speak With a Consultant
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-16 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm tracking-[0.04em] text-white/75 sm:mt-24 sm:flex-row sm:flex-wrap sm:gap-0">
          {siteConfig.credibility.map((item, index) => (
            <li key={item} className="flex items-center">
              {index > 0 && (
                <span aria-hidden="true" className="mx-5 hidden h-3.5 w-px bg-gold-500 sm:block" />
              )}
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
