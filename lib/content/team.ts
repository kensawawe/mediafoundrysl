export type TeamMember = {
  id: string;
  name: string;
  role: string;
};

// Real roster and headshots still needed — using the site's Slate
// placeholder convention (components/ui/Slate.tsx) for the photos, and
// the same "PLACEHOLDER TITLE" pattern already used in testimonials.ts
// for missing real copy, until an actual roster is provided.
export const teamMembers: TeamMember[] = [
  { id: "1", name: "Team Member 1", role: "PLACEHOLDER TITLE" },
  { id: "2", name: "Team Member 2", role: "PLACEHOLDER TITLE" },
  { id: "3", name: "Team Member 3", role: "PLACEHOLDER TITLE" },
  { id: "4", name: "Team Member 4", role: "PLACEHOLDER TITLE" },
  { id: "5", name: "Team Member 5", role: "PLACEHOLDER TITLE" },
  { id: "6", name: "Team Member 6", role: "PLACEHOLDER TITLE" },
];
