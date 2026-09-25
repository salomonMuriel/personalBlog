import { ui, defaultLang, routes, type Lang, type RouteKey } from "./ui";
import { getCollection } from "astro:content";

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

export function path(lang: Lang, key: RouteKey): string {
  return routes[key][lang];
}

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

export function getLocalizedCollection<T extends BaseCollection>(
  lang: Lang,
  name: T
) {
  return getCollection(collectionMap[name][lang] as CollectionKey<T>);
}

export function getLangTag(lang: Lang): string {
  return lang === "es" ? "es-CO" : "en";
}
