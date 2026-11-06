import type { Sistema } from "@data/landing";

// Glob instead of static imports so a missing screenshot drops its picture
// instead of breaking the build.
const archivos = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/sistemas/*.webp",
  { eager: true }
);

const PANTALLAS: Record<Sistema["clave"], string> = {
  aura: "aura-hoy-1440",
  guiacolegio: "guiacolegio-tablero-1440",
  visible: "visible-sistema-1440",
  colegio: "consto-acta-firmada-1440",
  ignia: "ignia-oportunidades-1440",
  entrehilos: "entrehilos-home-1440",
};

export function pantallaDe(clave: Sistema["clave"]): ImageMetadata | undefined {
  const nombre = PANTALLAS[clave];
  const ruta = Object.keys(archivos).find(r => r.endsWith(`/${nombre}.webp`));
  return ruta ? archivos[ruta].default : undefined;
}
