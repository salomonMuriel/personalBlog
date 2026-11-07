import type { Lang } from "@i18n/ui";

type CopiaHeroG = {
  icp: string;
  bajadaCorta: string;
  pantallas: string;
  pausar: string;
};

export const heroG: Record<Lang, CopiaHeroG> = {
  es: {
    icp: "Para PYMEs que funcionan a punta de Excel y WhatsApp.",
    bajadaCorta: "Le construyo a tu empresa su sistema operativo.",
    pantallas: "Sistemas que he construido",
    pausar: "Pausar las pantallas",
  },
  en: {
    icp: "For small businesses that still run on Excel and WhatsApp.",
    bajadaCorta: "I build your company its operating system.",
    pantallas: "Systems I have built",
    pausar: "Pause the screens",
  },
};
