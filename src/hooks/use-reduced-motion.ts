"use client";

import { useReducedMotion as useMotionReducedMotion } from "motion/react";

/** True when the user prefers reduced motion. Resolves to false before hydration. */
export function useReducedMotion(): boolean {
  return useMotionReducedMotion() ?? false;
}
