import { defineType, defineField } from "sanity";

/**
 * A careers filter category (Creative, Production, Strategy, Operations…).
 * Kept as its own document — rather than a plain string on `role` — so the
 * "All" entry and each department's label can be translated once and reused
 * by every role, matching the departments[]/roles[].department relationship
 * in lib/content/careers.ts.
 */
export const department = defineType({
  name: "department",
  title: "Department",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString", validation: (rule) => rule.required() }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first in the filter list.",
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "label.en" },
  },
});
