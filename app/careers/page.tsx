import type { Metadata } from "next";
import { CareersPageBody } from "@/components/careers/CareersPageBody";
import { careersHero } from "@/lib/content/careers";
import { site } from "@/lib/content/site";

// Metadata is generated server-side, before any client-side language
// toggle can apply — it always reflects the English content.
export const metadata: Metadata = {
  title: `Careers — ${site.name}`,
  description: careersHero.statement.join(" "),
};

export default function CareersPage() {
  return <CareersPageBody />;
}
