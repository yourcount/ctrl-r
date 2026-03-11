import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema";
import { deskStructure } from "./src/sanity/structure";

export default defineConfig({
  name: "default",
  title: "ctrl+r CMS",
  projectId: "dxucanzd",
  dataset: "production",
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) =>
          !["siteSettings", "homePage", "contactInfo"].includes(schemaType),
      ),
  },
});
