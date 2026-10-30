"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Props {
  children: ReactNode;
  strength?: number;
}

/** Subtle magnetic pull toward the pointer. Pointer-fine devices only; off under reduced motion. */
export function Magnetic({ children, strength = 0.25 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (event: React.PointerEvent) => {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-12, Math.min(12, dx * strength)));
    y.set(Math.max(-12, Math.min(12, dy * strength)));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
