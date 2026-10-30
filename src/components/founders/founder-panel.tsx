import type { Founder } from "@/types/content";
import { ArrowRight } from "lucide-react";
import { AGENCIES } from "@/data/agencies";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { MediaImage } from "@/components/ui/media-image";
import { ParallaxImage } from "@/components/ui/parallax-image";

interface Props {
  founder: Founder;
  side: "left" | "right";
}

function Message({ founder, align }: { founder: Founder; align: "left" | "right" }) {
  return (
    <>
      <Reveal delay={0.24}>
        <blockquote className={cn("mt-6 max-w-md", align === "right" && "sm:ml-auto")}>
          <p className="font-serif text-xl leading-snug text-ink sm:text-2xl">
            &ldquo;{founder.message.text}&rdquo;
          </p>
        </blockquote>
      </Reveal>
    </>
  );
}

/** Full-bleed portrait with the text anchored bottom-left (CreatorRise) or bottom-right (CampusEdge). */
export function FounderPanel({ founder, side }: Props) {
  const agency = AGENCIES[founder.agency];
  const left = side === "left";

  return (
    <div className="relative flex min-h-[40rem] lg:min-h-svh">
      <div className="absolute inset-0">
        <ParallaxImage range={40}>
          <MediaImage image={founder.image} sizes="(min-width: 1024px) 50vw, 100vw" />
        </ParallaxImage>
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/10" />
      <div
        className={cn(
          "relative mt-auto w-full pb-14 lg:pb-20",
          left
            ? "px-[max(var(--gutter),env(safe-area-inset-left))] lg:pr-12"
            : "px-[max(var(--gutter),env(safe-area-inset-right))] sm:text-right lg:pl-12",
        )}
      >
        <Reveal>
          <p
            className={cn(
              "label flex items-center gap-3",
              left ? "text-creator" : "text-campus sm:justify-end",
            )}
          >
            {left ? <span aria-hidden className="h-px w-8 bg-creator" /> : null}
            {agency.name}
            {left ? null : <span aria-hidden className="h-px w-8 bg-campus" />}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="mt-4 font-display text-founder-name font-semibold">{founder.name}</h3>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-2 text-body text-ink-2">{founder.title}</p>
        </Reveal>
        <Message founder={founder} align={left ? "left" : "right"} />
        <Reveal delay={0.32}>
          <a
            href={`#${agency.anchorId}`}
            className={cn(
              "link-underline mt-7 inline-flex min-h-11 items-center gap-2 text-nav font-medium",
              left ? "text-creator" : "text-campus",
            )}
          >
            Meet {agency.shortName} creators <ArrowRight aria-hidden className="size-4" />
          </a>
        </Reveal>
      </div>
    </div>
  );
}
