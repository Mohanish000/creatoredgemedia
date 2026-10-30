import type { Creator } from "@/types/content";
import { stagger } from "@/lib/motion";
import { Reveal } from "@/components/ui/reveal";
import { CreatorCard, type CardTheme } from "@/components/creators/creator-card";

interface Props {
  creators: Creator[];
  theme: CardTheme;
}

export function CreatorGrid({ creators, theme }: Props) {
  const direction = theme === "creator" ? "left" : "right";

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4">
      {creators.map((creator, i) => (
        <Reveal
          as="li"
          key={creator.id}
          direction={direction}
          delay={(i % 2) * stagger.cards}
          className="h-full"
        >
          <CreatorCard creator={creator} theme={theme} />
        </Reveal>
      ))}
    </ul>
  );
}
