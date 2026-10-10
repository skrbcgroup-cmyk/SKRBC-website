import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { canadianExpertise } from "@/content/insurance-claims";

/** The founder's ten areas of Canadian insurance and claims expertise (spec section 17). */
export function CanadianExpertise() {
  return (
    <section className="bg-navy-900 py-20 text-white lg:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow tone="dark">Canadian Experience</Eyebrow>
          <h2 className="mt-5 text-[2rem] leading-[1.14] sm:text-4xl lg:text-5xl">
            {canadianExpertise.title}
          </h2>
          <p className="mt-6 text-lg text-mist">{canadianExpertise.intro}</p>
        </Reveal>

        <ol className="mt-14 grid gap-x-16 md:grid-cols-2 lg:mt-20">
          {canadianExpertise.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              className="grid grid-cols-[2.75rem_1fr] gap-x-4 border-t border-white/12 py-8"
            >
              <span aria-hidden="true" className="font-serif text-lg text-gold-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[1.375rem] leading-snug">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
