import { urlForImage, type SanityImage } from "@/lib/sanity/client";
import { fetchWithFallback } from "@/lib/sanity/fetchWithFallback";
import { teamMembers as teamMembersEnLocal, teamSectionLabel as teamSectionLabelEnLocal, type TeamMember } from "@/lib/content/team";
import { teamMembers as teamMembersKriLocal, teamSectionLabel as teamSectionLabelKriLocal } from "@/lib/content/team.kri";

type SanityPerson = {
  _id: string;
  name: string;
  role: { en: string; kri: string };
  image?: SanityImage;
};

const TEAM_QUERY = `*[_type == "person" && showOnTeamPage == true] | order(teamOrder asc) {
  _id, name, role, image
}`;

function toTeamMembers(people: SanityPerson[], lang: "en" | "kri"): TeamMember[] {
  return people.map((person) => ({
    id: person._id,
    name: person.name,
    role: person.role[lang],
    image: urlForImage(person.image),
  }));
}

/**
 * Both languages of the Team section, ready to hand to <Team> as props.
 * Falls back to the local lib/content/team(.kri).ts files until Sanity has
 * at least one person marked "Show on the Team page".
 */
export async function getTeamSection(): Promise<{
  teamMembers: { en: TeamMember[]; kri: TeamMember[] };
  teamSectionLabel: { en: string; kri: string };
}> {
  const people = await fetchWithFallback<SanityPerson[]>(TEAM_QUERY, []);

  return {
    teamMembers:
      people.length > 0
        ? { en: toTeamMembers(people, "en"), kri: toTeamMembers(people, "kri") }
        : { en: teamMembersEnLocal, kri: teamMembersKriLocal },
    // Not yet worth its own Sanity round-trip for one short label — reads
    // from siteCopy once other sections need that document fetched too.
    teamSectionLabel: { en: teamSectionLabelEnLocal, kri: teamSectionLabelKriLocal },
  };
}
