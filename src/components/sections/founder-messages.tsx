import type { Founder } from "@/types/content";
import { AGENCIES } from "@/data/agencies";
import { founderByAgency } from "@/data/founders";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { MediaImage } from "@/components/ui/media-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedDivider } from "@/components/ui/animated-divider";
import { CreatorSocialLinks } from "@/components/creators/creator-social-links";

function MessageRow({ founder, flip }: { founder: Founder; flip: boolean }) {
  const agency = AGENCIES[founder.agency];
  const creator = founder.agency === "creator-edge";
  const accentText = creator ? "text-creator" : "text-campus";
  const accentBg = creator ? "bg-creator" : "bg-campus";

  return (
    <div
      className={cn(
        "grid items-start gap-10 lg:grid-cols-12 lg:gap-8",
        flip && "lg:[&>*:first-child]:order-2",
      )}
    >
      <Reveal
        direction={flip ? "right" : "left"}
        className={cn(
          "w-full max-w-xs lg:col-span-4",
          flip ? "lg:col-start-9 lg:max-w-none lg:-mt-10" : "lg:col-start-1 lg:mt-16 lg:max-w-none",
        )}
      >
        <div className="relative">
          <div
            className={cn(
              "relative aspect-[4/5] w-full overflow-hidden bg-bg-2",
              flip ? "rounded-b-[999px]" : "rounded-t-[999px]",
            )}
          >
            <MediaImage image={founder.image} sizes="(min-width: 1024px) 30vw, 320px" />
          </div>
        </div>
      </Reveal>

      <div
        className={cn("lg:col-span-7", flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-6")}
      >
        <Reveal delay={0.05}>
          <p className={cn("label flex items-center gap-3", accentText)}>
            <span aria-hidden className={cn("h-px w-8", accentBg)} />
            {agency.name}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="mt-6">
            <p className="font-serif text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[1.12] text-balance text-ink">
              &ldquo;{founder.message.text}&rdquo;
            </p>
          </blockquote>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div>
              <p className="font-serif text-2xl text-ink italic">{founder.name}</p>
              <p className="label mt-1 text-ink-2">{founder.title}</p>
            </div>
            <CreatorSocialLinks creator={founder} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export function FounderMessagesSection() {
  const creator = founderByAgency["creator-edge"];
  const campus = founderByAgency["campus-edge"];
  if (!creator || !campus) return null;

  return (
    <section id="messages" aria-labelledby="messages-title" className="section-y">
      <div className="container-edge">
        <SectionHeading
          id="messages-title"
          eyebrow="Founder messages"
          title="Built Around People. Driven by Possibility."
        />
        <div className="mt-16 sm:mt-24">
          <MessageRow founder={creator} flip={false} />
          <div className="my-16 sm:my-24">
            <AnimatedDivider orientation="horizontal" gradient />
          </div>
          <MessageRow founder={campus} flip />
        </div>
      </div>
    </section>
  );
}
