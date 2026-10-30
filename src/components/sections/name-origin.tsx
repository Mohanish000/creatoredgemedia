import { Reveal } from "@/components/ui/reveal";
import { MappingLines } from "@/components/sections/mapping-lines";

const dim = "text-ink-2/60";

export function NameOrigin() {
  return (
    <section
      id="name"
      aria-labelledby="name-title"
      className="border-b border-edge py-[clamp(4rem,8vw,7rem)]"
    >
      <div className="container-edge">
        <Reveal>
          <p className="label text-center text-ink-2">Where our name comes from</p>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 sm:gap-6">
          <Reveal direction="left">
            <p className="rounded-lg border border-edge bg-bg-2/40 px-4 py-6 text-center font-display text-h3 font-semibold whitespace-nowrap">
              <span className="rounded bg-creator/15 px-1.5 text-creator">Creator</span>
              <span className={dim}>Rise Media</span>
            </p>
          </Reveal>
          <Reveal direction="right">
            <p className="rounded-lg border border-edge bg-bg-2/40 px-4 py-6 text-center font-display text-h3 font-semibold whitespace-nowrap">
              <span className={dim}>Campus</span>
              <span className="rounded bg-campus/15 px-1.5 text-campus">Edge</span>
              <span className={dim}> Media</span>
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-4xl py-2">
          <MappingLines />
        </div>

        <Reveal delay={0.1}>
          <h2
            id="name-title"
            className="text-center font-display text-h2 font-semibold text-balance"
          >
            <span className="text-creator">Creator</span> <span className="text-campus">Edge</span>{" "}
            Media
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-6 max-w-xl text-center text-body text-ink-2">
            Our name comes from both agencies: Creator from CreatorRise Media, Edge from CampusEdge
            Media.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
