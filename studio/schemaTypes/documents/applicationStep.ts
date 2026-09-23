import { defineType, defineField } from "sanity";

/** One step of the "How to Apply" walkthrough on the Careers page. */
export const applicationStep = defineType({
  name: "applicationStep",
  title: "Application step",
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
