import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Koptitel", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "intro", title: "Introtekst", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({
      name: "trustItems",
      title: "Vertrouwenspunten",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(2),
    }),
    defineField({
      name: "services",
      title: "Diensten",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
      validation: (rule) => rule.min(1),
    }),
    defineField({ name: "primaryCta", title: "Primaire CTA", type: "reference", to: [{ type: "cta" }], validation: (rule) => rule.required() }),
    defineField({ name: "secondaryCta", title: "Secundaire CTA", type: "reference", to: [{ type: "cta" }], validation: (rule) => rule.required() }),
  ],
});
