import { testimonials } from "@/lib/content/testimonials";

/** Three laps of the real client set, looped twice for the marquee track —
 *  five logos alone wouldn't fill a wide desktop viewport before the seam,
 *  so tripling each lap keeps the loop seamless at any width. */
const lap = [...testimonials, ...testimonials, ...testimonials];
const track = [...lap, ...lap];

export function HeroLogoMarquee() {
  return (
    <div className="ml-auto max-w-sm text-right sm:max-w-md md:max-w-lg">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60">
        Trusted by organizations across Sierra Leone
      </p>

      <div className="group relative mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-3 group-hover:[animation-play-state:paused]">
          {track.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              aria-hidden={i >= lap.length}
              className="flex shrink-0 items-center gap-3 px-5 py-3"
            >
              {/* Client marks are icon-only (no wordmark baked in), so the
                  name is set as real text alongside rather than alt text —
                  illegible as a tiny abstract icon alone at marquee scale.
                  Drop-shadow keeps both legible with no card behind them,
                  since the video's brightness varies underneath. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
              <img
                src={client.logo}
                alt=""
                aria-hidden
                className="h-7 w-7 object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] sm:h-8 sm:w-8"
              />
              <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.1em] text-paper [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
