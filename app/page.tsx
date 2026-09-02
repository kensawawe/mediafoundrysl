import { Hero } from "@/components/home/Hero";
import { ClientFit } from "@/components/home/ClientFit";
import { WorkWall } from "@/components/home/WorkWall";
import { Roadblocks } from "@/components/home/Roadblocks";
import { Testimonials } from "@/components/home/Testimonials";
import { Services } from "@/components/home/Services";
import { FeatureCarouselSection } from "@/components/home/FeatureCarouselSection";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientFit />
      <Services />
      <WorkWall />
      <Roadblocks />
      <Testimonials />
      <FeatureCarouselSection />
      <Contact />
    </>
  );
}
