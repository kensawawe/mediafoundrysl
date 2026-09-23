import { Hero } from "@/components/home/Hero";
import { ClientFit } from "@/components/home/ClientFit";
import { WorkWall } from "@/components/home/WorkWall";
import { Roadblocks } from "@/components/home/Roadblocks";
import { Testimonials } from "@/components/home/Testimonials";
import { Services } from "@/components/home/Services";
import { FeatureCarouselSection } from "@/components/home/FeatureCarouselSection";
import { Contact } from "@/components/home/Contact";
import { getWorkItems } from "@/lib/sanity/content/work";

export default async function Home() {
  const workItems = await getWorkItems();

  return (
    <>
      <Hero />
      <ClientFit />
      <Services />
      <WorkWall workItems={workItems} />
      <Roadblocks />
      <Testimonials />
      <FeatureCarouselSection />
      <Contact />
    </>
  );
}
