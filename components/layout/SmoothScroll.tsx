"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Module-level handle so the route-change effect can reach the instance.
let lenis: Lenis | null = null;

/**
 * Eased "inertia" scrolling: wheel and trackpad input glides to a stop
 * instead of halting the instant you let go. Mouse/trackpad only — touch
 * screens keep their native momentum scrolling — and it's skipped entirely
 * for visitors who ask for reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 0.9, // how long the glide takes to settle, in seconds
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      wheelMultiplier: 0.92, // a touch less travel per wheel tick, so it doesn't overshoot
      anchors: true, // same-page #links glide too
    });
    lenis = instance;

    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // A new page should start at the top, not wherever the glide left off —
  // but only on a real route change, so the browser's own scroll restoration
  // still works when the page is first loaded or reloaded.
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
