import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface Props {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  accent?: "creator" | "campus" | "neutral";
  align?: "left" | "right";
  className?: string;
  reveal?: "up" | "left" | "right";
  size?: "lg" | "md";
}

const accentText = {
  creator: "text-creator",
  campus: "text-campus",
  neutral: "text-ink-2",
} as const;

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  accent = "neutral",
  align = "left",
  className,
  reveal = "up",
  size = "lg",
}: Props) {
  return (
    <div
      className={cn(
        size === "lg" ? "max-w-4xl" : "max-w-xl",
        align === "right" && "ml-auto sm:text-right",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal direction={reveal}>
          <p className={cn("label mb-5", accentText[accent])}>{eyebrow}</p>
        </Reveal>
      ) : null}
      {title ? (
        <Reveal direction={reveal} delay={0.05}>
          <h2
            id={id}
            className={cn(
              "font-display font-semibold text-balance",
              size === "lg" ? "text-h2" : "text-h3",
            )}
          >
            {title}
          </h2>
        </Reveal>
      ) : null}
      {description ? (
        <Reveal direction={reveal} delay={0.12}>
          <p
            className={cn("mt-6 max-w-2xl text-body text-ink-2", align === "right" && "sm:ml-auto")}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
