import { ui, defaultLang, type Lang } from "./ui";

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
  // Ensure path starts with /
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${cleanPath}`;
}

export function getCollectionName(lang: Lang, baseName: string): string {
  return lang === "es" ? `${baseName}-es` : baseName;
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
