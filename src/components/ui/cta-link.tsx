import Link from "next/link";
import type { CtaConfig } from "@/lib/content/types";

type CtaLinkProps = {
  cta: CtaConfig;
};

export function CtaLink({ cta }: CtaLinkProps) {
  const baseClassName =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]";

  const variantClassName =
    cta.variant === "primary"
      ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-strong)]"
      : "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-surface-muted)]";

  return (
    <Link
      href={cta.href}
      data-tracking-id={cta.trackingId}
      className={`${baseClassName} ${variantClassName}`}
      aria-label={cta.label}
    >
      {cta.label}
    </Link>
  );
}
