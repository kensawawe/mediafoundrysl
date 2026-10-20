"use client";

import { useEffect, useRef } from "react";

const IMG_W = 434;
const IMG_H = 520;
const PIN_X = 0.33;

/**
 * A pink awareness ribbon pinned over a corner of its (relative) parent, as if
 * worn on a lapel. It hangs from a pin at the top of the loop and flows like
 * cloth: the picture is redrawn in thin horizontal slices, each shifted,
 * squeezed and shaded by a wave that travels down from the pin, so the free
 * end flutters most. Meant to sit outside any overflow-hidden card so it
 * overlaps the edge. Only shown in October (.awareness-only — app/globals.css).
 */
export function AwarenessPinRibbon() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img = new Image();
    img.src = "/awareness-ribbon.png";
    let loaded = false;
    let w = 0;
    let dpr = 1;
    let raf = 0;
    let visible = false;

    const size = () => {
      w = Math.max(1, wrap.getBoundingClientRect().width);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = w * 1.6;
      const ch = w * (IMG_H / IMG_W) * 1.12;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
    };

    const draw = (now: number) => {
      if (!loaded) return;
      const t = reduced ? 1.2 : now / 1000;
      const cw = canvas.width / dpr;
      const dw = w;
      const dh = w * (IMG_H / IMG_W);
      const x0 = (cw - dw) / 2;
      const y0 = dh * 0.03;
      const A = w * 0.13;
      const ROW = 2; // slice height, css px
      const sRow = IMG_H / dh;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const off = (u: number) => {
        const env = 0.05 + Math.pow(u, 1.5);
        return A * env * (Math.sin(u * 7 - t * 2.3) + 0.5 * Math.sin(u * 15 - t * 3.6));
      };

      for (let y = 0; y < dh; y += ROW) {
        const u = (y + ROW / 2) / dh;
        const slope = (off(Math.min(1, (y + ROW) / dh)) - off(y / dh)) / ROW;
        const env = 0.05 + Math.pow(u, 1.5);
        const tw = Math.sin(u * 11 - t * 2.9);
        const f = 1 + 0.24 * env * tw; // the cloth narrows and widens as it turns
        const dest = dw * f;
        ctx.setTransform(dpr, 0, slope * dpr, dpr, (x0 + off(u) + dw * PIN_X * (1 - f)) * dpr, (y0 + y) * dpr);
        ctx.drawImage(img, 0, y * sRow, IMG_W, ROW * sRow + 0.6, 0, 0, dest, ROW + 0.4);
        const shade = -tw * env * 1.3;
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle =
          shade > 0
            ? `rgba(255,255,255,${Math.min(0.3, shade * 0.4).toFixed(3)})`
            : `rgba(80,0,40,${Math.min(0.4, -shade * 0.55).toFixed(3)})`;
        ctx.fillRect(0, 0, dest, ROW + 0.4);
        ctx.globalCompositeOperation = "source-over";
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      draw(now);
      if (!reduced) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    size();
    img.onload = () => {
      loaded = true;
      if (visible) {
        draw(performance.now());
        start();
      }
    };
    const ro = new ResizeObserver(() => {
      size();
      if (visible) draw(performance.now());
    });
    ro.observe(wrap);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      if (visible) {
        draw(performance.now());
        start();
      }
    });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="awareness-only pointer-events-none absolute -left-3 -top-5 z-[5] w-[72px] sm:-left-6 sm:-top-8 sm:w-[140px] md:-left-9 md:-top-11 md:w-[190px]"
      style={{ aspectRatio: `${IMG_W} / ${IMG_H}` }}
    >
      <div className="awareness-sway absolute inset-0" style={{ transformOrigin: `${PIN_X * 100}% 5%` }}>
        <canvas
          ref={canvasRef}
          className="absolute"
          style={{
            left: "-30%",
            top: 0,
            width: "160%",
            height: "112%",
            filter: "drop-shadow(0 10px 8px rgba(0,0,0,0.38)) drop-shadow(0 2px 2px rgba(0,0,0,0.35))",
          }}
        />
        {/* the pin */}
        <span
          className="absolute h-[9px] w-[9px] rounded-full md:h-3 md:w-3"
          style={{
            left: `${PIN_X * 100}%`,
            top: "5%",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle at 35% 30%, #fff 0%, #d9d9de 35%, #6d6d78 100%)",
            boxShadow: "0 2px 3px rgba(0,0,0,0.5)",
          }}
        />
      </div>
    </div>
  );
}
