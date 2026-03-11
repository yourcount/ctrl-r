import { SectionShell } from "@/components/ui/section-shell";

const projects = [
  {
    title: "Florescencism",
    subtitle: "Interactieve 3D-galerij",
    description:
      "Een digitale ruimte waar bezoekers zich vrij door een groeiend universum van werken kunnen bewegen.",
  },
  {
    title: "Yo! Treasure Fest",
    subtitle: "Festival website",
    description:
      "Een speelse, toegankelijke site die programma, locaties en makers helder in beeld brengt.",
  },
  {
    title: "Nina Lynn",
    subtitle: "Artiestenportfolio",
    description:
      "Een rustige, beeldende site die muziek, stories en optredens samenbrengt.",
  },
];

export function WorkSection() {
  return (
    <SectionShell
      id="work"
      eyebrow="Recent werk"
      title="Cases waarin digitale vorm en artistieke praktijk samenkomen."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 shadow-sm transition hover:border-zinc-500 hover:bg-zinc-900/70"
          >
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-zinc-50 sm:text-base">
                {project.title}
              </h3>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                {project.subtitle}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

