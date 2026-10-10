import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { homeServices } from "@/content/services";

export function ServicesOverview() {
  return (
    <section className="bg-ivory py-20 lg:py-32">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="mt-5 text-[2rem] leading-[1.14] text-navy-900 sm:text-4xl lg:text-5xl">
              Advisory grounded in real-world experience.
            </h2>
          </div>
          <p className="max-w-xl text-slate lg:justify-self-end">
            From identifying risks before they become problems to improving day-to-day operations,
            every engagement is shaped around the client&apos;s business.
          </p>
        </Reveal>

        <Reveal
          as="ul"
          className="mt-12 grid border-t border-l border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {homeServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <li key={service.title} className="border-r border-b border-line">
                <Link
                  href={service.href}
                  className="group relative flex h-full flex-col bg-ivory p-7 transition-colors duration-300 before:absolute before:-top-px before:-left-px before:h-0.5 before:w-0 before:bg-gold-500 before:transition-[width] before:duration-500 before:ease-(--ease-soft) hover:bg-white hover:before:w-[calc(100%+2px)] sm:p-9"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <Icon aria-hidden="true" strokeWidth={1.25} className="size-9 text-gold-700" />
                    <span className="font-serif text-[0.9375rem] text-slate">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-2xl leading-snug text-navy-900">{service.title}</h3>
                  <p className="mt-3 mb-8 flex-1 text-[0.9375rem] text-slate">{service.summary}</p>
                  <span className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-gold-700">
                    Learn More
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
