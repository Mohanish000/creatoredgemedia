"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { processSteps } from "@/data/services";
import { cn, pad2 } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const LIME = [197, 255, 69] as const;
const VIOLET = [167, 139, 250] as const;

function blend(t: number): string {
  const channel = (i: 0 | 1 | 2) => Math.round(LIME[i] + (VIOLET[i] - LIME[i]) * t);
  return `rgb(${channel(0)} ${channel(1)} ${channel(2)})`;
}

export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const last = processSteps.length - 1;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(last, Math.max(0, Math.round(value * last)));
    setActive((current) => (current === next ? current : next));
  });

  const shown = reduced ? last : active;
  const fill = "bg-gradient-to-r from-creator to-campus";

  return (
    <ol ref={ref} className="relative grid gap-10 lg:grid-cols-5 lg:gap-0">
      <span aria-hidden className="absolute top-2 bottom-2 left-[6px] w-px bg-divider lg:hidden" />
      <motion.span
        aria-hidden
        data-draw=""
        className="absolute top-2 bottom-2 left-[6px] w-px origin-top bg-gradient-to-b from-creator to-campus lg:hidden"
        style={{ scaleY: reduced ? 1 : scrollYProgress }}
      />
      <span
        aria-hidden
        className="absolute top-[6px] right-[10%] left-0 hidden h-px bg-divider lg:block"
      />
      <motion.span
        aria-hidden
        data-draw=""
        className={cn(
          "absolute top-[6px] right-[10%] left-0 hidden h-px origin-left lg:block",
          fill,
        )}
        style={{ scaleX: reduced ? 1 : scrollYProgress }}
      />

      {processSteps.map((step, i) => {
        const reached = i <= shown;
        const color = blend(i / last);
        return (
          <li
            key={step.id}
            className="relative pl-10 lg:pt-12 lg:pr-6 lg:pl-0"
            aria-current={i === shown ? "step" : undefined}
          >
            <span
              aria-hidden
              className="absolute top-1.5 left-0 size-3.5 rounded-full border transition-colors duration-500 lg:top-0"
              style={{
                borderColor: color,
                backgroundColor: reached ? color : "var(--bg)",
                transform: i === shown ? "scale(1.35)" : undefined,
              }}
            />
            <p
              className="label transition-colors duration-500"
              style={{ color: reached ? color : "var(--text-2)" }}
            >
              {pad2(i + 1)}
            </p>
            <h4 className="mt-2 font-display text-h3 font-semibold">{step.title}</h4>
            <p className="mt-2 max-w-xs text-ink-2">{step.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
