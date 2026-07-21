"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useInView } from "@/components/ui/useInView";
import { framerEase } from "@/lib/motion/easing";

/**
 * Line-level clip-path wipe — reads as a slate closing on a scene rather than
 * a generic fade/slide. Used for headline-weight text only.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  baseDelay = 0,
  stagger = 0.1,
  onMount = false,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  baseDelay?: number;
  stagger?: number;
  onMount?: boolean;
}) {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const show = onMount || inView;

  return (
    <span ref={ref} className={clsx("block", className)}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={clsx("block", lineClassName)}
            initial={{ clipPath: "inset(0 0 100% 0)", y: 24 }}
            animate={
              show
                ? { clipPath: "inset(0 0 0% 0)", y: 0 }
                : { clipPath: "inset(0 0 100% 0)", y: 24 }
            }
            transition={{
              duration: 0.9,
              ease: framerEase,
              delay: baseDelay + i * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Simple scroll-triggered fade-up for body copy / paragraphs / cards. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 14,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, ease: framerEase, delay }}
    >
      {children}
    </motion.div>
  );
}
