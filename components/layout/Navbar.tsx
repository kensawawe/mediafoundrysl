"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import clsx from "clsx";
import { navLinks } from "@/lib/content/site";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastY = useRef(0);

  useEffect(() => setMounted(true), []);

  // The homepage hero is a fixed dark (ink) frame — while the transparent
  // navbar floats over it, force light text. Every other page's top section
  // sits on the theme's normal background, so the default ink/paper text
  // already has correct contrast there.
  const overDarkHero = pathname === "/" && !scrolled;
  // The logo has a white variant (for dark surfaces) and a dark variant
  // (for light surfaces) instead of a backing plate — pick whichever
  // matches what's actually behind the navbar: always dark over the hero,
  // otherwise whatever the current theme's background is.
  const onDarkSurface = overDarkHero || (mounted && resolvedTheme === "dark");

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
          overDarkHero ? "text-paper" : "text-foreground",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-10 lg:px-16">
          <Link
            href="/"
            className="focus-ring inline-flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
            <img
              src={onDarkSurface ? "/logo-white.png" : "/logo-dark.png"}
              alt="The Media Foundry"
              width={1516}
              height={176}
              className="h-[18px] w-auto md:h-[22px]"
            />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "focus-ring font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:text-accent-text",
                  overDarkHero ? "text-paper/70" : "text-current/70",
                )}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <Button
              href="/#contact"
              variant="primary"
              className={clsx(
                "px-5 py-2.5 text-xs",
                overDarkHero && "border-paper bg-paper text-ink hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink",
              )}
            >
              Start a project
            </Button>
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
                  className="focus-ring font-display text-5xl font-black uppercase tracking-tight"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * navLinks.length }}
              className="flex items-center gap-6 pt-4"
            >
              <Button href="/#contact" variant="primary" onClick={() => setMenuOpen(false)}>
                Start a project
              </Button>
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
