import { AGENCIES } from "@/data/agencies";
import { services } from "@/data/services";
import type { AgencyId } from "@/types/content";
import { pad2 } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessTimeline } from "@/components/sections/process-timeline";

const COLUMNS: Array<{ agency: AgencyId; text: string; border: string }> = [
  { agency: "creator-edge", text: "text-creator", border: "border-creator/50" },
  { agency: "campus-edge", text: "text-campus", border: "border-campus/50" },
];

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="container-edge">
        <SectionHeading
          id="services-title"
          eyebrow="Services offered"
          title="From Creator Discovery to Campus Impact."
        />

        <div className="mt-16 grid gap-16 sm:mt-24 lg:grid-cols-2 lg:gap-0">
          {COLUMNS.map(({ agency, text, border }, column) => {
            const items = services.filter((s) => s.agency === agency);
            return (
              <div
                key={agency}
                className={column === 1 ? "lg:border-l lg:border-divider lg:pl-14" : "lg:pr-14"}
              >
                <Reveal>
                  <div className={`border-b pb-4 ${border}`}>
                    <p className={`label ${text}`}>{AGENCIES[agency].name}</p>
                    <p className="mt-1 text-ink-2">We can help with…</p>
                  </div>
                </Reveal>
                <ol>
                  {items.map((service, i) => (
                    <Reveal as="li" key={service.id} delay={i * 0.05}>
                      <div className="grid grid-cols-[3.25rem_1fr] gap-x-4 border-b border-edge py-7">
                        <span aria-hidden className={`font-display text-h3 ${text}`}>
                          {pad2(i + 1)}
                        </span>
                        <div>
                          <h3 className="font-display text-h3 font-semibold text-balance">
                            {service.title}
                          </h3>
                          <p className="mt-2 max-w-md text-ink-2">{service.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>

        <div className="mt-24 sm:mt-36">
          <Reveal>
            <p className="label text-ink-2">How we work</p>
            <h3 className="mt-4 mb-14 max-w-2xl font-display text-h2 font-semibold text-balance">
              Five steps, one connected line.
            </h3>
          </Reveal>
          <ProcessTimeline />
        </div>
      </div>
    </section>
  );
}
