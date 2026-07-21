import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutBlock } from "@/components/about/AboutBlock";
import { OurVision } from "@/components/about/OurVision";
import {
  ourApproach,
  ourPhilosophy,
  whoWeAre,
  whyStorytellingMatters,
} from "@/lib/content/about";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description:
    "The Media Foundry is a creative media agency and production house based in Freetown, Sierra Leone.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBlock index="01" title={whoWeAre.title} body={whoWeAre.body} />
      <AboutBlock index="02" title={ourPhilosophy.title} body={ourPhilosophy.body} tone="inverse" />
      <AboutBlock index="03" title={whyStorytellingMatters.title} body={whyStorytellingMatters.body} />
      <AboutBlock index="04" title={ourApproach.title} body={ourApproach.body} />
      <OurVision />
    </>
  );
}
