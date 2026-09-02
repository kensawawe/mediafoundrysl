"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { apertureReveal as contentEn } from "@/lib/content/about";
import { apertureReveal as contentKri } from "@/lib/content/about.kri";
import { useTranslated } from "@/lib/content/useTranslated";

gsap.registerPlugin(ScrollTrigger);

// The video reveals through Sierra Leone's own outline rather than a plain
// circle. Traced from the country border in NordNordWest's "Sierra Leone
// location map" (Wikimedia Commons, GFDL 1.2) — border coordinates are
// geographic fact, not a protectable expression, and this path is an
// independently simplified point set (~170 of the source's ~2000 vertices,
// renormalized to its own viewBox) rather than a redistribution of that
// file. Square-ish viewBox keeps the single mask-size value from distorting
// the shape as it scales.
const SIERRA_LEONE_MASK_SVG_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 312 312"><path fill="#000" d="M189.1 306.0L176.5 301.9L178.8 299.0L175.0 300.2L169.8 294.7L149.6 284.0L106.8 266.9L85.7 261.2L94.1 258.2L106.9 261.8L88.9 255.2L94.7 247.3L102.1 245.2L106.6 247.5L101.6 244.2L99.8 246.5L97.4 244.0L91.4 244.9L88.0 236.9L92.0 232.8L86.8 237.0L83.2 234.1L88.6 226.7L90.0 227.7L89.8 222.8L79.0 232.2L76.1 231.3L77.0 229.3L75.2 231.3L67.6 230.5L61.5 226.2L59.2 220.9L66.9 219.3L56.5 221.4L42.9 209.8L49.9 206.6L57.8 208.9L50.8 205.2L47.9 193.5L38.9 181.2L39.1 177.9L31.2 178.7L22.2 184.8L22.8 173.5L10.1 160.5L9.6 152.8L11.3 155.0L17.9 153.4L33.9 164.9L25.4 157.5L36.2 146.6L40.7 146.5L43.9 150.9L49.2 146.1L53.9 146.8L42.9 144.8L49.7 136.2L43.5 143.9L36.3 142.5L29.8 144.5L29.0 142.9L36.3 137.8L33.0 138.2L33.1 134.7L30.5 141.2L26.6 139.5L29.3 137.5L22.8 137.5L27.4 142.7L24.4 150.5L22.0 150.1L14.3 136.3L14.6 121.0L18.1 117.8L21.8 119.9L40.3 118.7L25.0 118.2L22.9 115.0L27.9 110.9L32.1 111.9L36.8 109.6L19.6 112.7L15.4 108.7L18.9 108.2L13.5 108.2L13.4 103.8L12.9 108.0L9.8 108.6L8.4 100.0L23.7 94.5L29.9 99.0L38.2 94.3L44.8 75.7L57.5 74.7L62.2 69.4L62.3 64.5L68.6 62.9L72.4 54.2L71.3 51.0L75.1 44.5L77.8 44.5L80.0 34.6L83.1 32.6L85.0 34.1L83.8 31.4L87.6 23.9L86.0 22.8L94.0 17.6L114.0 13.2L124.3 18.7L145.3 12.3L147.3 6.2L213.8 6.0L217.9 10.4L218.9 17.9L229.9 25.4L237.4 38.6L241.1 39.4L242.6 44.9L247.6 49.2L246.2 51.2L250.9 53.5L248.5 59.2L253.0 62.6L252.2 66.3L260.2 66.6L266.6 73.8L266.8 83.2L261.4 84.4L259.9 95.5L274.5 99.5L274.9 122.5L286.7 135.2L285.1 139.6L275.4 143.7L275.5 147.1L274.9 145.3L271.3 148.9L268.4 163.7L264.3 166.1L261.9 174.5L265.2 167.5L276.8 171.0L281.6 168.0L293.2 152.3L299.6 151.3L303.6 154.0L301.8 181.7L296.3 187.3L281.3 188.3L272.4 198.3L272.6 223.9L264.5 226.6L248.9 246.2L224.9 261.0L216.7 273.6L207.4 276.2L205.6 279.7L204.0 277.9L202.0 284.9L200.0 285.0L201.8 291.5L197.9 291.8L198.3 297.1L192.7 302.1L193.7 304.1Z"/></svg>',
  );

function getSmallMaskSize() {
  if (typeof window === "undefined") return 360;
  if (window.innerWidth < 640) return 220;
  if (window.innerWidth < 1024) return 300;
  return 380;
}

const MASK_SIZE_RANGE = 3800;

/**
 * Scroll-pinned reverse-reveal: the video loads full-bleed (no visible mask
 * edge) and, as the section scrolls through its pin, the mask closes down to
 * a small Sierra Leone silhouette before the page continues. Adapted from a
 * pasted reference (a lip-shaped version of the same mask-size scroll-scrub
 * technique) — reshaped to the country outline, recolored to the site's own
 * theme tokens, and rebuilt on the project's existing `useGSAP` convention
 * (see Hero.tsx) rather than a raw `gsap.context` call.
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
        const smallSize = getSmallMaskSize();
        // Rest state (before the pin is reached, and the initial paint) is
        // full-bleed: a mask this much larger than any viewport leaves no
        // visible silhouette edge.
        maskRef.current?.style.setProperty("--mask-size", `${smallSize + MASK_SIZE_RANGE}px`);
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
            // Time-reversal of the original growth curve: starts closing
            // fast, then eases into the small silhouette as progress -> 1.
            const size = smallSize + Math.pow(1 - self.progress, 2.2) * MASK_SIZE_RANGE;
            maskRef.current?.style.setProperty("--mask-size", `${size}px`);
          },
        });

        gsap.fromTo(
          videoRef.current,
          { scale: 1.18 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=220%",
              scrub: 1.2,
            },
          },
        );

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
      <div ref={containerRef} className="relative w-full">
        <div
          ref={pinRef}
          className="relative z-0 flex h-screen w-full items-center justify-center overflow-hidden bg-background"
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
            className="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center leading-[0.85]"
          >
            <span className="whitespace-nowrap font-display text-[20vw] font-black uppercase tracking-tighter text-foreground/[0.04]">
              Welcome
            </span>
            <span className="whitespace-nowrap font-display text-[20vw] font-black uppercase tracking-tighter text-foreground/[0.04]">
              to the
            </span>
            <span className="whitespace-nowrap font-display text-[20vw] font-black uppercase tracking-tighter text-foreground/[0.04]">
              Foundry
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={maskRef}
              className="relative h-full w-full transition-[mask-size,-webkit-mask-size] duration-75 ease-linear [-webkit-mask-position:50%_50%] [-webkit-mask-repeat:no-repeat] [mask-position:50%_50%] [mask-repeat:no-repeat]"
              style={{
                WebkitMaskImage: `url("${SIERRA_LEONE_MASK_SVG_URI}")`,
                maskImage: `url("${SIERRA_LEONE_MASK_SVG_URI}")`,
                WebkitMaskSize: "var(--mask-size, 6000px)",
                maskSize: "var(--mask-size, 6000px)",
              }}
            >
              <video
                ref={videoRef}
                className="h-full w-full object-cover brightness-[0.7]"
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
              {content.outroTitle.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <div className="mx-auto mt-8 max-w-4xl space-y-5 text-center font-body text-base font-bold leading-relaxed text-foreground/70 sm:text-lg">
            {content.outroSubtitle.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
