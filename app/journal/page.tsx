import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { IgniteRule } from "@/components/ui/IgniteRule";
import { FadeIn, RevealLines } from "@/components/ui/RevealText";
import { articles, journalHero } from "@/lib/content/journal";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `Journal — ${site.name}`,
  description: journalHero.body,
};

export default function JournalPage() {
  return (
    <>
      <div className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <SlateTag>{journalHero.eyebrow}</SlateTag>
          <h1 className="mt-5 max-w-3xl font-display text-6xl font-black uppercase leading-[0.86] tracking-tight sm:text-7xl md:text-8xl">
            <RevealLines lines={[journalHero.title]} onMount />
          </h1>
          <p className="mt-8 max-w-md font-body text-base text-current/60 sm:text-lg">
            {journalHero.body}
          </p>
        </Container>
      </div>

      <Section className="pt-0">
        <Container>
          <IgniteRule />
          <div className="mt-4 divide-y divide-border-subtle">
            {articles.map((article, i) => (
              <FadeIn key={article.title} delay={i * 0.06}>
                <div className="grid gap-3 py-10 sm:grid-cols-[1fr_2fr] sm:gap-10">
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-current/50">
                    <span className="text-accent-text">{article.category}</span>
                    <span>—</span>
                    <span>{article.date}</span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {article.title}
                    </h2>
                    <p className="mt-3 max-w-xl font-body text-sm text-current/65 sm:text-base">
                      {article.excerpt}
                    </p>
                    <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-current/40">
                      {article.readTime} read
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
