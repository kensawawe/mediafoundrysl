import type { Metadata } from "next";
import { ApertureReveal } from "@/components/about/ApertureReveal";
import { AboutAccordion } from "@/components/about/AboutAccordion";
import { OurValues } from "@/components/about/OurValues";
import { Team } from "@/components/about/Team";
import { site } from "@/lib/content/site";
import { getTeamSection } from "@/lib/sanity/content/team";

// Metadata is generated server-side, before any client-side language
// toggle can apply — it always reflects the English content.
export const metadata: Metadata = {
  title: `Studio — ${site.name}`,
  description:
    "Meet the strategists, designers, filmmakers and producers behind The Media Foundry, a Freetown-based creative agency and production studio.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const { teamMembers, teamSectionLabel } = await getTeamSection();

  return (
    <>
      <ApertureReveal />
      <AboutAccordion />
      <OurValues />
      <Team teamMembers={teamMembers} teamSectionLabel={teamSectionLabel} />
    </>
  );
}
