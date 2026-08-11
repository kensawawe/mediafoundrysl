import type { CaseStudy } from "./case-studies";

export const caseStudyCopy = {
  backToWork: "← Go Bak To Wok",
  overview: "Ovavyu",
  gallery: "Galeri",
};

// Category (WorkCategory) stays English — shared filter taxonomy with
// work.ts. Client/project names stay as proper nouns; everything else
// (overview, gallery captions, impact labels) is translated.
export const caseStudies: CaseStudy[] = [
  {
    slug: "rokel-commercial-bank",
    title: "Rokel Commercial Bank",
    category: "Music Video",
    year: "2025",
    heroMedia: { variant: "video", label: "Rokel Commercial Bank, antɛm film" },
    overview:
      "Wan brand antɛm we lɛk myuzik-vidio fɔ Sɛra Lyon in oldɛst kɔmɛshal bank, we dɛn bil fɔ mek in imej mɔdan fɔ wan jɛnereshɔn ɔv kɔstɔma dɛn we nɔ go ɛva asosiyet bankin wit ɛnitin dɛn go chuz fɔ wach.",
    gallery: [
      { variant: "video", label: "Antɛm film, ful kɔt", category: "Music Video" },
      { variant: "photo", label: "Na lokeshɔn, branch shut" },
      { variant: "video", label: "Brɔdkast kɔtdaun, 30s" },
      { variant: "photo", label: "Kas, tru-tru akaunt olda dɛn" },
    ],
    impact: [
      { stat: "1", label: "Orijinal antɛm trak we dɛn prɔdyus" },
      { stat: "3", label: "Siti dɛn we dɛn film akrɔs" },
      { stat: "1ST", label: "Yut-fokɔs akaunt kampen fɔ di brand" },
    ],
  },
  {
    slug: "the-feminist-cohort",
    title: "The Feminist Cohort",
    category: "Activation",
    year: "2025",
    heroMedia: { variant: "photo", label: "The Feminist Cohort, lɔnch aktiveshɔn" },
    overview:
      "Wan brand aydɛntiti ɛn layv lɔnch aktiveshɔn fɔ The Feminist Cohort, we dɛn bil fɔ tɔn wan komyuniti we bin ɔnli mit onlayn to wan rum ful ɔv pipul we dɔn no dɛnsɛf in wok.",
    gallery: [
      { variant: "photo", label: "Aktiveshɔn saynej, entrans", category: "Activation" },
      { variant: "video", label: "Lɔnch nayt rikap film" },
      { variant: "photo", label: "Layv myural in progres" },
      { variant: "photo", label: "Atendi dɛn, chapta mitɔp" },
    ],
    impact: [
      { stat: "1", label: "Aydɛntiti sistɛm we bil frɔm di komyuniti insɛf" },
      { stat: "150+", label: "Mɛmba dɛn na di lɔnch aktiveshɔn" },
      { stat: "1ST", label: "In-pɔsin gaderin fɔ di Cohort" },
    ],
  },
  {
    slug: "slmda",
    title: "Sierra Leone Medical & Dental Association",
    category: "Cinematography & Photography",
    year: "2025",
    heroMedia: { variant: "photo", label: "SLMDA anyual kɔnfrans, Freetown" },
    overview:
      "Wan sinematografi ɛn fotografi komishɔn fɔ di Sierra Leone Medical & Dental Association, we dokyumɛnt di kɔntri in medikal profɛshɔnal dɛn na wok ɛn na dɛn anyual gaderin.",
    gallery: [
      { variant: "photo", label: "Praktishɔna, distrikt ɔspital", category: "Photography" },
      { variant: "video", label: "Kɔnfrans rikap film" },
      { variant: "photo", label: "Dɛlegat dɛn, anyual kɔnfrans" },
      { variant: "photo", label: "Klinikal dokyumɛnteshɔn, fiil visit" },
    ],
    impact: [
      { stat: "2 WIK", label: "Ɛmbɛd fiil akses" },
      { stat: "1ST", label: "Vizhwal akayv ɔv dis stanad fɔ di asosieshɔn" },
      { stat: "1", label: "Shɔt dokyumɛntari film we dɛn diliva" },
    ],
  },
];
