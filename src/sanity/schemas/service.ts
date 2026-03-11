import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Dienst",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "Samenvatting", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "orderRank", title: "Volgorde", type: "number" }),
  ],
});
