import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";
import { careersStub } from "@/lib/content/careers";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `Careers — ${site.name}`,
  description: careersStub.body,
};

export default function CareersPage() {
  return (
    <StubPage
      eyebrow={careersStub.eyebrow}
      title={careersStub.title}
      body={careersStub.body}
      cta={careersStub.cta}
    />
  );
}
