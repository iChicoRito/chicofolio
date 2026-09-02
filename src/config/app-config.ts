import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "ChicoFolio",
  version: packageJson.version,
  copyright: `© ${currentYear}, ChicoFolio.`,
  meta: {
    title: "ChicoFolio",
    description: "ChicoFolio is Mark Adrianne Salunga's portfolio of product design and full-stack web/mobile work.",
  },
};
