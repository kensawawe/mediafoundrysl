import clsx from "clsx";

type Tone = "navy" | "green" | "blue" | "mono";

type MediaPlaceholderProps = {
  label: string;
  category?: string;
  variant?: "video" | "photo";
  tone?: Tone;
  aspect?: string;
  className?: string;
  rounded?: boolean;
  grainOpacity?: number;
};

const toneGradients: Record<Tone, { a: string; b: string }> = {
  navy: {
    a: "radial-gradient(circle, rgba(30,181,58,0.35), transparent 60%)",
    b: "radial-gradient(circle, rgba(0,114,198,0.4), transparent 60%)",
  },
  green: {
    a: "radial-gradient(circle, rgba(30,181,58,0.5), transparent 60%)",
    b: "radial-gradient(circle, rgba(6,6,68,0.6), transparent 65%)",
  },
  blue: {
    a: "radial-gradient(circle, rgba(0,114,198,0.5), transparent 60%)",
    b: "radial-gradient(circle, rgba(30,181,58,0.3), transparent 65%)",
  },
  mono: {
    a: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 60%)",
    b: "radial-gradient(circle, rgba(0,114,198,0.25), transparent 65%)",
  },
};

const grainSvg =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  );

export function MediaPlaceholder({
  label,
  category,
  variant = "photo",
  tone = "navy",
  aspect = "aspect-video",
  className,
  rounded = true,
  grainOpacity = 0.07,
}: MediaPlaceholderProps) {
  const gradient = toneGradients[tone];

  return (
    <div
      className={clsx(
        "relative isolate w-full overflow-hidden bg-[#050516]",
        aspect,
        rounded && "rounded-xl",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute -inset-[15%] animate-drift-a"
        style={{ background: gradient.a, filter: "blur(40px)" }}
      />
      <div
        aria-hidden
        className="absolute -inset-[15%] animate-drift-b"
        style={{ background: gradient.b, filter: "blur(48px)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("${grainSvg}")`,
          opacity: grainOpacity,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10"
      />

      {variant === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse-ring flex h-16 w-16 items-center justify-center rounded-full border border-white/40 backdrop-blur-sm md:h-20 md:w-20">
            <span
              aria-hidden
              className="ml-1 border-y-[9px] border-l-[15px] border-y-transparent border-l-white/90"
            />
          </div>
        </div>
      )}

      {category && (
        <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
          {category}
        </span>
      )}

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
        <p className="font-body text-[10px] uppercase tracking-[0.15em] text-white/55">
          <span className="text-white/75">Footage placeholder</span>
          {" — "}
          {label}
        </p>
      </div>
    </div>
  );
}
