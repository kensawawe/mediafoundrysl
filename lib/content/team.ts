export type TeamMember = {
  id: string;
  name: string;
  role: string;
};

// Headshots still needed — using the site's Slate placeholder convention
// (components/ui/Slate.tsx) for the photos until real photography exists.
// Members 5-6 have no roster info yet, so they stay on the
// "PLACEHOLDER TITLE" pattern already used in testimonials.ts.
export const teamMembers: TeamMember[] = [
  { id: "1", name: "Ken Saro-Wiwa Fofana", role: "Founder & Creative Director" },
  { id: "2", name: "Frankvin McEwen", role: "Producer & Operations Manager" },
  { id: "3", name: "Francis Sam-Mboma", role: "Content Strategist" },
  { id: "4", name: "Kanja Fofana", role: "Multimedia Creator" },
  { id: "5", name: "Team Member 5", role: "PLACEHOLDER TITLE" },
  { id: "6", name: "Team Member 6", role: "PLACEHOLDER TITLE" },
];
