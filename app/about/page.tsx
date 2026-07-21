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
      <AboutBlock index="01" title={whoWeAre.title} body={whoWeAre.body} />
      <AboutBlock index="02" title={ourPhilosophy.title} body={ourPhilosophy.body} tone="inverse" />
      <AboutBlock index="03" title={whyOneRoof.title} body={whyOneRoof.body} />
      <AboutBlock index="04" title={ourApproach.title} body={ourApproach.body} />
      <OurVision />
    </>
  );
}
