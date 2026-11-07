import type { Lang } from "@i18n/ui";

interface CopiaHeroH {
  icp: string;
  oferta: string;
}

export const heroH: Record<Lang, CopiaHeroH> = {
  es: {
    icp: "Para PYMEs que tienen la información regada en veinte Excel.",
    oferta: "sistema operativo",
  },
  en: {
    icp: "For small businesses whose information is scattered across twenty spreadsheets.",
    oferta: "operating system",
  },
};
