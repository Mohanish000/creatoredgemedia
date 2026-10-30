import { safeExternalUrl, isValidEmail, normalisePhone } from "@/lib/links";

// NEXT_PUBLIC_* must be referenced literally so Next can inline them at build time.
const siteUrl = safeExternalUrl(process.env.NEXT_PUBLIC_SITE_URL);

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export const SITE = {
  name: "Creatoredge Media",
  tagline: "Creators Rise. Campuses Shine.",
  description:
    "Creatoredge Media brings together CreatorRise, for education creators, and CampusEdge, for campus visibility and college promotion: two connected agencies in the education creator ecosystem.",
  /** Origin without trailing slash, or undefined when no production domain is configured. */
  url: siteUrl ? new URL(siteUrl).origin : undefined,
  contact: {
    email: isValidEmail(email) ? email.trim() : undefined,
    whatsapp: normalisePhone(whatsapp) ? whatsapp : undefined,
  },
  socials: {
    instagram: safeExternalUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    youtube: safeExternalUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL),
    linkedin: safeExternalUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  },
} as const;

/** Dev/preview-only surfaces: placeholder brands and the contact placeholder. Hidden in production builds. */
export const SHOW_DEV_PLACEHOLDERS =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_DEV_PLACEHOLDERS === "true";
