export const languages = {
  es: "Español",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

/** Spanish is the site's first language. English is the secondary tree. */
export const defaultLang: Lang = "es";

/**
 * Route keys → the path each locale serves them at.
 * Spanish sits at the root; English lives under /en.
 */
export const routes = {
  home: { es: "/", en: "/en/" },
  mentoria: { es: "/mentoria/", en: "/en/mentoring/" },
  charlas: { es: "/charlas/", en: "/en/talks/" },
  sobreMi: { es: "/sobre-mi/", en: "/en/about/" },
  ahora: { es: "/ahora/", en: "/en/now/" },
} as const;

export type RouteKey = keyof typeof routes;

export const ui = {
  es: {
    "nav.mentoria": "Mentoría",
    "nav.charlas": "Charlas",
    "nav.sobreMi": "Sobre mí",
    "nav.ahora": "Ahora",
    "nav.escribirme": "Escribirme",
    "nav.paginas": "Páginas",
    "nav.saltar": "Saltar al contenido",
    "nav.volver": "Volver al inicio",

    "rotulo.parte": "Parte de operación",
    "rotulo.practica": "Práctica personal de Salomón Muriel",
    "rotulo.ciudad": "Bogotá, Colombia",

    "pie.sinFormulario": "Sin formulario",
    "pie.sinFormularioTxt":
      "No hay campos que llenar. Un mensaje tuyo, una respuesta mía.",
    "pie.sinEquipo": "Sin equipo detrás",
    "pie.sinEquipoTxt":
      "El que contesta y el que construye soy yo. Por eso los cupos son los que son.",
    "pie.otras": "Otras páginas",
    "pie.vigente": "Documento vigente",
    "pie.coords": "Bogotá · 4°42′N 74°04′W",

    "contacto.titulo": "Escríbeme",
    "contacto.bajada":
      "Escoge por dónde te queda más cómodo. Cuéntame qué tienes montado y te digo si te sirvo.",
    "contacto.wa": "WhatsApp",
    "contacto.agendar": "Agendar",
    "contacto.agendarNota": "cal.com/salomonmuriel",
    "contacto.linkedin": "LinkedIn",
    "contacto.linkedinNota": "Ahí escribo · no tengo blog",
    "contacto.correo": "Correo",

    "lang.otro": "English",
    "404.titulo": "Esta página ya no está",
    "404.texto":
      "Se dañó el enlace o la página se retiró. Abajo está lo que sí existe.",
    "410.titulo": "Esta página se retiró",
    "410.texto":
      "El blog de esta página se retiró. Lo que escribo hoy lo publico en LinkedIn.",
  },
  en: {
    "nav.mentoria": "Mentoring",
    "nav.charlas": "Talks",
    "nav.sobreMi": "About",
    "nav.ahora": "Now",
    "nav.escribirme": "Message me",
    "nav.paginas": "Pages",
    "nav.saltar": "Skip to content",
    "nav.volver": "Back home",

    "rotulo.parte": "Operations report",
    "rotulo.practica": "Salomón Muriel's personal practice",
    "rotulo.ciudad": "Bogotá, Colombia",

    "pie.sinFormulario": "No forms",
    "pie.sinFormularioTxt":
      "Nothing to fill in. One message from you, one answer from me.",
    "pie.sinEquipo": "No team behind me",
    "pie.sinEquipoTxt":
      "The person who answers and the person who builds are the same. That's why there are so few slots.",
    "pie.otras": "Other pages",
    "pie.vigente": "Current document",
    "pie.coords": "Bogotá · 4°42′N 74°04′W",

    "contacto.titulo": "Write to me",
    "contacto.bajada":
      "Pick whichever is easiest. Tell me what you have running and I'll tell you if I'm any use to you.",
    "contacto.wa": "WhatsApp",
    "contacto.agendar": "Book a call",
    "contacto.agendarNota": "cal.com/salomonmuriel",
    "contacto.linkedin": "LinkedIn",
    "contacto.linkedinNota": "That's where I write · no blog",
    "contacto.correo": "Email",

    "lang.otro": "Español",
    "404.titulo": "This page isn't here",
    "404.texto":
      "Either the link broke or the page was retired. Here's what does exist.",
    "410.titulo": "This page was retired",
    "410.texto":
      "The blog that used to live here is gone. What I write now goes on LinkedIn.",
  },
} as const;
