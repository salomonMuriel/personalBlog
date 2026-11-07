import type { Lang } from "@i18n/ui";

type CopiaHeroA3 = {
  icp: string;
  bajadaCorta: string;
  waCorto: string;
  // The last sense gets marked by hand: one phrase highlighted, one struck and replaced.
  marcada: string;
  tachada: string;
  correccion: string;
  tira: string;
  pausar: string;
};

export const heroA3: Record<Lang, CopiaHeroA3> = {
  es: {
    icp: "Para PYMEs que funcionan a punta de Excel y WhatsApp.",
    bajadaCorta: "Le construyo a tu empresa su sistema operativo.",
    waCorto: "WhatsApp",
    marcada: "la tuya",
    tachada: "probablemente",
    correccion: "seguro",
    tira: "Sistemas que he construido",
    pausar: "Pausar las pantallas",
  },
  en: {
    icp: "For small businesses that still run on Excel and WhatsApp.",
    bajadaCorta: "I build your company its operating system.",
    waCorto: "WhatsApp",
    marcada: "yours",
    tachada: "probably",
    correccion: "surely",
    tira: "Systems I have built",
    pausar: "Pause the screens",
  },
};

// Stills on the film strip, in order. Each is a 3:2 crop of the screenshot of the
// same name in src/assets/sistemas, saved in src/assets/heroes/a3.
export const cuadrosA3 = [
  "aura-hoy-1440",
  "guiacolegio-tablero-1440",
  "consto-revisar-1440",
  "aura-whatsapp-390",
  "guiacolegio-analitica-1440",
  "aura-movimientos-1440",
  "memoplan-semana-390",
  "guiacolegio-hoy-1440",
  "consto-coordinacion-1440",
  "aura-direccion-1440",
  "guiacolegio-panel-embudo-1440",
  "aura-ficha-1440",
];
