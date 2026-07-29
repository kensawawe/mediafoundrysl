"use client";

import { useState, useSyncExternalStore } from "react";
import clsx from "clsx";
import { Slate } from "@/components/ui/Slate";
import { WriteOn } from "@/components/ui/RevealText";
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
 * Department grid — four hover-expanding frames, each resting on just its
 * title (write-on reveal) and swapping to its description + example
 * services on hover (see the accordion version on the Work page for the
 * same detail in a non-visual layout). Hovering a tile grows it via CSS
 * grid track sizing; on touch, where there's no hover, tapping does both.
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
            aria-label={`${service.title} — view reel`}
            className={clsx(
              "focus-ring relative block h-full w-full overflow-hidden border transition-colors duration-300",
              isActive ? "border-accent-fill" : "border-border-subtle",
            )}
            onMouseEnter={hoverCapable ? () => setActive(i) : undefined}
            onMouseLeave={hoverCapable ? () => setActive(null) : undefined}
            onClick={!hoverCapable ? () => setActive(isActive ? null : i) : undefined}
          >
            <Slate label="Studio reel" variant="video" aspect="h-full" grainOpacity={0.05} />

            {/* Scrim dims Slate's own REC/caption chrome generally; the
                pb-16/sm:pb-10 clearance below keeps this text's baseline
                clear of Slate's bottom caption specifically, sized to its
                worst case (it wraps to 2-3 lines on the narrowest tiles). */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink/95 via-ink/55 to-transparent"
            />

            <div
              aria-hidden
              className={clsx(
                "pointer-events-none absolute inset-0 z-20 flex min-w-0 items-end px-4 pb-16 pt-5 transition-opacity duration-300 sm:px-6 sm:pb-10",
                isActive ? "opacity-0" : "opacity-100",
              )}
            >
              <WriteOn
                className="font-serif text-lg text-paper sm:text-2xl md:text-3xl"
                delay={0.3 + i * 0.15}
                duration={0.9}
              >
                {service.title}
              </WriteOn>
            </div>

            <div
              aria-hidden
              className={clsx(
                "pointer-events-none absolute inset-0 z-20 flex flex-col justify-end gap-3 bg-ink/85 px-4 pb-16 pt-5 transition-opacity duration-300 sm:gap-4 sm:px-6 sm:pb-10",
                isActive ? "opacity-100" : "opacity-0",
              )}
            >
              <p className="font-serif text-sm text-paper sm:text-lg">{service.description}</p>
              <ul className="space-y-1.5">
                {service.examples.map((example) => (
                  <li
                    key={example}
                    className="flex items-baseline gap-2.5 font-serif text-xs text-paper/85 sm:text-base"
                  >
                    <span aria-hidden className="h-1 w-1 shrink-0 translate-y-[-2px] bg-accent-fill" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        );
      })}
    </div>
  );
}
