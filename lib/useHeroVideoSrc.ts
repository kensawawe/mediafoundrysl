"use client";

import { useEffect, type RefObject } from "react";

/**
 * Picks the hero footage for this device once the page is on the client: a 720px-wide cut for
 * phones and Data Saver, a 1280px cut for everything else (about a fifth and two fifths of the
 * original 1080p file). Until then the poster image shows, so nothing blocks first paint.
 * Call it before any effect that pauses/plays the video.
 */
export function useHeroVideoSrc(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const small = window.matchMedia("(max-width: 767px)").matches || connection?.saveData === true;
    el.src = small ? "/hero-freetown-720.mp4" : "/hero-freetown-1280.mp4";
  }, [ref]);
}
