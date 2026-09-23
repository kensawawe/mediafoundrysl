import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { localeParagraphs } from "./objects/localeParagraphs";
import { socialLink } from "./objects/socialLink";
import { caseStudyMedia } from "./objects/caseStudyMedia";
import { impactStat } from "./objects/impactStat";

import { person } from "./documents/person";
import { department } from "./documents/department";
import { role } from "./documents/role";
import { pillar } from "./documents/pillar";
import { applicationStep } from "./documents/applicationStep";
import { journalArticle } from "./documents/journalArticle";
import { workItem } from "./documents/workItem";
import { caseStudy } from "./documents/caseStudy";
import { siteCopy } from "./documents/siteCopy";

export const schemaTypes = [
  // objects
  localeString,
  localeText,
  localeParagraphs,
  socialLink,
  caseStudyMedia,
  impactStat,
  // documents
  person,
  department,
  role,
  pillar,
  applicationStep,
  journalArticle,
  workItem,
  caseStudy,
  siteCopy,
];

/** Document type names that should only ever have one instance. */
export const singletonTypes = new Set(["siteCopy"]);
