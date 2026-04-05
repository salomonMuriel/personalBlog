import { ui, defaultLang, type Lang } from "./ui";
import { getCollection } from "astro:content";

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function t(
  lang: Lang,
  key: keyof (typeof ui)[typeof defaultLang]
): string {
  return ui[lang][key] || ui[defaultLang][key];
}

export function getLocalizedPath(lang: Lang, path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${cleanPath}`;
}

/**
 * Fetch a collection filtered by language, with lang prefix stripped from IDs.
 * Content is stored as `src/content/<type>/<lang>/...`, so IDs come in as "en/slug".
 * This returns entries with clean IDs like "slug" — ready for URL building.
 */
export async function getLocalizedCollection<
  T extends "blog" | "ideas" | "now" | "talks",
>(lang: Lang, name: T) {
  const entries = await getCollection(name);
  const prefix = `${lang}/`;
  return entries
    .filter(entry => entry.id.startsWith(prefix))
    .map(entry => ({ ...entry, id: entry.id.slice(prefix.length) }));
}

export function stripLangFromPath(pathname: string): string {
  return pathname.replace(/^\/(en|es)/, "") || "/";
}

export function getAlternateUrl(currentUrl: URL, targetLang: Lang): string {
  const currentPath = currentUrl.pathname;
  const strippedPath = currentPath.replace(/^\/(en|es)/, "");
  return `/${targetLang}${strippedPath || "/"}`;
}

export function getLangTag(lang: Lang): string[] {
  return lang === "es" ? ["es-419"] : ["en-EN"];
}
