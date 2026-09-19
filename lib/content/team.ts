export const teamSectionLabel = "The Team";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** Falls back to the Slate placeholder (components/ui/Slate.tsx) when omitted. */
  image?: string;
};

// Headshot still needed for Francis — using the site's Slate placeholder
// convention until real photography exists.
export const teamMembers: TeamMember[] = [
  { id: "1", name: "Ken Saro-Wiwa Fofana", role: "Founder & Creative Director", image: "/ken.JPG" },
  { id: "2", name: "Frankvin Bob McEwen", role: "Producer & Operations Manager", image: "/frankvin.jpg" },
  { id: "3", name: "Francis Sam-Mboma", role: "Content Strategist" },
  { id: "4", name: "Kanja Fofana", role: "Multimedia Creator", image: "/Kanja.jpg" },
];
