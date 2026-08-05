import type { Principle } from "./philosophy";

export const philosophyStatement =
  "Fayn wok nɔ de asɛmbul. I de fɔj — ɔnda prɛsha, na di rayt tɛmprecha, bay pipul dɛn we nɔ de lɛf te i ɔldi in shep.";

// "Temper / Alloy / Pour / Grain" are deliberate foundry-process jargon
// tied to the brand name — left untranslated since Krio has no equivalent
// metallurgical vocabulary; flag for review rather than guess.
export const highlights: Principle[] = [
  {
    tag: "Temper",
    title: "Diseplin Pas Dekɔreshɔn",
    description:
      "Kraft we dɔn tɛst, nɔ jɔs stayl. Ɛvri aydiya de gɛt prɛsha-tɛst agens di brif bifo i ship.",
  },
  {
    tag: "Alloy",
    title: "Wan Tim, Ɛvri Diseplin",
    description:
      "Stratijist dɛn, dizayna dɛn, ɛn prodyusa dɛn na di sem tim — nɔ vɛnda dɛn we dɛn de pas di brif wan afta ɔda.",
  },
  {
    tag: "Pour",
    title: "Bil Fɔ Fineʃ, Nɔ Jɔs Fɔ Stat",
    description:
      "Wi de tap tru prɔdɔkshɔn ɛn delivri, nɔ jɔs di dɛk. Af-fɔj aydiya dɛn nɔ de lɛf di bildin.",
  },
  {
    tag: "Grain",
    title: "Ditel De Kyari Di Wok",
    description:
      "Di difrɛns bitwin fayn ɛn gret de na di fineʃ — di frem, di kɛnin, di kɔt. Wi nɔ de skip am.",
  },
];
