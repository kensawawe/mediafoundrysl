import { defineType, defineField } from "sanity";

/**
 * A journal article's body: a list of paragraphs, in both languages. Each
 * language is its own ordered list of strings, matching the `body: string[]`
 * shape in lib/content/journal.ts / journal.kri.ts.
 */
export const localeParagraphs = defineType({
  name: "localeParagraphs",
  title: "Body (English / Krio)",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "kri",
      title: "Krio",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
