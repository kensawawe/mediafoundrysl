"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { PourOverlay } from "@/components/ui/PourOverlay";
import {
  caseStudiesPublic,
  workItems as workItemsEn,
  workCopy as workCopyEn,
  type WorkItem,
} from "@/lib/content/work";
import { workItems as workItemsKri, workCopy as workCopyKri } from "@/lib/content/work.kri";
import { useTranslated } from "@/lib/content/useTranslated";

/**
 * "Client Spread" — a stack of client logos/artwork that scatters across the
 * screen as you scroll, then drifts with the pointer. Cards are the work
 * items' own resting images (the organizations and brands we've worked for),
 * so it stays in sync with lib/content/work.ts.
 */

// Until `caseStudiesPublic` is flipped on, cards link to their case study
// locally (so it can be worked on) but stay inert in production — same
// dev-only-interactivity convention used for the not-yet-public merch link in
// Navbar.tsx. Items without a case-study page are never links.
const isDev = process.env.NODE_ENV === "development";

type CardLayout = {
  /** offset while clustered (vw/vh) */
  stackOffset: { x: number; y: number };
  /** angle while clustered */
  stackRotate: number;
  /** final spot (vw/vh) and card size (vw/vh) on desktop */
  target: { x: number; y: number; scale: number; w: number; h: number };
  /** final spot on touch devices, where the cards stack in a two-column grid */
  targetSm: { x: number; y: number };
  z: number;
};

// Array order = stack order, back (z 2) -> front (z 9). Matched 1:1 with the
// first eight work items.
const LAYOUT: CardLayout[] = [
  { stackOffset: { x: -8, y: -10 }, stackRotate: -18, target: { x: -20, y: -34, scale: 0.9, w: 17, h: 22 }, targetSm: { x: -22, y: -40 }, z: 2 },
  { stackOffset: { x: 14, y: -10 }, stackRotate: 20, target: { x: 32, y: -30, scale: 0.9, w: 18, h: 32 }, targetSm: { x: 22, y: -40 }, z: 3 },
  { stackOffset: { x: -16, y: 0 }, stackRotate: -4, target: { x: -36, y: -2, scale: 0.9, w: 15, h: 32 }, targetSm: { x: -22, y: -19 }, z: 4 },
  { stackOffset: { x: 1, y: -10 }, stackRotate: -2, target: { x: 6, y: -32, scale: 0.85, w: 25, h: 30 }, targetSm: { x: 22, y: -19 }, z: 5 },
  { stackOffset: { x: 18, y: 1 }, stackRotate: 6, target: { x: 37, y: 6, scale: 0.9, w: 18, h: 32 }, targetSm: { x: -22, y: 20 }, z: 6 },
  { stackOffset: { x: -6, y: 10 }, stackRotate: 6, target: { x: -24, y: 34, scale: 0.9, w: 22, h: 25 }, targetSm: { x: 22, y: 20 }, z: 7 },
  { stackOffset: { x: 8, y: 7 }, stackRotate: 3, target: { x: 2, y: 36, scale: 0.85, w: 20, h: 26 }, targetSm: { x: -22, y: 40 }, z: 8 },
  { stackOffset: { x: 20, y: 12 }, stackRotate: -7, target: { x: 30, y: 34, scale: 0.9, w: 16, h: 20 }, targetSm: { x: 22, y: 40 }, z: 9 },
];

