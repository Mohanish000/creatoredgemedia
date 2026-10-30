import { describe, expect, it } from "vitest";
import { getVisibleBrands, validateBrands } from "@/lib/content-guards";
import { brands } from "@/data/brands";
import type { Brand } from "@/types/content";

const base = { logo: "/x.svg", alt: "x" };
const sample: Brand[] = [
  { id: "a", name: "A", ...base, approved: true },
  { id: "b", name: "B", ...base, approved: false },
  { id: "c", name: "C", ...base, approved: true, isPlaceholder: true },
  { id: "d", name: "D", ...base, approved: false, isPlaceholder: true },
];

describe("getVisibleBrands", () => {
  it("excludes placeholder and unapproved brands in production mode", () => {
    expect(getVisibleBrands(sample, { includePlaceholders: false }).map((b) => b.id)).toEqual([
      "a",
    ]);
  });

  it("includes everything in dev mode", () => {
    expect(getVisibleBrands(sample, { includePlaceholders: true })).toHaveLength(4);
  });

  it("ships the supplied institutions as approved, non-placeholder brands", () => {
    expect(brands).toHaveLength(17);
    expect((brands as readonly Brand[]).every((b) => b.approved && !b.isPlaceholder)).toBe(true);
    expect(getVisibleBrands(brands, { includePlaceholders: false })).toHaveLength(17);
  });
});

describe("validateBrands", () => {
  it("rejects duplicate ids", () => {
    expect(() => validateBrands([sample[0]!, sample[0]!])).toThrow(/duplicate/);
  });

  it("rejects invalid website URLs", () => {
    expect(() => validateBrands([{ ...sample[0]!, websiteUrl: "http://insecure.com" }])).toThrow(
      /HTTPS/,
    );
  });
});
