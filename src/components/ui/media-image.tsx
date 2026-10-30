import Image from "next/image";
import type { ImageAsset } from "@/types/content";

// Tiny dark placeholder shown while raster images decode.
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0IDUiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjUiIGZpbGw9IiMxMTExMTUiLz48L3N2Zz4=";

interface Props {
  image: ImageAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
  alt?: string;
}

/** Fills its positioned parent. Applies the data record's focal point and a colour placeholder for rasters. */
export function MediaImage({ image, sizes, priority, className, alt }: Props) {
  const isSvg = image.src.endsWith(".svg");
  return (
    <Image
      src={image.src}
      alt={alt ?? image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className ?? "object-cover"}
      style={{ objectPosition: image.focalPosition ?? "50% 50%" }}
      {...(isSvg ? {} : { placeholder: "blur" as const, blurDataURL: image.blurDataURL ?? BLUR })}
    />
  );
}