// Scroll progress where the cluster starts scattering and where it finishes.
const SCATTER_START = 0.12;
const SCATTER_END = 0.9;
const SCROLL_LENGTH = 300; // vh
const STACK_SCALE = 0.82;
const TEXT_FADE_START = 0.3;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const RESPONSIVE = {
  desktop: { scale: null as number | null, small: false, colX: null as number | null, card: null as { w: number; h: number } | null },
  small: { scale: 0.72, small: true, colX: 22, card: { w: 40, h: 20 } },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    // Touch vs. mouse, not raw width: a narrow but mouse-driven window keeps
    // the desktop scatter + pointer parallax; only real touch devices drop to
    // the stacked two-column layout.
    const mq = window.matchMedia("(pointer: coarse)");
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return r;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;

    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

function Card({
  item,
  layout,
  progress,
  reduce,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  pointer,
  depth,
}: {
  item: WorkItem;
  layout: CardLayout;
  progress: MotionValue<number>;
  reduce: boolean | null;
  /** uniform rest-scale for every card on touch; null = each card's own scale */
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  fixedCard: { w: number; h: number } | null;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
}) {
  const { target, stackOffset } = layout;

  const flat = reduce === true;
  const stackRotate = flat ? 0 : layout.stackRotate;
  const restScale = scaleMul ?? target.scale;

  const sm = isSmall ? layout.targetSm : null;
  const endX = sm ? (colX != null ? Math.sign(sm.x) * colX : sm.x) : target.x;
  const endY = sm ? sm.y : target.y;

  // -50% keeps the card centred on its anchor
  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const tx = stackOffset.x + (endX - stackOffset.x) * p;
      const ty = stackOffset.y + (endY - stackOffset.y) * p;
      const drift = depth * p;
      const dx = tx - px * PARALLAX_X * drift;
      const dy = ty - py * PARALLAX_Y * drift;
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    },
  );
  const rotate = useTransform(progress, [0, 1], [stackRotate, 0]);
  const scale = useTransform(progress, [0, 1], [STACK_SCALE, restScale]);

  const contain = item.imageFit === "contain";
  const clickable = !!item.hasCaseStudy && (caseStudiesPublic || isDev);

  const face = (
    <div
      className={clsx(
        "relative h-full w-full overflow-hidden rounded-2xl",
        contain ? "border border-border-strong bg-white" : "bg-ink",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
      <img
        src={item.restingImage}
        alt={item.title}
        draggable={false}
        className={clsx(
          "absolute inset-0 h-full w-full",
          contain ? clsx("object-contain", item.imagePadding ?? "p-4") : "object-cover",
        )}
      />
      {clickable && (
        <PourOverlay>
          <span className="font-mono text-[10px] uppercase tracking-[0.03em] text-paper/70">
            {item.category}
          </span>
          <h3 className="font-display text-base font-black leading-tight text-paper sm:text-xl">
            {item.hoverTitle ?? item.title}
          </h3>
        </PourOverlay>
      )}
    </div>
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: `${fixedCard ? fixedCard.w : target.w}vw`,
        height: `${fixedCard ? fixedCard.h : target.h}vh`,
        zIndex: layout.z,
        translate,
        rotate,
        scale,
      }}
    >
      {clickable ? (
        <Link
          href={`/work/${item.slug}`}
          aria-label={item.title}
          className="focus-ring group relative block h-full w-full rounded-2xl"
        >
          {face}
        </Link>
      ) : (
        face
      )}
    </motion.div>
  );
}

export function ClientSpread() {
  const items = useTranslated(workItemsEn, workItemsKri);
  const copy = useTranslated(workCopyEn, workCopyKri);
  const cards = items.filter((i) => i.restingImage).slice(0, LAYOUT.length);

  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scale: scaleMul, small: isSmall, colX, card: fixedCard } = useResponsive();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // hold, scatter, then settle
  const progress = useTransform(scrollYProgress, [0, SCATTER_START, SCATTER_END, 1], [0, 0, 1, 1]);

  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setSpread((was) => (was ? p > 0.985 : p >= 0.999));
  });
  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(spread, parallaxEnabled);

  const noScale = reduce === true;
  const copyOpacity = useTransform(progress, [TEXT_FADE_START, TEXT_FADE_START + 0.35], [0, 1]);
  const copyScale = useTransform(progress, [TEXT_FADE_START, 0.9], [0.85, 1]);

  // scroll hint: visible while clustered, gone by the time the scatter starts
  const hintOpacity = useTransform(progress, [0, SCATTER_START], [1, 0]);

  return (
    <section
      ref={wrapRef}
      className="relative w-full bg-background"
      style={{ height: `${SCROLL_LENGTH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* centre text */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center max-md:px-8"
          style={{ opacity: copyOpacity, scale: noScale ? 1 : copyScale }}
        >
          <h1 className="w-full font-display text-[4.4vw] font-black uppercase leading-[0.95] tracking-tight max-md:text-[10vw]">
            {copy.clientSpreadHeading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-[1.2vw] w-full max-w-[36ch] font-body text-[1.1vw] leading-relaxed tracking-tight text-current/60 max-md:mt-3 max-md:text-[3.6vw]">
            {copy.clientSpreadSub}
          </p>
        </motion.div>

        {/* scattering cards */}
        <div className="absolute inset-0 z-10">
          {cards.map((item, i) => (
            <Card
              key={item.slug}
              item={item}
              layout={LAYOUT[i]}
              progress={progress}
              reduce={reduce}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              pointer={pointer}
              depth={parallaxEnabled ? parallaxDepth(i, cards.length) : 0}
            />
          ))}
        </div>

        {/* scroll hint */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[3vh] z-20 flex flex-col items-center gap-[0.6vh] font-mono text-[0.8vw] font-medium uppercase tracking-[0.2em] max-md:bottom-6 max-md:gap-1 max-md:text-[2.8vw]"
          style={{ opacity: hintOpacity }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce max-md:h-[4vw] max-md:w-[4vw]"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
