export interface UiuxProject {
  slug: string;
  title: string;
  description: string;
  coverSrc: string;
  coverAlt: string;
  href: string;
  screenCount: number;
  screenSrcs: string[];
  // Present only for case studies: full-width boards stacked in order on the page.
  sections?: UiuxSection[];
}

export interface UiuxSection {
  src: string;
  width: number;
  height: number;
}

// Screens are stored as `<Stem> (<n>).png` per folder under `/assets/case-studies/<folder>/`.
function buildScreenSrcs(folder: string, fileStem: string, count: number): string[] {
  return Array.from({ length: count }, (_, index) => `/assets/case-studies/${folder}/${fileStem} (${index + 1}).png`);
}

// Case-study boards keep their exported file names under `/assets/case-studies/<folder>/`.
// Each board is `[file name, height]`; width is 1440 unless a third value is given.
// Width and height only set the aspect ratio, so larger exports keep the 1440-wide values.
function buildSections(
  folder: string,
  extension: string,
  boards: [file: string, height: number, width?: number][],
): UiuxSection[] {
  return boards.map(([file, height, width = 1440]) => ({
    src: `/assets/case-studies/${folder}/${file}.${extension}`,
    width,
    height,
  }));
}

const pokedenSections = buildSections("PokeDen - Case Study", "jpg", [
  ["1 - HERO", 1024],
  ["2 - ABOUT", 1024],
  ["3 - PROBLEM - A", 1024],
  ["4 - PROBLEM - B", 1080],
  ["5 - SOLUTION", 1024],
  ["6 - GOAL", 977, 1438],
  ["7 - DESIGN PROCESS", 1139],
  ["8 - RESEARCH", 1110],
  ["9 - USER FLOW", 2528],
  ["10 - DESIGN SYSTEM - BRAND", 1224],
  ["11 - DESIGN SYSTEM -  TYPOGRAPHY _ COLOR", 2045],
  ["12 - FINAL SCREENS", 6253],
  ["13 - REFLECTION", 1024],
]);

const kivoSections = [
  // The hero board is still a PNG export; the rest are JPEG.
  ...buildSections("Kivo - Case Studies", "png", [["00 - HERO SECTION", 1024]]),
  ...buildSections("Kivo - Case Studies", "jpg", [
    ["01 - PROJECT OVERVIEW", 1024],
    ["02 - PROBLEM AND SOLUTION", 1024],
    ["03 - GOAL", 1024],
    ["04 - DESIGN PROCESS", 1914],
    ["05 - RESEARCH", 1714],
    ["06 - USER FLOW", 1876],
    ["07 - DESIGN SYSTEM", 2995],
    ["08 - FEATURES", 1312],
    ["09 - FINAL SCREENS", 2144],
    ["10 - REFLECTION", 674],
  ]),
];

export const uiuxProjects: UiuxProject[] = [
  {
    slug: "remindly",
    title: "RemindLy",
    description: "A personal task and reminder app for remembering what needs to be done and when.",
    coverSrc: "/assets/case-studies/RemindLy - Case Studies/RemindLy.png",
    coverAlt: "RemindLy app cover",
    href: "/uiux/remindly",
    screenCount: 23,
    screenSrcs: buildScreenSrcs("RemindLy - Case Studies", "Remindly-Screens", 23),
  },
  {
    slug: "spillr",
    title: "Spillr",
    description: "A mobile conversation card game from deck choice to timed play to result.",
    coverSrc: "/assets/case-studies/Spillr - Case Studies/Spillr.png",
    coverAlt: "Spillr app cover",
    href: "/uiux/spillr",
    screenCount: 28,
    screenSrcs: buildScreenSrcs("Spillr - Case Studies", "Spillr-Screens", 28),
  },
  {
    slug: "pokeden",
    title: "PokeDen",
    description: "A study app that keeps classes, due work, and exams in one subject-centered workspace.",
    coverSrc: "/assets/case-studies/PokeDen - Case Study/PokeDen - Thumbnail.png",
    coverAlt: "PokeDen case study cover",
    href: "/uiux/pokeden",
    screenCount: pokedenSections.length,
    screenSrcs: pokedenSections.map((section) => section.src),
    sections: pokedenSections,
  },
  {
    slug: "kivo",
    title: "Kivo",
    description: "A local-first desktop app for keeping notes, files, links, and personal information in one place.",
    coverSrc: "/assets/case-studies/Kivo - Case Studies/Kivo - Thumbnail.png",
    coverAlt: "Kivo case study cover",
    href: "/uiux/kivo",
    screenCount: kivoSections.length,
    screenSrcs: kivoSections.map((section) => section.src),
    sections: kivoSections,
  },
];
