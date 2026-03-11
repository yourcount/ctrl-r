const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const sanityEnv = {
  projectId,
  dataset,
  apiVersion: "2026-03-11",
  readToken: process.env.SANITY_API_READ_TOKEN,
  previewSecret: process.env.SANITY_PREVIEW_SECRET,
};

export const isSanityConfigured = Boolean(projectId && dataset);
