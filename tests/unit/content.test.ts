import { describe, expect, it } from "vitest";
import { founders } from "@/data/founders";
import { services, processSteps } from "@/data/services";
import { getNavItems } from "@/data/navigation";

describe("truthfulness contract", () => {
  it("keeps founder messages as drafts until approved", () => {
    expect(founders.every((f) => f.message.status === "draft")).toBe(true);
  });

  it("has services for both agencies and five process steps", () => {
    expect(services.some((s) => s.agency === "creator-edge")).toBe(true);
    expect(services.some((s) => s.agency === "campus-edge")).toBe(true);
    expect(processSteps.map((s) => s.title)).toEqual([
      "Discover",
      "Connect",
      "Create",
      "Amplify",
      "Review",
    ]);
  });
});

describe("navigation", () => {
  it("omits the Brands link when the section is hidden", () => {
    expect(getNavItems({ hasBrands: false }).some((i) => i.id === "brands")).toBe(false);
    expect(getNavItems({ hasBrands: true }).some((i) => i.id === "brands")).toBe(true);
  });
});
