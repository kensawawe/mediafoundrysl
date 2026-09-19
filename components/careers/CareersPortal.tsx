"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import GlyphPortal from "@/components/ui/GlyphPortal";
import { Container } from "@/components/ui/Container";
import { careersHero as careersHeroEn } from "@/lib/content/careers";
import { careersHero as careersHeroKri } from "@/lib/content/careers.kri";
import { useTranslated } from "@/lib/content/useTranslated";

const FALLBACK_FONT = '"Arial Black", Arial, sans-serif';

/**
 * GlyphPortal freezes its font at mount and measures the ink, so the display
 * face must already be loaded when it mounts. next/font exposes the hashed
 * family name through a CSS variable on <html>; resolve it and wait for the
 * 900 weight. Returns null until ready (or falls back to a system heavy face
 * after 2s so the page can never hang on a slow font).
 */
function useDisplayFont(sample: string): string | null {
  const [family, setFamily] = useState<string | null>(null);

  useLayoutEffect(() => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--font-big-shoulders");
    const primary = raw.split(",")[0]?.trim();
    let settled = false;
    const settle = (value: string) => {
      if (settled) return;
      settled = true;
      setFamily(value);
    };

    if (!primary) {
      settle(FALLBACK_FONT);
      return;
    }
    const face = `900 100px ${primary}`;
    // Already loaded (the usual case — it's preloaded in the layout): mount
    // before the first paint so there's no static-hero-then-portal flash.
    if (document.fonts.check(face, sample)) {
      settle(`${primary}, sans-serif`);
      return;
    }
    const timeout = window.setTimeout(() => settle(FALLBACK_FONT), 2000);
    document.fonts.load(face, sample).then(
      () => settle(`${primary}, sans-serif`),
      () => settle(FALLBACK_FONT),
    );
    return () => window.clearTimeout(timeout);
  }, [sample]);

  return family;
}

/** Freetown footage seen through the letters, darkening as the camera arrives. */
function Footage() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const el = video.current;
      if (!el) return;
      if (mq.matches) el.pause();
      else el.play().catch(() => {});
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div
      style={{ position: "absolute", inset: 0, transform: "scale(var(--gp-field-scale, 1))" }}
    >
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/hero-freetown-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/hero-freetown.mp4" type="video/mp4" />
      </video>
      {/* Light tint while it's a window onto the footage; deep navy once the
          text has to be read over it (--gp-reveal runs 0 → 1 on arrival). */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgb(13 27 63 / calc(0.18 + 0.62 * var(--gp-reveal, 0)))" }}
      />
    </div>
  );
}

function HeroCopy({ title, statement }: { title: string; statement: string[] }) {
  return (
    <Container>
      <h1 className="max-w-3xl font-display text-6xl font-black uppercase leading-[0.86] tracking-tight sm:text-7xl md:text-8xl lg:max-w-none lg:whitespace-nowrap lg:text-[58px]">
        {title}
      </h1>
      <div className="mt-8 flex max-w-lg flex-col gap-4 font-body text-lg leading-relaxed text-current/70 sm:text-xl">
        {statement.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Container>
  );
}

/**
 * The Careers opening: a giant word whose letters are windows onto our own
 * footage. Scrolling flies the camera into one letter until it fills the
 * screen, and the hero statement is what's waiting inside.
 */
export function CareersPortal() {
  const hero = useTranslated(careersHeroEn, careersHeroKri);
  const fontFamily = useDisplayFont(hero.portalWord);

  // Until the display face is ready, render the plain hero so the server HTML
  // (and no-JS / slow-font visitors) still gets the heading and statement.
  if (!fontFamily) {
    return (
      <div className="bg-[#0d1b3f] pb-16 pt-32 text-white md:pb-20 md:pt-40">
        <HeroCopy title={hero.title} statement={hero.statement} />
      </div>
    );
  }

  return (
    <GlyphPortal
      className="careers-portal"
      word={hero.portalWord}
      fontFamily={fontFamily}
      fontWeight={900}
      scrollLength={2}
      enterLabel={hero.portalEnter}
      style={{
        "--gp-paper": "var(--background)",
        "--gp-ink": "var(--foreground)",
        "--gp-field": "#0d1b3f",
        "--gp-foreground": "#ffffff",
      }}
      background={<Footage />}
      front={
        <div className="absolute inset-x-0 top-28 md:top-32">
          <Container>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-current/60">
              {hero.eyebrow}
            </span>
          </Container>
        </div>
      }
    >
      <HeroCopy title={hero.title} statement={hero.statement} />
    </GlyphPortal>
  );
}
