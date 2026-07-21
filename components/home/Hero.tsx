"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { RevealLines } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const headlineLines = ["Stories shape", "how the world", "sees us."];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(mediaRef.current, {
          scale: 1.15,
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

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <MediaPlaceholder
          label="Sierra Leone — landscapes, people, production"
          variant="video"
          tone="navy"
          aspect="aspect-auto h-full"
          rounded={false}
          grainOpacity={0.05}
          className="h-full"
        />
      </div>

      <div className="relative z-10 w-full px-6 pb-20 pt-40 md:px-10 md:pb-24 lg:px-16">
        <div className="max-w-4xl">
          <h1 className="font-display text-[13vw] leading-[0.95] tracking-tight text-white sm:text-[9vw] md:text-[7vw] lg:text-[6.4vw]">
            <RevealLines lines={headlineLines} baseDelay={0.3} stagger={0.12} onMount />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 max-w-md font-body text-base text-white/75 md:text-lg"
          >
            Crafting authentic stories from Sierra Leone and sharing them
            with the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/#contact" variant="primary">
              Tell us your story
            </Button>
            <Button href="/#work" variant="outline" className="border-white/30 text-white hover:border-accent-green">
              Explore our work
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
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="font-body text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <span className="relative h-10 w-px overflow-hidden bg-white/20">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-white"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: 3, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
