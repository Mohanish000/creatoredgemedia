import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export const dynamic = "force-static";

// Absolute URLs need a real domain. Without NEXT_PUBLIC_SITE_URL the sitemap is empty rather than guessed.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE.url) return [];
  return [{ url: `${SITE.url}/`, changeFrequency: "monthly", priority: 1 }];
}
