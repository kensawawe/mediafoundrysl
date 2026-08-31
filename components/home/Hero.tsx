"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HeroHeadline } from "@/components/home/HeroHeadline";
import { HeroLogoMarquee } from "@/components/home/HeroLogoMarquee";
import { hero as heroEn } from "@/lib/content/home";
import { hero as heroKri } from "@/lib/content/home.kri";
import { useTranslated } from "@/lib/content/useTranslated";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const hero = useTranslated(heroEn, heroKri);
  const sectionRef = useRef<HTMLDivElement>(null);
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
    <Section
      className="relative bg-background pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <Container>
        {/* Framed media card — clears the floating pill nav via the
            section's own top padding above, rather than sitting full-bleed
            behind it like the previous edge-to-edge hero. */}
        <div
          ref={sectionRef}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] sm:aspect-[16/11] md:aspect-[16/8] md:rounded-[2.5rem]"
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
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)",
            }}
          />

          {/* Viewfinder corner marks */}
          {[
            "left-6 top-6 border-l border-t",
            "right-6 top-6 border-r border-t",
            "left-6 bottom-6 border-l border-b",
            "right-6 bottom-6 border-r border-b",
          ].map((pos) => (
            <span key={pos} aria-hidden className={`pointer-events-none absolute h-4 w-4 border-paper/70 ${pos}`} />
          ))}

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <HeroHeadline
              wrap={false}
              className="font-display font-black uppercase leading-[0.9] tracking-tight text-paper text-[7vw] sm:text-[6vw] md:text-[3.4vw] lg:text-[46px]"
            />

            {/* Decorative scan line, in flow so it can never collide with
                the subhead regardless of how many lines the headline wraps
                to. */}
            <div aria-hidden className="mt-5 hidden w-64 items-center gap-3 sm:flex">
              <div className="h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--paper)_0px,var(--paper)_4px,transparent_4px,transparent_9px)] opacity-50" />
              <span className="h-2 w-2 shrink-0 rounded-full border border-paper/70" />
              <div className="h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--paper)_0px,var(--paper)_4px,transparent_4px,transparent_9px)] opacity-50" />
            </div>

            <p className="mt-5 max-w-md font-body text-sm text-paper/80 md:text-base">
              {hero.supporting}
            </p>
            <p className="mt-2 max-w-md font-body text-sm italic text-paper/60 md:text-base">
              {hero.supportingKrio}
            </p>

            <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={hero.primaryCta.href}
                className="rounded-full bg-paper px-6 py-3 font-body text-sm font-medium text-ink shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-colors hover:bg-accent-fill hover:text-paper"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="rounded-full border border-paper/50 bg-white/10 px-6 py-3 font-body text-sm font-medium text-paper backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-14">
          <HeroLogoMarquee />
        </div>
      </Container>
    </Section>
  );
}
