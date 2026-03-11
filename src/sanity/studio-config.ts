import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const studioConfig = defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "ctrl+r CMS",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool(), visionTool()],
});
