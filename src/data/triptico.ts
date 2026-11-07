import type { Lang } from "@i18n/ui";

type CopiaTriptico = {
  pausar: string;
};

export const triptico: Record<Lang, CopiaTriptico> = {
  es: {
    pausar: "Pausar el cambio entre sistemas",
  },
  en: {
    pausar: "Pause switching between systems",
  },
};
