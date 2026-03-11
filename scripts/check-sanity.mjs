import "dotenv/config";
import { createClient } from "@sanity/client";

const required = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "SANITY_PREVIEW_SECRET",
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_READ_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-11",
  token,
  useCdn: false,
});

try {
  const total = await client.fetch("count(*[_type in ['homePage','siteSettings','projectCase']])");
  console.log(`Sanity check OK: project=${projectId}, dataset=${dataset}, core docs=${total}`);
  process.exit(0);
} catch (error) {
  console.error(`Sanity check failed: ${error.message}`);
  process.exit(1);
}
