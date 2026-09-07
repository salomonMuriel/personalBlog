import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { resolve } from "path";
import siteOgImage from "./og-templates/site";

// Fuentes locales: ni una llamada de red durante el build.
const slab = readFileSync(
  resolve("./src/assets/fonts/og/alfa-slab-one-400.woff")
);
const mono500 = readFileSync(
  resolve("./src/assets/fonts/og/ibm-plex-mono-500.woff")
);
const mono600 = readFileSync(
  resolve("./src/assets/fonts/og/ibm-plex-mono-600.woff")
);

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    { name: "Alfa Slab One", data: slab, weight: 400, style: "normal" },
    { name: "IBM Plex Mono", data: mono500, weight: 400, style: "normal" },
    { name: "IBM Plex Mono", data: mono600, weight: 600, style: "normal" },
  ],
};

function svgAPng(svg: string) {
  return new Resvg(svg).render().asPng();
}

export async function generateOgImageForSite(lang: "es" | "en" = "es") {
  return svgAPng(await satori(siteOgImage(lang), options));
}
