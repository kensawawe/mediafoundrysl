"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import clsx from "clsx";
import { navLinks as navLinksEn, startAProjectLabel as startAProjectLabelEn } from "@/lib/content/site";
import { navLinks as navLinksKri, startAProjectLabel as startAProjectLabelKri } from "@/lib/content/site.kri";
import { useTranslated } from "@/lib/content/useTranslated";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { useCart } from "@/components/layout/CartProvider";

// Dev-only preview link (and cart icon) for the not-yet-public merch
// catalogue. Reading NODE_ENV here (rather than a runtime toggle) means
// Next's bundler dead-code-eliminates this branch entirely on a
// production build — it isn't just hidden, it never ships in the
// deployed JS at all.
const showMerchLink = process.env.NODE_ENV === "development";

function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <path
        d="M4 5.5h8l-.6 8H4.6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      <path
        d="M5.5 5.5V4a2.5 2.5 0 0 1 5 0v1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}

const LANG_HINT_KEY = "mf-lang-hint-seen";
// Fires after the Preloader's own sequence (~4.6s, see Preloader.tsx) has
// finished, so the two never overlap.
const LANG_HINT_SHOW_DELAY = 5300;
const LANG_HINT_VISIBLE_DURATION = 5500;

/**
 * Small pointer callout — same accent-fill treatment as the toggle it's
 * introducing, with a triangular tail aimed back up at it. Centered under
 * the trigger by default; the mobile hamburger sits close enough to the
 * right edge of narrow viewports that a centered bubble would overflow off
 * screen, so it right-aligns instead.
 */
function LangHintBubble({ text, align = "center" }: { text: string; align?: "center" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={clsx(
        "absolute top-full z-20 mt-3 w-max max-w-[220px] rounded-lg bg-accent-fill px-3 py-2 text-left font-body text-xs font-bold leading-snug text-accent-fill-ink shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
        align === "center" ? "left-1/2 -translate-x-1/2" : "right-0",
      )}
    >
      <span
        aria-hidden
        className={clsx(
          "absolute -top-1.5 h-3 w-3 rotate-45 bg-accent-fill",
          align === "center" ? "left-1/2 -translate-x-1/2" : "right-4",
        )}
      />
      {text}
    </motion.div>
  );
}

export function Navbar() {
  const navLinks = useTranslated(navLinksEn, navLinksKri);
  const displayNavLinks = showMerchLink ? [...navLinks, { label: "Merch", href: "/merch" }] : navLinks;
  const startAProjectLabel = useTranslated(startAProjectLabelEn, startAProjectLabelKri);
  const { resolvedTheme } = useTheme();
  const { scrollY } = useScroll();
  const { count } = useCart();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLangHint, setShowLangHint] = useState(false);
  const pathname = usePathname();
  const lastY = useRef(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (pathname !== "/") return;
    if (window.sessionStorage.getItem(LANG_HINT_KEY)) return;
    window.sessionStorage.setItem(LANG_HINT_KEY, "1");

    const showTimer = setTimeout(() => setShowLangHint(true), LANG_HINT_SHOW_DELAY);
    return () => clearTimeout(showTimer);
    // Intentionally only ever runs once per session, on whichever page
    // mounts first — a pathname change later shouldn't retrigger it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showLangHint) return;
    const hideTimer = setTimeout(() => setShowLangHint(false), LANG_HINT_VISIBLE_DURATION);
    return () => clearTimeout(hideTimer);
  }, [showLangHint]);

  // Opening the mobile menu means they've already found the toggle — the
  // hint pointing at the (now-covered) hamburger icon has nothing left to do.
  useEffect(() => {
    if (menuOpen) setShowLangHint(false);
  }, [menuOpen]);

  // The pill carries its own background at every scroll position (unlike
  // the old edge-to-edge bar, which stayed transparent until scrolled), so
  // logo/text contrast only needs to track the site's own theme, not
  // whatever happens to be behind the header.
  const isDark = mounted && resolvedTheme === "dark";

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastY.current;
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
      <motion.div
        animate={{ y: hidden ? "-150%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6"
      >
        <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full border border-border-subtle bg-nav-bg px-4 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-md md:px-6 md:py-2">
          <Link
            href="/"
            className="focus-ring flex shrink-0 items-center gap-2.5"
            onClick={() => setMenuOpen(false)}
          >
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-fill"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-paper" />
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
            <img
              src={isDark ? "/logo-white.png" : "/logo-dark.png"}
              alt="The Media Foundry"
              width={1516}
              height={176}
              className="h-4 w-auto md:h-[18px]"
            />
          </Link>

          <nav className="hidden shrink-0 items-center gap-7 lg:flex">
            {displayNavLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={link.href}
                  className="whitespace-nowrap font-mono text-sm font-bold uppercase text-foreground/70 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <div className="relative">
              <LanguageToggle />
              <AnimatePresence>
                {showLangHint && <LangHintBubble text="Also available in Krio — tap here to switch." />}
              </AnimatePresence>
            </div>
            <ThemeToggle />
            {showMerchLink && (
              <button
                type="button"
                aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
                onClick={() => setCartOpen(true)}
                className="focus-ring relative flex h-6 w-6 shrink-0 items-center justify-center text-foreground"
              >
                <CartIcon className="h-4 w-4" />
                {count > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center bg-accent-fill font-mono text-[9px] font-bold text-accent-fill-ink">
                    {count}
                  </span>
                )}
              </button>
            )}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-foreground px-5 py-2 font-mono text-sm font-bold uppercase text-background transition-colors hover:bg-accent-fill hover:text-accent-fill-ink"
              >
                {startAProjectLabel}
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu toggle — morphing bars, same treatment across the
              whole site rather than a separate icon set for mobile. */}
          <div className="relative lg:hidden">
            <motion.button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col gap-1.5 text-foreground"
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
            </motion.button>
            <AnimatePresence>
              {showLangHint && (
                <LangHintBubble text="Also available in Krio — tap the menu to switch." align="right" />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-background px-6 pt-28 lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col gap-6">
              {displayNavLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-mono text-2xl font-bold uppercase text-foreground"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: displayNavLinks.length * 0.1 + 0.1 }}
                className="flex items-center gap-6 pt-4"
              >
                <LanguageToggle />
                <ThemeToggle />
                {showMerchLink && (
                  <button
                    type="button"
                    aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
                    onClick={() => {
                      setMenuOpen(false);
                      setCartOpen(true);
                    }}
                    className="focus-ring relative flex h-6 w-6 shrink-0 items-center justify-center text-foreground"
                  >
                    <CartIcon className="h-4 w-4" />
                    {count > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center bg-accent-fill font-mono text-[9px] font-bold text-accent-fill-ink">
                        {count}
                      </span>
                    )}
                  </button>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: displayNavLinks.length * 0.1 + 0.2 }}
              >
                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3.5 font-mono text-base font-bold uppercase text-background transition-colors hover:bg-accent-fill hover:text-accent-fill-ink"
                >
                  {startAProjectLabel}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showMerchLink && <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />}
    </>
  );
}
