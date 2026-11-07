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
  cuentame: { es: "/cuentame/", en: "/en/tell-me/" },
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

    "pie.empezar": "Cómo empezar",
    "pie.empezarTxt": "Escríbeme por WhatsApp o llena el cuestionario.",
    "pie.queConstruyo": "Qué construyo",
    "pie.queConstruyoTxt":
      "Le construyo a tu empresa su sistema operativo, a la medida de cómo ya trabaja.",
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
    "contacto.linkedinNota": "linkedin.com/in/smuriel",
    "contacto.correo": "Correo",
    "contacto.cuestionario": "Cuestionario",
    "contacto.cuestionarioNota": "",

    "lang.otro": "English",
    "404.titulo": "Esta página ya no está",
    "404.texto":
      "Se dañó el enlace o la página se retiró. Abajo está lo que sí existe.",
    "410.titulo": "Esta página se retiró",
    "410.texto":
      "Era parte de un blog que ya no existe. Lo que escribo hoy lo publico en LinkedIn.",
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

    "pie.empezar": "How to start",
    "pie.empezarTxt": "Message me on WhatsApp or fill in the questionnaire.",
    "pie.queConstruyo": "What I build",
    "pie.queConstruyoTxt":
      "I build your company its operating system, made to fit how it already works.",
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
    "contacto.linkedinNota": "linkedin.com/in/smuriel",
    "contacto.correo": "Email",
    "contacto.cuestionario": "Questionnaire",
    "contacto.cuestionarioNota": "",

    "lang.otro": "Español",
    "404.titulo": "This page isn't here",
    "404.texto":
      "Either the link broke or the page was retired. Here's what does exist.",
    "410.titulo": "This page was retired",
    "410.texto":
      "It was part of a blog that no longer exists. What I write now goes on LinkedIn.",
  },
} as const;
