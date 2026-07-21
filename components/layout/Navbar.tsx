"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import clsx from "clsx";
import { navLinks } from "@/lib/content/site";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastY.current;
    setScrolled(y > 40);
    if (y < 80) {
      setHidden(false);
    } else if (diff > 4) {
      setHidden(true);
      setMenuOpen(false);
    } else if (diff < -4) {
      setHidden(false);
    }
    lastY.current = y;
  });

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled
            ? "border-border-subtle bg-nav-bg backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-10 lg:px-16">
          <Link
            href="/"
            className="focus-ring font-display text-lg tracking-tight md:text-xl"
            onClick={() => setMenuOpen(false)}
          >
            THE MEDIA FOUNDRY
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring font-body text-sm uppercase tracking-[0.1em] transition-colors hover:text-accent-text"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="focus-ring flex flex-col gap-1.5 md:hidden"
          >
            <span
              className={clsx(
                "h-px w-6 bg-current transition-transform duration-300",
                menuOpen && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={clsx(
                "h-px w-6 bg-current transition-transform duration-300",
                menuOpen && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-8 bg-background px-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="focus-ring font-display text-4xl"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="pt-4">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
