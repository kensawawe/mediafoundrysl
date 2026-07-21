import clsx from "clsx";

/**
 * Replaces the old decorative "eyebrow" — reads as a broadcast slate/scene tag
 * (SCENE / CATEGORY / timecode) rather than generic uppercase-tracked label.
 */
export function SlateTag({
  children,
  className,
  index,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  index?: string;
  /** Use "inverse" inside a Section tone="inverse" block so the accent
   *  stays AA-contrast against the flipped background. */
  tone?: "default" | "inverse";
}) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-current/60",
        className,
      )}
    >
      {index && (
        <span className={tone === "inverse" ? "text-accent-text-inverse" : "text-accent-text"}>
          {index}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}
