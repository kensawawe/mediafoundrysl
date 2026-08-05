import type { WorkItem } from "./work";

export const workCopy = {
  castWallHeading: "Di Kast Wɔl",
  viewAllWork: "Luk Ɔl Wok",
  emptyCategory: "Nɔ wok na dis kategori yet.",
  whatWeCast: "Wetin Wi Dɔn Kast.",
  workIndexIntro:
    "Wan wok rikɔd ɔv brand aydɛntiti, kampen dɛn, film ɛn prɔdɔkshɔn, digital ɛn fotografi — brawz bay diseplin.",
};

// Category taxonomy is kept in English in both languages — it's used as
// literal filter-matching data (WorkBrowser compares item.category against
// the workCategories list) and shared with case-studies.ts, so splitting it
// per language would need real restructuring, not just translated labels.
// Client/project names (title, hoverTitle) are proper nouns and stay as-is;
// only the descriptive copy is translated.
export const workItems: WorkItem[] = [
  {
    slug: "rokel-commercial-bank",
    title: "Rokel Commercial Bank",
    category: "Music Video",
    description:
      "Wan brand antɛm film we lɛk myuzik-vidio fɔ Sɛra Lyon in oldɛst kɔmɛshal bank, we dɛn bil fɔ rich wan nyu jɛnereshɔn ɔv kɔstɔma dɛn.",
    variant: "video",
    size: "lg",
    hasCaseStudy: true,
    restingImage: "/rokel.jpg",
    hoverImage: "/headerlogo.png",
    imageFit: "contain",
  },
  {
    slug: "conex-campaign",
    title: "Conex",
    category: "Campaigns",
    description: "Wan brand kampen fɔ Conex, we dɛn lɔnch aroun wan bold nyu mak we bil fɔ kɔmand atɛnshɔn.",
    variant: "video",
    size: "md",
    restingImage: "/conex.jpg",
    hoverImage: "/conex%20logo.png",
  },
  {
    slug: "the-feminist-cohort",
    title: "The Feminist Cohort",
    hoverTitle: "FemCo",
    category: "Activation",
    description:
      "Wan brand aydɛntiti ɛn lɔnch aktiveshɔn fɔ wan komyuniti kɔlɛktiv, we dɛn bil frɔm di mɛmba dɛn we i ripresent.",
    variant: "photo",
    size: "md",
    hasCaseStudy: true,
    restingImage: "/The%20Feminist%20Cohort.jpg",
    hoverImage: "/femco%20logo.png",
    imageFit: "contain",
  },
  {
    slug: "afta-di-wisul",
    title: "Afta Di Wisul",
    category: "Video Podcast",
    description:
      "Wan wik-wik vidio pɔdkast we de brok daun di fayn gem, we dɛn bil to wan sho aydɛntiti ɔn in ɔn.",
    variant: "video",
    size: "lg",
    restingImage: "/after%201.jpg",
    hoverImage: "/wisul.png",
  },
  {
    slug: "slmda",
    title: "Sierra Leone Medical & Dental Association",
    hoverTitle: "SLMDA",
    category: "Cinematography & Photography",
    description:
      "Wan sinematografi ɛn fotografi komishɔn we dokyumɛnt di kɔntri in medikal profɛshɔnal dɛn na wok ɛn na dɛn anyual gaderin.",
    variant: "photo",
    size: "md",
    hasCaseStudy: true,
    restingImage: "/SLMDA%20banner.jpg",
    hoverImage: "/fSLMDA-logo.png",
    imageFit: "contain",
  },
  {
    slug: "rotary-international",
    title: "Rotary",
    category: "Social & Content",
    description:
      "Wan shɔt-fɔm kɔntɛnt sistɛm we bil fɔ Rotary International in ɔlwez-ɔn sosial kalinda.",
    variant: "photo",
    size: "md",
    restingImage: "/ritt.png",
    hoverImage: "/rot%20png.png",
    imageFit: "contain",
  },
  {
    slug: "foundations-and-futures",
    title: "Foundations & Futures",
    category: "Video Podcast",
    description: "Wan pɔdkast sirii we Di Media Foundry prodyus, we Ken Saro-Wiwa Fofana de os.",
    variant: "video",
    size: "md",
    restingImage: "/F.png",
    hoverImage: "/gfkbfg.png",
    imageFit: "contain",
    imagePadding: "p-0 scale-110",
    hoverImageSize: "mb-1 h-6 w-auto max-w-full sm:h-8",
  },
  {
    slug: "lowline-documentary",
    title: "Lowline",
    category: "Film & Production",
    description:
      "Wan shɔt dokyumɛntari pan di meka dɛn bihaynd wan independent odio-ɛkwipmɛnt manyufakcha.",
    variant: "video",
    size: "md",
  },
];
