import Image from "next/image";

import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/content/images.generated";

export function ContactCta() {
  return (
    <section className="grid bg-ivory lg:grid-cols-2">
      <div className="relative min-h-72 lg:min-h-[32rem]">
        <Image
          src={siteImages.ctaDocumentReview.src}
          blurDataURL={siteImages.ctaDocumentReview.blurDataURL}
          alt="Consultant reviewing documents and notes at a desk"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover grayscale-[30%]"
        />
      </div>

      <Reveal className="flex flex-col justify-center px-4 py-16 sm:px-12 lg:px-16 lg:py-24 xl:px-24">
        <Eyebrow>Get in Touch</Eyebrow>
        <h2 className="mt-5 max-w-lg text-[2rem] leading-[1.14] text-navy-900 sm:text-4xl lg:text-[2.75rem]">
          Have a Business Risk or Consulting Challenge?
        </h2>
        <p className="mt-5 max-w-md text-lg text-slate">
          Let&apos;s discuss your business, identify potential risks and explore practical
          solutions.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={routes.contact} arrow>
            Request a Consultation
          </ButtonLink>
          <a
            href={siteConfig.contact.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xs border border-navy-900/30 px-6 text-[0.9375rem] font-medium text-navy-900 transition-colors hover:border-navy-900"
          >
            <WhatsAppIcon className="size-[1.125rem] text-[#1da851]" />
            Chat With Us on WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}
