import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const steps = [
  { name: "Understand", text: "Understand the client's business, objectives and concerns." },
  {
    name: "Assess",
    text: "Identify relevant business, operational, financial, security and strategic risks.",
  },
  { name: "Analyze", text: "Evaluate the risks and their potential impact." },
  { name: "Recommend", text: "Develop practical recommendations and risk mitigation strategies." },
  { name: "Support", text: "Provide ongoing advisory support where required." },
];

export function OurApproach() {
  return (
    <section className="bg-navy-900 py-20 text-white lg:py-32">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            <Eyebrow tone="dark">Our Approach</Eyebrow>
            <h2 className="mt-5 text-[2rem] leading-[1.14] sm:text-4xl lg:text-5xl">
              A clear, five-step process.
            </h2>
          </div>
          <p className="max-w-xl text-mist lg:justify-self-end">
            Every engagement follows the same disciplined method, so clients always know where
            things stand and what comes next.
          </p>
        </Reveal>

        {/* The gold line draws across (or down, on mobile) once the steps come into view. */}
        <Reveal
          as="ol"
          className="group relative mt-14 grid gap-0 lg:mt-20 lg:grid-cols-5 lg:gap-7"
        >
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-10 left-7 w-px bg-white/12 lg:top-7 lg:right-[calc((100%-7rem)/5-1.75rem)] lg:bottom-auto lg:left-7 lg:h-px lg:w-auto"
          >
            <span className="absolute inset-0 origin-top scale-y-0 bg-gold-500 transition-transform duration-[1600ms] ease-(--ease-soft) group-data-[reveal=shown]:scale-y-100 lg:origin-left lg:scale-x-0 lg:scale-y-100 lg:group-data-[reveal=shown]:scale-x-100" />
          </span>
          {steps.map((step, index) => (
            <li
              key={step.name}
              className="relative grid grid-cols-[3.5rem_1fr] gap-x-6 pb-10 lg:block lg:pb-0"
            >
              <span className="grid size-14 place-items-center rounded-full border border-gold-500 bg-navy-900 font-serif text-lg text-gold-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mt-3 text-[1.375rem] lg:mt-7">{step.name}</h3>
                <p className="mt-2 text-[0.9375rem] text-mist">{step.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
