import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedDivider } from "@/components/ui/animated-divider";

const NODES = ["top-[12%]", "top-1/2", "top-[88%]"] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-y border-t border-edge bg-bg-2"
    >
      <div className="container-edge">
        <SectionHeading
          id="about-title"
          eyebrow="About both agencies"
          title="Two Perspectives. One Connected Ecosystem."
        />

        <div className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">
          <Reveal direction="left">
            <p className="label text-creator">The creator side</p>
            <h3 className="mt-4 font-display text-h3 font-semibold text-balance">
              Voices that students already trust.
            </h3>
            <p className="mt-5 max-w-md text-body text-ink-2">
              CreatorRise Media works with education creators, their content, and the collaborations
              around them, so the right ideas can find the right partners.
            </p>
          </Reveal>

          <div className="relative lg:min-h-[22rem]">
            <div className="lg:hidden">
              <AnimatedDivider orientation="horizontal" gradient />
            </div>
            <div className="hidden h-full lg:block">
              <AnimatedDivider orientation="vertical" gradient trigger="scroll" />
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
              {NODES.map((position, i) => (
                <Reveal
                  key={position}
                  delay={0.2 + i * 0.25}
                  direction="none"
                  className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 ${position}`}
                >
                  <span
                    className={`block size-3.5 rounded-full border bg-bg-2 ${
                      i === 0 ? "border-creator" : i === 2 ? "border-campus" : "border-ink"
                    }`}
                  />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal direction="right">
            <p className="label text-campus">The campus side</p>
            <h3 className="mt-4 font-display text-h3 font-semibold text-balance">
              Campuses worth seeing for yourself.
            </h3>
            <p className="mt-5 max-w-md text-body text-ink-2">
              CampusEdge Media works on campus visibility and college promotion, connecting
              institutions with education audiences who are looking for what they offer.
            </p>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-20 max-w-3xl text-center sm:mt-28">
          <p className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-snug text-balance">
            Different starting points, one shared direction: helping education reach the people it
            is meant for.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
