"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  duration,
  ease,
  hiddenState,
  viewport,
  visibleState,
  type RevealDirection,
} from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Tag = "div" | "li" | "p" | "article" | "figure" | "span";

interface Props {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  as?: Tag;
  className?: string;
  /** Reveal with a clip-path mask instead of a fade (used for large type and image masks). */
  mask?: boolean;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  as = "div",
  className,
  mask,
}: Props) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  const hidden = mask
    ? { opacity: 0, clipPath: "inset(0 0 100% 0)" }
    : hiddenState(direction, reduced);
  const shown = mask ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : visibleState;

  return (
    <Component
      data-reveal=""
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={viewport}
      transition={{
        duration: reduced ? duration.fast : duration.slow,
        delay: reduced ? 0 : delay,
        ease: ease.out,
      }}
    >
      {children}
    </Component>
  );
}
