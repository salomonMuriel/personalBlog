/**
 * Copia de /charlas — que no es un archivo cronológico sino un kit para
 * quien organiza el evento: temas, formatos, dónde he hablado, bio corta,
 * bio larga, foto y por dónde escribirme.
 *
 * Las charlas no son un producto: son la manera en que la gente lo conoce
 * y la puerta de entrada a la consultoría, a la mentoría y a Ignia. La
 * página lo dice sin rodeos y no pone precios en ninguna parte.
 */
import type { Lang } from "@i18n/ui";

const es = {
  meta: {
    title: "Charlas — Salomón Muriel, Bogotá",
    description:
      "Kit para organizadores: temas, formatos, dónde he hablado, bio corta y larga, foto y contacto. Adopción de tecnología e IA, emprendimiento, mentalidad y balance entre la vida y el trabajo.",
  },

  rotulo: "Anexo · Material de divulgación",
  nota: "No es un producto. Es cómo la gente me conoce.",
  titulo: "Charlas",
  manuscrita: "después de oírme una hora ya sabes si quieres trabajar conmigo",
  bajada:
    "Me han contratado conferencias, empresas y universidades. Voy con gusto, pero acá no aparecen con precio ni con cupos, porque no son un servicio: son la puerta de entrada. De una charla salen tres conversaciones y de esas, con suerte, sale un trabajo.",

  franqueza: {
    rotulo: "Dicho sin rodeos",
    texto:
      "Las charlas son el mercadeo de lo demás que hago: la consultoría, la mentoría y, cuando viene al caso, Ignia — el modelo de educación superior que construyo de lunes a viernes. Nunca he armado una charla para vender algo: la armo, la doy, y de ahí sale la gente que después me escribe. Prefiero decirlo antes de que lo preguntes.",
    condicion:
      "Me subo al escenario con una condición: hablo de lo que he hecho, no de lo que leí.",
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
        d: "Cinco empresas, dos vendidas, dos quebradas, y qué me costó caro cada una.",
        publico: "Para universidades y programas de aceleración.",
      },
      {
        n: "03",
        t: "Mentalidad maker",
        d: "Perrenque, curiosidad, resiliencia y creatividad. Construir con lo que hay.",
        publico: "Para estudiantes y equipos que necesitan mover algo ya.",
      },
      {
        n: "04",
        t: "Trabajo y vida sin la pose",
        d: "Quinta empresa, mellizos de cuatro años, una media maratón y un medidor de felicidad publicado.",
        publico: "Para eventos corporativos y de talento.",
      },
    ],
    noRotulo: "De lo que no hablo",
    no: [
      "Charlas técnicas de ciencia de datos.",
      "Charlas de cultura organizacional.",
    ],
    noNota:
      "Me las piden seguido y siempre digo que no. Hay gente que las da muchísimo mejor que yo, y con gusto te paso el contacto.",
  },

  formatos: {
    rotulo: "Formatos",
    titulo: "Cómo me suelen invitar",
    nota: "La duración la cuadramos con el evento. No tengo un catálogo cerrado.",
    lista: [
      {
        t: "Charla",
        d: "Una hora en escenario, con preguntas al final. Es el formato que más me piden.",
      },
      {
        t: "Taller",
        d: "Sesión práctica con el equipo, trabajando sobre su propio caso en vez de sobre un ejemplo.",
      },
      {
        t: "Conversatorio o panel",
        d: "Con moderador o con otros invitados. Funciona mejor cuando hay preguntas del público.",
      },
      {
        t: "Podcast o entrevista",
        d: "Grabado o en vivo. Lo mismo que digo en escenario, sin diapositivas.",
      },
    ],
  },

  hechas: {
    rotulo: "Historial de tarima",
    titulo: "Charlas que ya di",
    nota: "Las cuatro vigentes van con material. Las de datos las retiré.",
    verVideo: "Ver el video",
    verPdf: "Ver las diapositivas",
    verHtml: "Ver la presentación",
    retiradasRotulo: "Retiradas",
    retiradasNota:
      "Las di en su momento y quedaron bien, pero ya no las ofrezco: son de ciencia de datos y esa puerta la cerré.",
  },

  tarimas: {
    rotulo: "Dónde",
    titulo: "Dónde he hablado",
    lista: [
      "ConfNodo",
      "EAFIT",
      "La EIA",
      "El Externado",
      "La Universidad Católica",
      "La Asociación Colombiana de EdTech",
      "Podcast Ventaja",
    ],
    nota: "Conferencias, empresas, universidades y gremios. En Colombia, presencial o remoto.",
  },

  kit: {
    rotulo: "Kit del organizador",
    titulo: "Lo que necesitas para el programa",
    nota: "Sin formulario y sin pedirte nada a cambio. Copia y pega.",
    bioCortaT: "Bio corta",
    bioCortaNota: "Para el programa del evento.",
    bioCorta:
      "Salomón Muriel es emprendedor y consultor de tecnología en Bogotá. Va en su quinta empresa: dos las vendió, dos quebraron y la de hoy es Ignia, un modelo nuevo de educación superior. Antes dirigió datos y producto en R5, con unas cuarenta personas a cargo. Construye el software que las empresas necesitan, con sus propias manos.",
    bioLargaT: "Bio larga",
    bioLargaNota: "Para prensa o para presentar en tarima.",
    bioLarga:
      "Salomón Muriel tiene 35 años, vive en Bogotá y va en su quinta empresa. Fundó Finco, valoración inmobiliaria con datos e inteligencia artificial para Latinoamérica, vendida a RED Atlas; y PrestaGente, libranza entre personas, vendida a Taurus Capital y todavía operando. Otras dos quebraron: Beriblock y El Palomo. Como empleado dirigió unas cuarenta personas en R5, donde construyó el pipeline de datos y el sistema de modelación de riesgo. Hoy construye Ignia, un modelo nuevo de educación superior en Latinoamérica, y en paralelo tiene una práctica personal de consultoría: le construye software a la medida a empresas colombianas tradicionales. Aprendió a programar a las malas, con una fecha de entrega encima. Aprendió inglés jugando en línea. Es papá de mellizos, Franco y Luca, corrió una media maratón en 2:10 y publica un medidor de felicidad en su página. Su papá y su abuelo también fueron empresarios.",
    copiar: "Copiar",
    copiado: "Copiado",
    fotoT: "Foto",
    fotoNota:
      "800 × 800 px, JPG. Para el programa, la pantalla o la pieza de redes.",
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
    texto:
      "De eso depende si soy la persona indicada. Contesto yo, no un equipo comercial. Si prefieres hablarlo de una vez, agenda veinte minutos en mi calendario.",
    wa: "Invitarme a una charla",
    waTexto:
      "Hola Salomón, quiero invitarte a dar una charla. Te cuento de qué se trata, qué fecha tenemos y quién va a estar en el público.",
    agenda: "O agenda veinte minutos",
  },
} as const;

