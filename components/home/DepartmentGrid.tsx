"use client";

import { useState, useSyncExternalStore } from "react";
import clsx from "clsx";
import { Slate } from "@/components/ui/Slate";
import { services } from "@/lib/content/services";

const COLS = 2;
const ROWS = Math.ceil(services.length / COLS);

/** Active track gets 3fr, every other track on that axis gets 1fr; no
 *  active track means every track is equal. */
function trackSizes(activeIndex: number | null, length: number) {
  if (activeIndex === null) return Array(length).fill("1fr").join(" ");
  return Array.from({ length }, (_, i) => (i === activeIndex ? "3fr" : "1fr")).join(" ");
}

function subscribeHoverCapable(callback: () => void) {
  const mql = window.matchMedia("(hover: hover)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/** Assume hover-capable until the client confirms otherwise — matches the
 *  server-rendered markup, and touch devices correct to tap-to-expand
 *  as soon as this reads real media-query state. */
function useHoverCapable() {
  return useSyncExternalStore(
    subscribeHoverCapable,
    () => window.matchMedia("(hover: hover)").matches,
    () => true,
  );
}

/**
 * Purely visual department grid — no titles or descriptions, just four
 * hover-expanding frames (see the accordion version with full detail on
 * the Work page instead). Hovering a tile grows it via CSS grid track
 * sizing; on touch, where there's no hover, tapping does the same.
 */
export function DepartmentGrid() {
  const [active, setActive] = useState<number | null>(null);
  const hoverCapable = useHoverCapable();

  const activeRow = active === null ? null : Math.floor(active / COLS);
  const activeCol = active === null ? null : active % COLS;

  return (
    <div
      className="grid h-[420px] gap-3 sm:h-[520px] md:h-[600px] md:gap-4"
      style={{
        gridTemplateRows: trackSizes(activeRow, ROWS),
        gridTemplateColumns: trackSizes(activeCol, COLS),
        transition:
          "grid-template-rows 0.5s cubic-bezier(0.65,0,0.35,1), grid-template-columns 0.5s cubic-bezier(0.65,0,0.35,1)",
      }}
    >
      {services.map((service, i) => {
        const isActive = active === i;
        return (
          <button
            key={service.code}
            type="button"
            aria-label={`View department reel ${i + 1} of ${services.length}`}
            className={clsx(
              "focus-ring relative block h-full w-full overflow-hidden border transition-colors duration-300",
              isActive ? "border-accent-fill" : "border-border-subtle",
            )}
            onMouseEnter={hoverCapable ? () => setActive(i) : undefined}
            onMouseLeave={hoverCapable ? () => setActive(null) : undefined}
            onClick={!hoverCapable ? () => setActive(isActive ? null : i) : undefined}
          >
            <Slate label="Studio reel" variant="video" aspect="h-full" grainOpacity={0.05} />
          </button>
        );
      })}
    </div>
  );
}
