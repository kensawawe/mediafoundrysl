"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SlateTag } from "@/components/ui/SlateTag";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { FadeIn } from "@/components/ui/RevealText";
import {
  articles as articlesEn,
  journalCopy as journalCopyEn,
  readSuffix as readSuffixEn,
  type Article,
} from "@/lib/content/journal";
import {
  articles as articlesKri,
  journalCopy as journalCopyKri,
  readSuffix as readSuffixKri,
} from "@/lib/content/journal.kri";
import { useTranslated } from "@/lib/content/useTranslated";

function AuthorAvatar({ name, image }: { name: string; image?: string }) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export, no image loader configured
      <img
        src={image}
        alt={name}
        className="h-12 w-12 shrink-0 border border-border-subtle object-cover"
      />
    );
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border-subtle bg-surface font-display text-sm font-bold text-current/60">
      {initials}
    </div>
  );
}

// `article` is the server-resolved English article (guaranteed to exist —
// the page already 404s otherwise); this only needs to swap in the
// same-slug Krio version when that language is active.
export function ArticlePageBody({ article }: { article: Article }) {
  const articles = useTranslated(articlesEn, articlesKri);
  const journalCopy = useTranslated(journalCopyEn, journalCopyKri);
  const readSuffix = useTranslated(readSuffixEn, readSuffixKri);
  const translated = articles.find((a) => a.slug === article.slug) ?? article;

  return (
    <>
      <div className="pt-28 pb-12 md:pt-32 md:pb-16">
        <Container>
          <Link
            href="/journal"
            className="focus-ring font-mono text-xs uppercase tracking-[0.03em] text-current/50 hover:text-accent-text"
          >
            {journalCopy.backToJournal}
          </Link>

          <div className="mt-6">
            <SlateTag>
              {translated.category}
              <span className="text-current/40"> — {translated.date}</span>
            </SlateTag>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl">
              {translated.title}
            </h1>
            <span className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.03em] text-current/40">
              {translated.readTime} {readSuffix}
            </span>
          </div>

          <div className="mt-10 flex items-center gap-4 border-y border-border-subtle py-6">
            <AuthorAvatar name={translated.author.name} image={translated.author.image} />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.03em] text-current/40">
                {journalCopy.writtenBy}
              </p>
              <p className="font-display text-base font-bold tracking-tight">{translated.author.name}</p>
              <p className="font-mono text-xs text-current/55">{translated.author.role}</p>
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
        </Container>
      </div>

      <Section className="pt-0 md:pt-0">
        <Container>
          <div className="max-w-2xl space-y-6">
            {translated.body.map((paragraph, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <p className="font-body text-base leading-relaxed text-current/80 sm:text-lg">
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
