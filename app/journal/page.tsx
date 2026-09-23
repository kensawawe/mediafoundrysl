import type { Metadata } from "next";
import { JournalPageBody } from "@/components/journal/JournalPageBody";
import { journalHero } from "@/lib/content/journal";
import { site } from "@/lib/content/site";
import { getJournalArticles } from "@/lib/sanity/content/journal";

// Metadata is generated server-side, before any client-side language
// toggle can apply — it always reflects the English content.
export const metadata: Metadata = {
  title: `Journal — ${site.name}`,
  description: journalHero.body,
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const articles = await getJournalArticles();
  return <JournalPageBody articles={articles} />;
}
