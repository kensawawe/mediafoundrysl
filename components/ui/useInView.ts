"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element has entered the viewport. Unlike Framer Motion's
 * `whileInView`, this checks the element's position synchronously on mount
 * (covering content that's already in view when the page loads) instead of
 * relying solely on an IntersectionObserver's first callback.
 */
export function useInView<T extends HTMLElement>(amount = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const visibleHeight =
      Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
    if (rect.height > 0 && visibleHeight / rect.height >= amount) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: amount },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [amount]);

  return { ref, inView };
}
