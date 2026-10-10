import { Info } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

type ServiceOfferingsProps = {
  eyebrow: string;
  title: string;
  intro: string;
  items: string[];
  /** Optional clarification shown under the list, e.g. what the service is not. */
  note?: string;
};

/** Numbered list of what a service can include, laid out as a hairline grid. */
export function ServiceOfferings({ eyebrow, title, intro, items, note }: ServiceOfferingsProps) {
  // Three columns only when the rows fill evenly; otherwise two, so no row is left half empty.
  const threeColumns = items.length % 3 === 0;
  // With an odd count in a two-column grid, the last item spans the full row.
  const oddCount = items.length % 2 === 1;

  return (
    <section className="bg-ivory py-20 lg:py-32">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[2rem] leading-[1.14] text-navy-900 sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
          <p className="max-w-xl text-slate lg:justify-self-end">{intro}</p>
        </Reveal>

        <Reveal
          as="ul"
          className={cn(
            "mt-12 grid border-t border-l border-line sm:grid-cols-2 lg:mt-16",
            threeColumns && "lg:grid-cols-3",
          )}
        >
          {items.map((item, index) => (
            <li
              key={item}
              className={cn(
                "flex items-baseline gap-5 border-r border-b border-line bg-ivory px-6 py-6 sm:px-8 sm:py-7",
                oddCount && "sm:last:col-span-2",
                oddCount && threeColumns && "lg:last:col-span-1",
              )}
            >
              <span aria-hidden="true" className="font-serif text-[0.9375rem] text-gold-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-xl leading-snug text-navy-900">{item}</span>
            </li>
          ))}
        </Reveal>

        {note && (
          <p className="mt-8 flex gap-3 border-l-2 border-gold-500 bg-white px-5 py-4 text-[0.9375rem] text-ink">
            <Info
              aria-hidden="true"
              strokeWidth={1.75}
              className="mt-0.5 size-5 shrink-0 text-gold-700"
            />
            {note}
          </p>
        )}
      </Container>
    </section>
  );
}
