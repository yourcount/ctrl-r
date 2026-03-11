import {
  fallbackContactInfo,
  fallbackHomePageContent,
  fallbackProjectCases,
  fallbackSiteSettings,
} from "@/lib/content/fallback-content";
import type {
  ContactInfo,
  HomePageContent,
  ProjectCase,
  SiteSettings,
} from "@/lib/content/types";
import { getSanityClient } from "@/lib/sanity/client";
import {
  contactInfoQuery,
  homePageQuery,
  projectCaseBySlugQuery,
  projectCasesQuery,
  siteSettingsQuery,
} from "@/lib/sanity/queries";

async function fetchWithFallback<T>(
  query: string,
  fallbackValue: T,
  preview = false,
  params?: Record<string, unknown>,
): Promise<T> {
  const client = getSanityClient(preview);

  if (!client) {
    return fallbackValue;
  }

  try {
    const data = await client.fetch<T>(query, params ?? {});
    if (!data) {
      return fallbackValue;
    }

    if (Array.isArray(data) && data.length === 0) {
      return fallbackValue;
    }

    return data;
  } catch {
    return fallbackValue;
  }
}

export async function getHomePageContent(
  preview = false,
): Promise<HomePageContent> {
  return fetchWithFallback(homePageQuery, fallbackHomePageContent, preview);
}

export async function getProjectCases(preview = false): Promise<ProjectCase[]> {
  return fetchWithFallback(projectCasesQuery, fallbackProjectCases, preview);
}

export async function getProjectCaseBySlug(
  slug: string,
  preview = false,
): Promise<ProjectCase | undefined> {
  const fallback = fallbackProjectCases.find((project) => project.slug === slug);
  return fetchWithFallback(projectCaseBySlugQuery, fallback, preview, { slug });
}

export async function getContactInfo(preview = false): Promise<ContactInfo> {
  return fetchWithFallback(contactInfoQuery, fallbackContactInfo, preview);
}

export async function getSiteSettings(preview = false): Promise<SiteSettings> {
  return fetchWithFallback(siteSettingsQuery, fallbackSiteSettings, preview);
}
