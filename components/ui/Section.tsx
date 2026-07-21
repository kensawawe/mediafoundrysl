import type { ReactNode } from "react";
import clsx from "clsx";
import { Container } from "./Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  bleed?: boolean;
};

export function Section({
  children,
  className,
  containerClassName,
  id,
  bleed = false,
}: SectionProps) {
  return (
    <section id={id} className={clsx("relative py-24 md:py-32", className)}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-3 font-body text-xs font-medium uppercase tracking-[0.3em] text-foreground/50",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-accent-green" />
      {children}
    </span>
  );
}
