import { defineType, defineField } from "sanity";

/** Same as localeString, but a multi-line textarea for longer copy. */
export const localeText = defineType({
  name: "localeText",
  title: "Paragraph (English / Krio)",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "kri", title: "Krio", type: "text", rows: 3, validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "en" },
  },
});
