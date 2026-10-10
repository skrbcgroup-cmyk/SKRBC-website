"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/config/site";

/** Shown when a page fails to render. The header and footer stay in place. */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-navy-900 text-white">
      <Container className="flex min-h-[80svh] flex-col justify-center pt-36 pb-20 sm:pt-44">
        <title>Something went wrong | SKRBC</title>
        <Eyebrow tone="dark">Something went wrong</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[4rem]">
          This page could not be loaded.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">
          A temporary problem stopped this page from loading. Please try again. If it keeps
          happening, you can still reach us on WhatsApp.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-xs bg-gold-500 px-6 text-[0.9375rem] font-medium text-navy-900 transition-colors hover:bg-gold-400"
          >
            <RotateCcw aria-hidden="true" strokeWidth={1.75} className="size-4" />
            Try Again
          </button>
          <a
            href={siteConfig.contact.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xs border border-white/45 px-6 text-[0.9375rem] font-medium text-white transition-colors hover:border-gold-500 hover:text-gold-400"
          >
            <WhatsAppIcon className="size-[1.125rem]" />
            Message Us on WhatsApp
          </a>
        </div>
        {error.digest && <p className="mt-10 text-sm text-mist">Reference: {error.digest}</p>}
      </Container>
    </section>
  );
}
