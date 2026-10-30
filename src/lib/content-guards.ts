import type { AgencyId, Brand, Creator, Founder, ImageAsset, Service } from "@/types/content";
import { isValidExternalUrl } from "@/lib/links";

const AGENCY_IDS: readonly AgencyId[] = ["creator-edge", "campus-edge"];

export function creatorsForAgency(creators: readonly Creator[], agency: AgencyId): Creator[] {
  return creators.filter((creator) => creator.agency === agency);
}

export function getVisibleBrands(
  brands: readonly Brand[],
  options: { includePlaceholders: boolean },
): Brand[] {
  return brands.filter((brand) =>
    options.includePlaceholders ? true : brand.approved && brand.isPlaceholder !== true,
  );
}

export function uniqueCategories(creators: readonly Creator[]): string[] {
  return [...new Set(creators.map((c) => c.category).filter((c): c is string => Boolean(c)))];
}

function fail(message: string): never {
  throw new Error(`[content] ${message}`);
}

function assertUnique(kind: string, ids: readonly string[]) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (!id) fail(`${kind}: empty id`);
    if (seen.has(id)) fail(`${kind}: duplicate id "${id}"`);
    seen.add(id);
  }
}

function assertImage(owner: string, image: ImageAsset) {
  if (!image.src.startsWith("/"))
    fail(`${owner}: image.src must be a /public path (got "${image.src}")`);
  if (!image.alt.trim()) fail(`${owner}: image.alt is required`);
  if (!(image.width > 0 && image.height > 0)) fail(`${owner}: image width/height must be positive`);
}

function assertOptionalUrl(owner: string, field: string, value: string | undefined) {
  if (value !== undefined && value !== "" && !isValidExternalUrl(value)) {
    fail(`${owner}: ${field} is not a valid HTTPS URL ("${value}")`);
  }
}

function assertAgency(owner: string, agency: string) {
  if (!AGENCY_IDS.includes(agency as AgencyId)) fail(`${owner}: unknown agency "${agency}"`);
}

export function validateCreators<T extends readonly Creator[]>(creators: T): T {
  assertUnique(
    "creators",
    creators.map((c) => c.id),
  );
  for (const c of creators) {
    assertAgency(`creator ${c.id}`, c.agency);
    if (!c.name.trim()) fail(`creator ${c.id}: name is required`);
    assertImage(`creator ${c.id}`, c.image);
    assertOptionalUrl(`creator ${c.id}`, "youtubeUrl", c.youtubeUrl);
    assertOptionalUrl(`creator ${c.id}`, "instagramUrl", c.instagramUrl);
  }
  return creators;
}

export function validateBrands<T extends readonly Brand[]>(brands: T): T {
  assertUnique(
    "brands",
    brands.map((b) => b.id),
  );
  for (const b of brands) {
    if (!b.logo.startsWith("/")) fail(`brand ${b.id}: logo must be a /public path`);
    if (!b.alt.trim()) fail(`brand ${b.id}: alt is required`);
    assertOptionalUrl(`brand ${b.id}`, "websiteUrl", b.websiteUrl);
  }
  return brands;
}

export function validateFounders<T extends readonly Founder[]>(founders: T): T {
  assertUnique(
    "founders",
    founders.map((f) => f.id),
  );
  for (const f of founders) {
    assertAgency(`founder ${f.id}`, f.agency);
    assertImage(`founder ${f.id}`, f.image);
    assertOptionalUrl(`founder ${f.id}`, "youtubeUrl", f.youtubeUrl);
    assertOptionalUrl(`founder ${f.id}`, "instagramUrl", f.instagramUrl);
    assertOptionalUrl(`founder ${f.id}`, "linkedinUrl", f.linkedinUrl);
  }
  return founders;
}

export function validateServices<T extends readonly Service[]>(services: T): T {
  assertUnique(
    "services",
    services.map((s) => s.id),
  );
  for (const s of services) assertAgency(`service ${s.id}`, s.agency);
  return services;
}
