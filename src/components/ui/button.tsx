import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Accent = "creator" | "campus" | "neutral";

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  accent?: Accent;
  external?: boolean;
  className?: string;
  size?: "md" | "lg";
}

const fill: Record<Accent, string> = {
  creator: "bg-creator text-bg hover:bg-ink",
  campus: "bg-campus text-bg hover:bg-ink",
  neutral: "bg-ink text-bg hover:bg-creator",
};
const outline: Record<Accent, string> = {
  creator: "border-creator/70 text-ink hover:bg-creator hover:text-bg",
  campus: "border-campus/70 text-ink hover:bg-campus hover:text-bg",
  neutral: "border-ink/40 text-ink hover:bg-ink hover:text-bg",
};

export function Button({
  href,
  children,
  variant = "primary",
  accent = "neutral",
  external = false,
  size = "md",
  className,
}: Props) {
  const styles = cn(
    "group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300",
    size === "lg" ? "px-8 py-4 text-base sm:text-lg" : "px-5 py-2.5 text-nav",
    variant === "primary" && fill[accent],
    variant === "outline" && `border ${outline[accent]}`,
    variant === "ghost" && "text-ink hover:text-creator",
    variant !== "ghost" && accent !== "neutral" ? "on-light" : "",
    className,
  );
  return (
    <a
      href={href}
      className={styles}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external ? (
        <>
          <ArrowUpRight aria-hidden className="size-4" />
          <span className="sr-only-ext">(opens in a new tab)</span>
        </>
      ) : null}
    </a>
  );
}
