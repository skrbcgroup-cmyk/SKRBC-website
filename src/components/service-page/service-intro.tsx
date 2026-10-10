import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

type ServiceIntroProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  aside: { title: string; items: string[] };
};

/** Opening section of a service page: what the service means, plus a short summary card. */
export function ServiceIntro({ eyebrow, title, paragraphs, aside }: ServiceIntroProps) {
  return (
    <section className="py-20 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-[7fr_5fr] lg:gap-20">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 text-[2rem] leading-[1.14] text-navy-900 sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <div className="mt-8 space-y-5 text-lg text-slate">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="self-start border-t-2 border-gold-500 bg-ivory p-8 sm:p-10">
          <h3 className="text-2xl text-navy-900">{aside.title}</h3>
          <ul className="mt-6">
            {aside.items.map((item) => (
              <li
                key={item}
                className="relative border-b border-line py-3 pl-6 text-ink before:absolute before:top-[1.45rem] before:left-0 before:h-px before:w-2.5 before:bg-gold-500 last:border-b-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
