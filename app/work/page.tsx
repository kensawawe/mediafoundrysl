import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { WorkBrowser } from "@/components/work/WorkBrowser";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `Work — ${site.name}`,
  description:
    "Documentaries, brand films, campaigns, photography, podcasts and social content produced by The Media Foundry.",
};

export default function WorkPage() {
  return (
    <Section className="pt-32 md:pt-40">
      <Container>
        <SlateTag>Work</SlateTag>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          Stories we&apos;ve told.
        </h1>
        <p className="mt-6 max-w-md font-body text-sm text-current/60 sm:text-base">
          A working record of documentaries, brand films, campaigns,
          photography, podcasts and social content — browse by category.
        </p>

        <div className="mt-16">
          <WorkBrowser />
        </div>
      </Container>
    </Section>
  );
}
