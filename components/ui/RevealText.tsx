"use client";

import type { ElementType, ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useInView } from "./useInView";

type RevealTextProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
};

/** Clips a block upward into view; use RevealLines for per-line stagger. */
export function RevealText({
  children,
  as: Tag = "div",
  className,
  delay = 0,
}: RevealTextProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : undefined}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Tag>{children}</Tag>
    </motion.div>
  );
}

/**
 * Reveals an array of lines/words with a staggered upward clip animation.
 * Set `onMount` for above-the-fold content that should animate immediately
 * rather than waiting on a scroll-triggered viewport check.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  as: Tag = "span",
  stagger = 0.08,
  baseDelay = 0,
  onMount = false,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  as?: ElementType;
  stagger?: number;
  baseDelay?: number;
  onMount?: boolean;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const animate = onMount || inView;

  return (
    <span ref={ref} className={clsx("block", className)}>
      {lines.map((line, i) => (
        <span key={line + i} className="block overflow-hidden">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={animate ? { y: "0%", opacity: 1 } : undefined}
            transition={{
              duration: 0.9,
              delay: baseDelay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={clsx("block", lineClassName)}
          >
            <Tag>{line}</Tag>
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
