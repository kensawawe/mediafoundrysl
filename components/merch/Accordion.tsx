"use client";

import { useState } from "react";
import clsx from "clsx";

export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-subtle">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="focus-ring flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-mono text-xs uppercase tracking-[0.03em]">{title}</span>
        <span
          aria-hidden
          className={clsx("font-mono text-base leading-none transition-transform duration-300", open && "rotate-45")}
        >
          +
        </span>
      </button>
      {open && (
        <p className="max-w-lg pb-5 font-body text-sm leading-relaxed text-current/65">{children}</p>
      )}
    </div>
  );
}
