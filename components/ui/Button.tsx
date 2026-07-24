"use client";

import clsx from "clsx";
import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

const base =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-none border font-body text-sm font-semibold uppercase tracking-[0.08em] px-7 py-3.5 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<string, string> = {
  primary:
    "border-foreground bg-foreground text-background hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink",
  outline:
    "border-border-strong bg-transparent text-foreground hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink",
  ghost: "border-transparent bg-transparent text-current hover:text-accent-text",
};

export function Button({
  href,
  onClick,
  type = "button",
  variant = "primary",
  className,
  disabled,
  children,
}: ButtonProps) {
  const classes = clsx(base, variants[variant], className);

  const content = href ? (
    <Link href={href} className={classes}>
      {children}
    </Link>
  ) : (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );

  // Every button on the site gets the same cursor-pull as the hero CTA.
  // Skipped while disabled — a button that can't be clicked shouldn't chase
  // the cursor. `inline-flex` keeps the wrapper shrink-wrapped to the
  // button's own size no matter what layout context it sits in, so the
  // pull math tracks the visible button rather than a stray full-width box.
  if (disabled) return content;

  return <Magnetic className="inline-flex">{content}</Magnetic>;
}
