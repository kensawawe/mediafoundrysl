"use client";

import { AboutBlock } from "@/components/about/AboutBlock";
import {
  ourApproach as ourApproachEn,
  ourPhilosophy as ourPhilosophyEn,
  whoWeAre as whoWeAreEn,
  whyOneRoof as whyOneRoofEn,
} from "@/lib/content/about";
import {
  ourApproach as ourApproachKri,
  ourPhilosophy as ourPhilosophyKri,
  whoWeAre as whoWeAreKri,
  whyOneRoof as whyOneRoofKri,
} from "@/lib/content/about.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function AboutBlocks() {
  const whoWeAre = useTranslated(whoWeAreEn, whoWeAreKri);
  const ourPhilosophy = useTranslated(ourPhilosophyEn, ourPhilosophyKri);
  const whyOneRoof = useTranslated(whyOneRoofEn, whyOneRoofKri);
  const ourApproach = useTranslated(ourApproachEn, ourApproachKri);

  return (
    <>
      <AboutBlock title={whoWeAre.title} body={whoWeAre.body} />
      <AboutBlock title={ourPhilosophy.title} body={ourPhilosophy.body} />
      <AboutBlock title={whyOneRoof.title} body={whyOneRoof.body} />
      <AboutBlock title={ourApproach.title} body={ourApproach.body} />
    </>
  );
}
