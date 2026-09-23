import { defineType, defineField } from "sanity";

/** One of the three "Stories Worth Telling" style values on the Careers page. */
export const pillar = defineType({
  name: "pillar",
  title: "Careers pillar",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString", validation: (rule) => rule.required() }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title.en" },
  },
});
