import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";

loadEnv({ path: ".env.local", quiet: true });
loadEnv({ quiet: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
const siteUrl =
  process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || "https://ctrl-r-nine.vercel.app";

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-11",
  token,
  useCdn: false,
});

const targetId = "siteSettings";

async function run() {
  await client
    .patch(targetId)
    .set({ siteUrl })
    .setIfMissing({
      _type: "siteSettings",
      siteTitle: "ctrl+r",
      organizationName: "ctrl+r",
      organizationDescription:
        "ctrl+r helpt kunstenaars en culturele makers met websites, strategie en duurzaam beheer.",
    })
    .commit({ autoGenerateArrayKeys: true });

  const doc = await client.fetch(
    "*[_type == 'siteSettings'][0]{_id, siteUrl}",
  );

  console.log(`Site settings synced: ${doc?._id ?? "none"} -> ${doc?.siteUrl ?? "missing"}`);
}

run().catch((error) => {
  console.error("Sync failed:", error.message);
  process.exit(1);
});
