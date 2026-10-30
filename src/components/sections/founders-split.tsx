"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { X } from "lucide-react";
import type { Founder } from "@/types/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FounderPanel } from "@/components/founders/founder-panel";

interface Props {
  creatorFounder: Founder;
  campusFounder: Founder;
}

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function FoundersSplit({ creatorFounder, campusFounder }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });

  const grow = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const limeY = useTransform(scrollYProgress, (v) => `calc(${clamp(v)} * (100cqh - 14px))`);
  const violetY = useTransform(scrollYProgress, (v) => `calc(${1 - clamp(v)} * (100cqh - 14px))`);

  return (
    <section id="founders" ref={ref} aria-labelledby="founders-title" className="relative">
      <h1 id="founders-title" className="sr-only">
        The founders behind CreatorRise and CampusEdge
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <FounderPanel founder={creatorFounder} side="left" />
        <div aria-hidden className="relative z-10 lg:hidden">
          <span className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-edge bg-bg text-ink">
            <X className="size-4" strokeWidth={1.5} />
          </span>
          <motion.div
            data-draw=""
            className="h-px origin-left bg-divider"
            style={{ scaleX: reduced ? 1 : grow }}
          />
        </div>
        <FounderPanel founder={campusFounder} side="right" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
        <span className="absolute top-1/2 left-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-edge bg-bg text-ink lg:grid">
          <X className="size-5" strokeWidth={1.5} />
        </span>
        <div className="absolute inset-y-0 left-1/2 hidden w-px [container-type:size] lg:block">
          <motion.div
            data-draw=""
            className="size-full origin-top bg-divider"
            style={{ scaleY: reduced ? 1 : grow }}
          />
          <motion.span
            className="absolute top-0 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-creator"
            style={{ y: reduced ? 0 : limeY }}
          />
          <motion.span
            className="absolute top-0 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-campus"
            style={{ y: reduced ? "calc(100cqh - 14px)" : violetY }}
          />
        </div>
      </div>
    </section>
  );
}
