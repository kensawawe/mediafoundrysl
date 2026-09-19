"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { DepartmentMarquee } from "@/components/ui/DepartmentMarquee";
import { WorkBrowser } from "@/components/work/WorkBrowser";
import { Departments } from "@/components/work/Departments";
import { ClientSpread } from "@/components/work/ClientSpread";
import { workCopy as workCopyEn } from "@/lib/content/work";
import { workCopy as workCopyKri } from "@/lib/content/work.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function WorkPageBody() {
  const copy = useTranslated(workCopyEn, workCopyKri);

  return (
    <>
      <ClientSpread />

      <Section className="pt-24 md:pt-28">
        <Container>
          <h1 className="max-w-3xl font-display text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
            {copy.whatWeCast}
          </h1>
          <p className="mt-6 max-w-md font-body text-sm text-current/60 sm:text-base">
            {copy.workIndexIntro}
          </p>

          <div className="mt-16">
            <WorkBrowser />
          </div>
        </Container>
      </Section>

      <Departments />

      <section className="pb-16 pt-10 md:pb-20 md:pt-12">
        <DepartmentMarquee fadeFrom="background" />
      </section>
    </>
  );
}
