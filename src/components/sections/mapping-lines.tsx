"use client";

import { motion } from "motion/react";
import { duration, ease, viewport } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Two glowing lines that run from the highlighted words down and merge into the combined name. */
export function MappingLines() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-draw=""
      aria-hidden
      className="origin-top"
      initial={reduced ? false : { scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={viewport}
      transition={{ duration: duration.slow * 1.4, ease: ease.inOut }}
    >
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="hidden h-20 w-full overflow-visible sm:block"
      >
        <path
          d="M25 0 C25 26 50 14 50 40"
          fill="none"
          stroke="var(--creator)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 4px var(--creator))" }}
        />
        <path
          d="M75 0 C75 26 50 14 50 40"
          fill="none"
          stroke="var(--campus)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 4px var(--campus))" }}
        />
      </svg>
      <div className="mx-auto h-14 w-px bg-gradient-to-b from-creator to-campus shadow-[0_0_8px_rgba(197,255,69,0.5)] sm:hidden" />
    </motion.div>
  );
}
