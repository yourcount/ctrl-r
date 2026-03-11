import { type SchemaTypeDefinition } from "sanity";
import { contactInfoType } from "@/sanity/schemas/contact-info";
import { ctaType } from "@/sanity/schemas/cta";
import { homePageType } from "@/sanity/schemas/home-page";
import { projectCaseType } from "@/sanity/schemas/project-case";
import { serviceType } from "@/sanity/schemas/service";
import { siteSettingsType } from "@/sanity/schemas/site-settings";

export const schemaTypes: SchemaTypeDefinition[] = [
  ctaType,
  serviceType,
  projectCaseType,
  contactInfoType,
  siteSettingsType,
  homePageType,
];
