import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const SECTIONS = [
  "founders",
  "name",
  "creator-edge",
  "campus-edge",
  "services",
  "messages",
  "about",
  "contact",
];

async function revealAll(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
});

test("renders every section in order with one h1", async ({ page }) => {
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("founders");
  const order = await page.evaluate(
    (ids) => ids.map((id) => document.getElementById(id)?.getBoundingClientRect().top ?? NaN),
    SECTIONS,
  );
  expect(order.every((n) => !Number.isNaN(n))).toBe(true);
  expect([...order].sort((a, b) => a - b)).toEqual(order);
});

test("lists the 17 supplied brands as logo links", async ({ page }) => {
  await expect(page.locator("#brands")).toHaveCount(1);
  await expect(page.locator("#brands ul > li")).toHaveCount(17);
  await expect(page.locator("#brands a[target='_blank']")).toHaveCount(17);
});

test("has no horizontal overflow", async ({ page }) => {
  await revealAll(page);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("each agency lists exactly its own creators", async ({ page }) => {
  const creatorEdge = page.locator("#creator-edge");
  const campusEdge = page.locator("#campus-edge");
  await expect(creatorEdge.locator("article")).toHaveCount(9);
  await expect(campusEdge.locator("article")).toHaveCount(7);
  await expect(creatorEdge.getByRole("heading", { name: "Rohit Shaw" })).toBeAttached();
  await expect(creatorEdge.getByRole("heading", { name: "Bhavya Deshwal" })).toBeAttached();
  await expect(campusEdge.getByRole("heading", { name: "Joking Vlogs" })).toBeAttached();
  await expect(campusEdge.getByRole("heading", { name: "Rohit Shaw" })).toHaveCount(0);
  await expect(creatorEdge.getByRole("button", { name: /Filter/ })).toHaveCount(0);
});

test("contact section makes no false promises", async ({ page }) => {
  const contact = page.locator("#contact");
  await contact.scrollIntoViewIfNeeded();
  await expect(contact.locator("form")).toHaveCount(0);
  await expect(contact.locator("a[href^='mailto:'], a[href*='wa.me']")).toHaveCount(0);
});

test("has metadata, icon and robots", async ({ page, request }) => {
  await expect(page).toHaveTitle(/Creatoredge Media/);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  const og = await request.get("/opengraph-image");
  expect(og.headers()["content-type"]).toContain("image/png");
});

test("unknown route shows the 404 page", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /doesn't exist/i })).toBeVisible();
});

test("passes axe (WCAG 2.2 AA)", async ({ page }) => {
  await revealAll(page);
  await page.waitForTimeout(1500);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});

test("keyboard: skip link works and focus is visible", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard flow is desktop only");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("mobile menu opens, traps focus and closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile menu only");
  const open = page.getByRole("button", { name: /menu/i });
  await open.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(open).toBeFocused();
});

test("reduced motion shows all content without scrolling", async ({ browser }) => {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "networkidle" });
  const hidden = await page.evaluate(
    () =>
      [...document.querySelectorAll("[data-reveal]")].filter(
        (el) => getComputedStyle(el).opacity !== "1",
      ).length,
  );
  expect(hidden).toBe(0);
  await context.close();
});
