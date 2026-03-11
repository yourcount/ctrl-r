export function HeroSection() {
  return (
    <section className="scroll-mt-24 pt-4">
      <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1 text-xs font-medium text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            ctrl+r · Digitale vernieuwing voor cultuur
          </p>
          <div className="space-y-4">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
              Focus op creatie.
            </h1>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-zinc-300 sm:text-base">
              Als kunstenaar wil je je tijd besteden aan creëren. Ik neem de
              technische en strategische kant van je online aanwezigheid uit
              handen, zodat jij je kunt richten op wat essentieel is: je werk.
            </p>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
            Ik geloof in de waarde van duurzame samenwerkingen. Daarom werk ik
            flexibel en niet met vaste tarieven. Voor projecten sta ik open
            voor een kunstruil als vergoeding, altijd in goed overleg.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-5 py-2 text-sm font-medium text-zinc-950 shadow-sm transition hover:bg-zinc-200"
            >
              Plan een gesprek
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              Bekijk recent werk
            </a>
          </div>
        </div>
        <div className="space-y-4 text-sm text-zinc-300 md:pl-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Kernwoorden
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
                Vloeibaarheid
              </p>
              <p className="mt-2 text-xs text-zinc-300">
                Websites die meebewegen met je praktijk, niet vastroesten.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
                Zwaartekracht
              </p>
              <p className="mt-2 text-xs text-zinc-300">
                Een duidelijke kernpropositie die de juiste bezoekers aantrekt.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
                Chaos
              </p>
              <p className="mt-2 text-xs text-zinc-300">
                Creatieve vrijheid zonder de digitale basis uit het oog te
                verliezen.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
                Reset
              </p>
              <p className="mt-2 text-xs text-zinc-300">
                Een frisse start voor je online aanwezigheid, stap voor stap.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

