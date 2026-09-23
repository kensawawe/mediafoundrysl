"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { FadeIn } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { RolesList } from "@/components/careers/RolesList";
import { CareersPortal } from "@/components/careers/CareersPortal";
import { careersPageCopy as careersPageCopyEn, type Pillar, type ApplicationStep, type Role } from "@/lib/content/careers";
import { careersPageCopy as careersPageCopyKri } from "@/lib/content/careers.kri";
import { useTranslated } from "@/lib/content/useTranslated";
import { site } from "@/lib/content/site";

export function CareersPageBody({
  pillars: pillarsByLang,
  applicationSteps: applicationStepsByLang,
  roles: rolesByLang,
}: {
  pillars: { en: Pillar[]; kri: Pillar[] };
  applicationSteps: { en: ApplicationStep[]; kri: ApplicationStep[] };
  roles: { en: Role[]; kri: Role[] };
}) {
  // Fetched once at build time (app/careers/page.tsx) in both languages —
  // this just picks between them, same as the old direct-import useTranslated.
  const pillars = useTranslated(pillarsByLang.en, pillarsByLang.kri);
  const applicationSteps = useTranslated(applicationStepsByLang.en, applicationStepsByLang.kri);
  const copy = useTranslated(careersPageCopyEn, careersPageCopyKri);

  return (
    <>
      <CareersPortal />

      <Section className="pt-16 md:pt-20">
        <Container>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-3">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.08}>
                <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 font-body text-sm text-current/65 sm:text-base">
                  {pillar.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
            {copy.rolesHeading}
          </h2>

          <div className="mt-14">
            <RolesList roles={rolesByLang} />
          </div>

          <p className="mt-10 font-body text-sm text-current/60">
            {copy.noRoleListed}{" "}
            <a href={`mailto:${site.email}`} className="focus-ring text-accent-text underline underline-offset-4">
              {copy.introduceYourself}
            </a>
            .
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SlateTag className="text-current/60">{copy.howToApply}</SlateTag>
          <div className="mt-10 grid gap-x-8 gap-y-12 border-t border-current/15 pt-10 sm:grid-cols-4">
            {applicationSteps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.08}>
                <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-sm text-current/65">{step.description}</p>
              </FadeIn>
            ))}
          </div>

          <div className="mt-16">
            <Button
              href={`mailto:${site.email}`}
              variant="outline"
              className="border-current/30 text-current hover:border-accent-fill hover:bg-accent-fill hover:text-accent-fill-ink"
            >
              {copy.applyNow}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
