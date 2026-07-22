import clsx from "clsx";
import { Slate } from "@/components/ui/Slate";
import { PourOverlay } from "@/components/ui/PourOverlay";
import type { WorkItem } from "@/lib/content/work";

/**
 * Renders either a real client asset (when the item has one) or the
 * placeholder Slate frame — as siblings alongside PourOverlay, matching
 * the Link-as-`.group` hover pattern used by both WorkCard and WorkWall.
 */
export function WorkThumb({ item, aspect }: { item: WorkItem; aspect: string }) {
  if (item.restingImage) {
    const fit = item.imageFit ?? "cover";
    return (
      <>
        <div
          className={clsx(
            "relative isolate w-full overflow-hidden",
            fit === "contain" ? "bg-white" : "bg-ink",
            aspect,
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
          <img
            src={item.restingImage}
            alt={item.title}
            className={clsx(
              "absolute inset-0 h-full w-full",
              fit === "contain" ? "object-contain p-10" : "object-cover",
            )}
          />
        </div>
        <PourOverlay>
          {item.hoverImage && (
            // eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured
            <img
              src={item.hoverImage}
              alt=""
              aria-hidden
              className="mb-3 h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
          )}
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70">
            {item.category}
          </span>
          <h3 className="font-display text-xl font-black leading-tight text-paper sm:text-2xl">
            {item.title}
          </h3>
        </PourOverlay>
      </>
    );
  }

  return (
    <>
      <Slate label={item.title} category={item.category} variant={item.variant} aspect={aspect} />
      <PourOverlay>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70">
          {item.category}
        </span>
        <h3 className="font-display text-xl font-black leading-tight text-paper sm:text-2xl">
          {item.title}
        </h3>
      </PourOverlay>
    </>
  );
}
