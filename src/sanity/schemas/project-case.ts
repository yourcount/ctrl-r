import { defineField, defineType } from "sanity";

export const projectCaseType = defineType({
  name: "projectCase",
  title: "Projectcase",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "subtitle", title: "Subtitel", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "Samenvatting", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "image", title: "Projectafbeelding", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageUrl", title: "Externe afbeeldings-URL", type: "url" }),
    defineField({ name: "body", title: "Case-inhoud", type: "text", rows: 8, validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", title: "Publicatiedatum", type: "datetime" }),
    defineField({ name: "orderRank", title: "Volgorde", type: "number" }),
  ],
});
