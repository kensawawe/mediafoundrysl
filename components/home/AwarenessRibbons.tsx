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
  shadow: number; // shadow strength
};
const SPECS: Spec[] = [
  { phrases: PHRASES_A, dir: 1, rot: 0.06, speed: 70, phase: 0, shadow: 0.18 },
  { phrases: PHRASES_B, dir: -1, rot: -0.06, speed: 56, phase: 2.1, shadow: 0.3 },
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

// --- GPU program -----------------------------------------------------------------------------
// The ribbon is a strip of triangles. The vertex shader bends it with the travelling wave,
// squeezes it where the cloth "turns", and hands the fragment shader a light/shade value. The
// text is a texture drawn once on a 2D canvas, so each frame costs a few uniforms, not
// hundreds of canvas draw calls.
const VERT = `
attribute vec2 aPos; // x in css px, v (0 top … 1 bottom)
uniform vec2 uRes;
uniform float uT, uA, uCy, uTan, uPhase, uBh, uScroll, uCycle, uYOff;
varying vec2 vUv;
varying float vShade;
float wave(float x){
  float u = x / uRes.x;
  float env = 0.4 + 0.6 * u;
  return uA * env * sin(u * 6.6 - uT * 1.9 + uPhase)
       + uA * 0.55 * env * sin(u * 15.5 - uT * 3.1 + uPhase * 1.7)
       + uA * 0.22 * env * sin(u * 27.0 - uT * 4.2 + uPhase * 0.6);
}
float yAt(float x){ return uCy + (x - uRes.x * 0.5) * uTan + wave(x); }
void main(){
  float x = aPos.x;
  float y = yAt(x);
  float slope = (yAt(x + 3.0) - yAt(x)) / 3.0;
  float tw = sin(x / uRes.x * 10.5 - uT * 2.4 + uPhase * 2.3); // twist of the cloth
  float f = 1.0 + 0.3 * tw;
  float py = y + (aPos.y - 0.5) * f * uBh + uYOff;
  vShade = -tw * 0.7 + slope * 1.8;
  vUv = vec2((x + uScroll) / uCycle, aPos.y);
  gl_Position = vec4(x / uRes.x * 2.0 - 1.0, 1.0 - py / uRes.y * 2.0, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform sampler2D uTex;
uniform float uUMax;      // fraction of the texture that is one full text cycle
uniform float uShadow;    // 1 = draw the shadow pass
uniform vec4 uShadowCol;  // premultiplied
varying vec2 vUv;
varying float vShade;
void main(){
  if (uShadow > 0.5) { gl_FragColor = uShadowCol; return; }
  vec3 rgb = texture2D(uTex, vec2(fract(vUv.x) * uUMax, vUv.y)).rgb;
  if (vShade > 0.02) rgb = mix(rgb, vec3(1.0), min(0.42, vShade * 0.5));
  else rgb = mix(rgb, vec3(0.275, 0.0, 0.137), min(0.5, -vShade * 0.65));
  gl_FragColor = vec4(rgb, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(log ?? "shader compile failed");
  }
  return sh;
}

/**
 * Two satin-pink ribbons crossing, text running along them, rippling like cloth
 * in the wind — drawn on the GPU (WebGL) so it stays smooth in Safari and on phones.
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

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) return; // no WebGL: leave the section empty rather than stutter

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glyph = new Path2D(GLYPH);

    // ---- program ----
    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    } catch {
      return;
    }
    gl.useProgram(program);
    const loc = (n: string) => gl.getUniformLocation(program, n);
    const U = {
      res: loc("uRes"), t: loc("uT"), a: loc("uA"), cy: loc("uCy"), tan: loc("uTan"), phase: loc("uPhase"),
      bh: loc("uBh"), scroll: loc("uScroll"), cycle: loc("uCycle"), yOff: loc("uYOff"), tex: loc("uTex"),
      uMax: loc("uUMax"), shadow: loc("uShadow"), shadowCol: loc("uShadowCol"),
    };
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // premultiplied alpha
    gl.clearColor(0, 0, 0, 0);

    const buffer = gl.createBuffer();
    const textures: (WebGLTexture | null)[] = [null, null];
    let vertexCount = 0;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let bh = 70;
    let fontPx = 44;
    let family = "sans-serif";
    let raf = 0;
    let visible = false;
    const cyclePx: number[] = [1, 1]; // css px of one full text cycle
    const uMax: number[] = [1, 1];

    const bhFor = (w: number) => clamp(w * 0.07, 40, 84);

    // Draws one text cycle (+3px of overlap so the loop is seamless) into a texture.
    const buildTexture = (ci: number) => {
      const sp = SPECS[ci];
      const c2 = document.createElement("canvas");
      const c = c2.getContext("2d");
      if (!c) return;
      c.font = `900 ${fontPx}px ${family}`;
      const gap = fontPx * 0.9;
      const iconW = fontPx * 0.8;
      const items: { text?: string; x: number; w: number }[] = [];
      let x = 0;
      for (const ph of sp.phrases) {
        const text = ph.toUpperCase();
        const w = c.measureText(text).width;
        items.push({ text, x, w });
        x += w + gap;
        items.push({ x, w: iconW });
        x += iconW + gap;
      }
      const cycle = x;
      const pad = 3;
      const maxTex = (gl.getParameter(gl.MAX_TEXTURE_SIZE) as number) || 4096;
      const px = Math.min(dpr, 2);
      const scale = Math.min(1, maxTex / ((cycle + pad) * px));
      const s = px * scale;
      c2.width = Math.max(1, Math.round((cycle + pad) * s));
      c2.height = Math.max(1, Math.round(bh * s));
      c.setTransform(s, 0, 0, s, 0, 0);

      const g = c.createLinearGradient(0, 0, 0, bh);
      g.addColorStop(0, "#ffb0d4");
      g.addColorStop(0.42, "#ff5fa2");
      g.addColorStop(0.8, "#e23a86");
      g.addColorStop(1, "#b8206a");
      c.fillStyle = g;
      c.fillRect(0, 0, cycle + pad, bh);
      c.fillStyle = "rgba(255,255,255,0.5)";
      c.fillRect(0, 0, cycle + pad, 1.5);
      c.fillStyle = "rgba(90,0,45,0.4)";
      c.fillRect(0, bh - 2, cycle + pad, 2);

      c.font = `900 ${fontPx}px ${family}`;
      c.textBaseline = "middle";
      c.fillStyle = "#2a0b1a";
      // draw the cycle again after itself so the first `pad` px repeat at the end
      for (const shift of [0, cycle]) {
        for (const it of items) {
          const ix = it.x + shift;
          if (ix > cycle + pad || ix + it.w < 0) continue;
          if (it.text) c.fillText(it.text, ix, bh / 2 + fontPx * 0.04);
          else {
            c.save();
            const k = iconW / 24;
            c.translate(ix, bh / 2 - fontPx * 0.4);
            c.scale(k, k);
            c.fill(glyph, "evenodd");
            c.restore();
          }
        }
      }

      if (!textures[ci]) textures[ci] = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[ci]);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c2);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      cyclePx[ci] = cycle;
      uMax[ci] = cycle / (cycle + pad);
    };

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);

      bh = bhFor(W);
      fontPx = Math.round(bh * 0.62);
      family = getComputedStyle(probe).fontFamily || "sans-serif";

      // A column of two vertices every few px along the width.
      const cols = Math.max(2, Math.ceil(W / 4));
      const data = new Float32Array((cols + 1) * 4);
      for (let i = 0; i <= cols; i++) {
        const x = (i / cols) * W;
        data.set([x, 0, x, 1], i * 4);
      }
      vertexCount = (cols + 1) * 2;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      buildTexture(0);
      buildTexture(1);
    };

    const draw = (now: number) => {
      const t = reduced ? 0.8 : now / 1000;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(U.res, W, H);
      gl.uniform1f(U.t, t);
      gl.uniform1f(U.a, H * 0.115);
      gl.uniform1f(U.cy, H * 0.42);
      gl.uniform1f(U.bh, bh);
      gl.uniform1i(U.tex, 0);
      SPECS.forEach((sp, ci) => {
        gl.uniform1f(U.tan, Math.tan(sp.rot));
        gl.uniform1f(U.phase, sp.phase);
        gl.uniform1f(U.cycle, cyclePx[ci]);
        gl.uniform1f(U.uMax, uMax[ci]);
        const off = reduced ? 0 : (((t * sp.speed * sp.dir) % cyclePx[ci]) + cyclePx[ci]) % cyclePx[ci];
        gl.uniform1f(U.scroll, off);
        // shadow pass: the same ribbon, nudged down, in a translucent dark
        gl.uniform1f(U.shadow, 1);
        gl.uniform1f(U.yOff, 10);
        const a = sp.shadow;
        gl.uniform4f(U.shadowCol, (30 / 255) * a, 0, (20 / 255) * a, a);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexCount);
        // the ribbon itself
        gl.uniform1f(U.shadow, 0);
        gl.uniform1f(U.yOff, 0);
        gl.bindTexture(gl.TEXTURE_2D, textures[ci]);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexCount);
      });
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

    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      raf = 0;
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      textures.forEach((tx) => tx && gl.deleteTexture(tx));
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
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
      <canvas ref={canvasRef} aria-hidden className="block h-[145px] w-full md:h-[400px]" />
    </section>
  );
}
