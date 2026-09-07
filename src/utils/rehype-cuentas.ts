import { visit } from "unist-util-visit";
import type { Root, Text } from "hast";

/**
 * «Tengo precisamente 35 años y 249 días.»
 *
 * El About traía esas cuentas como expresiones de MDX. Se cambiaron por
 * marcas `%%…%%` porque el editor de Keystatic no sabe leer una expresión
 * y dejaba la página fuera del CMS. El resultado es el mismo que antes: se
 * resuelven en el build, igual que lo hacía el MDX.
 *
 * Si algún día sobra, borre este plugin de `astro.config.ts` y escriba los
 * números a mano en el MDX; no hay nada más enganchado.
 */

const NACIMIENTO = new Date("1991-01-01");
const JUNTOS = new Date("2010-07-10");
const DIA = 1000 * 60 * 60 * 24;

function cuentas() {
  const hoy = new Date();
  const años = (desde: Date) =>
    String(Math.floor((hoy.getTime() - desde.getTime()) / (DIA * 365.25)));
  return {
    "%%edad%%": años(NACIMIENTO),
    // Días corridos del año, como en la versión original de la página.
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
