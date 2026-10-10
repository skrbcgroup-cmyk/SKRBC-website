import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { routes } from "@/config/navigation";
import { engagementSteps } from "@/content/services";

/** Consulting fees and how an engagement starts (spec section 18). */
export function FeesProcess() {
  return (
    <section className="bg-navy-900 py-20 text-white lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <Reveal>
          <Eyebrow tone="dark">Consulting Fees</Eyebrow>
          <h2 className="mt-5 text-[2rem] leading-[1.14] sm:text-4xl lg:text-5xl">
            Fees shaped by the work, not a price list.
          </h2>
          <p className="mt-6 max-w-md text-lg text-mist">
            Every business has different risks and requirements. Our consulting fees are tailored to
            the scope, complexity and duration of each engagement.
          </p>
          <ButtonLink href={routes.contact} arrow className="mt-10">
            Request a Consultation
          </ButtonLink>
        </Reveal>

        <Reveal delay={120}>
          <h3 className="font-sans text-xs font-semibold tracking-[0.16em] text-gold-500 uppercase">
            Our process
          </h3>
          <ol className="mt-6 border-t border-white/12">
            {engagementSteps.map((step, index) => (
              <li
                key={step}
                className="grid grid-cols-[3rem_1fr] items-baseline border-b border-white/12 py-5 sm:grid-cols-[4rem_1fr]"
              >
                <span aria-hidden="true" className="font-serif text-xl text-gold-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-xl sm:text-2xl">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
