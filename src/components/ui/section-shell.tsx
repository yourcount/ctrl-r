import { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  kicker?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  kicker,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          {eyebrow ? (
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {title}
          </h2>
          {kicker ? (
            <p className="max-w-2xl text-sm text-zinc-400">{kicker}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

