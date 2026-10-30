"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  /** Max travel in px each way. Capped at 40. */
  range?: number;
  className?: string;
}

/** Parallax wrapper: oversize the child (it is inset by `range` top and bottom). */
export function ParallaxImage({ children, range = 40, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const travel = Math.min(Math.abs(range), 40);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-travel, travel]);

  return (
    <div ref={ref} className={cn("relative h-full w-full overflow-hidden", className)}>
      <motion.div
        className="absolute inset-x-0"
        style={{ top: -travel, bottom: -travel, y: reduced ? 0 : y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
