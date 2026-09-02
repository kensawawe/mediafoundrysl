import clsx from "clsx";

/**
 * Configurable infinite marquee — renders `repeat` side-by-side copies of
 * the children, each animated by exactly one copy's width so consecutive
 * copies line up seamlessly. Duration/gap are read from the --duration/
 * --gap custom properties, settable via className (e.g. "[--duration:40s]"),
 * which cascade down from this element to the animated copies below it.
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
  children,
}: {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("group flex overflow-hidden [--gap:1rem]", className)}>
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
