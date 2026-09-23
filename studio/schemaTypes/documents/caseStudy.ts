import { defineType, defineField } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({
      name: "workItem",
      title: "Work item",
      type: "reference",
      to: [{ type: "workItem" }],
      description: "The card on /work this case study belongs to — title, category and client image come from there.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Should match the work item's slug — this is the /work/[slug] URL.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: "Leave blank to hide the year on the page — never guess one.",
    }),
    defineField({
      name: "heroMedia",
      title: "Hero media caption",
      type: "caseStudyMedia",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "useWorkItemImage",
      title: "Use the work item's real image as the hero",
      type: "boolean",
      initialValue: true,
      description: "Turn off to show the plain placeholder frame instead.",
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "caseStudyMedia" }],
      description: "Leave empty to hide the Gallery section entirely.",
    }),
    defineField({
      name: "impact",
      title: "Results",
      type: "array",
      of: [{ type: "impactStat" }],
      description: "Leave empty to hide the Results section entirely. Only real, confirmed numbers — never invent one.",
    }),
  ],
  preview: {
    select: { title: "workItem.title", subtitle: "slug.current" },
  },
});
