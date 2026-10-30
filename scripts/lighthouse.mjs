// Plain .mjs on purpose: tsx's name-keeping injects helpers that break Lighthouse's in-page evals.
import { mkdirSync, writeFileSync } from "node:fs";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";

const url = process.argv[2] ?? "http://localhost:3100";

async function main() {
  const chrome = await launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless=new", "--no-sandbox"],
  });
  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      formFactor: "mobile",
      ...(process.env.LH_THROTTLING ? { throttlingMethod: process.env.LH_THROTTLING } : {}),
      screenEmulation: {
        mobile: true,
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        disabled: false,
      },
    });
    if (!result) throw new Error("Lighthouse returned no result");
    const { lhr } = result;
    const score = (id) => Math.round((lhr.categories[id]?.score ?? 0) * 100);
    const audit = (id) => lhr.audits[id]?.displayValue ?? "n/a";
    const summary = {
      throttling: process.env.LH_THROTTLING ?? "simulate (default)",
      url,
      performance: score("performance"),
      accessibility: score("accessibility"),
      bestPractices: score("best-practices"),
      seo: score("seo"),
      LCP: audit("largest-contentful-paint"),
      CLS: audit("cumulative-layout-shift"),
      TBT: audit("total-blocking-time"),
      FCP: audit("first-contentful-paint"),
    };
    const lcpItems = lhr.audits["largest-contentful-paint-element"]?.details?.items ?? [];
    const lcpNode = lcpItems.flatMap((i) => i.items ?? [i]).find((i) => i.node)?.node;
    if (lcpNode) summary.LCPElement = lcpNode.snippet;
    mkdirSync("reports", { recursive: true });
    writeFileSync("reports/lighthouse-mobile.json", JSON.stringify(summary, null, 2));
    console.log(summary);
  } finally {
    await chrome.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
