import { AGENCIES } from "@/data/agencies";
import { creators } from "@/data/creators";
import { creatorsForAgency } from "@/lib/content-guards";
import { AnimatedDivider } from "@/components/ui/animated-divider";
import { SectionHeading } from "@/components/ui/section-heading";
import { CreatorShowcase } from "@/components/creators/creator-showcase";

export function CreatorsSplit() {
  const creator = AGENCIES["creator-edge"];
  const campus = AGENCIES["campus-edge"];

  return (
    <section aria-label="Creators" className="section-y">
      <div className="container-edge">
        <div className="grid gap-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-10 xl:gap-14">
          <div
            id={creator.anchorId}
            aria-label={`${creator.shortName} creators`}
            className="scroll-mt-20"
          >
            <SectionHeading size="md" eyebrow={`01 / ${creator.name}`} accent="creator" />
            <CreatorShowcase
              creators={creatorsForAgency(creators, "creator-edge")}
              theme="creator"
              label={`${creator.shortName} creators`}
            />
          </div>

          <div aria-hidden className="relative hidden w-px lg:block">
            <div className="absolute inset-0 opacity-70 blur-[6px]">
              <AnimatedDivider gradient className="h-full" />
            </div>
            <AnimatedDivider gradient className="relative h-full" />
          </div>
          <div aria-hidden className="relative lg:hidden">
            <div className="absolute inset-0 opacity-70 blur-[4px]">
              <AnimatedDivider orientation="horizontal" gradient />
            </div>
            <AnimatedDivider orientation="horizontal" gradient className="relative" />
          </div>

          <div
            id={campus.anchorId}
            aria-label={`${campus.shortName} creators`}
            className="scroll-mt-20"
          >
            <SectionHeading
              size="md"
              eyebrow={`02 / ${campus.name}`}
              accent="campus"
              align="right"
              reveal="right"
            />
            <CreatorShowcase
              creators={creatorsForAgency(creators, "campus-edge")}
              theme="campus"
              label={`${campus.shortName} creators`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
