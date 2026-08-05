import type { Article } from "./journal";

export const readSuffix = "rid";

export const journalHero = {
  eyebrow: "Di Foundry Jɔɔnal",
  title: "Not Dɛn Frɔm Di Flo.",
  body: "Rayting bɔt kraft, prɔdɔkshɔn, ɛn di studio in we fɔ wok — nyu pis dɛn ɔlmost tu tɛm pa mɔnt.",
};

export const journalCopy = {
  backToJournal: "Go Bak Na Jɔɔnal",
  writtenBy: "Rayt Bay",
  readArticle: "Rid Atikul",
};

// Dates and read-time stay in their existing (widely understood) format.
// Author names are proper nouns and stay as-is; only role titles translate.
export const articles: Article[] = [
  {
    slug: "why-we-dont-outsource-production",
    title: "Wetin Mek Wi Nɔ De Autsɔs Prɔdɔkshɔn",
    category: "Studio",
    excerpt: "Di rizin fɔ kip stratiji, dizayn, ɛn di kamra na di sem bildin.",
    readTime: "4 min",
    date: "May 2026",
    body: [
      "Plɛnti ejɛnsi dɛn de gi prɔdɔkshɔn to wan sɛprit vɛnda wan tɛm di dek dɔn sayn ɔf. Wi nɔ de du dat, ɛn na nɔ wan filɔsɔfi wi jɔs tek — na wetin apin wɛn wi si se gud aydiya dɛn de wik dɔŋ na di an-of.",
      "Wɛn di pipul dɛn we rayt di stratiji na di sem pipul dɛn we ol di kamra, nɔtin nɔ de lɔs na translɛshɔn. Wan shɔt lis nɔ na wan litral intaprɛteshɔn fɔ sɔmbɔdi els in brif; na wan kɔntinyueshɔn fɔ wan tɔk we dɔn bin de rɔn frɔm di fɔs mitin.",
      "Dis os mi se wi go mek disizhɔn na sɛt we plɛnti prɔdɔkshɔn kɔmpani nɔ go ebul — fɔ wok bak wan sin bikɔs i nɔ de sav di stratiji ɛgen, nɔ bikɔs di skejul aloɔ am.",
      "Di ɔvahed na tru-tru. Fɔ kip stratiji, dizayn, ɛn prɔdɔkshɔn ɔnda wan ruf kɔst mɔ pas fɔ tek dɛn as sɛprit tin dɛn. Bɔt na di ɔnli we wi dɔn fɛn fɔ shɛp wok we stil luk lɛk di aydiya we sɛl am.",
    ],
    author: {
      name: "Ken Saro-Wiwa Fofana",
      role: "Faunda Ɛn Kriyetiv Dirɛkta",
      image: "/ken.JPG",
      socials: [
        { platform: "instagram", href: "https://www.instagram.com/ken_saro_wiwa_/" },
        { platform: "youtube", href: "https://www.youtube.com/@Ken_SaroWiwa" },
        { platform: "linkedin", href: "https://www.linkedin.com/in/ken-saro-wiwa-fofana-7b99b6108/" },
        { platform: "facebook", href: "https://www.facebook.com/ken.fofana" },
        { platform: "x", href: "https://x.com/Ken_SaroWiwa" },
      ],
    },
  },
  {
    slug: "the-cold-seam-problem",
    title: "Di Kol Siim Prɔblɛm",
    category: "Kraft",
    excerpt:
      "Wetin faundri dɛn tich wi bɔt wetin de apin we wan projɛkt lɔs it bitwin an-of dɛn.",
    readTime: "6 min",
    date: "March 2026",
    body: [
      "Na kastin, wan kol siim de apin wɛn mɛltɛd mɛtal kul bifo di nɛks po jɔyn am — di tu af dɛn nɔ ful fyus, ɛn di flɔ de sidɔm invizibul te di pis kɔmɔt ɔnda lod.",
      "Kriyetiv wok gɛt di sem prɔblɛm. Wan brif we sidɔm na inbɔks fɔ tu wik bifo prɔdɔkshɔn pik am ɔp dɔn ɔlrɛdi go kol. Di pipul dɛn we de eksikyut am de wok frɔm not, nɔ frɔm di muman we di aydiya bin at.",
      "Wi nem di studio afta di prɔsɛs bikɔs wi want di mɛtafɔ fɔ ol wi akauntabul. Ɛvri an-of bitwin dipatmɛnt dɛn na wan ples we wan projɛkt go kol if wi lɛf am.",
      "Di fiks nɔ na mɔ dɔkyumɛnteshɔn. Na fyua an-of dɛn — kip di sem pipul dɛn klos to wan projɛkt frɔm stratiji te rich di fainal kɔt, so nɔ siim nɔ lɛf fɔ go kol na di fɔs ples.",
    ],
    author: {
      name: "Francis Sam-Mboma",
      role: "Kɔntɛnt Stratijist",
      socials: [],
    },
  },
  {
    slug: "casting-real-people-not-actors",
    title: "Kastin Tru-Tru Pipul, Nɔ Akta Dɛn",
    category: "Prɔdɔkshɔn",
    excerpt:
      "Not dɛn frɔm Di Feminist Cohort aktiveshɔn pan wetin mek wi pɔynt di kamra na di tru-tru rum instɛd fɔ stej wan.",
    readTime: "5 min",
    date: "January 2026",
    body: [
      "Wɛn Di Feminist Cohort kam to wi fɔ dɛn aktiveshɔn film, di izi vɛshɔn bin na wan skrip, wan kastin kɔl, ɛn wan kɔntrol sɛt. Wi pus fɔ di ada vɛshɔn instɛd: pɔynt di kamra na di rum we bin de rili apin.",
      "Dat min se wi gi ɔp bɔku kɔntrol. Nɔ blɔkin rihɛsal, nɔ sɛkɔn tek fɔ wan rikshɔn we ɔnli apin wan tɛm. Wetin wi get bak na wan rum ful ɔf pipul we fɔgɛt se kamra de dɛn bay di sɛkɔn awa.",
      "Di trediɔf de shɔ insay di edit. Tru-tru futej lɛk moh mɛs — i ad fɔ kɔt, i ad fɔ pes. Bɔt na wan sɔt ɔf futej we di odiens go ebul fɔ tɛl di difrɛns bitwin sɔntin we dɛn stej ɛn sɔntin we rili apin.",
      "Wi go mek di sem kɔl agen. Wan stori bɔt tru-tru pipul de wik ɛvri tɛm yu rples wan ɔf dɛn wit sɔmbɔdi we de ple wan rol.",
    ],
    author: {
      name: "Frankvin McEwen",
      role: "Prodyusa Ɛn Ɔpareshɔn Manaja",
      socials: [],
    },
  },
  {
    slug: "a-brand-system-built-to-flex",
    title: "Wan Brand Sistɛm We Bil Fɔ Flɛks",
    category: "Brand",
    excerpt: "Wetin i actually tek fɔ dizayn wan aydɛntiti we skel akrɔs makit dɛn wίtaut ridizayn ɛvri ia.",
    readTime: "7 min",
    date: "November 2025",
    body: [
      "Plɛnti brand aydɛntiti dɛn dɛn dizayn fɔ di lɔnch muman — wan makit, wan langwej, wan kɔntɛkst. Dɛn de stat fɔ krak di muman di klayɛnt ɛkspand pas am.",
      "Fɔ bil wan sistɛm we flɛks min se yu dizayn di rul dɛn bifo di asɛt dɛn. Wan taip skel we stil rid gud wit Krio in lɔŋga wɔd lɛnkt dɛn. Wan kɔlɔ sistɛm we ol ɔp we dɛn translet am go pan wan makit stɔl sayn, nɔ jɔs wan Figma fren.",
      "I os min se yu rizist di push fɔ ova-spɛsifay. Di aydɛntiti dɛn we eij wɔs na di wan dɛn wit tumɔch fiks rul ɛn nɔt inɔf prinsipul — so di muman wan nyu fɔmat kam, nɔtin insay di gaydlayn go tɛl yu wetin fɔ du wit am.",
      "Wi tɛst ɛvri sistɛm we wi bil agens wan yus kes we dɛn nɔ dizayn am fɔ. If i brok, i nɔ bin wan sistɛm — na wan lukbuk i bin de.",
    ],
    author: {
      name: "Kanja Fofana",
      role: "Multimidiya Kriyeta",
      socials: [],
    },
  },
];
