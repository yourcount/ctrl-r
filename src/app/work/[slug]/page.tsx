import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/projects";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Case niet gevonden – ctrl+r",
    };
  }

  return {
    title: `${project.title} – ctrl+r`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-linear-to-b from-zinc-950 via-zinc-950 to-black">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <nav className="text-xs text-zinc-400">
          <Link
            href="/work"
            className="underline-offset-4 hover:text-zinc-100 hover:underline"
          >
            Werk
          </Link>
          <span className="mx-1.5 text-zinc-600">/</span>
          <span className="text-zinc-300">{project.title}</span>
        </nav>

        <header className="space-y-4">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
            Case
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {project.title}
          </h1>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {project.subtitle}
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            {project.summary}
          </p>
        </header>

        <section className="max-w-3xl space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
          <p>{project.body}</p>
        </section>

        <section className="mt-4">
          <p className="text-sm text-zinc-400">
            Wil je een soortgelijk traject starten of ben je benieuwd wat dit
            voor jouw praktijk kan betekenen?{" "}
            <a
              href="#contact"
              className="font-medium text-zinc-100 underline-offset-4 hover:underline"
            >
              Plan een gesprek
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

