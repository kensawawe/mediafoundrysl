// Set once the Studio project exists (see studio/README.md) — until then
// these are empty and every fetch-with-fallback function in lib/sanity/
// falls back to the local lib/content/*.ts files, so the site builds and
// looks exactly as it does today.
export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const sanityApiVersion = "2026-01-01";

export const isSanityConfigured = sanityProjectId !== "";
