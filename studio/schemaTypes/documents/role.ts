import { defineType, defineField } from "sanity";

export const role = defineType({
  name: "role",
  title: "Open role",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job title",
      type: "string",
      description: "Kept in English — standard practice for job titles even on the Krio page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "reference",
      to: [{ type: "department" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "employmentType",
      title: "Type",
      type: "string",
      options: { list: ["Full-time", "Freelance"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({
      name: "isOpen",
      title: "Currently open",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide a filled role without deleting its record.",
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "employmentType" },
  },
});
