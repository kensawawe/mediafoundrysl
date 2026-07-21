import clsx from "clsx";
import Link from "next/link";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  children: React.ReactNode;
};

const base =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-none border font-body text-sm font-semibold uppercase tracking-[0.08em] px-7 py-3.5 transition-colors duration-300";

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
  children,
}: ButtonProps) {
  const classes = clsx(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
