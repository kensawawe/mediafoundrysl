import { defineType, defineField } from "sanity";

export const journalArticle = defineType({
  name: "journalArticle",
  title: "Journal article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. Studio, Craft, Production, Brand — shown as a plain label, no fixed list.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read time",
      type: "string",
      description: 'e.g. "4 min" — shown as-is in both languages.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: 'Shown as written, e.g. "May 2026" — not a real date picker on purpose.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localeParagraphs",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "person" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description: "Used to order the Journal index, newest first.",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    { title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title.en", subtitle: "category", media: "author.image" },
  },
});
