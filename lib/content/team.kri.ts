import type { TeamMember } from "./team";

export const teamSectionLabel = "Di Tim";

// Names are proper nouns and stay as-is; only role titles are translated.
export const teamMembers: TeamMember[] = [
  { id: "1", name: "Ken Saro-Wiwa Fofana", role: "Faunda Ɛn Kriyetiv Dirɛkta", image: "/ken.JPG" },
  { id: "2", name: "Frankvin McEwen", role: "Prodyusa Ɛn Ɔpareshɔn Manaja" },
  { id: "3", name: "Francis Sam-Mboma", role: "Kɔntɛnt Stratijist" },
  { id: "4", name: "Kanja Fofana", role: "Multimidiya Kriyeta", image: "/Kanja.jpg" },
  { id: "5", name: "Team Member 5", role: "PLACEHOLDER TITLE" },
  { id: "6", name: "Team Member 6", role: "PLACEHOLDER TITLE" },
];
