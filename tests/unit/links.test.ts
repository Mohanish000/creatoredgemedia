import { describe, expect, it } from "vitest";
import {
  buildMailto,
  buildWhatsApp,
  collaborationTemplate,
  isValidEmail,
  isValidExternalUrl,
  normalisePhone,
  safeExternalUrl,
} from "@/lib/links";
import { getContactActions } from "@/lib/contact";

describe("external URL validation", () => {
  it("accepts https URLs", () => {
    expect(isValidExternalUrl("https://www.youtube.com/@someone")).toBe(true);
    expect(safeExternalUrl(" https://instagram.com/x ")).toBe("https://instagram.com/x");
  });

  it.each([
    undefined,
    null,
    "",
    "   ",
    "http://example.com",
    "javascript:alert(1)",
    "data:text/html,hi",
    "//example.com",
    "https://localhost",
    "not a url",
    "https://",
  ])("rejects %s", (value) => {
    expect(isValidExternalUrl(value)).toBe(false);
  });
});

describe("email and phone", () => {
  it("validates emails", () => {
    expect(isValidEmail("hello@example.com")).toBe(true);
    expect(isValidEmail("hello@example")).toBe(false);
    expect(isValidEmail("a b@example.com")).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
  });

  it("normalises phone numbers to digits within E.164 length", () => {
    expect(normalisePhone("+91 98765-43210")).toBe("919876543210");
    expect(normalisePhone("123")).toBeUndefined();
    expect(normalisePhone("1".repeat(16))).toBeUndefined();
    expect(normalisePhone(undefined)).toBeUndefined();
  });
});

describe("mailto and wa.me encoding", () => {
  it("encodes subject and body, with CRLF newlines", () => {
    const href = buildMailto("hello@example.com", collaborationTemplate)!;
    expect(href.startsWith("mailto:hello@example.com?subject=")).toBe(true);
    expect(href).not.toMatch(/[ \n]/);
    const body = new URL(href).searchParams.get("body")!;
    expect(body).toContain("\r\n");
    expect(decodeURIComponent(href.split("subject=")[1]!.split("&")[0]!)).toBe(
      collaborationTemplate.subject,
    );
  });

  it("encodes special characters in the template", () => {
    const href = buildMailto("a@b.co", { subject: "Q&A: 100% #1", body: "x=y&z" })!;
    expect(href).toContain("subject=Q%26A%3A%20100%25%20%231");
    expect(href).toContain("body=x%3Dy%26z");
  });

  it("refuses to build a mailto for an invalid address", () => {
    expect(buildMailto("nope", collaborationTemplate)).toBeUndefined();
  });

  it("builds wa.me links with digits only and encoded text", () => {
    expect(buildWhatsApp("+91 98765 43210", "Hi & welcome")).toBe(
      "https://wa.me/919876543210?text=Hi%20%26%20welcome",
    );
    expect(buildWhatsApp("abc", "hi")).toBeUndefined();
  });
});

describe("getContactActions", () => {
  it("returns nothing when no channel is configured (no fake contact)", () => {
    expect(getContactActions({})).toEqual({
      conversation: undefined,
      creatorNetwork: undefined,
      whatsapp: undefined,
    });
  });

  it("builds both mailto actions and WhatsApp when configured", () => {
    const actions = getContactActions({ email: "hello@example.com", whatsapp: "+919876543210" });
    expect(actions.conversation).toMatch(/^mailto:hello@example\.com\?subject=/);
    expect(actions.creatorNetwork).toMatch(/creator%20network/i);
    expect(actions.whatsapp).toMatch(/^https:\/\/wa\.me\/919876543210/);
  });
});
