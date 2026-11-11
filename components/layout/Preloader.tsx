"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const SEEN_KEY = "mf-preloader-seen";
const SEEN_FOR_MS = 7 * 24 * 60 * 60 * 1000; // returning visitors skip it for a week
// The four steps of how we work (Discover, Define, Create, Deliver).
const WORDS = ["Discovering", "Defining", "Creating", "Delivering"];

/**
 * Decided once per page load, on the client: is the theme dark, and should the
 * intro be skipped (seen within the last week, or reduced motion)? Memoised so
 * marking it "seen" doesn't flip the answer mid-animation.
 */
let decision: string | null = null;
function decide(): string {
  if (decision !== null) return decision;
  const dark = document.documentElement.classList.contains("dark");
  let seenRecently = false;
  try {
    const seen = Number(window.localStorage.getItem(SEEN_KEY) || 0);
    seenRecently = Date.now() - seen < SEEN_FOR_MS;
    if (!seenRecently) window.localStorage.setItem(SEEN_KEY, String(Date.now()));
  } catch {
    // Storage blocked (private mode etc.): just show the intro.
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  decision = `${dark ? 1 : 0}${seenRecently || reduced ? 1 : 0}`;
  return decision;
}
const noopSubscribe = () => () => {};
const WORD_INTERVAL = 440;
const WORD_FADE = 0.14;
const EXIT_DURATION = 0.45;

/**
 * First-load-only intro: cycles through the studio's process words, then
 * slides away in one hard-edged sweep (no molten curve — that motif is
 * reserved for hover/reveal moments, not this one-off entrance).
 *
 * Shown on a first visit only: returning visitors skip it for a week
 * (see SEEN_KEY), and it never shows with reduced motion.
 */
export function Preloader() {
  // null on the server (and during hydration), then the client's decision.
  const decided = useSyncExternalStore(noopSubscribe, decide, () => null);
  const themeMounted = decided !== null;
  const isDark = decided?.[0] === "1";
  const skip = decided?.[1] === "1";
  const [wordIndex, setWordIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const hidden = skip || done;

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
    const t = setTimeout(() => setDone(true), EXIT_DURATION * 1000);
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
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
        <img
          src={isDark ? "/mark-white.png" : "/mark.png"}
          alt=""
          className={clsx("h-7 w-auto shrink-0 transition-opacity duration-150", themeMounted ? "opacity-100" : "opacity-0")}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
        <img
          src={isDark ? "/logo-white.svg" : "/logo-dark.svg"}
          alt="The Media Foundry"
          width={1716}
          height={210}
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
          className="font-belmonte text-lg uppercase tracking-[0.04em] text-accent-text"
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
