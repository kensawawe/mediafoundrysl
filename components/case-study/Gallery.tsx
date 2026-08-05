"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { Slate } from "@/components/ui/Slate";
import { FadeIn } from "@/components/ui/RevealText";
import { caseStudyCopy as copyEn, type CaseStudy } from "@/lib/content/case-studies";
import { caseStudyCopy as copyKri } from "@/lib/content/case-studies.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function Gallery({ study }: { study: CaseStudy }) {
  const copy = useTranslated(copyEn, copyKri);

  return (
    <Section className="py-20 md:py-24">
      <Container>
        <SlateTag className="text-current/60">{copy.gallery}</SlateTag>
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
