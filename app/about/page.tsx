import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutBlocks } from "@/components/about/AboutBlocks";
import { OurVision } from "@/components/about/OurVision";
import { Team } from "@/components/about/Team";
import { site } from "@/lib/content/site";

// Metadata is generated server-side, before any client-side language
// toggle can apply — it always reflects the English content.
export const metadata: Metadata = {
  title: `Studio — ${site.name}`,
  description: site.description,
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBlocks />
      <OurVision />
      <Team />
    </>
  );
}
