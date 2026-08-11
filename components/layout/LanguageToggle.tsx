"use client";

import { useState } from "react";
import clsx from "clsx";
import { useLanguage, type Language } from "@/components/layout/LanguageProvider";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "kri", label: "KR" },
];

/** Shows only the active language as a filled square; hovering (or tapping,
 *  on touch) reveals the other option(s) in a dropdown below it. */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  const others = LANGUAGES.filter((l) => l.code !== lang);

  return (
    <div
      className={clsx("group/lang relative inline-block font-mono text-xs font-bold uppercase", className)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="focus-ring flex h-6 w-6 shrink-0 items-center justify-center bg-accent-fill text-accent-fill-ink"
      >
        {current.label}
      </button>

      <div
        role="listbox"
        className={clsx(
          // Flush against the button (no margin gap) — a gap here is dead
          // space the mouse has to cross without being over the button or
          // the dropdown, which fires this wrapper's onMouseLeave and
          // closes the menu before the pointer ever reaches it.
          "absolute left-0 top-full z-10 hidden w-6 flex-col border border-border-subtle bg-background group-hover/lang:flex",
          open && "!flex",
        )}
      >
        {others.map((l) => (
          <button
            key={l.code}
            type="button"
            role="option"
            aria-selected={false}
            onClick={() => {
              setLang(l.code);
              setOpen(false);
            }}
            className="focus-ring flex h-6 w-6 shrink-0 items-center justify-center text-foreground/70 transition-colors duration-300 hover:bg-accent-fill hover:text-accent-fill-ink"
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
