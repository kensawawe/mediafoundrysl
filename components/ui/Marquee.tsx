"use client";

import { useRef } from "react";
import clsx from "clsx";

/**
 * Configurable infinite marquee — renders `repeat` side-by-side copies of
 * the children, each animated by exactly one copy's width so consecutive
 * copies line up seamlessly. Duration/gap are read from the --duration/
 * --gap custom properties — pass them via `style` (dynamic per-instance
 * values must go through style, not a template-literal className: Tailwind
 * only generates CSS for class strings it can see literally in source, so
 * an interpolated class like `[--duration:${x}]` silently produces nothing).
 *
 * The outer flex gap sits BETWEEN repeated copies (not padding inside each
 * one) — the keyframe translates by exactly one copy-width plus that same
 * gap (calc(-100% - var(--gap))), so it has to be the thing actually
 * separating copies, or the animation overshoots by one gap each loop and
 * stutters at the seam.
 *
 * Hovering a row slows it to a third speed via Animation.playbackRate,
 * not by changing animation-duration (tried first, via a CSS
 * .marquee-row:hover rule): a CSS animation's transform is a function of
 * elapsed-time / duration, so changing duration on an already-running
 * animation instantly recomputes that fraction and the row visibly jumps
 * backward — it looks like the marquee resetting. playbackRate instead
 * scales how fast time advances from the current position, so there's no
 * discontinuity.
 */
export function Marquee({
  className,
  style,
  reverse = false,
  repeat = 4,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  repeat?: number;
  children: React.ReactNode;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const setPlaybackRate = (rate: number) => {
    const row = rowRef.current;
    if (!row) return;
    row.querySelectorAll<HTMLElement>(".animate-feature-marquee").forEach((track) => {
      track.getAnimations().forEach((anim) => {
        anim.playbackRate = rate;
      });
    });
  };

  return (
    <div
      ref={rowRef}
      className={clsx("marquee-row flex gap-[var(--gap)] overflow-hidden [--gap:1rem]", className)}
      style={style}
      onMouseEnter={() => setPlaybackRate(1 / 3)}
      onMouseLeave={() => setPlaybackRate(1)}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={clsx(
            "flex shrink-0 items-center justify-around gap-[var(--gap)]",
            "animate-feature-marquee",
            reverse && "animate-feature-marquee-reverse",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
