"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { workItems } from "@/lib/content/work";

export function FeaturedWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const [dragging, setDragging] = useState(false);

  function onPointerDown(e: React.PointerEvent) {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = {
      isDown: true,
      startX: e.clientX,
      scrollLeft: track.scrollLeft,
    };
    setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    const track = trackRef.current;
    if (!track || !dragState.current.isDown) return;
    track.scrollLeft = dragState.current.scrollLeft - (e.clientX - dragState.current.startX);
  }

  function endDrag() {
    dragState.current.isDown = false;
    setDragging(false);
  }

  return (
    <section
      id="work"
      className="relative overflow-hidden border-b border-border-subtle bg-background py-24 md:py-32"
    >
      <Container className="mb-10 md:mb-14">
        <Eyebrow>Featured work</Eyebrow>
        <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          A wall of stories.
        </h2>
      </Container>

      <div
        ref={trackRef}
        role="region"
        aria-label="Featured work, scroll horizontally"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={`focus-ring flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:gap-8 md:px-10 lg:px-16 [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {workItems.map((item) => (
          <div
            key={item.slug}
            className="group w-[78vw] flex-shrink-0 snap-start sm:w-[52vw] md:w-[36vw] lg:w-[30vw]"
          >
            <div className="overflow-hidden rounded-xl transition-transform duration-500 group-hover:scale-[1.02]">
              <MediaPlaceholder
                label={item.title}
                category={item.category}
                variant={item.variant}
                tone={item.tone}
                aspect="aspect-[4/5]"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-xl tracking-tight text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 font-body text-sm text-foreground/55">
                  {item.category}
                </p>
              </div>
              <span
                aria-hidden
                className="mt-1 shrink-0 font-body text-lg text-foreground/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-green-ink"
              >
                →
              </span>
            </div>
          </div>
        ))}

        <div className="w-[2vw] flex-shrink-0" aria-hidden />
      </div>
    </section>
  );
}
