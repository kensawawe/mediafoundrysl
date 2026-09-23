import { defineType, defineField } from "sanity";

/**
 * A short piece of text in both site languages. Mirrors the .ts/.kri.ts
 * file pairs in the Next.js repo's lib/content — one field, two languages,
 * instead of two parallel files.
 */
export const localeString = defineType({
  name: "localeString",
  title: "Text (English / Krio)",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "kri", title: "Krio", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "en" },
  },
});
