import { SITE, CONTACTO } from "@config";
import type { Lang } from "@i18n/ui";

const abs = (p: string) => new URL(p, SITE.website).href;

/**
 * La persona. Es la entidad raíz del sitio: todo lo demás la referencia
 * por @id en vez de repetirla.
 */
export function personaLd(lang: Lang) {
  return {
    "@type": "Person",
    "@id": `${SITE.website}/#salomon`,
    name: "Salomón Muriel",
    alternateName: "Luis Salomón Muriel Urbina",
    url: SITE.website,
    image: abs("/og.png"),
    jobTitle:
      lang === "es"
        ? "Consultor de tecnología y fundador"
        : "Technology consultant and founder",
    description:
      lang === "es"
        ? "Construyo software a la medida para empresas colombianas tradicionales: defino la estrategia y construyo la herramienta yo mismo."
        : "I build custom software for traditional Colombian businesses: I define the strategy and build the tool myself.",
    knowsLanguage: ["es", "en"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad de los Andes",
      url: "https://uniandes.edu.co/",
    },
    worksFor: {
      "@type": "Organization",
      name: "Ignia",
      url: "https://www.ignia.lat",
    },
    sameAs: [CONTACTO.linkedin, "https://github.com/salomonMuriel"],
  };
}

/** La página como perfil profesional. */
export function profilePageLd(lang: Lang, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": url,
    url,
    inLanguage: lang === "es" ? "es-CO" : "en",
    mainEntity: personaLd(lang),
  };
}

/**
 * El servicio de consultoría. Sin precio, deliberadamente: la restricción
 * dura del proyecto es silencio absoluto sobre dinero, y `offers` sin
 * `price` es válido en schema.org.
 */
export function servicioLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.website}/#consultoria`,
    serviceType:
      lang === "es"
        ? "Consultoría de tecnología y desarrollo de software a la medida"
        : "Technology consulting and custom software development",
    provider: { "@id": `${SITE.website}/#salomon` },
    areaServed: { "@type": "Country", name: "Colombia" },
    availableLanguage: ["es", "en"],
    audience: {
      "@type": "BusinessAudience",
      audienceType:
        lang === "es"
          ? "Empresas colombianas tradicionales de 5 a 40 personas"
          : "Traditional Colombian businesses with 5 to 40 employees",
    },
    description:
      lang === "es"
        ? "Construyo el sistema que le falta a su empresa —CRM, operación, facturación— hecho a la medida de como ya trabaja, y lo dejo conectado con los que ya tiene."
        : "I build the system your company is missing — CRM, operations, invoicing — made to fit how you already work, and wire it to the ones you already have.",
  };
}

export type Pregunta = { p: string; r: string };

/** FAQPage: alimenta el bloque de preguntas y el rich result de Google. */
export function faqLd(preguntas: Pregunta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map(({ p, r }) => ({
      "@type": "Question",
      name: p,
      acceptedAnswer: { "@type": "Answer", text: r },
    })),
  };
}

/** Migas para las páginas secundarias. */
export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}
