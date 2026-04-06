import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { resolve } from "path";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

// Load fonts from local files — no CDN round-trips on every build
const fontRegular = readFileSync(
  resolve("./src/assets/fonts/og/dm-sans-400.woff")
);
const fontBold = readFileSync(resolve("./src/assets/fonts/og/syne-700.woff"));

// Load author photo as base64 from local file to avoid network I/O during rendering
let authorPhoto = "";
try {
  const photoBuffer = readFileSync(resolve("./public/salomon.jpg"));
  authorPhoto = `data:image/jpeg;base64,${photoBuffer.toString("base64")}`;
} catch {
  // Photo unavailable — template will render without it
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
  const svg = await satori(postOgImage(post, authorPhoto), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(authorPhoto), options);
  return svgBufferToPngBuffer(svg);
}
