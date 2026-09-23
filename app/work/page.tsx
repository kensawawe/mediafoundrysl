import type { Metadata } from "next";
import { WorkPageBody } from "@/components/work/WorkPageBody";
import { site } from "@/lib/content/site";
import { getWorkItems } from "@/lib/sanity/content/work";

// Metadata is generated server-side, before any client-side language
// toggle can apply — it always reflects the English content.
export const metadata: Metadata = {
  title: `Work — ${site.name}`,
  description:
    "Brand identity, campaigns, film and production, digital and photography work from The Media Foundry.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const workItems = await getWorkItems();
  return <WorkPageBody workItems={workItems} />;
}
