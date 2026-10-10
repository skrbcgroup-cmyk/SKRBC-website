import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/text-link";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { serviceAreas } from "@/content/about";

export function CompanyProfile() {
  return (
    <section className="py-20 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-[7fr_5fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Who We Are</Eyebrow>
          <h2 className="mt-5 text-[2rem] leading-[1.14] text-navy-900 sm:text-4xl lg:text-[2.75rem]">
            About SK Risk &amp; Business Consulting
          </h2>
          <div className="mt-8 space-y-5 text-lg text-slate">
            <p>
              {siteConfig.legalName} is a Pakistan-based consulting company in Rawalpindi. We help
              businesses identify risks, improve operations, make informed decisions and develop
              practical strategies for sustainable growth.
            </p>
            <p>
              The company was established to bring professional experience gained in Canada&apos;s
              insurance and property-claims industry to businesses in Pakistan. That experience
              comes from real losses, real documentation and real decisions, and it shapes how we
              work with every client.
            </p>
            <p>
              Our focus is on practical solutions rather than theoretical advice. Every
              recommendation is meant to be understood, put into practice and used in the day-to-day
              running of the business.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="self-start border-t-2 border-gold-500 bg-ivory p-8 sm:p-10">
          <h3 className="text-2xl text-navy-900">What we do</h3>
          <ul className="mt-6">
            {serviceAreas.map((area) => (
              <li
                key={area}
                className="relative border-b border-line py-3 pl-6 text-ink before:absolute before:top-[1.45rem] before:left-0 before:h-px before:w-2.5 before:bg-gold-500 last:border-b-0"
              >
                {area}
              </li>
            ))}
          </ul>
          <TextLink href={routes.services} className="mt-4">
            Explore our services
          </TextLink>
        </Reveal>
      </Container>
    </section>
  );
}
