"use client";

import { useMemo, useState } from "react";
import type { Creator } from "@/types/content";
import { uniqueCategories } from "@/lib/content-guards";
import { CreatorFilter } from "@/components/creators/creator-filter";
import { CreatorGrid } from "@/components/creators/creator-grid";

interface Props {
  creators: Creator[];
  theme: "creator" | "campus";
  label: string;
}

export function CreatorShowcase({ creators, theme, label }: Props) {
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => uniqueCategories(creators), [creators]);
  const visible = useMemo(() => {
    const filtered = category ? creators.filter((c) => c.category === category) : creators;
    return [...filtered].sort(
      (a, b) => (b.youtubeSubscribers ?? -1) - (a.youtubeSubscribers ?? -1),
    );
  }, [creators, category]);

  if (creators.length === 0) {
    return <p className="mt-16 text-ink-2">Creators will appear here soon.</p>;
  }

  return (
    <div className="mt-10 sm:mt-12">
      <CreatorFilter
        categories={categories}
        activeCategory={category}
        onCategory={setCategory}
        accent={theme}
        label={label}
      />
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "creator" : "creators"}
        {category ? ` in ${category}` : ""}
      </p>
      <div className="mt-8 sm:mt-10">
        <CreatorGrid key={category ?? "all"} creators={visible} theme={theme} />
      </div>
    </div>
  );
}
