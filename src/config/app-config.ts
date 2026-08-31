import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "ChicoFolio",
  version: packageJson.version,
  copyright: `© ${currentYear}, ChicoFolio.`,
  meta: {
    title: "ChicoFolio",
    description: "ChicoFolio is a portfolio of graphic design and full-stack development work.",
  },
};
