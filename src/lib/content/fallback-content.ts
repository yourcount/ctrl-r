import type {
  ContactInfo,
  HomePageContent,
  ProjectCase,
  SiteSettings,
} from "@/lib/content/types";

const defaultPrimaryCta = {
  label: "Plan een kennismaking",
  href: "#contact",
  variant: "primary" as const,
  trackingId: "cta_primary_home",
};

export const fallbackHomePageContent: HomePageContent = {
  title: "Digitale vernieuwing voor cultuur die vertrouwen en actie oplevert.",
  intro:
    "ctrl+r helpt kunstenaars en culturele organisaties om hun verhaal helder te presenteren, bezoekers sneller te laten handelen en content zelfstandig te beheren.",
  trustItems: [
    "Heldere strategie en uitvoering in een compacte iteratie",
    "Toegankelijk ontwerp met focus op begrijpelijke content",
    "Snel beheersbaar zonder technische afhankelijkheid",
  ],
  services: [
    {
      title: "Positionering en contentstructuur",
      summary:
        "We vertalen je praktijk naar een duidelijke propositie, pagina-opbouw en CTA-flow.",
    },
    {
      title: "Websitebouw en optimalisatie",
      summary:
        "We bouwen een snelle, toegankelijke site met sterke SEO-basis en meetbare conversiepaden.",
    },
    {
      title: "Beheer en doorontwikkeling",
      summary:
        "Je team beheert teksten en media zelfstandig via een eenvoudige redactieomgeving.",
    },
  ],
  primaryCta: defaultPrimaryCta,
  secondaryCta: {
    label: "Bekijk cases",
    href: "/work",
    variant: "secondary",
    trackingId: "cta_secondary_home",
  },
};

export const fallbackProjectCases: ProjectCase[] = [
  {
    slug: "florescencism",
    title: "Florescencism",
    subtitle: "Interactieve 3D-galerij",
    summary:
      "Een digitale ruimte waar bezoekers zich vrij door een groeiend universum van werken kunnen bewegen.",
    body:
      "Florescencism is opgezet als een digitale galerij waarin beweging, licht en geluid samen een eigen wereld vormen. De site begeleidt bezoekers stap voor stap, zonder de intuïtieve verwondering te verliezen.",
    imageUrl: "https://i.imgur.com/uQJqY9c.png",
    liveUrl: "https://florescencism.lida.gallery/",
  },
  {
    slug: "yo-treasure-fest",
    title: "Yo! Treasure Fest",
    subtitle: "Festival website",
    summary:
      "Een speelse, toegankelijke site die programma, locaties en makers helder in beeld brengt.",
    body:
      "Voor Yo! Treasure Fest lag de focus op helderheid: wie speelt waar, wanneer en waarom is dat relevant voor bezoekers? De site combineert een speelse uitstraling met duidelijke navigatie.",
    imageUrl: "https://i.imgur.com/i9a5n9s.png",
    liveUrl: "https://www.yohotreasurefest.nl/",
  },
  {
    slug: "nina-lynn",
    title: "Nina Lynn",
    subtitle: "Artiestenportfolio",
    summary:
      "Een rustige, beeldende site die muziek, stories en optredens samenbrengt.",
    body:
      "De site van Nina Lynn is ontworpen als een rustige ruimte waar muziek en verhalen centraal staan. Beeldmateriaal, teksten en audiofragmenten versterken elkaar terwijl de technische laag snel en beheersbaar blijft.",
    imageUrl: "https://i.imgur.com/y8v8F1t.png",
    liveUrl: "https://ninalynn.nl/",
  },
];

export const fallbackContactInfo: ContactInfo = {
  email: "hello@ctrlr.studio",
  intro:
    "Wil je weten wat een volgende stap voor jouw praktijk is? We reageren binnen twee werkdagen.",
};

export const fallbackSiteSettings: SiteSettings = {
  siteTitle: "ctrl+r",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  organizationName: "ctrl+r",
  organizationDescription:
    "ctrl+r helpt kunstenaars en culturele makers met websites, strategie en duurzaam beheer.",
  primaryCta: defaultPrimaryCta,
};
