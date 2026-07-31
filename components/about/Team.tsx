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
          <div className="animate-marquee flex w-max items-start gap-6 group-hover:[animation-play-state:paused]">
            {track.map((member, i) => (
              <div key={`${member.id}-${i}`} aria-hidden={i >= lap.length} className="w-56 shrink-0 sm:w-64">
                <div className="aspect-[4/5] overflow-hidden border border-border-subtle">
                  <Slate label={member.name} variant="photo" aspect="h-full" className="w-full" grainOpacity={0.05} />
                </div>
                <div className="mt-3">
                  <h3 className="font-display text-lg font-bold tracking-tight">{member.name}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-current/50">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
