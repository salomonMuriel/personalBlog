import type { AstroComponentFactory } from "astro/runtime/server/index.js";

// Lazy, so a broken variant only breaks its own page.
const modulos = import.meta.glob<{ default: AstroComponentFactory }>(
  "./Hero[A-Z].astro"
);

export const variantes = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
export type Variante = (typeof variantes)[number];

export async function cargarHero(v: Variante) {
  const modulo = await modulos[`./Hero${v.toUpperCase()}.astro`]();
  return modulo.default;
}
