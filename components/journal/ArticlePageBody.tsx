"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { FadeIn } from "@/components/ui/RevealText";
import { journalCopy as journalCopyEn, readSuffix as readSuffixEn, type Article } from "@/lib/content/journal";
import { journalCopy as journalCopyKri, readSuffix as readSuffixKri } from "@/lib/content/journal.kri";
import { useTranslated } from "@/lib/content/useTranslated";

// `article` is the server-resolved English article (guaranteed to exist —
// the page already 404s otherwise); this only needs to swap in the
// same-slug Krio version when that language is active.
export function ArticlePageBody({
  article,
  articles: articlesByLang,
}: {
  article: Article;
  articles: { en: Article[]; kri: Article[] };
}) {
  const articles = useTranslated(articlesByLang.en, articlesByLang.kri);
  const journalCopy = useTranslated(journalCopyEn, journalCopyKri);
  const readSuffix = useTranslated(readSuffixEn, readSuffixKri);
  const translated = articles.find((a) => a.slug === article.slug) ?? article;

  return (
    <>
      <div className="pt-28 pb-12 md:pt-32 md:pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/journal"
              className="focus-ring font-godthem text-xs uppercase tracking-[0.06em] text-current/70 hover:text-accent-text"
            >
              {journalCopy.backToJournal}
            </Link>

            <div className="mt-6">
              <SlateTag>
                {translated.category}
                <span className="text-current/40"> — {translated.date}</span>
              </SlateTag>
              <h1 className="mt-4 font-godthem text-3xl font-normal uppercase leading-[1.12] tracking-[0.02em] sm:text-4xl md:text-5xl">
                {translated.title}
              </h1>
              <span className="mt-4 inline-block font-godthem text-[11px] uppercase tracking-[0.06em] text-current/70">
                {translated.readTime} {readSuffix}
              </span>
            </div>

            <div className="mt-10 flex items-center gap-4 border-y border-border-subtle py-6">
              <div>
                <p className="font-godthem text-[11px] uppercase tracking-[0.06em] text-current/70">
                  {journalCopy.writtenBy}
                </p>
                <p className="font-godthem text-base font-normal tracking-[0.02em]">{translated.author.name}</p>
                <p className="font-godthem text-xs tracking-[0.04em] text-current/70">{translated.author.role}</p>
              </div>
              {translated.author.socials.length > 0 && (
                <div className="ml-auto flex items-center gap-3">
                  {translated.author.socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${translated.author.name} on ${s.platform}`}
                      className="focus-ring text-current/50 transition-colors hover:text-accent-text"
                    >
                      <SocialIcon platform={s.platform} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Section className="pt-0 md:pt-0">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            {translated.body.map((paragraph, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <p className="text-justify font-body text-base leading-relaxed text-current/80 sm:text-lg">
                  {paragraph}
                </p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
