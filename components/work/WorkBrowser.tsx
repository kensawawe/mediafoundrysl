"use client";

import { useState } from "react";
import clsx from "clsx";
import { WorkCard } from "@/components/work/WorkCard";
import { workCategories, workItems, type WorkCategory } from "@/lib/content/work";

export function WorkBrowser() {
  const [active, setActive] = useState<WorkCategory | "All">("All");

  const filtered =
    active === "All" ? workItems : workItems.filter((item) => item.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-border-subtle pb-8">
        {(["All", ...workCategories] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={clsx(
              "focus-ring border px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors",
              active === cat
                ? "border-foreground bg-foreground text-background"
                : "border-border-subtle hover:border-accent-text hover:text-accent-text",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
        {filtered.map((item, i) => (
          <WorkCard key={item.slug} item={item} delay={(i % 8) * 0.04} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 font-mono text-sm text-current/50">
          No work in this category yet.
        </p>
      )}
    </div>
  );
}
