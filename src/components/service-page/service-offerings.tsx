import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

type ServiceOfferingsProps = {
  eyebrow: string;
  title: string;
  intro: string;
  items: string[];
};

/** Numbered list of what a service can include, laid out as a hairline grid. */
export function ServiceOfferings({ eyebrow, title, intro, items }: ServiceOfferingsProps) {
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
          className="mt-12 grid border-t border-l border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {items.map((item, index) => (
            <li
              key={item}
              className="flex items-baseline gap-5 border-r border-b border-line bg-ivory px-6 py-6 sm:px-8 sm:py-7"
            >
              <span aria-hidden="true" className="font-serif text-[0.9375rem] text-gold-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-xl leading-snug text-navy-900">{item}</span>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
