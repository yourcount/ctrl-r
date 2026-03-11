import type { Metadata } from "next";
import { isSanityConfigured, sanityEnv } from "@/lib/sanity/env";

export const metadata: Metadata = {
  title: "Beheer",
  description: "Instructies voor de Sanity beheeromgeving van ctrl+r.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioPage() {
  const projectId = sanityEnv.projectId ?? "<project-id>";
  const dataset = sanityEnv.dataset ?? "production";
  const sanityManageUrl = `https://www.sanity.io/manage/project/${projectId}`;

  return (
    <main id="main-content" className="site-shell">
      <section className="content-section">
        <p className="eyebrow">Beheer</p>
        <h1>Sanity CMS</h1>
        <p className="lead">
          Beheer content via Sanity. De website leest publiceerde content automatisch uit,
          met fallback-content als de verbinding ontbreekt.
        </p>
      </section>

      <section className="content-section">
        <h2>Snelle setup</h2>
        <ol>
          <li>Maak een Sanity project aan en noteer project-id en dataset.</li>
          <li>Zet `.env.local` variabelen voor project-id, dataset en preview secret.</li>
          <li>Start lokaal de editor met <code>npm run sanity:studio</code> en publiceer content.</li>
        </ol>
        <p>
          Project: <code>{projectId}</code> · Dataset: <code>{dataset}</code>
        </p>
        {isSanityConfigured ? (
          <p>
            <a href={sanityManageUrl} target="_blank" rel="noreferrer">
              Open Sanity projectbeheer
            </a>
          </p>
        ) : (
          <p>
            Voeg eerst <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> en <code>NEXT_PUBLIC_SANITY_DATASET</code> toe.
          </p>
        )}
      </section>
    </main>
  );
}
