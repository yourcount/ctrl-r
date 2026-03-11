import { defineField, defineType } from "sanity";

export const contactInfoType = defineType({
  name: "contactInfo",
  title: "Contactinformatie",
  type: "document",
  fields: [
    defineField({ name: "email", title: "E-mail", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "phone", title: "Telefoon", type: "string" }),
    defineField({ name: "intro", title: "Introtekst", type: "text", rows: 3, validation: (rule) => rule.required() }),
  ],
});
