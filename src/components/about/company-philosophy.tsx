import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { principles } from "@/content/about";

export function CompanyPhilosophy() {
  return (
    <section className="bg-navy-900 py-20 text-white lg:py-32">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow tone="dark">Our Philosophy</Eyebrow>
          <h2 className="mt-5 text-[2rem] leading-[1.14] sm:text-4xl lg:text-5xl">
            The principles behind our work.
          </h2>
        </Reveal>

        <Reveal
          as="ul"
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8"
        >
          {principles.map((principle, index) => (
            <li key={principle.title} className="border-t border-gold-500 pt-6">
              <span aria-hidden="true" className="font-serif text-lg text-gold-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-2xl">{principle.title}</h3>
              <p className="mt-3 text-mist">{principle.text}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
