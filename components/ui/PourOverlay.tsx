/**
 * Hover state for work thumbnails — an ember wash "poured" down over the
 * frame (see .pour-overlay in globals.css). Render as a sibling of the
 * media inside a `group` container.
 */
export function PourOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="pour-overlay p-4 sm:p-5" aria-hidden>
      {children}
    </div>
  );
}
