"use client";

import { useEffect, useRef } from "react";

const RADIUS = 12; // 80% smaller than the original 60px
const OPACITY_DECAY = 0.025;

// Brand colors sampled straight from the logo mark (green dot, blue "o")
// plus white, rather than the pasted demo's semi-random blue/magenta mix.
const COLORS: [number, number, number][] = [
  [30, 181, 58], // brand green
  [36, 81, 214], // --accent-fill
  [255, 255, 255], // paper/white
];

function pickColor(): [number, number, number] {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

/**
 * Homepage-only cursor trail — glowing green/white/blue blobs that fade
 * out behind the pointer, using additive blending so overlaps brighten
 * rather than muddy. Pairs with EmberTrail, which plays the equivalent
 * role (the site's one signature cursor glow) on every other page — see
 * CursorEffect, which switches between the two by route.
 */
export function GradientBlurTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const hasMovedRef = useRef(false);
  const circsRef = useRef<
    Array<{ col: [number, number, number]; x: number; y: number; grd: CanvasGradient; alpha: number }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mm = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    if (!mm.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();

    let raf = 0;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      if (hasMovedRef.current) {
        const col = pickColor();
        const { x, y } = mouseRef.current;
        circsRef.current.push({
          col,
          x,
          y,
          grd: ctx.createRadialGradient(x, y, 0, x, y, RADIUS),
          alpha: 1,
        });
      }

      const keep: typeof circsRef.current = [];
      for (const circ of circsRef.current) {
        circ.grd.addColorStop(0, `rgba(${circ.col[0]},${circ.col[1]},${circ.col[2]},0.95)`);
        circ.grd.addColorStop(0.2, `rgba(${circ.col[0]},${circ.col[1]},${circ.col[2]},0.7)`);
        circ.grd.addColorStop(0.5, `rgba(${circ.col[0]},${circ.col[1]},${circ.col[2]},0.3)`);
        circ.grd.addColorStop(1, `rgba(${circ.col[0]},${circ.col[1]},${circ.col[2]},0)`);

        ctx.beginPath();
        ctx.fillStyle = circ.grd;
        ctx.globalAlpha = circ.alpha;
        ctx.arc(circ.x, circ.y, RADIUS, 0, Math.PI * 2);
        ctx.fill();

        circ.alpha -= OPACITY_DECAY;
        if (circ.alpha > 0) keep.push(circ);
      }
      circsRef.current = keep;

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      hasMovedRef.current = true;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resizeCanvas);
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden [@media(pointer:fine)]:block"
    />
  );
}
