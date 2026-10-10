import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { SiteImage } from "@/content/images.generated";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Optional background photo, toned down under a navy overlay. */
  image?: SiteImage;
};

/** Navy page header used at the top of every inner page. */
export function PageHero({ eyebrow, title, lead, image }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      {image && (
        <>
          <Image
            src={image.src}
            blurDataURL={image.blurDataURL}
            placeholder={image.blurDataURL ? "blur" : "empty"}
            alt=""
            fill
            preload
            sizes="100vw"
            className="-z-20 object-cover grayscale-[40%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(15_28_46/0.97)_0%,rgb(15_28_46/0.9)_50%,rgb(15_28_46/0.62)_100%)]"
          />
        </>
      )}
      <Container className="pt-36 pb-16 sm:pt-44 sm:pb-24">
        <div className="max-w-3xl">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[4rem]">{title}</h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-[1.1875rem]">
              {lead}
            </p>
          )}
        </div>
      </Container>
      <div
        aria-hidden="true"
        className="h-px bg-linear-to-r from-gold-500/70 via-gold-500/20 to-transparent"
      />
    </section>
  );
}
