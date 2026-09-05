"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const SESSION_KEY = "mf-preloader-seen";
const WORDS = ["Discovering", "Designing", "Developing", "Producing", "Delivering"];
const WORD_INTERVAL = 800;
const WORD_FADE = 0.18;
const EXIT_DURATION = 0.5;

/**
 * First-load-only intro: cycles through the studio's process words, then
 * slides away in one hard-edged sweep (no molten curve — that motif is
 * reserved for hover/reveal moments, not this one-off entrance).
 *
 * Persisted via sessionStorage, but in practice this component only ever
 * mounts once per tab anyway — internal navigation is client-side routing
 * through the root layout, so the sessionStorage check mainly guards actual
 * hard reloads within the same session.
 */
export function Preloader() {
  const [themeMounted, setThemeMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    // Read the class directly rather than next-themes' useTheme(): that
    // value only settles once ThemeProvider's own effect has run and
    // propagated through context, which is one extra hop slower than
    // checking the class next-themes' blocking script already set on
    // <html> pre-paint — and this component's first paint is the one place
    // on the site where that extra hop would actually be visible.
    setIsDark(document.documentElement.classList.contains("dark"));
    setThemeMounted(true);
    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (alreadySeen || prefersReduced) {
      setSkip(true);
      setHidden(true);
      return;
    }
    window.sessionStorage.setItem(SESSION_KEY, "1");
  }, []);

  useEffect(() => {
    if (skip || exiting) return;
    const isLastWord = wordIndex >= WORDS.length - 1;
    const t = setTimeout(() => {
      if (isLastWord) setExiting(true);
      else setWordIndex((i) => i + 1);
    }, WORD_INTERVAL);
    return () => clearTimeout(t);
  }, [skip, exiting, wordIndex]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => setHidden(true), EXIT_DURATION * 1000);
    return () => clearTimeout(t);
  }, [exiting]);

  useEffect(() => {
    if (hidden) {
      document.body.style.removeProperty("overflow");
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <motion.div
      initial={false}
      animate={{ y: exiting ? "-100%" : "0%" }}
      transition={{ duration: EXIT_DURATION, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background"
    >
      <span aria-hidden className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-fill">
          <span className="h-1.5 w-1.5 rounded-full bg-paper" />
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
        <img
          src={isDark ? "/logo-white.png" : "/logo-dark.png"}
          alt="The Media Foundry"
          width={1516}
          height={176}
          className={clsx("h-5 w-auto transition-opacity duration-150", themeMounted ? "opacity-100" : "opacity-0")}
        />
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={wordIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: WORD_FADE, ease: "easeInOut" }}
          className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text"
          aria-hidden
        >
          {WORDS[wordIndex]}&hellip;
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" role="status">
        Loading The Media Foundry
      </span>
    </motion.div>
  );
}
