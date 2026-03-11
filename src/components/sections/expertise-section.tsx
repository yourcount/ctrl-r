import { SectionShell } from "@/components/ui/section-shell";

const expertise = [
  {
    index: "01",
    title: "Webdesign",
    description:
      "Websites als verlengstuk van je atelier – van minimalistisch portfolio tot interactieve expositie.",
  },
  {
    index: "02",
    title: "Gebruikerservaring",
    description:
      "Doordachte flows waardoor bezoekers intuïtief door je werk bewegen, met focus op beleving.",
  },
  {
    index: "03",
    title: "Strategie & beheer",
    description:
      "Een partner die technisch én strategisch meekijkt, zodat je site veilig, actueel en houdbaar blijft.",
  },
];

export function ExpertiseSection() {
  return (
    <SectionShell
      id="expertise"
      eyebrow="Mijn expertise"
      title="Van eerste schets tot duurzaam beheer."
      kicker="Webdesign · User Experience · Cultuur & Kunst"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {expertise.map((item) => (
          <article
            key={item.index}
            className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 shadow-sm"
          >
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
              {item.index} / {item.title}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-zinc-300 sm:text-sm">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

