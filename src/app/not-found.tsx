import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { mainNav, routes } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="bg-navy-900 text-white">
      <Container className="flex min-h-[80svh] flex-col justify-center pt-36 pb-20 sm:pt-44">
        <Eyebrow tone="dark">Error 404</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[4rem]">
          This page could not be found.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">
          The link may be out of date, or the page may have moved. You can head back to the homepage
          or go straight to one of the main sections below.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={routes.home} arrow>
            Back to Homepage
          </ButtonLink>
          <ButtonLink href={routes.contact} variant="outline-light">
            Contact Us
          </ButtonLink>
        </div>

        <nav aria-label="Main sections" className="mt-16 border-t border-white/15 pt-6">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-mist transition-colors hover:text-gold-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
