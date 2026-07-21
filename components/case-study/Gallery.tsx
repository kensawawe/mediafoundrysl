import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { Slate } from "@/components/ui/Slate";
import { FadeIn } from "@/components/ui/RevealText";
import type { CaseStudy } from "@/lib/content/case-studies";

export function Gallery({ study }: { study: CaseStudy }) {
  return (
    <Section className="py-20 md:py-24" tone="inverse">
      <Container>
        <SlateTag className="text-white/60">Gallery</SlateTag>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {study.gallery.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.05} className={i === 0 ? "col-span-2 row-span-2" : ""}>
              <Slate
                label={item.label}
                category={item.category}
                variant={item.variant}
                aspect={i === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-[4/5] md:aspect-square"}
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
