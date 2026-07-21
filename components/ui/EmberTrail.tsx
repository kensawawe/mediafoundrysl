"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * The studio's one signature "molten" element: a soft ember glow that trails
 * the cursor with viscous lag, like heat rather than a pointer. Everything
 * else on the site is hard-edged and cast; this is the only thing that
 * flows — desktop pointer only, and off entirely under reduced-motion.
 */
export function EmberTrail() {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)",
      () => {
        const el = dotRef.current;
        if (!el) return;

        const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" });

        function onMove(e: MouseEvent) {
          xTo(e.clientX);
          yTo(e.clientY);
          gsap.to(el, { opacity: 1, duration: 0.3 });
        }

        function onLeave() {
          gsap.to(el, { opacity: 0, duration: 0.5 });
        }

        window.addEventListener("mousemove", onMove);
        document.documentElement.addEventListener("mouseleave", onLeave);

        return () => {
          window.removeEventListener("mousemove", onMove);
          document.documentElement.removeEventListener("mouseleave", onLeave);
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-plus-lighter [@media(pointer:fine)]:block"
      style={{
        background:
          "radial-gradient(circle, rgba(255,74,28,0.22) 0%, rgba(255,74,28,0.07) 40%, transparent 72%)",
        filter: "blur(10px)",
        borderRadius: "9999px",
      }}
    />
  );
}
