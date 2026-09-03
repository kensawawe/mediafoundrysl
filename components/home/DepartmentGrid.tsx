"use client";

import { useState, useSyncExternalStore } from "react";
import clsx from "clsx";
import { Slate } from "@/components/ui/Slate";
import { services as servicesEn } from "@/lib/content/services";
import { services as servicesKri } from "@/lib/content/services.kri";
import { useTranslated } from "@/lib/content/useTranslated";

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

function useHoverCapable() {
  return useSyncExternalStore(
    subscribeHoverCapable,
    () => window.matchMedia("(hover: hover)").matches,
    () => true,
  );
}

function subscribeWideLayout(callback: () => void) {
  const mql = window.matchMedia("(min-width: 640px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/** Below `sm`, three columns leave no room for a readable title next to the
 *  badge, so the grid drops to two columns instead. */
function useColumns() {
  const isWide = useSyncExternalStore(
    subscribeWideLayout,
    () => window.matchMedia("(min-width: 640px)").matches,
    () => true,
  );
  return isWide ? 3 : 2;
}

export function DepartmentGrid() {
  const services = useTranslated(servicesEn, servicesKri);
  const COLS = useColumns();
  const ROWS = Math.ceil(services.length / COLS);
  const [active, setActive] = useState<number | null>(null);
  const hoverCapable = useHoverCapable();

  const activeRow = active === null ? null : Math.floor(active / COLS);
  const activeCol = active === null ? null : active % COLS;

  return (
    <div
      // Base height is derived, not guessed: 2 columns x 3 rows of square
      // cells, given the Container's px-6 side padding and this grid's own
      // gap-3 — solving cellWidth = cellHeight for (100vw - 48px - 12px)/2
      // per cell, times 3 rows plus 2 row-gaps, collapses to 150vw - 66px.
      className="grid h-[calc(150vw-66px)] gap-3 sm:h-[560px] md:h-[640px] md:gap-5"
      style={{
        gridTemplateRows: trackSizes(activeRow, ROWS),
        gridTemplateColumns: trackSizes(activeCol, COLS),
        transition:
          "grid-template-rows 0.5s cubic-bezier(0.65,0,0.35,1), grid-template-columns 0.5s cubic-bezier(0.65,0,0.35,1)",
        contain: "layout",
      }}
    >
      {services.map((service, i) => {
        const isActive = active === i;
        return (
          <button
            key={service.code}
            type="button"
            aria-label={`${service.title} — view details`}
            className={clsx(
              "focus-ring relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-background text-left transition-colors duration-300",
              isActive ? "border-accent-fill" : "border-border-subtle",
            )}
            onMouseEnter={hoverCapable ? () => setActive(i) : undefined}
            onMouseLeave={hoverCapable ? () => setActive(null) : undefined}
            onClick={!hoverCapable ? () => setActive(isActive ? null : i) : undefined}
          >
            <div className="relative min-h-0 flex-1 overflow-hidden bg-ink">
              {service.image ? (
                // eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Slate label="Studio reel" variant="video" aspect="h-full" grainOpacity={0.05} />
              )}
            </div>

            <div className="flex-none border-t border-border-subtle">
              <div className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4">
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-[0.65rem] font-bold uppercase text-background"
                >
                  {service.code}
                </span>
                <span className="truncate font-body text-base font-bold text-foreground sm:text-lg">
                  {service.title}
                </span>
              </div>

              <div
                className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2 px-4 pb-4 sm:px-5 sm:pb-5">
                    <p className="font-body text-sm text-foreground/70 sm:text-base">
                      {service.description}
                    </p>
                    <ul className="space-y-1">
                      {service.examples.map((example) => (
                        <li
                          key={example}
                          className="flex items-baseline gap-2 font-body text-xs text-foreground/55 sm:text-sm"
                        >
                          <span
                            aria-hidden
                            className="h-1 w-1 shrink-0 translate-y-[-2px] bg-accent-fill"
                          />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
