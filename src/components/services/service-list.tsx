import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { routes } from "@/config/navigation";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

/** Jump links to each service, so visitors can go straight to what they need. */
export function ServiceIndex() {
  return (
    <nav aria-label="Services on this page" className="border-b border-line bg-ivory">
      <Container>
        <ul className="flex flex-wrap gap-x-7 gap-y-1 py-5">
          {services.map((service) => (
            <li key={service.id}>
              <a
                href={`#${service.id}`}
                className="inline-flex min-h-11 items-center text-[0.9375rem] text-slate transition-colors hover:text-navy-900"
              >
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}

export function ServiceList() {
  return (
    <section aria-label="Service areas" className="py-8 lg:py-16">
      <Container>
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Reveal
              as="article"
              key={service.id}
              className={cn(
                "grid gap-10 py-14 lg:grid-cols-[5fr_6fr] lg:gap-20 lg:py-20",
                index > 0 && "border-t border-line",
              )}
            >
              {/* The id lives on an inner element so the anchor target is never hidden by Reveal. */}
              <div id={service.id} className="scroll-mt-28">
                <div className="flex items-center gap-5">
                  <span className="grid size-16 shrink-0 place-items-center border border-gold-500/60 text-gold-700">
                    <Icon aria-hidden="true" strokeWidth={1.25} className="size-8" />
                  </span>
                  <span className="font-serif text-lg text-slate">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(services.length).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-7 text-[1.875rem] leading-tight text-navy-900 sm:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-5 text-lg text-slate">{service.description}</p>
                <div className="mt-8">
                  {service.href ? (
                    <ButtonLink href={service.href} variant="outline-dark" arrow>
                      Learn More
                    </ButtonLink>
                  ) : (
                    <ButtonLink href={routes.contact} variant="outline-dark" arrow>
                      Discuss Your Requirements
                    </ButtonLink>
                  )}
                </div>
              </div>

              <div className="lg:pt-2">
                <h3 className="font-sans text-xs font-semibold tracking-[0.16em] text-gold-700 uppercase">
                  Key services
                </h3>
                <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                  {service.keyServices.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-line py-3.5 text-ink">
                      <Check
                        aria-hidden="true"
                        strokeWidth={2}
                        className="mt-1 size-4 shrink-0 text-gold-700"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </Container>
    </section>
  );
}
