import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { Slate } from "@/components/ui/Slate";
import { teamMembers } from "@/lib/content/team";

/** Two laps, looped twice — same seamless-marquee approach as
 *  HeroLogoMarquee. A fixed-width scrolling row (rather than the
 *  previous staggered multi-column grid) stays visually consistent at
 *  any viewport width instead of needing per-breakpoint column tuning. */
const lap = [...teamMembers, ...teamMembers];
const track = [...lap, ...lap];

export function Team() {
  return (
    <Section>
      <Container>
        <SlateTag className="mb-10 md:mb-14">The Team</SlateTag>

        <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
          {/* animate-marquee is shared with HeroLogoMarquee on the homepage —
              overriding just the duration here (37.4s * 1.2) instead of
              touching the shared class, so that one isn't affected. */}
          <div
            className="animate-marquee flex w-max items-start gap-6 group-hover:[animation-play-state:paused]"
            style={{ animationDuration: "44.88s" }}
          >
            {track.map((member, i) => (
              <div key={`${member.id}-${i}`} aria-hidden={i >= lap.length} className="group/card w-56 shrink-0 sm:w-64">
                <div className="relative aspect-[4/5] overflow-hidden border border-border-subtle">
                  {member.image ? (
                    // eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover/card:grayscale-0"
                    />
                  ) : (
                    <Slate label={member.name} variant="photo" aspect="h-full" className="w-full" grainOpacity={0.05} />
                  )}

                  {/* Name/role overlay on the frame itself — sits above
                      Slate's own dim internal caption too, so its stronger
                      gradient + bold white text reads as the one caption
                      rather than competing with it. */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-4 pt-12">
                    <h3 className="font-display text-lg font-bold leading-none tracking-tight text-white">{member.name}</h3>
                    <p className="mt-0 font-mono text-[8px] uppercase tracking-[0.08em] text-white/70">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
