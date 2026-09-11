export interface UiuxProject {
  slug: string;
  title: string;
  description: string;
  coverSrc: string;
  coverAlt: string;
  href: string;
  screenCount: number;
  screenSrcs: string[];
}

// Screens are stored as `<Stem> (<n>).png` per folder under `/assets/<folder>/`;
// folder names are lowercase while file stems keep their original casing.
function buildScreenSrcs(folder: string, fileStem: string, count: number): string[] {
  return Array.from({ length: count }, (_, index) => `/assets/${folder}/${fileStem} (${index + 1}).png`);
}

export const uiuxProjects: UiuxProject[] = [
  {
    slug: "remindly",
    title: "RemindLy",
    description: "A personal task and reminder app for remembering what needs to be done and when.",
    coverSrc: "/assets/remindly/RemindLy.png",
    coverAlt: "RemindLy app cover",
    href: "/uiux/remindly",
    screenCount: 23,
    screenSrcs: buildScreenSrcs("remindly", "Remindly-Screens", 23),
  },
  {
    slug: "spillr",
    title: "Spillr",
    description: "A mobile conversation card game from deck choice to timed play to result.",
    coverSrc: "/assets/spillr/Spillr.png",
    coverAlt: "Spillr app cover",
    href: "/uiux/spillr",
    screenCount: 28,
    screenSrcs: buildScreenSrcs("spillr", "Spillr-Screens", 28),
  },
];
