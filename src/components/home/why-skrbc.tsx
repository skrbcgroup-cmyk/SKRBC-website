import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const reasons = [
  {
    title: "Canadian Experience",
    text: "Professional experience gained in Canada's insurance and property-claims industry.",
  },
  {
    title: "Practical Approach",
    text: "Recommendations based on real-world business and operational considerations.",
  },
  {
    title: "Risk-Focused",
    text: "Identifying potential problems before they become larger business issues.",
  },
  {
    title: "International Perspective",
    text: "Canadian professional experience combined with an understanding of the Pakistani business environment.",
  },
  {
    title: "Customized Solutions",
    text: "Recommendations based on the specific needs and circumstances of each client.",
  },
  {
    title: "Professional & Confidential",
    text: "Client information and business matters are handled professionally.",
  },
];

export function WhySkrbc() {
  return (
    <section className="py-20 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Why SKRBC</Eyebrow>
          <h2 className="mt-5 text-[2rem] leading-[1.14] text-navy-900 sm:text-4xl lg:text-5xl">
            What sets SKRBC apart.
          </h2>
          <p className="mt-6 max-w-md text-slate">
            Experience earned in a demanding industry, applied with care to the realities of doing
            business in Pakistan.
          </p>
        </Reveal>

        <ol className="border-b border-line">
          {reasons.map((reason, index) => (
            <Reveal
              as="li"
              key={reason.title}
              className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-7 sm:grid-cols-[4.5rem_1fr] sm:py-8"
            >
              <span aria-hidden="true" className="font-serif text-xl text-gold-700 sm:text-2xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[1.375rem] leading-snug text-navy-900 sm:text-2xl">
                  {reason.title}
                </h3>
                <p className="mt-2 text-slate">{reason.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
