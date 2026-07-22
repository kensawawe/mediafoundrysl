"use client";

import { useRef } from "react";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useInView } from "@/components/ui/useInView";

/**
 * The brass hairline that opens most sections — drawn in like a fuse
 * catching, with a small ember spark leading the line. Ties the "cast
 * metal, poured once" motif into a recurring structural device rather
 * than a static divider.
 */
export function IgniteRule({
  className,
  lineColor,
}: {
  className?: string;
  /** Overrides the default brass line color for this instance only. */
  lineColor?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.6 });
  const lineRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!inView) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline();
        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
        ).fromTo(
          sparkRef.current,
          { left: "0%", opacity: 1 },
          { left: "100%", opacity: 0, duration: 1.1, ease: "power2.inOut" },
          "<",
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(lineRef.current, { scaleX: 1 });
      });

      return () => mm.revert();
    },
    { dependencies: [inView], scope: ref },
  );

  return (
    <div ref={ref} className={clsx("relative w-full", className)}>
      <div
        ref={lineRef}
        className="ingot-rule w-full"
        style={lineColor ? { background: lineColor } : undefined}
      />
      <span
        ref={sparkRef}
        aria-hidden
        className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{
          background: "radial-gradient(circle, #8fb3ff 0%, #2451d6 60%, transparent 100%)",
          boxShadow: "0 0 10px 2px rgba(36,81,214,0.7)",
        }}
      />
    </div>
  );
}
