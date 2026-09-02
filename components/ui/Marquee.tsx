import clsx from "clsx";

/**
 * Configurable infinite marquee — renders `repeat` side-by-side copies of
 * the children, each animated by exactly one copy's width so consecutive
 * copies line up seamlessly. Duration/gap are read from the --duration/
 * --gap custom properties — pass them via `style` (dynamic per-instance
 * values must go through style, not a template-literal className: Tailwind
 * only generates CSS for class strings it can see literally in source, so
 * an interpolated class like `[--duration:${x}]` silently produces nothing),
 * which cascade down from this element to the animated copies below it.
 */
export function Marquee({
  className,
  style,
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx("group flex overflow-hidden [--gap:1rem]", className)}
      style={style}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={clsx(
            "flex shrink-0 items-center justify-around gap-[var(--gap)] pr-[var(--gap)]",
            "animate-feature-marquee",
            reverse && "animate-feature-marquee-reverse",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
