import { expect, test } from "@playwright/test";

const WIDTHS = [360, 390, 768, 1024, 1440, 1920];

test.describe("no horizontal overflow across target widths", () => {
  test.skip(({ isMobile }) => isMobile, "covered by the desktop project, which resizes");

  for (const width of WIDTHS) {
    test(`${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/", { waitUntil: "networkidle" });
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += 700) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(40);
      }
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      await expect(page.locator("h1")).toBeVisible();
    });
  }
});
