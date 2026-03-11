import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { getProjectCases } from "@/lib/content/content-service";

export const metadata: Metadata = {
  title: "Werk",
  description:
    "Een selectie van cases waarin digitale vorm, strategie en artistieke praktijk samenkomen.",
  alternates: {
    canonical: "/work",
  },
};

export default async function WorkPage() {
  const { isEnabled } = await draftMode();
  const projects = await getProjectCases(isEnabled);

  return (
    <main id="main-content" className="site-shell">
      <section className="content-section">
        <p className="eyebrow">Werk</p>
        <h1>Projecten in samenwerking met kunstenaars en culturele makers.</h1>
        <p className="lead">
          Elk project vertrekt vanuit de praktijk van de maker: wat moet een
          bezoeker voelen, begrijpen en kunnen doen?
        </p>
      </section>

      <section className="content-section" aria-labelledby="work-overview-heading">
        <h2 id="work-overview-heading" className="visually-hidden">
          Projectoverzicht
        </h2>
        <div className="card-grid">
          {projects.map((project) => (
            <article key={project.slug} className="info-card">
              <p className="card-meta">{project.subtitle}</p>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <Link href={`/work/${project.slug}`} className="card-link">
                Lees de case
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
