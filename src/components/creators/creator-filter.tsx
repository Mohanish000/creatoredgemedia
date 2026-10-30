"use client";

import { cn } from "@/lib/utils";

interface Props {
  categories: string[];
  activeCategory: string | null;
  onCategory: (category: string | null) => void;
  accent: "creator" | "campus";
  label: string;
}

const activeFill = {
  creator: "bg-creator text-bg border-creator",
  campus: "bg-campus text-bg border-campus",
};

const chip =
  "inline-flex min-h-11 items-center rounded-full border px-4 text-caption font-medium transition-colors";

export function CreatorFilter({ categories, activeCategory, onCategory, accent, label }: Props) {
  const showChips = categories.length > 1;
  if (!showChips) return null;
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {showChips ? (
        <div
          role="group"
          aria-label={`Filter ${label} by category`}
          className="flex flex-wrap gap-2"
        >
          {[null, ...categories].map((category) => {
            const pressed = activeCategory === category;
            return (
              <button
                key={category ?? "all"}
                type="button"
                aria-pressed={pressed}
                onClick={() => onCategory(category)}
                className={cn(
                  chip,
                  pressed
                    ? `${activeFill[accent]} on-light`
                    : "border-edge text-ink-2 hover:border-ink hover:text-ink",
                )}
              >
                {category ?? "All"}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
