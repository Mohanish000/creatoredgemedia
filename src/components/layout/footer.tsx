import { SITE } from "@/data/site";
import { AGENCY_LIST } from "@/data/agencies";
import { getNavItems } from "@/data/navigation";
import { showBrandsSection } from "@/data/brands";
import { Wordmark } from "@/components/layout/wordmark";
import { SocialLinks } from "@/components/layout/social-links";
import { CurrentYear } from "@/components/layout/current-year";

const BUILD_YEAR = 2026;

export function Footer() {
  const items = getNavItems({ hasBrands: showBrandsSection });

  return (
    <footer className="border-t border-edge bg-bg-2">
      <div className="container-edge grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-xs text-ink-2">{SITE.tagline}</p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="label text-ink-2">Explore</p>
          <ul className="mt-4 space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="inline-flex min-h-11 items-center link-underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label text-ink-2">Agencies</p>
          <ul className="mt-4 space-y-1">
            {AGENCY_LIST.map((agency) => (
              <li key={agency.id}>
                <a
                  href={`#${agency.anchorId}`}
                  className={`inline-flex min-h-11 items-center link-underline ${
                    agency.id === "creator-edge" ? "text-creator" : "text-campus"
                  }`}
                >
                  {agency.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-edge">
        <div className="container-edge py-6 text-caption text-ink-2">
          &copy; <CurrentYear fallback={BUILD_YEAR} /> {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
