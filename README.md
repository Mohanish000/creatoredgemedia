# Creatoredge Media

Single-page marketing site for two connected agencies, built around a recurring vertical hairline divider:

- **CreatorRise Media**: for education creators (founder Aryan Sehgal, lime accent).
- **CampusEdge Media**: for campus visibility and college promotion (founder Samrat Patel, violet accent).

Tagline (site metadata only): **"Creators Rise. Campuses Shine."**

Frontend only: Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind v4, `motion/react`. No backend, no form, no database. Deployable on Vercel and safe for static export.

> **Status: not production-ready.** Founder messages are still draft copy, brand logos still need permission confirmed, and no domain or contact details have been supplied. See [Remaining placeholders](#remaining-placeholders). Do not launch until `npm run verify` and `npm run check:content -- --strict` both pass.

## Features

- Sections in order: founders, name origin, creators (CreatorRise left, CampusEdge right), brands, services, founder messages, about, contact, footer.
- Name-origin band between the founders and the creators: "Creator" (from CreatorRise Media) and "Edge" (from CampusEdge Media) are highlighted and merge into "Creator Edge Media".
- Creators section: CreatorRise on the left, CampusEdge on the right, a thin glowing vertical line between them. Two circular-photo cards per row per side, centred bold names and YouTube/Instagram icons.
- Brands grid of 17 institution logos on light/dark tiles, each linking to the institution's site.
- Services in two agency columns plus a scroll-driven five-step process timeline (lime to violet).
- Contact via `mailto:` and `wa.me` with pre-filled templates. No form and no fake success state.
- Truthfulness guards: placeholder records are hidden in production, all external URLs are HTTPS-validated.
- Reduced-motion support, skip link, keyboard-operable mobile menu, no-JS fallback (content stays visible).
- SEO: metadata, Open Graph image, robots, sitemap, Organization JSON-LD (verified fields only), "CE" monogram favicon.

## Commands

```bash
npm install
npm run dev              # http://localhost:3000, placeholders visible
npm run build && npm start
npm run typecheck
npm run lint
npm run format           # format:check to verify only
npm test                 # Vitest
npm run test:e2e         # Playwright (builds to .next-e2e, serves on :3100)
npm run check:content    # lists remaining placeholders; add `-- --strict` to fail on them
npm run analyze          # bundle analyzer (use NEXT_DIST_DIR=.next-analyze)
npm run lighthouse       # needs `next start -p 3100` running; writes reports/lighthouse-mobile.json
npm run verify           # typecheck, lint, format:check, test, check:content, build, test:e2e
```

First run of Playwright may need `npx playwright install chromium`.

## Folder map

```
src/app/          layout, page, not-found, robots, sitemap, OG image, icons, globals.css (tokens)
src/components/   sections/ layout/ creators/ brands/ founders/ ui/
src/data/         all editable content (agencies, site, founders, creators, brands, services, navigation)
src/lib/          links, contact, content-guards, motion tokens, structured-data, utils
src/hooks/        use-reduced-motion, use-active-section
src/types/        content.ts
scripts/          check-content.ts, lighthouse.mjs
tests/            unit/ (Vitest), e2e/ (Playwright + axe)
public/images/    placeholder SVGs (founders, creators, brands)
```

See `CLAUDE.md` for conventions (content rules, truthfulness contract, motion, fonts).

## How to…

### Replace founder photos

1. Add the photo to `public/images/founders/` (4:5, at least 1200px wide; JPG/WebP/PNG).
2. In `src/data/founders.ts`, set `image.src`, `image.alt` (describe the person), `width`, `height`, and tune `focalPosition`.
3. Remove `isPlaceholder: true` and any `caption` line if present.

### Add a creator

In `src/data/creators.ts`, add a record: `id`, `name`, `agency`, `image`, optional `category` / `shortBio`, optional `youtubeUrl` / `instagramUrl` (HTTPS only). Put the image in `public/images/creators/` (4:5, 1200px+ wide) and remove `photoPending: true` if present. Add `youtubeSubscribers` (a number) to position them; higher shows first. Invalid data fails the build.

### Add a brand

In `src/data/brands.ts`, add a record with `approved: true`, a logo (SVG, PNG or WebP) in `public/images/brands/`, and `websiteUrl`. Use `tile: "dark"` for white logo artwork. Only add brands you have permission to show. The 17 current logos were taken from each institution's public website; confirm permission before launch. Polaris School of Technology, Mirai/Merai School of Technology, Bosscoder School of Technology and Quad AI are not included because no official site or logo could be verified (Mirai's domain is parked, Quad AI's is for sale, and Bosscoder's school page is a bare stub).

### Edit services

Edit `src/data/services.ts`. Keep wording as offerings ("We can help with…"), not claims of completed work. Process steps are in the same file.

### Edit founder messages and approve them

Edit `message.text` in `src/data/founders.ts`. When the founder has signed off, change `status: "draft"` to `status: "approved"`.

