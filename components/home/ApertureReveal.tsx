"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apertureReveal as contentEn } from "@/lib/content/home";
import { apertureReveal as contentKri } from "@/lib/content/home.kri";
import { useTranslated } from "@/lib/content/useTranslated";

gsap.registerPlugin(ScrollTrigger);

// A camera-aperture iris (not the lip silhouette of the reference this was
// adapted from) — a circle mask in a square viewBox scales uniformly at any
// size, unlike an irregular shape, and reads as "camera/production" rather
// than a shape lifted wholesale from an unrelated brand.
const APERTURE_MASK_SVG_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#000"/></svg>',
  );

function getStartMaskSize() {
  if (typeof window === "undefined") return 360;
  if (window.innerWidth < 640) return 220;
  if (window.innerWidth < 1024) return 300;
  return 380;
}

/**
 * Scroll-pinned iris reveal: the video is masked behind a small circular
 * aperture that scrolls open to fill the screen, then the page continues.
 * Adapted from a pasted reference (a lip-shaped version of the same
 * mask-size scroll-scrub technique) — reshaped to an aperture/iris, recolored
 * to the site's own theme tokens, and rebuilt on the project's existing
 * `useGSAP` convention (see Hero.tsx) rather than a raw `gsap.context` call.
 */
export function ApertureReveal() {
  const content = useTranslated(contentEn, contentKri);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const startSize = getStartMaskSize();
        maskRef.current?.style.setProperty("--mask-size", `${startSize}px`);
        // Only reserve scroll runway for the pin while the effect actually
        // runs — under reduced motion this stays a normal-height section.
        if (containerRef.current) containerRef.current.style.minHeight = "300vh";

        const trigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1.2,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const size = startSize + Math.pow(self.progress, 2.2) * 3800;
            maskRef.current?.style.setProperty("--mask-size", `${size}px`);
          },
        });

        gsap.to(videoRef.current, {
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=220%",
            scrub: 1.2,
          },
        });

        return () => trigger.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        videoRef.current?.pause();
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.muted = true;
    const attemptPlay = () => {
      if (video.paused) video.play().catch(() => {});
    };
    attemptPlay();
    video.addEventListener("loadedmetadata", attemptPlay);
    video.addEventListener("canplay", attemptPlay);
    return () => {
      video.removeEventListener("loadedmetadata", attemptPlay);
      video.removeEventListener("canplay", attemptPlay);
    };
  }, []);

  return (
    <>
      <Section className="pb-0 md:pb-0">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[10vw] font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              {content.introTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-sm font-bold uppercase leading-relaxed tracking-wide text-foreground/65 md:text-base">
              {content.introSubtitle}
            </p>
          </div>
        </Container>
      </Section>

      <div ref={containerRef} className="relative w-full">
        <div
          ref={pinRef}
          className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background"
        >
          {/* Viewfinder corner marks — same motif as the hero card. */}
          {[
            "left-6 top-6 border-l border-t",
            "right-6 top-6 border-r border-t",
            "left-6 bottom-6 border-l border-b",
            "right-6 bottom-6 border-r border-b",
          ].map((pos) => (
            <span key={pos} aria-hidden className={`pointer-events-none absolute z-10 h-4 w-4 border-foreground/30 ${pos}`} />
          ))}

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
          >
            <span className="font-display text-[22vw] font-black uppercase tracking-tighter text-foreground/[0.04]">
              Foundry
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={maskRef}
              className="relative h-full w-full transition-[mask-size,-webkit-mask-size] duration-75 ease-linear [-webkit-mask-position:50%_50%] [-webkit-mask-repeat:no-repeat] [mask-position:50%_50%] [mask-repeat:no-repeat]"
              style={{
                WebkitMaskImage: `url("${APERTURE_MASK_SVG_URI}")`,
                maskImage: `url("${APERTURE_MASK_SVG_URI}")`,
                WebkitMaskSize: "var(--mask-size, 380px)",
                maskSize: "var(--mask-size, 380px)",
              }}
            >
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                loop
                muted
                playsInline
                autoPlay
                preload="auto"
                poster="/hero-freetown-poster.jpg"
              >
                <source src="/hero-freetown.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      <Section className="pt-0 md:pt-0">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[10vw] font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              {content.outroTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-sm font-bold uppercase leading-relaxed tracking-wide text-foreground/65 md:text-base">
              {content.outroSubtitle}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
