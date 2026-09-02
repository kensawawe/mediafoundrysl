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
 * Hovering a row slows its scroll to a third speed rather than stopping it
 * outright, via the .marquee-row:hover rule in globals.css — a plain CSS
 * rule rather than a Tailwind group-hover:[...] arbitrary utility, since
 * Tailwind silently failed to generate a rule for the calc()-with-
 * multiplication variant tried first (verified: no matching rule showed up
 * in the compiled stylesheet). Other rows are unaffected since the
 * :hover match and its descendant .animate-feature-marquee are scoped to
 * this one instance's DOM subtree.
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
  return (
    <div
      className={clsx("marquee-row flex gap-[var(--gap)] overflow-hidden [--gap:1rem]", className)}
      style={style}
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
