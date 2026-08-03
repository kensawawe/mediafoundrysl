import clsx from "clsx";

/**
 * Replaces the old decorative "eyebrow" — reads as a broadcast slate/scene tag
 * (SCENE / CATEGORY / timecode) rather than generic uppercase-tracked label.
 */
export function SlateTag({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index?: string;
}) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-current/60",
        className,
      )}
    >
      {index && <span className="text-accent-text">{index}</span>}
      <span>{children}</span>
    </div>
  );
}
