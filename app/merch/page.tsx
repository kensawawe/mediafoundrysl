import type { Metadata } from "next";
import { MerchPageBody } from "@/components/merch/MerchPageBody";
import { merchHero } from "@/lib/content/merch";
import { site } from "@/lib/content/site";

// Not yet linked from any nav and excluded from sitemap.ts — this page is
// a soft-launch preview only reachable by direct URL. noindex/nofollow is
// a second layer of protection so it doesn't get crawled or surface in
// search results before the merch line is actually ready to announce.
export const metadata: Metadata = {
  title: `Merch — ${site.name}`,
  description: merchHero.body,
  robots: { index: false, follow: false },
};

export default function MerchPage() {
  return <MerchPageBody />;
}
