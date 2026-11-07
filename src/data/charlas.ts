import type { Lang } from "@i18n/ui";

const es = {
  meta: {
    title: "Charlas · Salomón Muriel, Bogotá",
    description:
      "Kit para organizadores: temas, formatos, dónde he hablado, bio corta y larga, foto y contacto. Adopción de tecnología e IA, emprendimiento, mentalidad y balance entre la vida y el trabajo.",
  },

  rotulo: "Anexo · Material de divulgación",
  nota: "Para quien organiza el evento.",
  titulo: "Charlas",
  manuscrita: "",
  bajada:
    "Acá están los temas, los formatos, la bio y la foto para el programa de tu evento.",

  franqueza: {
    rotulo: "Por qué doy charlas",
    texto:
      "Las charlas son la forma en que la gente conoce lo demás que hago: la consultoría, la mentoría e Ignia, el modelo de educación superior que estoy construyendo. En tarima no vendo nada, pero mucha de la gente que después me escribe me oyó primero en una charla.",
    condicion: "Solo hablo de lo que he hecho.",
  },

  temas: {
    rotulo: "Temas",
    titulo: "De lo que hablo",
    lista: [
      {
        n: "01",
        t: "Adopción de tecnología e inteligencia artificial",
        d: "Desarrollar con IA y usar agentes para tareas que no son de programación.",
        publico: "Para empresas y equipos que no son de tecnología.",
      },
      {
        n: "02",
        t: "Emprendimiento sin romanticismo",
        d: "Cinco empresas, dos vendidas, dos quebradas, y lo que aprendí de cada una.",
        publico: "Para universidades y programas de aceleración.",
      },
      {
        n: "03",
        t: "Mentalidad maker",
        d: "Construir con lo que hay, a punta de perrenque y curiosidad.",
        publico: "Para estudiantes y equipos que necesitan mover algo ya.",
      },
      {
        n: "04",
        t: "Trabajo y vida",
        d: "Una quinta empresa, mellizos de cuatro años, una media maratón y un medidor de felicidad que publico en mi página.",
        publico: "Para eventos corporativos y de talento.",
      },
    ],
    noRotulo: "De lo que no hablo",
    no: [
      "Charlas técnicas de ciencia de datos.",
      "Charlas de cultura organizacional.",
    ],
    noNota:
      "Si las necesitas, te paso el contacto de alguien que las da mejor que yo.",
  },

  formatos: {
    rotulo: "Formatos",
    titulo: "Cómo me suelen invitar",
    nota: "La duración la ajustamos al evento.",
    lista: [
      {
        t: "Charla",
        d: "Una hora en escenario, con preguntas al final. Es el formato que más me piden.",
      },
      {
        t: "Taller",
        d: "Sesión práctica en la que el equipo trabaja sobre su propio caso.",
      },
      {
        t: "Conversatorio o panel",
        d: "Con moderador o con otros invitados. Funciona mejor cuando hay preguntas del público.",
      },
      {
        t: "Podcast o entrevista",
        d: "Grabado o en vivo, sobre los mismos temas y sin diapositivas.",
      },
    ],
  },

  hechas: {
    rotulo: "Historial de tarima",
    titulo: "Charlas que ya di",
    nota: "Las cuatro vigentes van con material.",
    verVideo: "Ver el video",
    verPdf: "Ver las diapositivas",
    verHtml: "Ver la presentación",
    retiradasRotulo: "Retiradas",
    retiradasNota: "Son de ciencia de datos y ya no las ofrezco.",
  },

  tarimas: {
    rotulo: "Dónde",
    titulo: "Dónde he hablado",
    nota: "Conferencias, empresas, universidades y gremios. En Colombia, presencial o remoto.",
  },

  kit: {
    rotulo: "Kit del organizador",
    titulo: "Lo que necesitas para el programa",
    nota: "",
    bioCortaT: "Bio corta",
    bioCortaNota: "Para el programa del evento.",
    bioCorta:
      "Salomón Muriel es emprendedor y consultor de tecnología en Bogotá. Va en su quinta empresa: dos las vendió, dos quebraron y la de hoy es Ignia, un modelo nuevo de educación superior. Antes dirigió datos y producto en R5, con unas cuarenta personas a cargo. Hoy también les construye su sistema operativo a empresas colombianas: software a la medida de cómo trabajan.",
    bioLargaT: "Bio larga",
    bioLargaNota: "Para prensa o para presentar en tarima.",
    bioLarga:
      "Salomón Muriel tiene 35 años, vive en Bogotá y va en su quinta empresa. Fundó Finco, valoración inmobiliaria con datos e inteligencia artificial para Latinoamérica, y la vendió a RED Atlas. También fundó PrestaGente, libranza entre personas, que vendió a Taurus Capital y sigue operando. Otras dos quebraron: Beriblock y El Palomo. Como empleado dirigió unas cuarenta personas en R5, donde construyó el pipeline de datos y el sistema de modelación de riesgo. Hoy construye Ignia, un modelo nuevo de educación superior en Latinoamérica, y en paralelo tiene una práctica personal de consultoría en la que les construye su sistema operativo a empresas colombianas tradicionales. Aprendió a programar a las malas, con una fecha de entrega encima, y el inglés jugando en línea. Es papá de mellizos, Franco y Luca, corrió una media maratón en 2:10 y publica un medidor de felicidad en su página. Su papá y su abuelo también fueron empresarios.",
    copiar: "Copiar",
    copiado: "Copiado",
    fotoT: "Foto",
    fotoNota: "800 × 800 px, JPG.",
    fotoDescargar: "Descargar la foto",
    fotoAlt: "Retrato de Salomón Muriel, de abrigo verde y brazos cruzados",
    datosT: "Datos",
    datos: [
      ["Nombre", "Salomón Muriel"],
      ["Nombre completo", "Luis Salomón Muriel Urbina"],
      ["Ciudad", "Bogotá, Colombia"],
      ["Idiomas", "Español e inglés"],
      ["LinkedIn", "linkedin.com/in/smuriel"],
      ["Sitio", "salomonmuriel.com"],
    ] as [string, string][],
  },

  cta: {
    rotulo: "Para invitarme",
    titulo: "Cuéntame quién va a estar en el público",
    texto: "De eso depende si soy la persona indicada.",
    wa: "Invitarme a una charla",
    waTexto:
      "Hola Salomón, quiero invitarte a dar una charla. Te cuento de qué se trata, qué fecha tenemos y quién va a estar en el público.",
    agenda: "O agenda veinte minutos",
  },
} as const;

