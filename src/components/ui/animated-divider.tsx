"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { duration, ease, viewport } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface Props {
  orientation?: "vertical" | "horizontal";
  /** "view" draws once when scrolled into view; "scroll" scrubs with scroll progress. */
  trigger?: "view" | "scroll";
  /** Lime to violet along the line. Otherwise the neutral divider colour. */
  gradient?: boolean;
  className?: string;
  delay?: number;
}

export function AnimatedDivider({
  orientation = "vertical",
  trigger = "view",
  gradient = false,
  className,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const vertical = orientation === "vertical";
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: vertical ? ["start 85%", "end 45%"] : ["start 95%", "start 60%"],
  });
  const scrubbed = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const line = cn(
    gradient
      ? vertical
        ? "bg-gradient-to-b from-creator via-divider to-campus"
        : "bg-gradient-to-r from-creator via-divider to-campus"
      : "bg-divider",
    vertical ? "h-full w-px origin-top" : "h-px w-full origin-left",
  );
  const axis = vertical ? "scaleY" : "scaleX";

  return (
    <div ref={ref} aria-hidden className={cn(vertical ? "h-full w-px" : "h-px w-full", className)}>
      {trigger === "scroll" && !reduced ? (
        <motion.div data-draw="" className={line} style={{ [axis]: scrubbed }} />
      ) : (
        <motion.div
          data-draw=""
          className={line}
          initial={reduced ? false : { [axis]: 0 }}
          whileInView={{ [axis]: 1 }}
          viewport={viewport}
          transition={{ duration: duration.slow * 1.4, delay, ease: ease.inOut }}
        />
      )}
    </div>
  );
}