### Update socials and contact

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_WHATSAPP_NUMBER=     # digits with country code
NEXT_PUBLIC_INSTAGRAM_URL=       # https:// only
NEXT_PUBLIC_YOUTUBE_URL=
NEXT_PUBLIC_LINKEDIN_URL=
```

Invalid values are ignored. On Vercel, set the same variables in Project Settings, then redeploy (they are inlined at build time). Founder and creator social links are set per record in the data files.

### Set the domain

Set `NEXT_PUBLIC_SITE_URL=https://your-domain` and redeploy. That enables the canonical URL, sitemap entries, absolute OG URLs and the JSON-LD `url`. Without it, the sitemap is empty and no canonical is emitted.

## Deploy on Vercel

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In Vercel: **Add New Project**, import the repo. Framework preset: Next.js (auto-detected). Build command `npm run build`, install `npm install`.
3. Add the `NEXT_PUBLIC_*` variables above for Production (and Preview if wanted).
4. Deploy. For a Preview that shows placeholder brands and the contact placeholder, set `NEXT_PUBLIC_SHOW_DEV_PLACEHOLDERS=true` on the Preview environment only.
5. Add the custom domain, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.

### Static export (optional)

Nothing in the site needs a server. To export static files, edit `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // …existing options
};
```

Then `npm run build` writes `out/`. Host it anywhere. This switch was **not** run or verified in this project; run it and check before relying on it.

## Assumptions

- **npm** is used instead of pnpm because pnpm is not installed here.
- The optional sticky founder segment from the brief was skipped.
- Founder and creator photos were supplied by the client or taken from YouTube profile pictures. Brand logos are the institutions' own files.
- `metadataBase` falls back to the Vercel URL env vars or localhost when `NEXT_PUBLIC_SITE_URL` is unset, so OG URLs resolve in previews. No canonical is emitted in that case.
- The sitemap is empty until a site URL is configured, so no guessed URL is published.
- Copy is original placeholder wording that makes no factual claims about either agency's clients or results.

## Results obtained

All numbers are from runs in this project.

| Check                                                                 | Result                                                                                                                              |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `npm run verify` (typecheck, lint, format, unit, content, build, e2e) | Exit 0                                                                                                                              |
| Vitest                                                                | 32 passed (4 files)                                                                                                                 |
| Playwright (390 and 1440 projects)                                    | 28 passed, 8 skipped (mobile-only tests skipped on desktop and vice versa)                                                          |
| axe (WCAG 2.2 AA) at 390 and 1440                                     | 0 violations                                                                                                                        |
| Horizontal overflow at 360/390/768/1024/1440/1920                     | None (Playwright sweep passes)                                                                                                      |
| Client JS                                                             | ~239 KB gzip across all emitted chunks (760 KB raw); ~200 KB gzip loaded by `/` (measured earlier). `motion` is ~57 KB gzip of that |
| CSS                                                                   | ~9 KB gzip                                                                                                                          |
| Lighthouse mobile, default simulated throttling                       | Performance 94, **LCP 3.1 s (misses the 2.5 s target)**, CLS 0                                                                      |
| Lighthouse mobile, devtools throttling                                | LCP 2.3 s                                                                                                                           |
| Chrome CDP-throttled manual measurement                               | LCP 1.4 s                                                                                                                           |

**LCP caveat.** Under Lighthouse's default simulated throttling (4x CPU slowdown, slow 4G) LCP is 3.1 s, above the 2.5 s goal. Lighthouse picks the nav wordmark as the LCP element; a real browser reports a text block. Tried without improvement: removing the subcopy delay, `font-display: optional`, not preloading the serif font. Fonts are not the cause. The leading suspect is JS weight (~200 KB gzip). `LazyMotion` with `m.*` components was also tried: total JS was unchanged (~241 KB gzip) and LCP was 3.2 s, so it was reverted. Real-throttle numbers pass, but the simulated number is the one Lighthouse and PageSpeed report, so treat this as an open item.

The bundle analyzer (`npm run analyze`) builds and writes its HTML reports, but its treemap was not inspected.

Not run: any Lighthouse category other than performance, the static-export build, a real-device check, and a screen-reader pass. Visual review was done from Playwright screenshots at 360, 390 and 1440 only.

Known cosmetic items: the CampusEdge editorial grid leaves some empty space at its bottom right.

## Remaining placeholders

From `npm run check:content` (`--strict` exits 1 while any blocker remains):

- 15 creators use their YouTube profile pictures (permission to use them is unconfirmed); Anamika Sangwan's photo was supplied directly.
- Creator order follows `youtubeSubscribers` (a 2026-10-31 snapshot taken from public channel pages); refresh it periodically. Creators with no YouTube link sort last.
- Brand logo permission for the 17 institutions is unconfirmed; Polaris, Mirai, Bosscoder and Quad AI are missing.
- 2 founder messages still `draft`. The wording is proposed copy and has not been approved by either founder.
- `NEXT_PUBLIC_SITE_URL` not set (no canonical, empty sitemap).
- No contact channel (`NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_WHATSAPP_NUMBER`). Production shows "Contact details are coming soon."
- No social URLs (Instagram, YouTube, LinkedIn).
