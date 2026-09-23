import type { Metadata } from "next";
import { CareersPageBody } from "@/components/careers/CareersPageBody";
import { careersHero } from "@/lib/content/careers";
import { site } from "@/lib/content/site";
import { getCareersContent } from "@/lib/sanity/content/careers";

// Metadata is generated server-side, before any client-side language
// toggle can apply — it always reflects the English content.
export const metadata: Metadata = {
  title: `Careers — ${site.name}`,
  description: careersHero.statement.join(" "),
  alternates: { canonical: "/careers" },
};

export default async function CareersPage() {
  const { pillars, applicationSteps, roles } = await getCareersContent();

  return <CareersPageBody pillars={pillars} applicationSteps={applicationSteps} roles={roles} />;
}
