import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

type FocusArea = { title: string; text: string; points: string[] };

type FocusAreasProps = {
  eyebrow: string;
  title: string;
  areas: FocusArea[];
};

/** Side-by-side cards explaining the parts of a combined service. */
export function FocusAreas({ eyebrow, title, areas }: FocusAreasProps) {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 text-[2rem] leading-[1.14] text-navy-900 sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">
          {areas.map((area, index) => (
            <Reveal
              key={area.title}
              delay={index * 120}
              className="border-t-2 border-gold-500 bg-ivory p-8 sm:p-10"
            >
              <h3 className="text-[1.75rem] leading-snug text-navy-900">{area.title}</h3>
              <p className="mt-4 text-lg text-slate">{area.text}</p>
              <ul className="mt-8 space-y-3 border-t border-line pt-6">
                {area.points.map((point) => (
                  <li key={point} className="flex gap-3 text-ink">
                    <Check
                      aria-hidden="true"
                      strokeWidth={2}
                      className="mt-1 size-4 shrink-0 text-gold-700"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
