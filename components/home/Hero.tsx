"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { HeroLogoMarquee } from "@/components/home/HeroLogoMarquee";
import { HeroHeadline } from "@/components/home/HeroHeadline";
import { hero as heroEn } from "@/lib/content/home";
import { hero as heroKri } from "@/lib/content/home.kri";
import { useTranslated } from "@/lib/content/useTranslated";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const hero = useTranslated(heroEn, heroKri);
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(mediaRef.current, {
          scale: 1.12,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Respect reduced-motion: leave the video paused on its poster frame
      // rather than autoplaying a moving background.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        videoRef.current?.pause();
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Belt-and-suspenders: some mobile browsers only honor muted autoplay
    // when the property (not just the attribute) is set before play() is
    // requested.
    video.muted = true;

    const attemptPlay = () => {
      if (video.paused) video.play().catch(() => {});
    };

    // The initial attribute-based autoplay can silently fail on mobile if
    // the video isn't buffered enough yet at parse time — retry once real
    // data is available, not just once on mount.
    attemptPlay();
    video.addEventListener("loadedmetadata", attemptPlay);
    video.addEventListener("canplay", attemptPlay);

    // iOS can also silently block autoplay outright (Low Power Mode, Low
    // Data Mode) even with muted/playsInline set correctly — but it still
    // allows play() from within a genuine user gesture. Retry on the first
    // touch/scroll/click anywhere on the page so it starts the instant a
    // real visitor does anything, rather than requiring a tap on the video.
    window.addEventListener("touchstart", attemptPlay, { once: true, passive: true });
    window.addEventListener("scroll", attemptPlay, { once: true, passive: true });
    window.addEventListener("click", attemptPlay, { once: true });

    // Backgrounding a tab (app switch, lock screen) can also drop playback —
    // pick it back up once the page is visible again.
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") attemptPlay();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      video.removeEventListener("loadedmetadata", attemptPlay);
      video.removeEventListener("canplay", attemptPlay);
      window.removeEventListener("touchstart", attemptPlay);
      window.removeEventListener("scroll", attemptPlay);
      window.removeEventListener("click", attemptPlay);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-freetown-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/hero-freetown.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            // Extra-dark band at the very top keeps the nav/logo legible
            // regardless of what the looping video is showing there —
            // sky, road and foliage all cycle through at very different
            // brightness levels. Settles back to the original tone by the
            // time it reaches the headline.
            background:
              "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.66) 8%, rgba(0,0,0,0.3) 16%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.96) 100%)",
          }}
        />
      </div>

      <div className="pointer-events-none relative z-10 w-full px-6 pb-36 pt-40 md:px-10 md:pb-40 lg:px-16">
        <div className="max-w-5xl">
          {/* lg: is a fixed px value, not vw, from here up — the parent is
              capped at max-w-5xl (1024px), so it stops growing past that
              width while vw sizing keeps tracking the *viewport*. Past
              ~1350px that mismatch would let the text outgrow its fixed
              container and wrap. Freezing at the exact size computed for
              viewport=1024 (where container and viewport width still
              coincide) keeps it correct for any wider desktop too. */}
          <HeroHeadline className="font-display font-black uppercase leading-[0.86] tracking-tight text-paper text-[9.75vw] sm:text-[9.3vw] md:text-[7.5vw] lg:text-[69.12px]" />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 max-w-md font-body text-base font-semibold text-white md:text-lg"
          >
            {hero.supporting}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-3 max-w-md font-body text-base font-semibold italic text-white/70 md:text-lg"
          >
            {hero.supportingKrio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
          >
            <Button
              href={hero.primaryCta.href}
              variant="primary"
              className="border-paper bg-paper text-ink hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="outline"
              className="border-paper/30 text-paper hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
            >
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Pinned to the section's true bottom edge, independent of the
          headline column's own pb-20/24 — the marquee sits well below the
          CTA row rather than sharing its bottom margin. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 px-6 pb-6 md:px-10 md:pb-8 lg:px-16"
      >
        <HeroLogoMarquee />
      </motion.div>
    </section>
  );
}
