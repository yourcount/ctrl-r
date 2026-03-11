import { createClient } from "@sanity/client";
import { sanityEnv } from "@/lib/sanity/env";

export function getSanityClient(preview = false) {
  if (!sanityEnv.projectId || !sanityEnv.dataset) {
    return null;
  }

  return createClient({
    projectId: sanityEnv.projectId,
    dataset: sanityEnv.dataset,
    apiVersion: sanityEnv.apiVersion,
    useCdn: !preview,
    token: preview ? sanityEnv.readToken : undefined,
    perspective: preview ? "drafts" : "published",
  });
}
