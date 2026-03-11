import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Werk – ctrl+r",
  description:
    "Een selectie van projecten waarin digitale vorm en artistieke praktijk samenkomen.",
};

export default function WorkPage() {
  const projects = getProjects();

  return (
    <div className="bg-linear-to-b from-zinc-950 via-zinc-950 to-black">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <header className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
            Werk
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Projecten in samenwerking met kunstenaars en culturele makers.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            Elk project vertrekt vanuit de praktijk van de maker: wat moet een
            bezoeker voelen, begrijpen en kunnen doen? De techniek volgt dat
            verhaal – niet andersom.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 shadow-sm transition hover:border-zinc-500 hover:bg-zinc-900/70"
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
                  Case
                </p>
                <h2 className="text-base font-semibold text-zinc-50 sm:text-lg">
                  {project.title}
                </h2>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                  {project.subtitle}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                  {project.summary}
                </p>
              </div>
              <div className="mt-4">
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-zinc-200 underline-offset-4 hover:text-zinc-50 hover:underline"
                >
                  Lees de case
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

