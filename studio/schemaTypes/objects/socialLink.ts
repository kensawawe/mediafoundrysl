import { defineType, defineField } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: ["instagram", "tiktok", "youtube", "linkedin", "facebook", "x"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "href" },
  },
});
