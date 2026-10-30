import { SITE } from "@/data/site";
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from "@/components/ui/social-icons";

const ITEMS = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "youtube", label: "YouTube", Icon: YouTubeIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
] as const;

/** Icons render only for configured, validated HTTPS URLs. */
export function SocialLinks() {
  const items = ITEMS.flatMap(({ key, label, Icon }) => {
    const href = SITE.socials[key];
    return href ? [{ key, label, Icon, href }] : [];
  });
  if (items.length === 0) return null;

  return (
    <ul className="flex items-center gap-2">
      {items.map(({ key, label, Icon, href }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-11 place-items-center rounded-full border border-edge text-ink-2 transition-colors hover:border-ink hover:text-ink"
          >
            <Icon className="size-4" />
            <span className="sr-only">
              {SITE.name} on {label} (opens in a new tab)
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
