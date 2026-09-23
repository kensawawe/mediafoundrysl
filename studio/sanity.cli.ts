import { defineCliConfig } from "sanity/cli";

// Used by the Sanity CLI itself (dataset/deploy/etc.) — separate from
// sanity.config.ts, which configures the Studio app.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
});
