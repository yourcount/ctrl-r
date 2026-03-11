import { type SchemaTypeDefinition } from "sanity";
import { contactInfoType } from "./schemas/contact-info";
import { ctaType } from "./schemas/cta";
import { homePageType } from "./schemas/home-page";
import { projectCaseType } from "./schemas/project-case";
import { serviceType } from "./schemas/service";
import { siteSettingsType } from "./schemas/site-settings";

export const schemaTypes: SchemaTypeDefinition[] = [
  ctaType,
  serviceType,
  projectCaseType,
  contactInfoType,
  siteSettingsType,
  homePageType,
];
