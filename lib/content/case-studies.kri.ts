import type { CaseStudy } from "./case-studies";

export const caseStudyCopy = {
  backToWork: "← Go Bak To Wok",
  overview: "Ovavyu",
  theChallenge: "Di Chalenj",
  ourApproach: "Wi Aprowch",
  processHeading: "Di Pɔ — Prɔses Ɛn Prɔdɔkshɔn",
  finalOutcome: "Fɛynal Awtkɔm",
  gallery: "Galeri",
};

// Category (WorkCategory) stays English — shared filter taxonomy with
// work.ts. Client/project names stay as proper nouns; everything else
// (overview, challenge, approach, process, outcome, gallery captions,
// impact labels) is translated.
export const caseStudies: CaseStudy[] = [
  {
    slug: "rokel-commercial-bank",
    title: "Rokel Commercial Bank",
    category: "Music Video",
    year: "2025",
    heroMedia: { variant: "video", label: "Rokel Commercial Bank, antɛm film" },
    overview:
      "Wan brand antɛm we lɛk myuzik-vidio fɔ Sɛra Lyon in oldɛst kɔmɛshal bank, we dɛn bil fɔ mek in imej mɔdan fɔ wan jɛnereshɔn ɔv kɔstɔma dɛn we nɔ go ɛva asosiyet bankin wit ɛnitin dɛn go chuz fɔ wach.",
    challenge:
      "Bank makɛtin luk di sem we ɛnisay: wan bɔdrum, wan andshek, wan vɔysova bɔt trɔst. Rokel Commercial Bank nid fɔ rich wan yɔŋga, mobayl-fɔs kɔstɔma bes wίtaut fɔ spɛn di gudwil we dɛn bil ova sɛvɛnti ia as di kɔntri in oldɛst bank.",
    approach:
      "Wi rayt ɛn prɔdyus di kampen as wan myuzik-vidio fɔs ɛn wan bank komɛshal sɛkɔn — wan orijinal antɛm trak, wan kas ɔv tru-tru kɔstɔma ɛn staf, ɛn wan vizhwal aydɛntiti we bil aroun di bank in ɛgzistin mak instɛd ɔv wan jɛnɛrik finans-ad palet.",
    process: [
      {
        title: "Trak Ɛn Skrip",
        description:
          "Wan orijinal sɔŋ we dɛn komishɔn ɛn skɔ bifo wan frem bin plan, so di film bin go kɔt to di myuzik instɛd ɔv di myuzik fit to di film.",
      },
      {
        title: "Prɔdɔkshɔn",
        description:
          "Wan multi-lokeshɔn shut akrɔs branch dɛn, sitistrit dɛn ɛn kɔstɔma os dɛn, kas wit tru-tru akaunt olda dɛn ɛn frɔntlayn staf instɛd ɔv akta dɛn.",
      },
      {
        title: "Ɛdit Ɛn Gred",
        description:
          "Wan ridim-lɛd ɛdit we bil aroun di trak in strɔkcha, gred fɔ fil lɛk wan myuzik-vidio rilis instɛd ɔv wan kɔpret riil.",
      },
    ],
    outcome:
      "Diliva as wan ful-lɛnt antɛm film plɔs wan kɔtdaun fɔ brɔdkast ɛn sosial, di film bikam Rokel Commercial Bank in prɛmari brand pis fɔ in yut-fokɔs akaunt lɔnch, we de ran akrɔs television, sinema, ɛn sosial platfɔm dɛn.",
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
    challenge:
      "Di Cohort in komyuniti bin liv fɔ ɔltugɛda onlayn — ia dɛn ɔv kɔnvɛseshɔn, sɔpɔt fɔ wan ɔda ɛn shared langwej wίtaut eni shared fizikal spes fɔ mach am. Dɛn fɔs in-pɔsin gaderin bin nid fɔ fil lɛk wan om-kamin, nɔ wan kɔnfrans, wίtaut eni ɛgzistin brand ɔ ivɛnt infrastrɔkcha fɔ bil pan.",
    approach:
      "Wi dizayn di aydɛntiti ɛn di aktiveshɔn as wan brif: wan mak we bil frɔm di komyuniti in ɔn mɛmba dɛn — wan chen ɔv mɛmba silhwet dɛn we fɔm di Cohort in 'C' — dɛn kyari dat sem aydiya se pipul de kyari wan ɔda fɔwad go insay ɛvri tochpɔynt ɔv di lɔnch ivɛnt insɛf.",
    process: [
      {
        title: "Aydɛntiti Ɛn Mak",
        description:
          "Wan logotayp we bil frɔm ilɔstretɛd mɛmba silhwet dɛn instɛd ɔv wan abstrakt simbɔl, so di brand mak bin literally mek ɔv di komyuniti we i ripresent.",
      },
      {
        title: "Aktiveshɔn Dizayn",
        description:
          "Sayn dɛn, sitin, ɛn wan layv myural ɛkstɛnd di sem figa-in-mɔshɔn motif frɔm di mak go insay di fizikal rum.",
      },
      {
        title: "Ɔn-Sayt Prɔdɔkshɔn",
        description:
          "Wan ful kru we dokyumɛnt di aktiveshɔn layv, tanin di wan-nayt ivɛnt to wan rikɔɔ kɔntɛnt laybreri fɔ di Cohort in ɔn chanɛl dɛn.",
      },
    ],
    outcome:
      "Diliva as wan kɔmplit aydɛntiti sistɛm plɔs wan fuli prɔdyus lɔnch aktiveshɔn, di ivɛnt bikam di templet fɔ The Feminist Cohort in ɔngoin chapta mitɔp dɛn, wit di mak naw rɛkɔgnayz akrɔs dɛn komyuniti as dɛn ɔn.",
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
    challenge:
      "SLMDA in profɛshɔnal komyuniti bin nɛva dokyumɛnt na di stanad ɔv di wok we dɛn mɛmba dɛn actually de du — dikeyd dɛn ɔv praktis wίtaut eni vizhwal rikɔd we bil fɔ ripresent am to gɔvmɛnt, donɔ dɛn, ɔ di pɔblik.",
    approach:
      "Wi trit am as wan editorial asaynmɛnt, nɔ wan ivɛnt rikap — wi ɛmbɛd wit praktishɔna dɛn akrɔs ɔspital dɛn ɛn klinik dɛn bifo di kɔnfrans, dɛn kova di gaderin insɛf as di kyulminayshɔn ɔv dat lɔŋga tori instɛd ɔv di ol ɔv am.",
    process: [
      {
        title: "Fiil Akses",
        description:
          "Tu wik dɛn ɛmbɛd akrɔs ɔspital dɛn ɛn klinik dɛn, we bil di trɔst we nid fɔ foto praktishɔna dɛn mid-praktis instɛd ɔv poz.",
      },
      {
        title: "Kɔnfrans Kɔvɛrej",
        description:
          "Ful sinematografi ɛn fotografi kɔvɛrej ɔv di anyual kɔnfrans, frɔm kinot sɛshɔn dɛn te rich di dɛlegat dɛn bitwin dɛn.",
      },
      {
        title: "Ɛdit Ɛn Delivri",
        description:
          "Wan kyuret stil akayv plɔs wan shɔt film kɔt fɔ SLMDA in ɔn yus akrɔs mɛmbaship kɔmyunikeshɔn dɛn ɛn pɔblik ɛlt pattna dɛn.",
      },
    ],
    outcome:
      "Diliva as wan ful fotografik akayv ɛn wan shɔt dokyumɛntari film, naw yus bay SLMDA na in ɔn kɔmyunikeshɔn dɛn wit gɔvmɛnt ɛn intanashɔnal ɛlt pattna dɛn — di asosieshɔn in fɔs vizhwal rikɔd we bil to dat stanad.",
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
