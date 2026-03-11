export type CtaVariant = "primary" | "secondary";

export type CtaConfig = {
  label: string;
  href: string;
  variant: CtaVariant;
  trackingId: string;
};

export type ServiceItem = {
  title: string;
  summary: string;
};

export type ProjectCase = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  body: string;
  imageUrl?: string;
  liveUrl?: string;
  publishedAt?: string;
};

export type HomePageContent = {
  title: string;
  intro: string;
  trustItems: string[];
  services: ServiceItem[];
  primaryCta: CtaConfig;
  secondaryCta: CtaConfig;
};

export type ContactInfo = {
  email: string;
  phone?: string;
  intro: string;
};

export type SiteSettings = {
  siteTitle: string;
  siteUrl: string;
  organizationName: string;
  organizationDescription: string;
  primaryCta: CtaConfig;
};
