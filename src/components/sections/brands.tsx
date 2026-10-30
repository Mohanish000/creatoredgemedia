import { SHOW_DEV_PLACEHOLDERS } from "@/data/site";
import { visibleBrands } from "@/data/brands";
import { SectionHeading } from "@/components/ui/section-heading";
import { BrandGrid } from "@/components/brands/brand-grid";

export function BrandsSection() {
  if (visibleBrands.length === 0 && !SHOW_DEV_PLACEHOLDERS) return null;

  return (
    <section id="brands" aria-label="Brands" className="section-y">
      <div className="container-edge">
        <SectionHeading eyebrow="Brands" className="mb-14 sm:mb-20" />
        {visibleBrands.length > 0 ? (
          <BrandGrid brands={visibleBrands} />
        ) : (
          <p className="border border-dashed border-edge p-10 text-center text-ink-2">
            Partner logos will appear here once approved.
          </p>
        )}
      </div>
    </section>
  );
}
