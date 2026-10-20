"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import clsx from "clsx";

export interface LayeredTextProps {
  /** Each row shows `top` and, once hovered, `bottom` slides up into view. */
  lines: Array<{ top: string; bottom: string }>;
  fontSize?: string;
  fontSizeMd?: string;
  lineHeight?: number;
  lineHeightMd?: number;
  className?: string;
}

/**
 * Isometric stack of text rows. On hover every row slides up to reveal the next word,
 * staggered from the first row to the last. Decorative: give the page its real heading
 * separately (this renders aria-hidden text).
 */
export function LayeredText({
  lines,
  fontSize = "72px",
  fontSizeMd = "36px",
  lineHeight = 60,
  lineHeightMd = 35,
  className,
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const offsets = (index: number) => {
    const center = Math.floor(lines.length / 2);
    return { desktop: (index - center) * 35, mobile: (index - center) * 20 };
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rows = container.querySelectorAll("p");
    const timeline = gsap.timeline({ paused: true });
    timeline.to(rows, {
      y: window.innerWidth >= 768 ? -lineHeight : -lineHeightMd,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
    });
    const enter = () => timeline.play();
    const leave = () => timeline.reverse();
    container.addEventListener("mouseenter", enter);
    container.addEventListener("mouseleave", leave);
    return () => {
      container.removeEventListener("mouseenter", enter);
      container.removeEventListener("mouseleave", leave);
      timeline.kill();
    };
  }, [lines, lineHeight, lineHeightMd]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={clsx(
        "mx-auto cursor-pointer select-none font-godthem font-normal uppercase tracking-[0.02em] text-foreground antialiased",
        "text-[length:var(--lt-fs)] md:text-[length:var(--lt-fs-md)]",
        className,
      )}
      style={{ "--lt-fs": fontSizeMd, "--lt-fs-md": fontSize } as CSSProperties}
    >
      <ul className="m-0 flex list-none flex-col items-center p-0">
        {lines.map((line, index) => {
          const x = offsets(index);
          const even = index % 2 === 0;
          return (
            <li
              key={index}
              className="relative overflow-hidden [--lt-h:var(--lt-h-sm)] [--lt-tx:var(--lt-tx-sm)] md:[--lt-h:var(--lt-h-md)] md:[--lt-tx:var(--lt-tx-md)]"
              style={
                {
                  height: "var(--lt-h)",
                  transform: `translateX(var(--lt-tx)) skew(${even ? "60deg, -30deg" : "0deg, -30deg"}) scaleY(${even ? "0.66667" : "1.33333"})`,
                  "--lt-h-sm": `${lineHeightMd}px`,
                  "--lt-h-md": `${lineHeight}px`,
                  "--lt-tx-sm": `${x.mobile}px`,
                  "--lt-tx-md": `${x.desktop}px`,
                } as CSSProperties
              }
            >
              {[line.top, line.bottom].map((text, i) => (
                <p
                  key={i}
                  className="m-0 whitespace-nowrap px-[15px] align-top"
                  style={{ height: "var(--lt-h)", lineHeight: "calc(var(--lt-h) - 5px)" }}
                >
                  {text}
                </p>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
