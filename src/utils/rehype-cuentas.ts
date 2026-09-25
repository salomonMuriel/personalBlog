import { visit } from "unist-util-visit";
import type { Root, Text } from "hast";

// Resuelve las marcas `%%edad%%`, `%%dias%%`… del About en el build. Keystatic no lee expresiones MDX.

const NACIMIENTO = new Date("1991-01-01");
const JUNTOS = new Date("2010-07-10");
const DIA = 1000 * 60 * 60 * 24;

function cuentas() {
  const hoy = new Date();
  const años = (desde: Date) =>
    String(Math.floor((hoy.getTime() - desde.getTime()) / (DIA * 365.25)));
  return {
    "%%edad%%": años(NACIMIENTO),
    "%%dias%%": String(
      Math.floor(
        (hoy.getTime() - new Date(hoy.getFullYear(), 0, 0).getTime()) / DIA
      )
    ),
    "%%juntos%%": años(JUNTOS),
  } as Record<string, string>;
}

export function rehypeCuentas() {
  const valores = cuentas();
  const marcas = new RegExp(Object.keys(valores).join("|"), "g");

  return (tree: Root) => {
    visit(tree, "text", (node: Text) => {
      if (!node.value.includes("%%")) return;
      node.value = node.value.replace(marcas, m => valores[m] ?? m);
    });
  };
}
