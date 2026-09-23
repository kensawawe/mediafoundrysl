import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

// Set after running `npx sanity init` (see studio/README.md) — that command
// creates the project on sanity.io and fills these in for you.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "media-foundry",
  title: "The Media Foundry",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});
