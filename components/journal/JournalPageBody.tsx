"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/RevealText";
import { LayeredText } from "@/components/ui/LayeredText";
import {
  journalHero as journalHeroEn,
  readSuffix as readSuffixEn,
  type Article,
} from "@/lib/content/journal";
import { journalHero as journalHeroKri, readSuffix as readSuffixKri } from "@/lib/content/journal.kri";
import { useTranslated } from "@/lib/content/useTranslated";

export function JournalPageBody({ articles: articlesByLang }: { articles: { en: Article[]; kri: Article[] } }) {
  const journalHero = useTranslated(journalHeroEn, journalHeroKri);
  const articles = useTranslated(articlesByLang.en, articlesByLang.kri);
  const readSuffix = useTranslated(readSuffixEn, readSuffixKri);

  return (
    <>
      <div className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <h1 className="sr-only">{journalHero.title}</h1>
          <LayeredText
            className="-ml-4 py-6 md:py-10"
            fontSize="60px"
            fontSizeMd="30px"
            lineHeight={56}
            lineHeightMd={32}
            lines={[
              { top: "\u00A0", bottom: "NOTES" },
              { top: "NOTES", bottom: "FROM" },
              { top: "FROM", bottom: "THE" },
              { top: "THE", bottom: "FLOOR." },
              { top: "FLOOR.", bottom: "\u00A0" },
            ]}
          />
          <p className="mx-auto mt-8 max-w-md text-center font-body text-base text-current/60 sm:max-w-none sm:whitespace-nowrap sm:text-lg">
            {journalHero.body}
          </p>
        </Container>
      </div>

      <Section className="pt-0">
        <Container>
          <div className="ingot-rule w-full" style={{ background: "#1eb53a" }} />
          <div className="mt-4 divide-y divide-border-subtle">
            {articles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 0.06}>
                <Link
                  href={`/journal/${article.slug}`}
                  className="focus-ring grid gap-3 py-10 transition-colors hover:bg-surface sm:grid-cols-2 sm:gap-10"
                >
                  <div>
                    <h2 className="font-godthem text-xl font-normal tracking-[0.02em] sm:text-2xl">
                      {article.title}
                    </h2>
                    <p className="mt-3 max-w-xl font-body text-sm text-current/65 sm:text-base">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <div className="flex items-center gap-3 font-godthem text-xs uppercase tracking-[0.06em] text-current/70 sm:justify-end">
                      <span>{article.author.name}</span>
                      <span>—</span>
                      <span>{article.date}</span>
                    </div>
                    <span className="mt-3 block font-godthem text-[11px] uppercase tracking-[0.06em] text-current/70">
                      {article.readTime} {readSuffix}
                    </span>
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
