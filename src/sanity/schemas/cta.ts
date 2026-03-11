import { defineField, defineType } from "sanity";

export const ctaType = defineType({
  name: "cta",
  title: "CTA",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "href", title: "Link", type: "string", description: "Bijv. /work of #contact", validation: (rule) => rule.required() }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      initialValue: "primary",
      options: { list: ["primary", "secondary"] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "trackingId", title: "Tracking ID", type: "string", validation: (rule) => rule.required() }),
  ],
});
