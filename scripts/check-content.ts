import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Brand, Creator, Founder } from "../src/types/content";

for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) process.loadEnvFile(file);
}

const strict = process.argv.includes("--strict");
const root = process.cwd();

async function main() {
  const creators: readonly Creator[] = (await import("../src/data/creators")).creators;
  const brands: readonly Brand[] = (await import("../src/data/brands")).brands;
  const founders: readonly Founder[] = (await import("../src/data/founders")).founders;
  const { SITE } = await import("../src/data/site");

  const issues: string[] = [];
  const info: string[] = [];
  const publicFileExists = (src: string) =>
    existsSync(join(root, "public", src.replace(/^\//, "")));

  const placeholderCreators = creators.filter((c) => c.isPlaceholder);
  if (placeholderCreators.length) {
    issues.push(
      `${placeholderCreators.length} placeholder creator(s): ${placeholderCreators.map((c) => c.id).join(", ")}`,
    );
  }
  const pendingPhotos = creators.filter((c) => c.photoPending);
  if (pendingPhotos.length) {
    issues.push(
      `${pendingPhotos.length} creator(s) still use a placeholder photo: ${pendingPhotos.map((c) => c.id).join(", ")}`,
    );
  }
  const missingCreatorUrls = creators.filter(
    (c) => !c.isPlaceholder && !c.youtubeUrl && !c.instagramUrl,
  );
  for (const c of missingCreatorUrls)
    info.push(`Creator "${c.id}" has no YouTube or Instagram URL (no icons will render).`);

  const unapproved = brands.filter((b) => !b.approved);
  const placeholderBrands = brands.filter((b) => b.isPlaceholder);
  if (placeholderBrands.length) {
    issues.push(
      `${placeholderBrands.length} placeholder brand(s): ${placeholderBrands.map((b) => b.id).join(", ")}`,
    );
  }
  if (unapproved.length)
    info.push(`${unapproved.length} brand(s) not approved: hidden in production.`);
  const approvedReal = brands.filter((b) => b.approved && !b.isPlaceholder);
  if (approvedReal.length === 0)
    info.push("No approved real brands: the Brands section is hidden in production.");

  for (const f of founders) {
    if (f.isPlaceholder) issues.push(`Founder "${f.name}" portrait is a placeholder.`);
    if (f.message.status === "draft") issues.push(`Founder "${f.name}" message is still a draft.`);
  }

  const missingImages = [
    ...creators.map((c) => c.image.src),
    ...founders.map((f) => f.image.src),
    ...brands.map((b) => b.logo),
  ].filter((src) => src.startsWith("/") && !publicFileExists(src));
  for (const src of missingImages) issues.push(`Missing image file: public${src}`);

  if (!SITE.url)
    issues.push("NEXT_PUBLIC_SITE_URL is not set (no canonical URL or sitemap entries).");
  if (!SITE.contact.email && !SITE.contact.whatsapp) {
    issues.push(
      "No contact channel configured (NEXT_PUBLIC_CONTACT_EMAIL / NEXT_PUBLIC_WHATSAPP_NUMBER).",
    );
  }
  const socials = Object.entries(SITE.socials)
    .filter(([, url]) => !url)
    .map(([name]) => name);
  if (socials.length) info.push(`Social URLs not set: ${socials.join(", ")}.`);

  console.log("Content check\n=============");
  if (issues.length) {
    console.log(`\nRemaining placeholders / blockers (${issues.length}):`);
    for (const i of issues) console.log(`  - ${i}`);
  } else {
    console.log("\nNo placeholders or blockers found.");
  }
  if (info.length) {
    console.log("\nNotes:");
    for (const i of info) console.log(`  - ${i}`);
  }

  if (strict && issues.length) {
    console.error(`\n--strict: ${issues.length} issue(s) remain. Not ready to publish.`);
    process.exit(1);
  }
  if (!strict && issues.length)
    console.log("\nRun with --strict to fail on these (use before launch).");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
