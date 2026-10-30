import { defineConfig } from "@playwright/test";

const PORT = 3100;
const distDir = ".next-e2e";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${PORT}`, trace: "retain-on-failure" },
  projects: [
    {
      name: "mobile-390",
      use: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true },
    },
    { name: "desktop-1440", use: { viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: `NEXT_DIST_DIR=${distDir} npx next build && NEXT_DIST_DIR=${distDir} npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 240_000,
    reuseExistingServer: !process.env.CI,
  },
});
