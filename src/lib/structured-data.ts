import { SITE } from "@/data/site";
import { founders } from "@/data/founders";

/** Organization JSON-LD containing only fields we can verify. Unset fields are omitted, never guessed. */
export function organizationJsonLd() {
  const sameAs = Object.values(SITE.socials).filter((url): url is string => Boolean(url));
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    description: SITE.description,
    ...(SITE.url ? { url: SITE.url } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(SITE.contact.email ? { email: SITE.contact.email } : {}),
    founder: founders.map((f) => ({ "@type": "Person", name: f.name })),
  };
}
