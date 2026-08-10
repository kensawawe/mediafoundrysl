import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageBody } from "@/components/merch/ProductPageBody";
import { merchItems } from "@/lib/content/merch";
import { site } from "@/lib/content/site";

export function generateStaticParams() {
  return merchItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = merchItems.find((p) => p.slug === slug);
  if (!item) return {};
  return {
    title: `${item.name} — ${site.name}`,
    description: item.description,
    // Same soft-launch gating as /merch itself — not linked, not
    // sitemapped, and explicitly kept out of search results.
    robots: { index: false, follow: false },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = merchItems.find((p) => p.slug === slug);
  if (!item) notFound();

  return <ProductPageBody item={item} />;
}
