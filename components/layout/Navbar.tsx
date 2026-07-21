"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    if (menuOpen) {
      setHidden(false);
      return;
    }
    if (latest > previous && latest > 160) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || menuOpen
          ? "border-border-subtle bg-[var(--nav-bg)] backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="focus-ring font-display text-lg tracking-tight text-foreground"
        >
          THE MEDIA FOUNDRY
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring font-body text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="focus-ring relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full"
          >
            <span
              className={clsx(
                "h-px w-6 bg-foreground transition-transform duration-300",
                menuOpen && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={clsx(
                "h-px w-6 bg-foreground transition-transform duration-300",
                menuOpen && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border-subtle bg-[var(--nav-bg)] backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="focus-ring py-3 font-display text-2xl text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
