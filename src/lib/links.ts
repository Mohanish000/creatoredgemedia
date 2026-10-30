const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]+$/;

/** Returns the normalised href for a valid HTTPS URL, otherwise undefined. */
export function safeExternalUrl(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" || !url.hostname.includes(".")) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

export function isValidExternalUrl(value: string | undefined | null): boolean {
  return safeExternalUrl(value) !== undefined;
}

export function isValidEmail(value: string | undefined | null): value is string {
  return !!value && EMAIL_RE.test(value.trim());
}

/** Digits only, 8-15 digits (E.164 range). */
export function normalisePhone(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 8 && digits.length <= 15 ? digits : undefined;
}

export interface MessageTemplate {
  subject: string;
  body: string;
}

export const collaborationTemplate: MessageTemplate = {
  subject: "Collaboration enquiry: Creatoredge Media",
  body: [
    "Hi Creatoredge Media,",
    "",
    "I'd like to talk about a collaboration.",
    "",
    "Name:",
    "Organisation / channel:",
    "I'm interested in: CreatorRise / CampusEdge / Both",
    "What I'm building or who I want to reach:",
    "",
    "Thanks,",
  ].join("\n"),
};

export const creatorNetworkTemplate: MessageTemplate = {
  subject: "Creator network enquiry: Creatoredge Media",
  body: [
    "Hi Creatoredge Media,",
    "",
    "I'd like to join the creator network.",
    "",
    "Name:",
    "Channel link (YouTube / Instagram):",
    "Niche / topics I cover:",
    "Anything else you should know:",
    "",
    "Thanks,",
  ].join("\n"),
};

export function buildMailto(email: string, template: MessageTemplate): string | undefined {
  if (!isValidEmail(email)) return undefined;
  const subject = encodeURIComponent(template.subject);
  const body = encodeURIComponent(template.body.replace(/\r?\n/g, "\r\n"));
  return `mailto:${email.trim()}?subject=${subject}&body=${body}`;
}

export function buildWhatsApp(number: string | undefined, message: string): string | undefined {
  const digits = normalisePhone(number);
  if (!digits) return undefined;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
