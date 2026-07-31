"use client";

import { useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { Slate } from "@/components/ui/Slate";
import { FadeIn } from "@/components/ui/RevealText";
import { teamMembers, type TeamMember } from "@/lib/content/team";

/**
 * Staggered three-column photo grid + name list, hover-linked between the
 * two — same shape as the original reference component, reskinned to the
 * site's own materials: Slate placeholders instead of real headshots (no
 * roster/photos exist yet), square corners throughout, and the site's
 * accent-fill for the active state instead of a generic highlight color.
 */
export function Team() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = teamMembers.filter((_, i) => i % 3 === 0);
  const col2 = teamMembers.filter((_, i) => i % 3 === 1);
  const col3 = teamMembers.filter((_, i) => i % 3 === 2);

  return (
    <Section>
      <Container>
        <SlateTag className="mb-10 md:mb-14">The Team</SlateTag>

        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-10 lg:gap-14">
          {/* Photo grid */}
          <div className="flex flex-shrink-0 gap-2 overflow-x-auto pb-1 md:gap-3 md:pb-0">
            <div className="flex flex-col gap-2 md:gap-3">
              {col1.map((member) => (
                <PhotoCard
                  key={member.id}
                  member={member}
                  className="h-[120px] w-[110px] sm:h-[140px] sm:w-[130px] md:h-[165px] md:w-[155px]"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>

            <div className="mt-[48px] flex flex-col gap-2 sm:mt-[56px] md:mt-[68px] md:gap-3">
              {col2.map((member) => (
                <PhotoCard
                  key={member.id}
                  member={member}
                  className="h-[132px] w-[122px] sm:h-[155px] sm:w-[145px] md:h-[182px] md:w-[172px]"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>

            <div className="mt-[22px] flex flex-col gap-2 sm:mt-[26px] md:mt-[32px] md:gap-3">
              {col3.map((member) => (
                <PhotoCard
                  key={member.id}
                  member={member}
                  className="h-[125px] w-[115px] sm:h-[146px] sm:w-[136px] md:h-[172px] md:w-[162px]"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>
          </div>

          {/* Name list */}
          <FadeIn className="grid w-full flex-1 grid-cols-1 gap-4 pt-0 sm:grid-cols-2 md:flex md:flex-col md:gap-5 md:pt-2">
            {teamMembers.map((member) => (
              <MemberRow key={member.id} member={member} hoveredId={hoveredId} onHover={setHoveredId} />
            ))}
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <button
      type="button"
      aria-label={member.name}
      className={clsx(
        "flex-shrink-0 cursor-pointer border transition-opacity duration-300",
        isActive ? "border-accent-fill" : "border-border-subtle",
        isDimmed ? "opacity-60" : "opacity-100",
        className,
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Slate label={member.name} variant="photo" aspect="h-full" className="w-full" grainOpacity={0.05} />
    </button>
  );
}

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={clsx("cursor-pointer transition-opacity duration-300", isDimmed ? "opacity-50" : "opacity-100")}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className={clsx(
            "h-3 w-4 flex-shrink-0 transition-all duration-300",
            isActive ? "w-5 bg-accent-fill" : "bg-current/25",
          )}
        />
        <span
          className={clsx(
            "font-body text-base font-semibold leading-none tracking-tight transition-colors duration-300 md:text-[18px]",
            isActive ? "text-foreground" : "text-foreground/80",
          )}
        >
          {member.name}
        </span>
      </div>

      <p className="mt-1.5 pl-[27px] font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-current/50 md:text-[10px]">
        {member.role}
      </p>
    </div>
  );
}