const en = {
  meta: {
    title: "Talks · Salomón Muriel, Bogotá",
    description:
      "Organiser kit: topics, formats, where I've spoken, short and long bio, photo and contact. Technology and AI adoption, entrepreneurship, mindset, and work-life balance.",
  },

  rotulo: "Appendix · Press material",
  nota: "For event organisers.",
  titulo: "Talks",
  manuscrita: "",
  bajada:
    "Here are the topics, formats, bio and photo for your event's programme.",

  franqueza: {
    rotulo: "Why I give talks",
    texto:
      "Talks are how people get to know the rest of what I do: the consulting, the mentoring and Ignia, the higher-education model I'm building. I don't sell anything on stage, but many of the people who write to me later first heard me at a talk.",
    condicion: "I only talk about what I've done.",
  },

  temas: {
    rotulo: "Topics",
    titulo: "What I talk about",
    lista: [
      {
        n: "01",
        t: "Technology and AI adoption",
        d: "Building with AI and using agents for work that isn't programming.",
        publico: "For companies and teams that aren't technology companies.",
      },
      {
        n: "02",
        t: "Entrepreneurship without the romance",
        d: "Five companies, two sold, two failed, and what I learned from each.",
        publico: "For universities and accelerator programmes.",
      },
      {
        n: "03",
        t: "Maker mindset",
        d: "Building with what's at hand, on grit and curiosity.",
        publico: "For students and teams that need to move something now.",
      },
      {
        n: "04",
        t: "Work and life",
        d: "A fifth company, four-year-old twins, a half marathon and a happiness meter I publish on my site.",
        publico: "For corporate and talent events.",
      },
    ],
    noRotulo: "What I don't talk about",
    no: ["Technical data-science talks.", "Organisational-culture talks."],
    noNota:
      "If you need one, I can put you in touch with someone who gives them better than I do.",
  },

  formatos: {
    rotulo: "Formats",
    titulo: "How I usually get invited",
    nota: "We fit the length to the event.",
    lista: [
      {
        t: "Talk",
        d: "An hour on stage with questions at the end. It's the format I'm asked for most.",
      },
      {
        t: "Workshop",
        d: "A hands-on session where the team works on its own case.",
      },
      {
        t: "Panel or fireside",
        d: "With a moderator or other guests. It works better when the audience asks questions.",
      },
      {
        t: "Podcast or interview",
        d: "Recorded or live, on the same topics and without slides.",
      },
    ],
  },

  hechas: {
    rotulo: "Stage record",
    titulo: "Talks I've given",
    nota: "The four current ones come with material.",
    verVideo: "Watch the video",
    verPdf: "See the slides",
    verHtml: "See the deck",
    retiradasRotulo: "Retired",
    retiradasNota: "They're data science, and I don't offer them any more.",
  },

  tarimas: {
    rotulo: "Where",
    titulo: "Where I've spoken",
    nota: "Conferences, companies, universities and trade associations. In Colombia, in person or remote.",
  },

  kit: {
    rotulo: "Organiser kit",
    titulo: "What you need for the programme",
    nota: "",
    bioCortaT: "Short bio",
    bioCortaNota: "For the event programme.",
    bioCorta:
      "Salomón Muriel is an entrepreneur and technology consultant based in Bogotá. He's on his fifth company: two were sold, two failed, and today's is Ignia, a new model for higher education. Before that he led data and product at R5, with around forty people reporting to him. He also builds Colombian companies their operating system: custom software made to fit how they work.",
    bioLargaT: "Long bio",
    bioLargaNota: "For press or for a stage introduction.",
    bioLarga:
      "Salomón Muriel is 35, lives in Bogotá and is on his fifth company. He founded Finco, real-estate valuation with data and AI for Latin America, and sold it to RED Atlas. He also founded PrestaGente, peer-to-peer payroll lending, which he sold to Taurus Capital and which is still operating. Two others failed: Beriblock and El Palomo. As an employee he led around forty people at R5, where he built the data pipeline and the risk-modelling system. Today he is building Ignia, a new model for higher education in Latin America, and alongside it runs a personal consulting practice where he builds traditional Colombian companies their operating system. He learned to code the hard way, with a deadline on top of him, and learned English playing games online. He's the father of twins, Franco and Luca, ran a half marathon in 2:10 and publishes a happiness meter on his site. His father and grandfather were business owners too.",
    copiar: "Copy",
    copiado: "Copied",
    fotoT: "Photo",
    fotoNota: "800 × 800 px, JPG.",
    fotoDescargar: "Download the photo",
    fotoAlt: "Portrait of Salomón Muriel, in a green coat with folded arms",
    datosT: "Details",
    datos: [
      ["Name", "Salomón Muriel"],
      ["Full name", "Luis Salomón Muriel Urbina"],
      ["City", "Bogotá, Colombia"],
      ["Languages", "Spanish and English"],
      ["LinkedIn", "linkedin.com/in/smuriel"],
      ["Site", "salomonmuriel.com"],
    ] as [string, string][],
  },

  cta: {
    rotulo: "To invite me",
    titulo: "Tell me who's going to be in the room",
    texto: "That's what decides whether I'm the right person.",
    wa: "Invite me to speak",
    waTexto:
      "Hi Salomón, I'd like to invite you to give a talk. Let me tell you what it's about, the date we have and who'll be in the audience.",
    agenda: "Or book twenty minutes",
  },
} as const;

export const charlas = { es, en } as const;
export type CopiaCharlas = typeof es;

export function copiaCharlas(lang: Lang): CopiaCharlas {
  return (lang === "en" ? en : es) as unknown as CopiaCharlas;
}
