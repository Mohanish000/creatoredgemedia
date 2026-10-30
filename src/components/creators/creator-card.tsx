import type { Creator } from "@/types/content";
import { cn } from "@/lib/utils";
import { MediaImage } from "@/components/ui/media-image";
import { CreatorSocialLinks } from "@/components/creators/creator-social-links";

export type CardTheme = "creator" | "campus";

interface Props {
  creator: Creator;
  theme: CardTheme;
}

const themeStyles = {
  creator: {
    text: "text-creator",
    border: "hover:border-creator/60",
    ring: "ring-creator/70 group-hover:ring-creator",
  },
  campus: {
    text: "text-campus",
    border: "hover:border-campus/60",
    ring: "ring-campus/70 group-hover:ring-campus",
  },
} as const;

export function CreatorCard({ creator, theme }: Props) {
  const styles = themeStyles[theme];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col items-center rounded-lg border border-edge bg-bg-2/40 px-3 py-6 text-center transition-colors duration-500 sm:px-4",
        styles.border,
      )}
    >
      <div
        className={cn(
          "relative size-24 shrink-0 overflow-hidden rounded-full bg-bg-2 ring-2 ring-offset-2 ring-offset-bg transition-shadow duration-500 sm:size-28",
          styles.ring,
        )}
      >
        <MediaImage
          image={creator.image}
          sizes="112px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
      <div className="mt-4 min-w-0">
        <h3 className="font-display text-creator-name font-bold text-balance">{creator.name}</h3>
        {creator.category ? (
          <p className={cn("label mt-1.5", styles.text)}>{creator.category}</p>
        ) : null}
        {creator.shortBio ? <p className="label mt-1.5 text-ink-2">{creator.shortBio}</p> : null}
      </div>
      <div className="mt-auto flex justify-center pt-4">
        <CreatorSocialLinks creator={creator} showAll />
      </div>
    </article>
  );
}
