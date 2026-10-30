export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

export const duration = {
  fast: 0.2,
  base: 0.5,
  slow: 0.9,
} as const;

export const stagger = {
  cards: 0.07,
} as const;

/** Reveal travel in px. Never exceed 40. */
const reveal = {
  distance: 24,
} as const;

export const viewport = { once: true, margin: "-10% 0px" } as const;

export type RevealDirection = "up" | "left" | "right" | "none";

export function hiddenState(direction: RevealDirection, reduced: boolean) {
  if (reduced || direction === "none") return { opacity: 0 };
  if (direction === "left") return { opacity: 0, x: -reveal.distance };
  if (direction === "right") return { opacity: 0, x: reveal.distance };
  return { opacity: 0, y: reveal.distance };
}

export const visibleState = { opacity: 1, x: 0, y: 0 } as const;
