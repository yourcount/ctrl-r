import { SectionShell } from "@/components/ui/section-shell";

export function FocusSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="Focus op creatie"
      title="Digitaal fundament voor kunstenaars en culturele makers."
      kicker="Je website moet werken als een verlengstuk van je atelier: helder, uitnodigend en betrouwbaar."
    >
      <div className="max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
        <p>
          Samen vertalen we je werk en praktijk naar een digitale ervaring die
          klopt. Geen generieke templates, maar een site die recht doet aan je
          oeuvre, je proces en je publiek.
        </p>
      </div>
    </SectionShell>
  );
}

