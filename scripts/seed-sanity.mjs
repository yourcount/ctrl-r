import "dotenv/config";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-11",
  token,
  useCdn: false,
});

const docs = [
  {
    _id: "cta-primary-home",
    _type: "cta",
    label: "Plan een kennismaking",
    href: "#contact",
    variant: "primary",
    trackingId: "cta_primary_home",
  },
  {
    _id: "cta-secondary-home",
    _type: "cta",
    label: "Bekijk cases",
    href: "/work",
    variant: "secondary",
    trackingId: "cta_secondary_home",
  },
  {
    _id: "service-1",
    _type: "service",
    title: "Positionering en contentstructuur",
    summary:
      "We vertalen je praktijk naar een duidelijke propositie, pagina-opbouw en CTA-flow.",
    orderRank: 1,
  },
  {
    _id: "service-2",
    _type: "service",
    title: "Websitebouw en optimalisatie",
    summary:
      "We bouwen een snelle, toegankelijke site met sterke SEO-basis en meetbare conversiepaden.",
    orderRank: 2,
  },
  {
    _id: "service-3",
    _type: "service",
    title: "Beheer en doorontwikkeling",
    summary:
      "Je team beheert teksten en media zelfstandig via een eenvoudige redactieomgeving.",
    orderRank: 3,
  },
  {
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "ctrl+r",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    organizationName: "ctrl+r",
    organizationDescription:
      "ctrl+r helpt kunstenaars en culturele makers met websites, strategie en duurzaam beheer.",
    primaryCta: { _type: "reference", _ref: "cta-primary-home" },
  },
  {
    _id: "contactInfo",
    _type: "contactInfo",
    email: "hello@ctrlr.studio",
    intro:
      "Wil je weten wat een volgende stap voor jouw praktijk is? We reageren binnen twee werkdagen.",
  },
  {
    _id: "homePage",
    _type: "homePage",
    title: "Digitale vernieuwing voor de culturele sector.",
    intro:
      "ctrl+r helpt kunstenaars en culturele organisaties om hun verhaal helder te presenteren, bezoekers sneller te laten handelen en content zelfstandig te beheren.",
    trustItems: [
      "Heldere strategie en uitvoering in een compacte iteratie",
      "Toegankelijk ontwerp met focus op begrijpelijke content",
      "Snel beheersbaar zonder technische afhankelijkheid",
    ],
    services: [
      { _type: "reference", _ref: "service-1" },
      { _type: "reference", _ref: "service-2" },
      { _type: "reference", _ref: "service-3" },
    ],
    primaryCta: { _type: "reference", _ref: "cta-primary-home" },
    secondaryCta: { _type: "reference", _ref: "cta-secondary-home" },
  },
  {
    _id: "project-florescencism",
    _type: "projectCase",
    title: "Florescencism",
    slug: { _type: "slug", current: "florescencism" },
    subtitle: "Interactieve 3D-galerij",
    summary:
      "Een digitale ruimte waar bezoekers zich vrij door een groeiend universum van werken kunnen bewegen.",
    body:
      "Florescencism is opgezet als een digitale galerij waarin beweging, licht en geluid samen een eigen wereld vormen. De site begeleidt bezoekers stap voor stap, zonder de intuïtieve verwondering te verliezen.",
    imageUrl: "https://i.imgur.com/uQJqY9c.png",
    liveUrl: "https://florescencism.lida.gallery/",
    orderRank: 1,
  },
  {
    _id: "project-yo-treasure-fest",
    _type: "projectCase",
    title: "Yo! Treasure Fest",
    slug: { _type: "slug", current: "yo-treasure-fest" },
    subtitle: "Festival website",
    summary:
      "Een speelse, toegankelijke site die programma, locaties en makers helder in beeld brengt.",
    body:
      "Voor Yo! Treasure Fest lag de focus op helderheid: wie speelt waar, wanneer en waarom is dat relevant voor bezoekers? De site combineert een speelse uitstraling met duidelijke navigatie.",
    imageUrl: "https://i.imgur.com/i9a5n9s.png",
    liveUrl: "https://www.yohotreasurefest.nl/",
    orderRank: 2,
  },
  {
    _id: "project-nina-lynn",
    _type: "projectCase",
    title: "Nina Lynn",
    slug: { _type: "slug", current: "nina-lynn" },
    subtitle: "Artiestenportfolio",
    summary:
      "Een rustige, beeldende site die muziek, stories en optredens samenbrengt.",
    body:
      "De site van Nina Lynn is ontworpen als een rustige ruimte waar muziek en verhalen centraal staan. Beeldmateriaal, teksten en audiofragmenten versterken elkaar terwijl de technische laag snel en beheersbaar blijft.",
    imageUrl: "https://i.imgur.com/y8v8F1t.png",
    liveUrl: "https://ninalynn.nl/",
    orderRank: 3,
  },
];

async function seed() {
  let transaction = client.transaction();

  for (const doc of docs) {
    transaction = transaction.createIfNotExists(doc);
  }

  await transaction.commit();
  console.log(`Seed complete: ${docs.length} documents checked/created in dataset '${dataset}'.`);
}

seed().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
