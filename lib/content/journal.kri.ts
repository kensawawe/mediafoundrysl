import type { Article } from "./journal";

export const readSuffix = "rid";

export const journalHero = {
  eyebrow: "Di Foundry Jɔɔnal",
  title: "Not Dɛn Frɔm Di Flo.",
  body: "Rayting bɔt kraft, prɔdɔkshɔn, ɛn di studio in we fɔ wok — nyu pis dɛn ɔlmost tu tɛm pa mɔnt.",
};

// Dates and read-time stay in their existing (widely understood) format.
export const articles: Article[] = [
  {
    title: "Wetin Mek Wi Nɔ De Autsɔs Prɔdɔkshɔn",
    category: "Studio",
    excerpt: "Di rizin fɔ kip stratiji, dizayn, ɛn di kamra na di sem bildin.",
    readTime: "4 min",
    date: "May 2026",
  },
  {
    title: "Di Kol Siim Prɔblɛm",
    category: "Kraft",
    excerpt:
      "Wetin faundri dɛn tich wi bɔt wetin de apin we wan projɛkt lɔs it bitwin an-of dɛn.",
    readTime: "6 min",
    date: "March 2026",
  },
  {
    title: "Kastin Tru-Tru Pipul, Nɔ Akta Dɛn",
    category: "Prɔdɔkshɔn",
    excerpt:
      "Not dɛn frɔm Di Feminist Cohort aktiveshɔn pan wetin mek wi pɔynt di kamra na di tru-tru rum instɛd fɔ stej wan.",
    readTime: "5 min",
    date: "January 2026",
  },
  {
    title: "Wan Brand Sistɛm We Bil Fɔ Flɛks",
    category: "Brand",
    excerpt: "Wetin i actually tek fɔ dizayn wan aydɛntiti we skel akrɔs makit dɛn wίtaut ridizayn ɛvri ia.",
    readTime: "7 min",
    date: "November 2025",
  },
];
