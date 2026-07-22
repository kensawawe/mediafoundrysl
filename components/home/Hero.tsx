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
          <h1 className="font-display font-black uppercase leading-[0.86] tracking-tight text-paper">
            <RevealLines
              lines={[...hero.lines]}
              baseDelay={0.3}
              stagger={0.12}
              onMount
              className="text-[15vw] sm:text-[10vw] md:text-[8vw] lg:text-[7.2vw]"
            />
            <RevealLines
              lines={[...hero.linesSecondary]}
              baseDelay={0.42}
              stagger={0.12}
              onMount
              className="mt-1 text-[10vw] sm:text-[6.67vw] md:text-[5.33vw] lg:text-[4.8vw]"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 max-w-md font-body text-base font-semibold text-white md:text-lg"
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
    </section>
  );
}
