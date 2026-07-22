import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutBlock } from "@/components/about/AboutBlock";
import { OurVision } from "@/components/about/OurVision";
import {
  ourApproach,
  ourPhilosophy,
  whoWeAre,
  whyOneRoof,
} from "@/lib/content/about";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `Studio — ${site.name}`,
  description: site.description,
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBlock title={whoWeAre.title} body={whoWeAre.body} />
      <AboutBlock title={ourPhilosophy.title} body={ourPhilosophy.body} tone="inverse" />
      <AboutBlock title={whyOneRoof.title} body={whyOneRoof.body} />
      <AboutBlock title={ourApproach.title} body={ourApproach.body} />
      <OurVision />
    </>
  );
}
