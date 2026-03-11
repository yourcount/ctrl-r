import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getProjectCaseBySlug, getProjectCases } from "@/lib/content/content-service";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const projects = await getProjectCases(false);
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const resolved = await params;
  const project = await getProjectCaseBySlug(resolved.slug, false);

  if (!project) {
    return {
      title: "Case niet gevonden",
      alternates: {
        canonical: `/work/${resolved.slug}`,
      },
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const resolved = await params;
  const { isEnabled } = await draftMode();
  const project = await getProjectCaseBySlug(resolved.slug, isEnabled);

  if (!project) {
    notFound();
  }

  return (
    <main id="main-content" className="site-shell">
      <section className="content-section">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/work">Werk</Link>
          <span aria-hidden>/</span>
          <span>{project.title}</span>
        </nav>
        <p className="eyebrow">Case</p>
        <h1>{project.title}</h1>
        <p className="card-meta">{project.subtitle}</p>
        <p className="lead">{project.summary}</p>
      </section>

      <section className="content-section prose-block">
        <p>{project.body}</p>
      </section>

      <section className="content-section contact-block">
        <p>
          Wil je een soortgelijk traject starten? <Link href="/#contact">Plan een gesprek</Link>.
        </p>
      </section>
    </main>
  );
}
