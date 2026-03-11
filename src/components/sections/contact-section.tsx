import { SectionShell } from "@/components/ui/section-shell";

export function ContactSection() {
  return (
    <SectionShell
      id="contact"
      eyebrow="Samenwerken"
      title="Een idee, project of lopende praktijk waar je over wilt sparren?"
      kicker="Stuur een bericht met een korte schets van je werk en waar je nu tegenaan loopt. We kijken samen wat een logische volgende stap is."
    >
      <div className="max-w-xl space-y-4 text-sm text-zinc-300 sm:text-base">
        <p>
          In de volgende iteratie komt hier een volledig contactformulier met
          validatie en e-mailverwerking. Tot die tijd kun je me bereiken via
          het e-mailadres dat je gebruikt voor dit project, of door een notitie
          toe te voegen in de gedeelde omgeving.
        </p>
      </div>
    </SectionShell>
  );
}