const en = {
  meta: {
    title: "Talks — Salomón Muriel, Bogotá",
    description:
      "Organiser kit: topics, formats, where I've spoken, short and long bio, photo and contact. Technology and AI adoption, entrepreneurship, mindset, and work-life balance.",
  },

  rotulo: "Appendix · Press material",
  nota: "Not a product. It's how people get to know me.",
  titulo: "Talks",
  manuscrita:
    "after an hour of hearing me you already know if you want to work with me",
  bajada:
    "Conferences, companies and universities have booked me. I go gladly, but they don't appear here with a price or with slots, because they aren't a service: they're the front door. One talk produces three conversations and out of those, with luck, comes one piece of work.",

  franqueza: {
    rotulo: "Said plainly",
    texto:
      "Talks are the marketing for everything else I do: the consulting, the mentoring and, when it's relevant, Ignia — the higher-education model I build Monday to Friday. I've never built a talk to sell something: I build it, I give it, and the people who write to me later come out of that. I'd rather say so before you ask.",
    condicion:
      "I get on stage on one condition: I talk about what I've done, not about what I've read.",
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
        d: "Five companies, two sold, two failed, and what each one cost me.",
        publico: "For universities and accelerator programmes.",
      },
      {
        n: "03",
        t: "Maker mindset",
        d: "Grit, curiosity, resilience and creativity. Building with what's at hand.",
        publico: "For students and teams that need to move something now.",
      },
      {
        n: "04",
        t: "Work and life without the pose",
        d: "Fifth company, four-year-old twins, a half marathon and a happiness meter published in public.",
        publico: "For corporate and talent events.",
      },
    ],
    noRotulo: "What I don't talk about",
    no: ["Technical data-science talks.", "Organisational-culture talks."],
    noNota:
      "I get asked often and I always say no. There are people who do them far better than me, and I'll happily pass on the contact.",
  },

  formatos: {
    rotulo: "Formats",
    titulo: "How I usually get invited",
    nota: "We fix the length around the event. I don't have a closed catalogue.",
    lista: [
      {
        t: "Talk",
        d: "An hour on stage with questions at the end. It's the format I'm asked for most.",
      },
      {
        t: "Workshop",
        d: "A hands-on session with the team, working on their own case rather than on an example.",
      },
      {
        t: "Panel or fireside",
        d: "With a moderator or other guests. It works better when the audience asks questions.",
      },
      {
        t: "Podcast or interview",
        d: "Recorded or live. The same thing I say on stage, without slides.",
      },
    ],
  },

  hechas: {
    rotulo: "Stage record",
    titulo: "Talks I've given",
    nota: "The four current ones come with material. The data ones are retired.",
    verVideo: "Watch the video",
    verPdf: "See the slides",
    verHtml: "See the deck",
    retiradasRotulo: "Retired",
    retiradasNota:
      "I gave them at the time and they went well, but I don't offer them any more: they're data science, and that door is closed.",
  },

  tarimas: {
    rotulo: "Where",
    titulo: "Where I've spoken",
    lista: [
      "ConfNodo",
      "EAFIT",
      "EIA",
      "Externado",
      "Universidad Católica",
      "Colombian EdTech Association",
      "Ventaja podcast",
    ],
    nota: "Conferences, companies, universities and trade associations. In Colombia, in person or remote.",
  },

  kit: {
    rotulo: "Organiser kit",
    titulo: "What you need for the programme",
    nota: "No form and nothing asked in return. Copy and paste.",
    bioCortaT: "Short bio",
    bioCortaNota: "For the event programme.",
    bioCorta:
      "Salomón Muriel is an entrepreneur and technology consultant based in Bogotá. He's on his fifth company: two were sold, two failed, and today's is Ignia, a new model for higher education. Before that he led data and product at R5, with around forty people reporting to him. He builds the software companies need, with his own hands.",
    bioLargaT: "Long bio",
    bioLargaNota: "For press or for a stage introduction.",
    bioLarga:
      "Salomón Muriel is 35, lives in Bogotá and is on his fifth company. He founded Finco, real-estate valuation with data and AI for Latin America, sold to RED Atlas; and PrestaGente, peer-to-peer payroll lending, sold to Taurus Capital and still operating. Two others failed: Beriblock and El Palomo. As an employee he led around forty people at R5, where he built the data pipeline and the risk-modelling system. Today he builds Ignia, a new model for higher education in Latin America, and alongside it runs a personal consulting practice: building custom software for traditional Colombian companies. He learned to code the hard way, with a deadline on top of him. He learned English playing games online. He's the father of twins, Franco and Luca, ran a half marathon in 2:10 and publishes a happiness meter on his site. His father and grandfather were business owners too.",
    copiar: "Copy",
    copiado: "Copied",
    fotoT: "Photo",
    fotoNota:
      "800 × 800 px, JPG. For the programme, the screen or a social card.",
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
    texto:
      "That's what decides whether I'm the right person. I answer, not a sales team. If you'd rather talk it through, book twenty minutes in my calendar.",
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
