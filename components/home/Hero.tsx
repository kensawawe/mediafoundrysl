"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealLines } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { hero } from "@/lib/content/home";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        videoRef.current?.play();

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

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-ink"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <video
          ref={videoRef}
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
          className="absolute inset-0"
          style={{
            // Extra-dark band at the very top keeps the nav/logo legible
            // regardless of what the looping video is showing there —
            // sky, road and foliage all cycle through at very different
            // brightness levels. Settles back to the original tone by the
            // time it reaches the headline.
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.45) 8%, rgba(0,0,0,0.15) 16%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 pb-20 pt-40 md:px-10 md:pb-24 lg:px-16">
        <div className="max-w-5xl">
          <h1 className="font-display text-[15vw] font-black uppercase leading-[0.86] tracking-tight text-paper sm:text-[10vw] md:text-[8vw] lg:text-[7.2vw]">
            <RevealLines lines={[...hero.lines]} baseDelay={0.3} stagger={0.12} onMount />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 max-w-md font-body text-base text-paper/70 md:text-lg"
          >
            {hero.supporting}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button
                href={hero.primaryCta.href}
                variant="primary"
                className="border-paper bg-paper text-ink hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
              >
                {hero.primaryCta.label}
              </Button>
            </Magnetic>
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:left-auto md:right-16 md:translate-x-0"
      >
        <div className="flex flex-col items-center gap-2 text-paper/60">
          <span className="relative h-10 w-px overflow-hidden bg-paper/20">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-accent-fill"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: 3, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
