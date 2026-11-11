import { Hero } from "@/components/home/Hero";
import { AwarenessRibbons } from "@/components/home/AwarenessRibbons";
import { ClientFit } from "@/components/home/ClientFit";
import { Pillars } from "@/components/home/Pillars";
import { Audiences } from "@/components/home/Audiences";
import { WorkWall } from "@/components/home/WorkWall";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { getWorkItems } from "@/lib/sanity/content/work";

// The three strongest client quotes for the homepage; the rest stay in
// lib/content/testimonials.ts for case studies.
const HOME_TESTIMONIALS = ["conex", "rokel-commercial-bank", "the-feminist-cohort"];

export default async function Home() {
  const workItems = await getWorkItems();

  return (
    <>
      <Hero />
      <AwarenessRibbons />
      <ClientFit />
      <Pillars />
      <Audiences />
      <WorkWall workItems={workItems} />
      <Process />
      <Testimonials ids={HOME_TESTIMONIALS} />
    </>
  );
}
