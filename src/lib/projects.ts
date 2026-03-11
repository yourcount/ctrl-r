export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  body: string;
};

const fallbackProjects: Project[] = [
  {
    slug: "florescencism",
    title: "Florescencism",
    subtitle: "Interactieve 3D-galerij",
    summary:
      "Een digitale ruimte waar bezoekers zich vrij door een groeiend universum van werken kunnen bewegen.",
    body:
      "Florescencism is opgezet als een digitale galerij waarin beweging, licht en geluid samen een eigen wereld vormen. De site begeleidt bezoekers stap voor stap, zonder de intuïtieve verwondering te verliezen. Techniek ondersteunt hier de beleving – niet andersom.",
  },
  {
    slug: "yo-treasure-fest",
    title: "Yo! Treasure Fest",
    subtitle: "Festival website",
    summary:
      "Een speelse, toegankelijke site die programma, locaties en makers helder in beeld brengt.",
    body:
      "Voor Yo! Treasure Fest lag de focus op helderheid: wie speelt waar, wanneer, en waarom is dat interessant voor het publiek? De site combineert een speelse vormentaal met duidelijke navigatie, zodat zowel toevallige bezoekers als vaste bezoekers snel vinden wat ze zoeken.",
  },
  {
    slug: "nina-lynn",
    title: "Nina Lynn",
    subtitle: "Artiestenportfolio",
    summary:
      "Een rustige, beeldende site die muziek, stories en optredens samenbrengt.",
    body:
      "De site van Nina Lynn is ontworpen als een rustige ruimte waar haar muziek en verhalen centraal staan. Beeldmateriaal, teksten en audiofragmenten versterken elkaar, terwijl de technische laag ervoor zorgt dat alles snel laadt en eenvoudig te beheren blijft.",
  },
];

export function getProjects(): Project[] {
  return fallbackProjects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return fallbackProjects.find((project) => project.slug === slug);
}

