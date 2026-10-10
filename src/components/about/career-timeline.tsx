import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { careerStages } from "@/content/about";
import { cn } from "@/lib/cn";

export function CareerTimeline() {
  const total = careerStages.length;

  return (
    <section className="py-20 lg:py-32">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            <Eyebrow>Career Timeline</Eyebrow>
            <h2 className="mt-5 text-[2rem] leading-[1.14] text-navy-900 sm:text-4xl lg:text-5xl">
              Canadian Professional Experience
            </h2>
          </div>
          <p className="max-w-xl text-slate lg:justify-self-end">
            Five stages, each building on the last: from supporting claims teams to managing claims
            in the field, and now advising businesses on risk.
          </p>
        </Reveal>

        {/* The gold rail draws down as the timeline scrolls into view. */}
        <Reveal as="ol" className="group relative mt-14 lg:mt-20">
          <span
            aria-hidden="true"
            className="absolute top-7 bottom-7 left-7 w-px bg-line sm:left-9"
          >
            <span className="absolute inset-0 origin-top scale-y-0 bg-gold-500 transition-transform duration-[2000ms] ease-(--ease-soft) group-data-[reveal=shown]:scale-y-100" />
          </span>

          {careerStages.map((stage, index) => {
            const current = index === total - 1;
            return (
              <li
                key={stage.role}
                className="relative grid grid-cols-[3.5rem_1fr] gap-x-5 pb-8 last:pb-0 sm:grid-cols-[4.5rem_1fr] sm:gap-x-8 sm:pb-10"
              >
                <span
                  className={cn(
                    "relative grid size-14 place-items-center rounded-full border font-serif text-xl sm:size-[4.5rem] sm:text-2xl",
                    current
                      ? "border-navy-900 bg-navy-900 text-gold-500"
                      : "border-gold-500 bg-white text-gold-700",
                  )}
                >
                  {index + 1}
                </span>

                <article
                  className={cn(
                    "border p-6 sm:p-8 lg:grid lg:grid-cols-[3fr_2fr] lg:gap-10",
                    current ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white",
                  )}
                >
                  <div>
                    <p
                      className={cn(
                        "text-xs font-semibold tracking-[0.16em] uppercase",
                        current ? "text-gold-500" : "text-gold-700",
                      )}
                    >
                      Stage {index + 1} of {total}
                      {current && " · Today"}
                    </p>
                    <h3
                      className={cn(
                        "mt-3 text-2xl leading-snug sm:text-[1.75rem]",
                        !current && "text-navy-900",
                      )}
                    >
                      {stage.role}
                    </h3>
                    <p className={cn("mt-3", current ? "text-mist" : "text-slate")}>
                      {stage.summary}
                    </p>
                  </div>
                  <ul
                    className={cn(
                      "mt-6 space-y-2.5 border-t pt-6 text-[0.9375rem] lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8",
                      current ? "border-white/15" : "border-line",
                    )}
                  >
                    {stage.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <Check
                          aria-hidden="true"
                          strokeWidth={2}
                          className={cn(
                            "mt-1 size-4 shrink-0",
                            current ? "text-gold-500" : "text-gold-700",
                          )}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </Reveal>

        <p className="mt-12 border-y border-line py-6 text-center font-serif text-xl text-navy-900 sm:text-2xl">
          More than <span className="text-gold-700">9 years</span> of Canadian insurance experience
        </p>
      </Container>
    </section>
  );
}
