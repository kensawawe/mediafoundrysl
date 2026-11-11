"use client";

import { useEffect, type RefObject } from "react";

/**
 * Picks the hero footage for this device: a 720px-wide cut for phones and Data Saver, a 1280px
 * cut for everything else. It is attached only after the page has finished loading and the
 * browser is idle, so the video download never competes with the page itself; until then the
 * poster image shows. The video's own `autoPlay` starts it once the source is set.
 */
export function useHeroVideoSrc(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const small = window.matchMedia("(max-width: 767px)").matches || connection?.saveData === true;
    const src = small ? "/hero-freetown-720.mp4" : "/hero-freetown-1280.mp4";

    let idle = 0;
    let timer = 0;
    const attach = () => {
      if (el.getAttribute("src")) return;
      el.src = src;
      el.play().catch(() => {
        // Autoplay can be refused (Low Power Mode etc.); the poster stays.
      });
    };
    const whenIdle = () => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(attach, { timeout: 2000 });
      else timer = globalThis.setTimeout(attach, 300) as unknown as number;
    };

    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    return () => {
      window.removeEventListener("load", whenIdle);
      if (idle) window.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
    };
  }, [ref]);
}
