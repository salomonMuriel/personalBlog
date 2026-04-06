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
 * Type-safe map from (base collection name, lang) → actual collection key.
 * Each collection only contains entries for that language, with clean IDs.
 */
const collectionMap = {
  blog: { en: "blog-en", es: "blog-es" },
  ideas: { en: "ideas-en", es: "ideas-es" },
  now: { en: "now-en", es: "now-es" },
  talks: { en: "talks-en", es: "talks-es" },
} as const;

type BaseCollection = keyof typeof collectionMap;
type CollectionKey<T extends BaseCollection> = (typeof collectionMap)[T][Lang];

/**
 * Fetch the language-specific collection. No runtime filtering — Astro only
 * loads entries from the matching lang directory. IDs are clean slugs.
 */
export function getLocalizedCollection<T extends BaseCollection>(
  lang: Lang,
  name: T
) {
  return getCollection(collectionMap[name][lang] as CollectionKey<T>);
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
