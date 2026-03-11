import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site-instellingen",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site titel", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "siteUrl", title: "Site URL", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "organizationName", title: "Organisatienaam", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "organizationDescription", title: "Organisatiebeschrijving", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "primaryCta", title: "Primaire CTA", type: "reference", to: [{ type: "cta" }], validation: (rule) => rule.required() }),
  ],
});
