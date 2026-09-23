import type { StructureResolver } from "sanity/structure";
import { singletonTypes } from "./schemaTypes";

/**
 * Groups documents by the part of the site they belong to, and pins "Site
 * copy" as a single editable document rather than a list you could
 * accidentally add a second entry to.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("The Media Foundry")
    .items([
      S.listItem()
        .title("Site copy")
        .id("siteCopy")
        .child(S.document().schemaType("siteCopy").documentId("siteCopy")),
      S.divider(),
      S.listItem().title("Team").schemaType("person").child(S.documentTypeList("person").title("Team")),
      S.divider(),
      S.listItem().title("Journal articles").schemaType("journalArticle").child(
        S.documentTypeList("journalArticle").title("Journal articles"),
      ),
      S.divider(),
      S.listItem().title("Work items").schemaType("workItem").child(S.documentTypeList("workItem").title("Work items")),
      S.listItem().title("Case studies").schemaType("caseStudy").child(
        S.documentTypeList("caseStudy").title("Case studies"),
      ),
      S.divider(),
      S.listItem().title("Open roles").schemaType("role").child(S.documentTypeList("role").title("Open roles")),
      S.listItem().title("Departments").schemaType("department").child(
        S.documentTypeList("department").title("Departments"),
      ),
      S.listItem().title("Careers pillars").schemaType("pillar").child(
        S.documentTypeList("pillar").title("Careers pillars"),
      ),
      S.listItem().title("Application steps").schemaType("applicationStep").child(
        S.documentTypeList("applicationStep").title("Application steps"),
      ),
      // Any schema type not explicitly listed above (and not a singleton)
      // still shows up here, so nothing added later goes missing.
      ...S.documentTypeListItems().filter(
        (item) =>
          !singletonTypes.has(item.getId() ?? "") &&
          !["person", "journalArticle", "workItem", "caseStudy", "role", "department", "pillar", "applicationStep"].includes(
            item.getId() ?? "",
          ),
      ),
    ]);
