"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Framer Motion's `whileInView` gets stuck in the Claude Browser preview pane —
 * use IntersectionObserver directly instead (verified reliable there).
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.2 },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // The Claude Browser preview pane reports document.visibilityState as
    // "hidden" (backgrounded/composited pane), which throttles
    // IntersectionObserver delivery unpredictably — so check synchronously
    // on mount first rather than relying on the observer firing promptly.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
