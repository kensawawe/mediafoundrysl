import { Hero } from "@/components/home/Hero";
import { BrandStatement } from "@/components/home/BrandStatement";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { WhyMediaFoundry } from "@/components/home/WhyMediaFoundry";
import { Partners } from "@/components/home/Partners";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <FeaturedWork />
      <Services />
      <Process />
      <WhyMediaFoundry />
      <Partners />
      <ContactSection />
    </>
  );
}
