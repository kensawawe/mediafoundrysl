import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { WorkBrowser } from "@/components/work/WorkBrowser";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `Work — ${site.name}`,
  description:
    "Brand identity, campaigns, film and production, digital and photography work from The Media Foundry.",
};

export default function WorkPage() {
  return (
    <Section className="pt-32 md:pt-40">
      <Container>
        <SlateTag>Work</SlateTag>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
          What we&apos;ve cast.
        </h1>
        <p className="mt-6 max-w-md font-body text-sm text-current/60 sm:text-base">
          A working record of brand identity, campaigns, film and production,
          digital and photography — browse by discipline.
        </p>

        <div className="mt-16">
          <WorkBrowser />
        </div>
      </Container>
    </Section>
  );
}
