import type { Pregunta } from "@utils/jsonld";

/**
 * Las ocho de siempre, en el orden en que se las hacen. Vive fuera del
 * componente porque la página también las necesita para el JSON-LD
 * (`FAQPage`), y las dos listas no pueden separarse.
 */
export const preguntasEs: Pregunta[] = [
  {
    p: "Es que yo de tecnología no sé nada.",
    r: "Perfecto. La mitad de mi trabajo es traducir; si algo no se entiende es culpa mía. Mis clientes son marcas de ropa, restaurantes, distribuidoras, importadores y empresas de servicios.",
  },
  {
    p: "¿Lo que me vas a entregar es una presentación?",
    r: "No. Te entrego algo funcionando y en producción, tu equipo capacitado para usarlo y la decisión estratégica escrita en dos páginas, en español y sin jerga.",
  },
  {
    p: "Ya compré un software carísimo. ¿Toca botarlo?",
    r: "Casi nunca. Primero miro qué de lo que ya tienes sirve y por qué la gente no lo abre. Muchas veces el programa está bien, pero desconectado del resto, y por eso llenarlo es doble trabajo.",
  },
  {
    p: "Tenemos un Notion y un Excel que dicen cosas distintas. ¿Con cuál nos quedamos?",
    r: "Con uno solo, siempre. Miramos cuál usa la gente de verdad, pasamos lo que sirve del otro y apagamos el que sobra. Mientras existan los dos, alguien va a tener que llenar los dos y se va a equivocar.",
  },
  {
    p: "¿Mi empresa es muy chiquita para esto?",
    r: "Si ya vendes y tienes entre cinco y cuarenta personas, estás justo en el punto donde más sirvo. Donde no sirvo es cuando la empresa ya está grande y lo que necesita es escalarla mucho más.",
  },
  {
    p: "¿Y después, cuando quiera cambiar algo?",
    r: "El código queda a nombre de tu empresa y antes de bajarme les enseño a modificarlo con inteligencia artificial: cómo pedir el cambio y cómo dejarlo andando. No quiero quedar de portero de tu herramienta.",
  },
  {
    p: "¿De dónde sacas el tiempo para esto?",
    r: "De lunes a viernes construyo Ignia, que es mi empresa. Tengo dos mellizos de cuatro años y no trabajo los domingos. Por eso solo tomo cuatro consultorías al tiempo.",
  },
  {
    p: "¿Y si no me sirves?",
    r: "Te lo digo en la primera llamada y te digo a quién llamar. Llevo suficientes años en esto para conocer a la gente que hace bien lo que yo no hago.",
  },
];

export const preguntasEn: Pregunta[] = [
  {
    p: "I don't know anything about technology.",
    r: "Good. Half my job is translating; if something isn't clear, that's on me. My clients are clothing brands, restaurants, distributors, importers and service businesses.",
  },
  {
    p: "Am I going to get a slide deck?",
    r: "No. You get something running in production, your team trained to use it, and the strategic decision written down in two pages, in plain language.",
  },
  {
    p: "I already bought expensive software. Do I throw it out?",
    r: "Almost never. First I look at what already works and why nobody opens it. Very often the program is fine, but it's disconnected from everything else, which is why filling it in is double work.",
  },
  {
    p: "We have a Notion and an Excel that say different things. Which one do we keep?",
    r: "One of them, always. We look at which one people actually use, move over what's worth keeping and turn the other one off. While both exist, someone has to fill in both — and they will get it wrong.",
  },
  {
    p: "Is my company too small for this?",
    r: "If you're already selling and you have between five and forty people, you're exactly where I'm most useful. Where I'm not useful is once the company is big and what it needs is to scale much further.",
  },
  {
    p: "What about later, when I want to change something?",
    r: "The code is in your company's name, and before I step off I teach your people to change it with AI: how to ask for the change and how to ship it. I don't want to end up as the gatekeeper of your own tool.",
  },
  {
    p: "Where do you find the time?",
    r: "Monday to Friday I build Ignia, which is my company. I have four-year-old twins and I don't work Sundays. That's why I only take four consulting engagements at a time.",
  },
  {
    p: "And if you're not the right person for me?",
    r: "I'll tell you on the first call, and I'll tell you who to call instead. I've been at this long enough to know the people who do well what I don't do.",
  },
];
