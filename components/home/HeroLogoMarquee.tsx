"use client";

import { testimonials as testimonialsEn, trustedByLabel as trustedByLabelEn } from "@/lib/content/testimonials";
import { testimonials as testimonialsKri, trustedByLabel as trustedByLabelKri } from "@/lib/content/testimonials.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function HeroLogoMarquee() {
  const testimonials = useTranslated(testimonialsEn, testimonialsKri);
  const trustedByLabel = useTranslated(trustedByLabelEn, trustedByLabelKri);
  // Three laps of the real client set, looped twice for the marquee track —
  // five logos alone wouldn't fill a wide desktop viewport before the seam,
  // so tripling each lap keeps the loop seamless at any width.
  const lap = [...testimonials, ...testimonials, ...testimonials];
  const track = [...lap, ...lap];

  return (
    <div className="opacity-80">
      <p className="text-right font-mono text-[8px] uppercase tracking-[0.06em] text-foreground/60 sm:text-[10px] sm:tracking-[0.03em]">
        {trustedByLabel}
      </p>

      {/* No group-hover pause here, unlike the Team section's carousel —
          this one keeps scrolling regardless of hover. */}
      <div className="relative mt-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-3">
          {track.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              aria-hidden={i >= lap.length}
              className="flex shrink-0 items-center gap-3 px-5 py-1"
            >
              {/* Client marks are icon-only (no wordmark baked in), so the
                  name is set as real text alongside rather than alt text —
                  illegible as a tiny abstract icon alone at marquee scale.
                  Sits on the page's own flat background now (not over
                  video), so no drop-shadow is needed for legibility. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured */}
              <img
                src={client.logo}
                alt=""
                aria-hidden
                className="h-7 w-7 object-contain sm:h-8 sm:w-8"
              />
              <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.03em] text-foreground">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
