import { Hero } from "@/components/home/Hero";
import { BrandStatement } from "@/components/home/BrandStatement";
import { WorkWall } from "@/components/home/WorkWall";
import { Testimonials } from "@/components/home/Testimonials";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Philosophy } from "@/components/home/Philosophy";
import { Partners } from "@/components/home/Partners";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <WorkWall />
      <Testimonials />
      <Services />
      <Process />
      <Philosophy />
      <Partners />
      <Contact />
    </>
  );
}
