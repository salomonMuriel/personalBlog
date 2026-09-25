export const languages = {
  es: "Español",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "es";

// Las rutas no son paralelas: este mapa es la única fuente para nav, hreflang y sitemap.
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
    "pie.sinFormularioTxt": "Me escribes y te contesto yo.",
    "pie.sinEquipo": "Sin equipo detrás",
    "pie.sinEquipoTxt": "El que contesta y el que construye soy yo.",
    "pie.otras": "Otras páginas",
    "pie.vigente": "Documento vigente",
    "pie.coords": "Bogotá · 4°42′N 74°04′W",

    "contacto.titulo": "Escríbeme",
    "contacto.bajada":
      "Cuéntame qué tienes montado y te digo si te puedo ayudar.",
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
    "pie.sinFormularioTxt": "You write, I answer.",
    "pie.sinEquipo": "No team behind me",
    "pie.sinEquipoTxt":
      "The person who answers and the person who builds are the same.",
    "pie.otras": "Other pages",
    "pie.vigente": "Current document",
    "pie.coords": "Bogotá · 4°42′N 74°04′W",

    "contacto.titulo": "Write to me",
    "contacto.bajada":
      "Tell me what you have running and I'll tell you if I can help.",
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
