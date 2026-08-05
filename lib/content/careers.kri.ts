import type { ApplicationStep, Pillar, Role } from "./careers";

export const careersHero = {
  eyebrow: "Jɔb Dɛn",
  title: "Kam Bil Sɔntin We Get Minin.",
  statement: [
    "Wi de bil wan ples fɔ pipul dɛn we biliv se tori dɛn fɔ muv kɔlcha, inspaya chenj, ɛn kɔnɛkt komyuniti dɛn.",
    "Wi de luk fɔ kyuriɔs maynd dɛn ɛn pashɔnet kriyeta dɛn we want fɔ du wok we get minin, ɛn ɛp wi tɛl di tori dɛn we shep Sɛra Lyon ɛn pas.",
  ],
};

export const careersPageCopy = {
  rolesHeading: "Bil Di Fyuchɔ Wit Wi. Aplay Ya.",
  noRoleListed: "Yu nɔ si di rayt rol na di list?",
  introduceYourself: "Introdyus yusɛf ɛnihau",
  howToApply: "Aw Fɔ Aplay",
  applyNow: "Aplay Naw",
  applyLink: "Aplay →",
  noRolesInDepartment: "Nɔ opɛn rol na dis dipatmɛnt naw naw.",
};

export const pillars: Pillar[] = [
  {
    title: "Tori Dɛn We Wɔt Fɔ Tɛl",
    description:
      "Ɛvri projɛkt na wan chans fɔ kach sɔntin we tru-tru. Wi de krieet wok we liv pas kampen dɛn, skrin dɛn, ɛn dedlayn dɛn.",
  },
  {
    title: "Kɔlabɔreshɔn Na Wi Kraft",
    description:
      "Gret aydiya dɛn nɔ de bil alon. Wi de brin tori-tɛla dɛn, stratijist dɛn, dizayna dɛn, ɛn prodyusa dɛn togɛda fɔ krieet wok we tranga pas wetin wan pɔsin kin mek.",
  },
  {
    title: "Kwaliti Pas Kwantiti Ɛn Nɔ Kɔmpromayz",
    description:
      "Wi nɔ de chez pafɛkshɔn tru ɛndlɛs awa dɛn. Wi de chez ɛksɛlɛns tru kea, intɛnshɔn, ɛn atɛnshɔn to ɛvri ditel. Wi de fokɔs pan wetin wi kin du bɛst instɛd fɔ tray fɔ du ɛvritin.",
  },
];

// Job titles are kept in English (standard practice for professional job
// postings even in Krio-speaking contexts) — only the department/type/
// location qualifiers are translated. Department values here MUST match
// between `departments` and each role's `department` field (RolesList
// filters by direct string equality), so both are translated together.
export const departments: string[] = ["Ɔl", "Kriyetiv", "Prɔdɔkshɔn", "Stratiji", "Ɔpareshɔn"];

export const roles: Role[] = [
  { title: "Videographer", department: "Prɔdɔkshɔn", type: "Full-time", location: "Freetown / Na Sayt" },
  { title: "Editor", department: "Prɔdɔkshɔn", type: "Full-time", location: "Freetown" },
  { title: "Graphic Designer", department: "Kriyetiv", type: "Full-time", location: "Freetown" },
  { title: "Content & Social Media Manager", department: "Stratiji", type: "Full-time", location: "Freetown" },
  { title: "Studio Operations Manager", department: "Ɔpareshɔn", type: "Full-time", location: "Freetown" },
];

export const applicationSteps: ApplicationStep[] = [
  {
    title: "Aplay",
    description:
      "Shea yu pɔtfolio, riil, CV, ɔ ɛni wok we yu prawd ɔf. Wi de rivyu ɛvri aplikeshɔn wisɛf bikɔs gret talent dizɛv wan tru-tru kɔnvɛseshɔn, nɔ wan ɔtomet filta.",
  },
  {
    title: "No Wisɛf",
    description:
      "If wi tink se i fit fayn, wi go invayt yu fɔ wan rilaks kɔnvɛseshɔn. Wi go tɔk bɔt yu ɛkspiriɛns, yu ambishɔn, ɛn di kayn ɔv wok we ɛksayt yu, wail wi de gi yu chans fɔ lan mɔ bɔt wi.",
  },
  {
    title: "Krieet Togɛda",
    description:
      "Dipɛn pan di rol, yu fɔ mit di wayda tim ɔ dɔn wan shɔt praktikal ɛksasayz. Wi nɔ intrɛstɛd na trik kwɛshɔn dɛn. Wi want fɔ si aw yu tink, kɔlaboret, ɛn aprowch kriyetiv chalenj dɛn.",
  },
  {
    title: "Welkam To Di Foundry",
    description:
      "If i fil lɛk di rayt fit fɔ wi ɔltu, wi go muv kwik wit wan ɔfa ɛn ɛvritin we yu nid fɔ stat. Dɛn na tem fɔ krieet wok we mata, togɛda.",
  },
];
