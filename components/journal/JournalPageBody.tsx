"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { IgniteRule } from "@/components/ui/IgniteRule";
import { FadeIn, RevealLines } from "@/components/ui/RevealText";
import {
  articles as articlesEn,
  journalHero as journalHeroEn,
  journalCopy as journalCopyEn,
  readSuffix as readSuffixEn,
} from "@/lib/content/journal";
import {
  articles as articlesKri,
  journalHero as journalHeroKri,
  journalCopy as journalCopyKri,
  readSuffix as readSuffixKri,
} from "@/lib/content/journal.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function JournalPageBody() {
  const journalHero = useTranslated(journalHeroEn, journalHeroKri);
  const articles = useTranslated(articlesEn, articlesKri);
  const journalCopy = useTranslated(journalCopyEn, journalCopyKri);
  const readSuffix = useTranslated(readSuffixEn, readSuffixKri);

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
              <FadeIn key={article.slug} delay={i * 0.06}>
                <Link
                  href={`/journal/${article.slug}`}
                  className="focus-ring group grid gap-3 py-10 transition-colors hover:bg-surface sm:grid-cols-2 sm:gap-10"
                >
                  <p className="max-w-xl font-body text-sm text-current/65 sm:text-base">
                    {article.excerpt}
                  </p>
                  <div className="sm:text-right">
                    <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {article.title}
                    </h2>
                    <div className="mt-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-current/50 sm:justify-end">
                      <span>{article.author.name}</span>
                      <span>—</span>
                      <span>{article.date}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3 sm:justify-end">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-current/40">
                        {article.readTime} {readSuffix}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent-text opacity-0 transition-opacity group-hover:opacity-100">
                        {journalCopy.readArticle}
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
