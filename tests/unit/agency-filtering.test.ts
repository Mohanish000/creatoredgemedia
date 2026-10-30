import { describe, expect, it } from "vitest";
import { creators } from "@/data/creators";
import { creatorsForAgency, uniqueCategories } from "@/lib/content-guards";
import type { Creator } from "@/types/content";

describe("agency filtering", () => {
  it("never mixes agencies", () => {
    for (const agency of ["creator-edge", "campus-edge"] as const) {
      const result = creatorsForAgency(creators, agency);
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((c) => c.agency === agency)).toBe(true);
    }
  });

  it("partitions the full list with no overlap", () => {
    const a = creatorsForAgency(creators, "creator-edge");
    const b = creatorsForAgency(creators, "campus-edge");
    expect(a.length + b.length).toBe(creators.length);
    const ids = new Set(a.map((c) => c.id));
    expect(b.some((c) => ids.has(c.id))).toBe(false);
  });

  it("derives categories only from the given list", () => {
    const campus = creatorsForAgency(creators, "campus-edge");
    const cats = uniqueCategories(campus);
    expect(cats).toEqual([...new Set(campus.flatMap((c) => (c.category ? [c.category] : [])))]);
  });

  it("flags every creator whose photo is still a placeholder", () => {
    const placeholderPhoto = (c: Creator) => c.image.src.endsWith(".svg");
    expect(creators.filter(placeholderPhoto).every((c: Creator) => c.photoPending === true)).toBe(
      true,
    );
  });
});
