"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

// The awareness-ribbon glyph, 24×24.
const GLYPH =
  "M12 1.8c-2.9 0-5 2-5 4.5 0 2.2 1.5 3.9 3.3 5.6L6.6 20.2l2.8-.7 1.5 2.1 1.1-6.2 1.1 6.2 1.5-2.1 2.8.7-3.7-8.3c1.8-1.7 3.3-3.4 3.3-5.6 0-2.5-2.1-4.5-5-4.5Zm0 2.3c1.6 0 2.7 1.1 2.7 2.2 0 1.4-1.2 2.7-2.7 4.1-1.5-1.4-2.7-2.7-2.7-4.1 0-1.1 1.1-2.2 2.7-2.2Z";

const PHRASES_A = [
  "October is Breast Cancer Awareness Month",
  "Early detection saves lives",
  "Book your screening",
  "Stand with every survivor",
  "In honor of everyone who has fought it, is fighting it, and is remembered",
];
const PHRASES_B = [
  "Wear pink",
  "Check yourself",
  "Love your people",
  "Pink is for her, for them, for all of us",
];

type Spec = {
  phrases: string[];
  dir: 1 | -1;
  rot: number; // base tilt in radians
  speed: number; // px/s the text travels
  phase: number;
};
const SPECS: Spec[] = [
  { phrases: PHRASES_A, dir: 1, rot: 0.06, speed: 70, phase: 0 },
  { phrases: PHRASES_B, dir: -1, rot: -0.06, speed: 56, phase: 2.1 },
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * Two satin-pink ribbons crossing, text running along them, rippling like cloth
 * in the wind. Each ribbon is rendered to a strip, then re-drawn in thin
 * vertical slices, every slice lifted, tilted, squeezed and shaded by a
 * travelling wave — so the whole band folds and flutters, text and all.
 * October only (.awareness-only — see app/globals.css).
 */
export function AwarenessRibbons({ className }: { className?: string } = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const probe = probeRef.current;
    if (!section || !canvas || !probe) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const strip = document.createElement("canvas");
    const sctx = strip.getContext("2d");
    if (!sctx) return;
    const glyph = new Path2D(GLYPH);

    let W = 0;
    let H = 0;
    let dpr = 1;
    let bh = 70; // band height
    let fontPx = 44;
    let family = "sans-serif";
    let raf = 0;
    let visible = false;
    let cycles: { w: number; items: { text?: string; x: number; w: number }[] }[] = [];

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.5); // 1.5 max: Safari struggles with big retina canvases
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      strip.width = canvas.width;
      strip.height = Math.round(bhFor(W) * dpr);
      bh = bhFor(W);
      fontPx = Math.round(bh * 0.62);
      family = getComputedStyle(probe).fontFamily || "sans-serif";
      sctx.font = `900 ${fontPx}px ${family}`;
      const gap = fontPx * 0.9;
      cycles = SPECS.map((sp) => {
        let x = 0;
        const items: { text?: string; x: number; w: number }[] = [];
        for (const ph of sp.phrases) {
          const text = ph.toUpperCase();
          const w = sctx.measureText(text).width;
          items.push({ text, x, w });
          x += w + gap;
          items.push({ x, w: fontPx * 0.8 });
          x += fontPx * 0.8 + gap;
        }
        return { w: x, items };
      });
    };
    const bhFor = (w: number) => clamp(w * 0.07, 40, 84);

    const drawStrip = (ci: number, scroll: number) => {
      const c = cycles[ci];
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.clearRect(0, 0, W, bh);
      const g = sctx.createLinearGradient(0, 0, 0, bh);
      g.addColorStop(0, "#ffb0d4");
      g.addColorStop(0.42, "#ff5fa2");
      g.addColorStop(0.8, "#e23a86");
      g.addColorStop(1, "#b8206a");
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, W, bh);
      sctx.fillStyle = "rgba(255,255,255,0.5)";
      sctx.fillRect(0, 0, W, 1.5);
      sctx.fillStyle = "rgba(90,0,45,0.4)";
      sctx.fillRect(0, bh - 2, W, 2);

      sctx.font = `900 ${fontPx}px ${family}`;
      sctx.textBaseline = "middle";
      sctx.fillStyle = "#2a0b1a";
      const off = ((scroll % c.w) + c.w) % c.w;
      for (let rep = -1; rep * c.w - off < W; rep++) {
        for (const it of c.items) {
          const x = rep * c.w + it.x - off;
          if (x > W || x + it.w < 0) continue;
          if (it.text) sctx.fillText(it.text, x, bh / 2 + fontPx * 0.04);
          else {
            sctx.save();
            const s = (fontPx * 0.8) / 24;
            sctx.translate(x, bh / 2 - fontPx * 0.4);
            sctx.scale(s, s);
            sctx.fill(glyph, "evenodd");
            sctx.restore();
          }
        }
      }
    };

    const draw = (now: number) => {
      const t = reduced ? 0.8 : now / 1000;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const SW = 6; // slice width, css px (wider = far fewer draw calls)
      const A = H * 0.115;

      SPECS.forEach((sp, ci) => {
        drawStrip(ci, reduced ? 0 : t * sp.speed * sp.dir);
        const cy = H * 0.42;
        const wave = (x: number) => {
          const u = x / W;
          const env = 0.4 + 0.6 * u; // pinned on the left, freer on the right
          return (
            A * env * Math.sin(u * 6.6 - t * 1.9 + sp.phase) +
            A * 0.55 * env * Math.sin(u * 15.5 - t * 3.1 + sp.phase * 1.7) +
            A * 0.22 * env * Math.sin(u * 27 - t * 4.2 + sp.phase * 0.6)
          );
        };
        const yAt = (x: number) => cy + (x - W / 2) * Math.tan(sp.rot) + wave(x);

        for (let pass = 0; pass < 2; pass++) {
          // pass 0: a cheap offset shadow (replaces a CSS blur filter, which Safari re-runs every frame)
          for (let x = 0; x < W; x += SW) {
            const y = yAt(x + SW / 2);
            const slope = (yAt(x + SW) - yAt(x)) / SW;
            const tw = Math.sin((x / W) * 10.5 - t * 2.4 + sp.phase * 2.3); // twist of the cloth
            const f = 1 + 0.3 * tw;
            ctx.setTransform(dpr, slope * dpr, 0, dpr, x * dpr, y * dpr);
            if (pass === 0) {
              ctx.fillStyle = ci === 0 ? "rgba(30,0,20,0.18)" : "rgba(30,0,20,0.3)";
              ctx.fillRect(0, -f * bh * 0.5 + 10, SW + 0.6, f * bh);
              continue;
            }
            ctx.drawImage(strip, x * dpr, 0, (SW + 0.6) * dpr, bh * dpr, 0, (-f * bh) / 2, SW + 0.6, f * bh);
            // Where the cloth turns away it darkens; where it faces the light it glows.
            const shade = -tw * 0.7 + slope * 1.8;
            if (shade > 0.02) {
              ctx.fillStyle = `rgba(255,255,255,${Math.min(0.42, shade * 0.5).toFixed(3)})`;
            } else {
              ctx.fillStyle = `rgba(70,0,35,${Math.min(0.5, -shade * 0.65).toFixed(3)})`;
            }
            ctx.fillRect(0, (-f * bh) / 2, SW + 0.6, f * bh);
          }
        }
      });
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    let lastDraw = 0;
    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      // ~30fps is plenty for slow cloth and halves the work (and heat) on Safari / phones.
      if (now - lastDraw >= 32) {
        lastDraw = now;
        draw(now);
      }
      if (!reduced) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    layout();
    document.fonts?.ready.then(() => {
      layout();
      if (visible) draw(performance.now());
    });
    const ro = new ResizeObserver(() => {
      layout();
      if (visible) draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      if (visible) {
        draw(performance.now());
        start();
      }
    });
    io.observe(section);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Breast Cancer Awareness Month"
      className={clsx("awareness-only pointer-events-none relative overflow-hidden", className ?? "-mt-20 pb-0 md:-mt-32 md:pb-4")}
    >
      <span ref={probeRef} aria-hidden className="font-display pointer-events-none absolute opacity-0">
        .
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="block h-[145px] w-full md:h-[400px]"
      />
    </section>
  );
}
