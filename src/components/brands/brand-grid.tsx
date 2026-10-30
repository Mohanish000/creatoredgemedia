import Image from "next/image";
import type { Brand } from "@/types/content";
import { safeExternalUrl } from "@/lib/links";
import { stagger } from "@/lib/motion";
import { Reveal } from "@/components/ui/reveal";

function BrandLogo({ brand }: { brand: Brand }) {
  const href = safeExternalUrl(brand.websiteUrl);
  const image = (
    <span className="relative block aspect-[3/2] w-full">
      <Image
        src={brand.logo}
        alt={brand.alt}
        fill
        sizes="(min-width: 1024px) 14vw, (min-width: 640px) 28vw, 45vw"
        className="object-contain p-6 transition duration-500 group-hover/logo:scale-105 sm:p-7"
      />
    </span>
  );

  return (
    <div
      className={`group/logo relative overflow-hidden rounded-sm ${
        brand.tile === "dark" ? "bg-[#111111]" : "bg-[#f3f1ee]"
      }`}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {image}
          <span className="sr-only-ext">(opens in a new tab)</span>
        </a>
      ) : (
        image
      )}
    </div>
  );
}

export function BrandGrid({ brands }: { brands: Brand[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
      {brands.map((brand, i) => (
        <Reveal as="li" key={brand.id} delay={i * stagger.cards} className="h-full">
          <BrandLogo brand={brand} />
        </Reveal>
      ))}
    </ul>
  );
}
