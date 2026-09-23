import { defineType, defineField } from "sanity";

export const impactStat = defineType({
  name: "impactStat",
  title: "Result",
  type: "object",
  fields: [
    defineField({
      name: "stat",
      title: "Number",
      type: "string",
      description: 'e.g. "150+" or "1ST" — kept as a free-form string so it can hold non-numeric stats.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "label", title: "Label", type: "localeString", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "stat", subtitle: "label.en" },
  },
});
