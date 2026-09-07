import { ui, defaultLang, routes, type Lang, type RouteKey } from "./ui";
import { getCollection } from "astro:content";

/** Spanish serves from `/`, English from `/en/…`. */
export function getLangFromUrl(url: URL): Lang {
  return url.pathname === "/en" || url.pathname.startsWith("/en/")
    ? "en"
    : defaultLang;
}

export function t(
  lang: Lang,
  key: keyof (typeof ui)[typeof defaultLang]
): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}

/** Path for a named route in a given locale. */
export function path(lang: Lang, key: RouteKey): string {
  return routes[key][lang];
}

/** The same page in the other locale — used by the language switcher and hreflang. */
export function alternatePath(currentPath: string, target: Lang): string {
  const normalised = currentPath.endsWith("/")
    ? currentPath
    : `${currentPath}/`;
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key].es === normalised || routes[key].en === normalised) {
      return routes[key][target];
    }
  }
  return routes.home[target];
}

const collectionMap = {
  now: { en: "now-en", es: "now-es" },
  talks: { en: "talks-en", es: "talks-es" },
  testimonios: { en: "testimonios-en", es: "testimonios-es" },
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

export function getLangTag(lang: Lang): string {
  return lang === "es" ? "es-CO" : "en";
}
