import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { isSanityConfigured, sanityApiVersion, sanityDataset, sanityProjectId } from "@/lib/sanity/env";

/** The shape of a Sanity `image` field's value — just enough for the URL builder. */
export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
};

// `output: "export"` means every fetch here runs once, at `next build` time
// — there is no server at runtime to hit Sanity again, so content changes
// need a new build (see studio/README.md's webhook note). useCdn stays
// false so a build always sees the latest published content, not a cached
// edge copy that might be a few minutes stale.
export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: false,
    })
  : null;

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

/** URL for a Sanity image field, or `undefined` if the field is empty. */
export function urlForImage(source: SanityImage | undefined | null, width?: number): string | undefined {
  if (!source || !builder) return undefined;
  let img = builder.image(source);
  if (width) img = img.width(width);
  return img.auto("format").url();
}
