import type { ReactNode } from "react";
import type { Creator } from "@/types/content";
import { cn } from "@/lib/utils";
import { safeExternalUrl } from "@/lib/links";
import { InstagramIcon, YouTubeIcon } from "@/components/ui/social-icons";

interface Props {
  creator: Pick<Creator, "name" | "youtubeUrl" | "instagramUrl">;
  /** Always show both icons; a missing link renders as a dimmed, non-clickable icon. */
  showAll?: boolean;
}

const linkClass =
  "grid size-11 place-items-center rounded-full border border-edge text-ink-2 transition-colors hover:border-ink hover:text-ink";
const missingClass =
  "grid size-11 place-items-center rounded-full border border-edge/50 text-ink-2/30";

interface IconProps {
  url: string | undefined;
  name: string;
  network: "YouTube" | "Instagram";
  icon: ReactNode;
  showAll?: boolean;
}

function SocialIcon({ url, name, network, icon, showAll }: IconProps) {
  if (!url) {
    if (!showAll) return null;
    return (
      <li>
        <span
          className={cn(missingClass)}
          role="img"
          aria-label={`${name} ${network} not available`}
        >
          {icon}
        </span>
      </li>
    );
  }
  return (
    <li>
      <a href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {icon}
        <span className="sr-only">
          Visit {name} on {network} (opens in a new tab)
        </span>
      </a>
    </li>
  );
}

/** Icons render as links only for URLs that pass validation; with `showAll`, missing ones render dimmed. */
export function CreatorSocialLinks({ creator, showAll }: Props) {
  const youtube = safeExternalUrl(creator.youtubeUrl);
  const instagram = safeExternalUrl(creator.instagramUrl);
  if (!youtube && !instagram && !showAll) return null;

  return (
    <ul className="flex shrink-0 items-center justify-center gap-2">
      <SocialIcon
        url={youtube}
        name={creator.name}
        network="YouTube"
        icon={<YouTubeIcon className="size-4" />}
        showAll={showAll}
      />
      <SocialIcon
        url={instagram}
        name={creator.name}
        network="Instagram"
        icon={<InstagramIcon className="size-4" />}
        showAll={showAll}
      />
    </ul>
  );
}
