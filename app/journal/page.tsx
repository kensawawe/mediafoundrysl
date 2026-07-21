import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";
import { journalStub } from "@/lib/content/journal";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `The Foundry Journal — ${site.name}`,
  description: journalStub.body,
};

export default function JournalPage() {
  return (
    <StubPage
      eyebrow={journalStub.eyebrow}
      title={journalStub.title}
      body={journalStub.body}
    />
  );
}
