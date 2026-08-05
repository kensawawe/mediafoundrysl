"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { Slate } from "@/components/ui/Slate";
import { services as servicesEn } from "@/lib/content/services";
import { services as servicesKri } from "@/lib/content/services.kri";
import { useTranslated } from "@/lib/content/useTranslated";

const COLS = 3;

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
 * Department grid — six hover-expanding frames, each resting on its plain
 * photo and swapping to its description + example services on hover (see
 * the accordion version on the Work page for the same detail in a
 * non-visual layout). Hovering a tile grows it via CSS grid track sizing;
 * on touch, where there's no hover, tapping does both.
 */
export function DepartmentGrid() {
  const services = useTranslated(servicesEn, servicesKri);
  const ROWS = Math.ceil(services.length / COLS);
  const [active, setActive] = useState<number | null>(null);
  const hoverCapable = useHoverCapable();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Photo tiles need more definition against a white page than the default
  // hairline border gives — bump width and contrast in light mode only;
  // dark mode already reads fine against the black background.
  const isLight = !mounted || resolvedTheme !== "dark";

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
              "focus-ring relative block h-full w-full overflow-hidden transition-colors duration-300",
              isLight ? "border-2" : "border",
              isActive ? "border-accent-fill" : isLight ? "border-border-strong" : "border-border-subtle",
            )}
            onMouseEnter={hoverCapable ? () => setActive(i) : undefined}
            onMouseLeave={hoverCapable ? () => setActive(null) : undefined}
            onClick={!hoverCapable ? () => setActive(isActive ? null : i) : undefined}
          >
            {service.image ? (
              <div className="relative isolate h-full w-full overflow-hidden bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            ) : (
              <Slate label="Studio reel" variant="video" aspect="h-full" grainOpacity={0.05} />
            )}

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
