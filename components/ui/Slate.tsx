"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

type SlateProps = {
  label: string;
  category?: string;
  variant?: "video" | "photo";
  aspect?: string;
  className?: string;
  rounded?: boolean;
  /** Reserve the continuously-atmospheric breathing vignette for the hero only. */
  atmospheric?: boolean;
  grainOpacity?: number;
};

const grainSvg =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  );

function useTimecode(active: boolean) {
  const [frames, setFrames] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setFrames((f) => f + 1), 42);
    return () => clearInterval(id);
  }, [active]);

  const totalSeconds = Math.floor(frames / 24);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  const f = String(frames % 24).padStart(2, "0");
  return `${h}:${m}:${s}:${f}`;
}

/**
 * Diegetic production-artifact placeholder for real Sierra Leone footage/photography.
 * Reads as "frame awaiting real media" — slate metadata, scanlines, registration
 * marks — rather than decorative gradient-blob filler.
 */
export function Slate({
  label,
  category,
  variant = "photo",
  aspect = "aspect-video",
  className,
  rounded = false,
  atmospheric = false,
  grainOpacity = 0.06,
}: SlateProps) {
  const timecode = useTimecode(variant === "video");

  return (
    <div
      className={clsx(
        "group relative isolate w-full overflow-hidden bg-slate-bg text-white",
        aspect,
        rounded && "rounded-sm",
        className,
      )}
    >
      {atmospheric && (
        <div
          aria-hidden
          className="animate-hero-breathe absolute -inset-[10%]"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, rgba(30,181,58,0.22), transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(0,114,198,0.22), transparent 55%)",
            filter: "blur(50px)",
          }}
        />
      )}

      <div
        aria-hidden
        className="slate-scanlines absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        style={{ backgroundImage: `url("${grainSvg}")`, opacity: grainOpacity }}
      />

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Registration brackets — film-frame / viewfinder convention */}
      {[
        "left-3 top-3 border-l border-t",
        "right-3 top-3 border-r border-t",
        "left-3 bottom-3 border-l border-b",
        "right-3 bottom-3 border-r border-b",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={clsx("absolute h-3 w-3 border-white/35", pos)}
        />
      ))}

      {variant === "video" && (
        <>
          <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/80">
            <span className="animate-rec-pulse h-1.5 w-1.5 rounded-full bg-accent-fill" />
            REC {timecode}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
              <span
                aria-hidden
                className="ml-1 border-y-[8px] border-l-[13px] border-y-transparent border-l-white/90"
              />
            </div>
          </div>
        </>
      )}

      {variant === "photo" && (
        <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-wider text-white/60">
          f/2.8 · 1/250 · ISO 400
        </div>
      )}

      {category && (
        <span className="absolute right-4 top-4 border border-white/25 bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm">
          {category}
        </span>
      )}

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
          SL / {category ?? "FOOTAGE"} / PLACEHOLDER
          <span className="text-white/30"> — {label}</span>
        </p>
      </div>
    </div>
  );
}
