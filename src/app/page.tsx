import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { HomeExperience } from "@/components/home/home-experience";
import {
  getContactInfo,
  getHomePageContent,
  getProjectCases,
  getSiteSettings,
} from "@/lib/content/content-service";

export const metadata: Metadata = {
  title: "Digitale vernieuwing voor cultuur",
  description:
    "ctrl+r helpt makers en culturele organisaties met duidelijke websites, slimme CTA-flows en beheersbare content.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const { isEnabled } = await draftMode();

  const [home, projects, contact, settings] = await Promise.all([
    getHomePageContent(isEnabled),
    getProjectCases(isEnabled),
    getContactInfo(isEnabled),
    getSiteSettings(isEnabled),
  ]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.organizationName,
    url: settings.siteUrl,
    description: settings.organizationDescription,
    email: contact.email,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteTitle,
    url: settings.siteUrl,
    potentialAction: {
      "@type": "ContactAction",
      target: `${settings.siteUrl}/#contact`,
      name: home.primaryCta.label,
    },
  };

  return (
    <>
      <HomeExperience home={home} projects={projects} contact={contact} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
