import type { AstroComponentFactory } from "astro/runtime/server/index.js";

// Lazy, so a broken variant only breaks its own page.
const modulos = import.meta.glob<{ default: AstroComponentFactory }>(
  "./Hero*.astro"
);

export const variantes = [
  "a",
  "f",
  "g",
  "a1",
  "a2",
  "a3",
  "t1",
  "t2",
  "t3",
  "t4",
] as const;
export type Variante = (typeof variantes)[number];

// Variants whose page shows the systems showcase as a rotating triptych.
export const conTriptico: readonly Variante[] = ["a1", "t1", "t2", "t3", "t4"];

export async function cargarHero(v: Variante) {
  const modulo = await modulos[`./Hero${v.toUpperCase()}.astro`]();
  return modulo.default;
}
