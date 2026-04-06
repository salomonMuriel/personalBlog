import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

const fetchFonts = async () => {
  // Regular Font (DM Sans)
  const fontFileRegular = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@latest/latin-400-normal.woff"
  );
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

  // Bold Font (Syne)
  const fontFileBold = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/syne@latest/latin-700-normal.woff"
  );
  const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

  return { fontRegular, fontBold };
};

let fontRegular: ArrayBuffer;
let fontBold: ArrayBuffer;
try {
  const fonts = await fetchFonts();
  fontRegular = fonts.fontRegular;
  fontBold = fonts.fontBold;
} catch {
  // Fallback: empty buffers when fonts can't be fetched (e.g., no network in CI)
  fontRegular = new ArrayBuffer(0);
  fontBold = new ArrayBuffer(0);
}

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "DM Sans",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "Syne",
      data: fontBold,
      weight: 700,
      style: "normal",
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(
  post: CollectionEntry<"ideas-en" | "ideas-es" | "blog-en" | "blog-es">
) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  const pngBuffer = svgBufferToPngBuffer(svg);
  return pngBuffer;
}
