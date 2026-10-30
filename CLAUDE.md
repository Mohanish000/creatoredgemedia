@AGENTS.md

# Creatoredge Media: project guide

Single-page, frontend-only marketing site for two connected agencies: **CreatorRise Media** (founder Aryan Sehgal, lime `#C5FF45`; internal id `creator-edge`) and **CampusEdge Media** (founder Samrat Patel, violet `#A78BFA`). Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind v4, `motion/react`. npm only (no pnpm).

Next.js 16 has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code.

## Commands

| Command                 | Purpose                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| `npm run dev`           | Dev server (placeholder records and contact placeholder are visible)                                |
| `npm run build`         | Production build                                                                                    |
| `npm start`             | Serve the production build                                                                          |
| `npm run typecheck`     | `tsc --noEmit`                                                                                      |
| `npm run lint`          | ESLint                                                                                              |
| `npm run format`        | Prettier write (`format:check` to verify)                                                           |
| `npm test`              | Vitest unit tests (`tests/unit`)                                                                    |
| `npm run test:e2e`      | Playwright at 390 and 1440 wide + axe, plus a 360/390/768/1024/1440/1920 overflow sweep (port 3100) |
| `npm run check:content` | Lists remaining placeholders. `-- --strict` exits 1 if any remain                                   |
| `npm run analyze`       | Bundle analyzer (webpack). Set `NEXT_DIST_DIR=.next-analyze` to keep it away from `.next`           |
| `npm run lighthouse`    | Mobile Lighthouse against a running `next start -p 3100`. Writes `reports/lighthouse-mobile.json`   |
| `npm run verify`        | typecheck, lint, format:check, test, check:content, build, test:e2e                                 |

`verify` does not run `check:content --strict`. A real launch must also pass `npm run check:content -- --strict`.

## Folder map

```
src/app/           layout (fonts, metadata, JSON-LD), page (section order), not-found,
                   robots, sitemap, opengraph-image, icon, apple-icon, globals.css (tokens)
src/components/
  sections/        founders-split, name-origin, creators-split, brands, services,
                   process-timeline, founder-messages, about, contact
  layout/          navbar, mobile-menu, footer, wordmark, skip-link, social-links
  creators/ brands/ founders/   cards, grids, filter, panels
  ui/              reveal, animated-divider, button, magnetic, media-image, parallax-image,
                   section-heading, social-icons
src/data/          ALL editable content: agencies, site (env), founders, creators, brands,
                   services, navigation
src/lib/           links (URL/email/phone validation), contact (mailto / wa.me builders),
                   content-guards (build-time validators), motion (tokens), structured-data, utils
src/hooks/         use-reduced-motion, use-active-section
src/types/         content.ts
scripts/           check-content.ts, lighthouse.mjs
tests/unit|e2e/    Vitest and Playwright
public/images/     founder, creator and brand images
```

Section IDs, in order: `#founders`, `#name`, `#creator-edge`, `#campus-edge` (the last two are side-by-side columns of one creators section), `#brands`, `#services`, `#messages`, `#about`, `#contact`.

## Content-editing rules

- Content lives in `src/data/*`. Components should not contain copy that belongs to a record.
- Placeholder records have `isPlaceholder: true` and are tracked by `check:content` (no on-page tag is shown). Creators use `photoPending: true` until a real photo is added. Remove the flag only when the record is real and approved.
- Founder messages carry `status: "draft"` (no on-page tag; `check:content` flags it). Set `"approved"` only after the founder signs off.
- Brands come from `src/data/brands.ts` (17 institution logos, `tile: "dark"` for white artwork). Placeholder/unapproved brands are hidden in production (`getVisibleBrands`); the section and its nav link disappear when none are visible.
- Records are validated at build time by `src/lib/content-guards.ts`. Bad data fails the build.
- Contact, socials and domain come from `NEXT_PUBLIC_*` env vars (see `.env.example`), read through `src/data/site.ts`.
- Every external URL goes through `safeExternalUrl` in `src/lib/links.ts` (HTTPS only). Invalid values render nothing.

## Truthfulness contract

Never invent or guess any of: clients, brands, creators, statistics, testimonials, awards, bios, emails, phone numbers, social URLs, or the domain. If something is not supplied, render a clearly marked placeholder (dev/preview only where possible) or render nothing. Services are phrased as offerings ("We can help with…"), never as delivered work. The contact area opens `mailto:` / `wa.me` with a pre-filled template and says "This opens your email app." There is no form and no fake success state. JSON-LD includes verified fields only. Do not claim something works unless it was run.

## Motion conventions

- Tokens (durations, easings, distances) live in `src/lib/motion.ts`. Do not hard-code values in components.
- Animate `transform`, `opacity` and `clip-path` only.
- Reveal once (`viewport once`). No scroll-jacking, WebGL, or particles.
- Always respect reduced motion via `src/hooks/use-reduced-motion.ts`. Under reduced motion (and with JS disabled, via the layout `<noscript>` style) `[data-reveal]` and `[data-draw]` elements are forced visible.
- Server Components by default. Add `"use client"` only for scroll, state, or Motion hooks.

## Fonts

- **Space Grotesk** (`--f-display`): headlines and numerals. Geometric, slightly technical; suits the "edge" concept.
- **Inter** (`--f-body`): body, labels, UI. Highly legible at small sizes and on mobile.
- **Instrument Serif** (`--f-serif`, `preload: false`): founder quotes and the closing statement only. The editorial contrast marks "human voice" against the grotesque UI type.

All three load through `next/font/google` (self-hosted at build time, no runtime Google request).

## Gotchas

- `NEXT_DIST_DIR` changes the build dir. E2E uses `.next-e2e` so it never clobbers `.next`.
- Lighthouse must run as plain `.mjs`; tsx's helper injection breaks in-page evals.
- On macOS, `sed -i` needs a backup suffix; prefer the Edit tool.
- Next may append its own `.next-*` entries to `tsconfig.json`'s `include`. Remove stray ones.
