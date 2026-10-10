import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routes, serviceNav } from "@/config/navigation";

type RelatedServicesProps = {
  /** The current page, left out of the list. */
  currentHref: string;
};

/** Links to the other dedicated service pages, for easy onward navigation. */
export function RelatedServices({ currentHref }: RelatedServicesProps) {
  const related = serviceNav.filter((service) => service.href !== currentHref);

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Related Services</Eyebrow>
            <h2 className="mt-5 text-[1.875rem] leading-tight text-navy-900 sm:text-4xl">
              Explore other services
            </h2>
          </div>
          <Link
            href={routes.services}
            className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-gold-700 hover:underline"
          >
            View all services
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {related.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="group flex h-full items-center justify-between gap-6 border border-line p-6 transition-colors duration-200 hover:border-navy-900 sm:p-7"
              >
                <span className="font-serif text-xl leading-snug text-navy-900">
                  {service.label}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-5 shrink-0 text-gold-700 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
