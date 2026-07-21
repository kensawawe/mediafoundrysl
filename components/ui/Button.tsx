"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const base =
  "group relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-body text-sm font-medium tracking-wide transition-colors duration-300";

const variants = {
  primary: "bg-foreground text-background hover:bg-accent-green hover:text-black",
  ghost: "text-foreground/80 hover:text-foreground",
  outline: "border border-border-subtle text-foreground hover:border-accent-blue",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const content = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={clsx(base, variants[variant], className)}
    >
      {children}
      {variant !== "ghost" && (
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="focus-ring inline-block rounded-full">
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className="focus-ring inline-block rounded-full"
    >
      {content}
    </button>
  );
}
