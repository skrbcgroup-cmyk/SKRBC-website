import { CountUp } from "@/components/motion/count-up";
import { Container } from "@/components/ui/container";

export function StatsStrip() {
  return (
    <section aria-label="Key facts" className="bg-navy-800 text-white">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          <div className="border-white/10 py-7 pr-4 lg:py-9 lg:pr-8">
            <dt className="sr-only">Experience</dt>
            <dd className="font-serif text-4xl leading-none text-gold-500 lg:text-[2.75rem]">
              <CountUp value={9} />+
            </dd>
            <dd className="mt-3 text-sm leading-snug text-mist">
              Years of Canadian insurance &amp; claims experience
            </dd>
          </div>
          <div className="border-l border-white/10 py-7 pl-4 lg:px-8 lg:py-9">
            <dt className="sr-only">Claims roles</dt>
            <dd className="font-serif text-4xl leading-none text-gold-500 lg:text-[2.75rem]">
              Multiple
            </dd>
            <dd className="mt-3 text-sm leading-snug text-mist">
              Claims roles: claims support, desk adjusting and catastrophe claims
            </dd>
          </div>
          <div className="border-t border-white/10 py-7 pr-4 lg:border-t-0 lg:border-l lg:px-8 lg:py-9">
            <dt className="sr-only">Services</dt>
            <dd className="font-serif text-4xl leading-none text-gold-500 lg:text-[2.75rem]">
              <CountUp value={7} />
            </dd>
            <dd className="mt-3 text-sm leading-snug text-mist">Consulting service areas</dd>
          </div>
          <div className="border-t border-l border-white/10 py-7 pl-4 lg:border-t-0 lg:px-8 lg:py-9">
            <dt className="sr-only">Perspective</dt>
            <dd className="font-serif text-4xl leading-none text-gold-500 lg:text-[2.75rem]">
              CA · PK
            </dd>
            <dd className="mt-3 text-sm leading-snug text-mist">
              International perspective: Canada and Pakistan
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
