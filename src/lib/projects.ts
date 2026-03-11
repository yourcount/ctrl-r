import {
  getProjectCaseBySlug,
  getProjectCases,
} from "@/lib/content/content-service";
import type { ProjectCase } from "@/lib/content/types";

export type Project = ProjectCase;

export async function getProjects(preview = false): Promise<Project[]> {
  return getProjectCases(preview);
}

export async function getProjectBySlug(
  slug: string,
  preview = false,
): Promise<Project | undefined> {
  return getProjectCaseBySlug(slug, preview);
}
