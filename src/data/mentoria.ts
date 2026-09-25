import type { Lang } from "@i18n/ui";

const es = {
  meta: {
    title: "Mentoría uno a uno — Salomón Muriel",
    description:
      "Acompañamiento semanal, uno a uno, para el que está arrancando algo: negocio propio, fundación o startup. Tareas prácticas cada semana, revisadas la semana siguiente. Bogotá.",
  },

  rotulo: "Salida 02 · Acompañamiento",
  nota: "Uno a uno, cada semana.",
  titulo: "Mentoría, uno a uno",
  manuscrita: "cada semana, con tarea",
  bajada:
    "Para quien está arrancando algo y quiere que alguien le haga seguimiento cada semana. Nos vemos, sales con tareas concretas y en la siguiente sesión las revisamos.",

  ficha: {
    rotulo: "Ficha del servicio",
    filas: [
      ["Formato", "Uno a uno, conmigo. Videollamada."],
      ["Cadencia", "Una hora cada semana, con tarea práctica."],
      ["Entre sesiones", "WhatsApp abierto para lo que se atraviese."],
      ["Mínimo", "Tres meses."],
      ["Hasta hoy", "7 personas."],
      ["Idiomas", "Español e inglés."],
    ] as [string, string][],
  },

  comoFunciona: {
    rotulo: "Cómo funciona",
    titulo: "Así funciona una semana",
    pasos: [
      {
        n: "01",
        t: "La sesión",
        d: "Una hora, tú y yo. Sin temario: trabajamos sobre tu caso y lo que te tiene trancado hoy.",
      },
      {
        n: "02",
        t: "La lista",
        d: "Cada sesión termina con una lista de tareas concretas para la semana.",
      },
      {
        n: "03",
        t: "La semana",
        d: "Las haces tú. Si te trancas, me escribes.",
      },
      {
        n: "04",
        t: "La revisión",
        d: "La siguiente sesión arranca revisando esa lista. Si algo no se hizo, miramos por qué.",
      },
    ],
  },

  semana: {
    rotulo: "Lista de la semana",
    titulo: "Una semana cualquiera",
    texto: "Una semana real de mentoría, con los datos del negocio cambiados.",
    encabezado: "Lista — semana 3 de 12",
    responsable: "Responsable: tú",
    tareas: [
      "Llamar a cinco clientes que compraron una sola vez y preguntarles por qué no volvieron.",
      "Sacar el costo real de tu producto estrella, con mano de obra incluida.",
      "Escribir en una hoja qué se rompe primero si mañana vendes el triple.",
      "Poner el precio donde se vea. Sin «cotiza con nosotros».",
      "Mandarme el precio nuevo antes del jueves, así no esté perfecto.",
    ],
    pie: "0 de 5 hechas",
    pieNota: "Ninguna se marca sola.",
  },

  regla: {
    rotulo: "La única regla",
    aviso: "Importante",
    texto:
      "Si pasan dos semanas seguidas sin hacer las tareas, paramos. Sin resentimientos: sin tareas, la mentoría no funciona.",
  },

  paraQuien: {
    rotulo: "A quién le sirve",
    titulo: "Para el que está arrancando",
    si: {
      t: "Sí",
      items: [
        "Negocio propio que todavía no despega.",
        "Fundación u organización social.",
        "Startup en sus primeros meses.",
        "Alguien reinventándose profesionalmente y con algo que sacar adelante.",
      ],
    },
    no: {
      t: "No",
      items: [
        "El que busca que le digan que va bien.",
        "El que busca consejos sueltos, sin tareas.",
        "El que ya tiene una empresa que vende y lo que le duele es la operación. Eso es consultoría.",
      ],
    },
    remateA:
      "Si tu empresa ya vende y el problema es que la operación está pegada con una persona en la mitad, lo tuyo es ",
    remateEnlace: "la consultoría",
    remateB: ", no esto.",
  },

  ignia: {
    rotulo: "Antes de escribirme",
    titulo: "Si lo que buscas es un grupo, eso ya existe",
    texto:
      "Si prefieres aprender en grupo, con currículo y con gente en tu mismo momento, el Action Lab de Ignia te va a servir más.",
    remate: "Esto, en cambio, es uno a uno.",
    cta: "Ver el Action Lab de Ignia",
    url: "https://www.ignia.lat",
  },

  cupos: {
    rotulo: "Capacidad instalada",
    nota: "Números reales de hoy. Cuando se llenan, quito el botón.",
    ocupadas: "cupos de mentoría ocupados",
    ariaCupos: "%s de %t cupos de mentoría ocupados",
    explicacion:
      "Máximo %t a la vez, para poder revisar bien las tareas de cada uno.",
    actualizado: "Actualizado el",
    ctaUno: "Tomar el cupo que queda",
    ctaVarios: "Tomar uno de los %n que quedan",
    ctaWa:
      "Hola Salomón, estoy arrancando ___ y quiero preguntarte por la mentoría uno a uno.",
    sinCupo: "Sin cupo por ahora. Escríbeme y te aviso cuando se libere uno.",
  },

  preguntas: [
    {
      p: "¿Qué llevo a la primera sesión?",
      r: "Lo que estés construyendo y lo que te tiene trancado ahora mismo. No hace falta preparar nada.",
    },
    {
      p: "¿Esto es lo mismo que la consultoría?",
      r: "No. En la consultoría el trabajo lo hago yo: te construyo la herramienta. Acá el trabajo lo haces tú y yo reviso.",
    },
    {
      p: "¿Y si no alcanzo a hacer las tareas?",
      r: "Una semana pasa. Dos seguidas, paramos: sin tareas hechas, las sesiones no sirven de mucho.",
    },
    {
      p: "¿Sirve si lo mío es una fundación y no una empresa?",
      r: "Sí. De las siete personas que han pasado, hay emprendedores, fundadores de startup y gente de organizaciones sociales. La mecánica es la misma.",
    },
    {
      p: "¿De dónde sacas el tiempo?",
      r: "De lunes a viernes construyo Ignia, que es mi empresa. Tengo dos mellizos de cuatro años y no trabajo los domingos. Por eso el tope son cinco personas al tiempo.",
    },
  ],
} as const;

const en = {
  meta: {
    title: "One-to-one mentoring — Salomón Muriel",
    description:
      "Weekly one-to-one work for anyone starting something: their own business, a nonprofit or a startup. Practical assignments every week, reviewed the following week. Bogotá.",
  },

  rotulo: "Track 02 · Mentoring",
  nota: "One to one, every week.",
  titulo: "Mentoring, one to one",
  manuscrita: "every week, with homework",
  bajada:
    "For anyone starting something who wants someone following up every week. We meet, you leave with concrete assignments, and we review them in the next session.",

  ficha: {
    rotulo: "Service sheet",
    filas: [
      ["Format", "One to one, with me. Video call."],
      ["Cadence", "One hour a week, with a practical assignment."],
      ["Between sessions", "WhatsApp open for whatever comes up."],
      ["Minimum", "Three months."],
      ["So far", "7 people."],
      ["Languages", "Spanish and English."],
    ] as [string, string][],
  },

  comoFunciona: {
    rotulo: "How it works",
    titulo: "How a week works",
    pasos: [
      {
        n: "01",
        t: "The session",
        d: "One hour, you and me. No syllabus: we work on your case and whatever has you stuck today.",
      },
      {
        n: "02",
        t: "The list",
        d: "Every session ends with a list of concrete assignments for the week.",
      },
      {
        n: "03",
        t: "The week",
        d: "You do them. If you get stuck, message me.",
      },
      {
        n: "04",
        t: "The review",
        d: "The next session starts by reviewing that list. If something didn't get done, we look at why.",
      },
    ],
  },

  semana: {
    rotulo: "The week's list",
    titulo: "An ordinary week",
    texto: "A real week of mentoring, with the business details changed.",
    encabezado: "List — week 3 of 12",
    responsable: "Responsible: you",
    tareas: [
      "Call five customers who bought once and ask them why they didn't come back.",
      "Work out the real cost of your best-selling product, labour included.",
      "Write on one page what breaks first if you sell triple tomorrow.",
      "Put the price where it can be seen. No “request a quote”.",
      "Send me the new price before Thursday, even if it isn't perfect.",
    ],
    pie: "0 of 5 done",
    pieNota: "None of them ticks itself.",
  },

  regla: {
    rotulo: "The one rule",
    aviso: "Important",
    texto:
      "If two weeks go by without the assignments done, we stop. No hard feelings: without assignments, mentoring doesn't work.",
  },

  paraQuien: {
    rotulo: "Who it's for",
    titulo: "For whoever is starting out",
    si: {
      t: "Yes",
      items: [
        "Your own business, not off the ground yet.",
        "A foundation or social organisation.",
        "A startup in its first months.",
        "Someone reinventing themselves professionally with something to get moving.",
      ],
    },
    no: {
      t: "No",
      items: [
        "Anyone looking to be told they're doing well.",
        "Anyone looking for advice without assignments.",
        "Anyone whose company already sells and whose pain is the operation. That's consulting.",
      ],
    },
    remateA:
      "If your company already sells and the problem is that the operation is held together by a person in the middle, what you want is ",
    remateEnlace: "the consulting",
    remateB: ", not this.",
  },

  ignia: {
    rotulo: "Before you write to me",
    titulo: "If what you want is a group, that already exists",
    texto:
      "If you'd rather learn in a group, with a curriculum and people at your stage, Ignia's Action Lab will serve you better.",
    remate: "This, on the other hand, is one to one.",
    cta: "See Ignia's Action Lab",
    url: "https://www.ignia.lat",
  },

  cupos: {
    rotulo: "Installed capacity",
    nota: "Real numbers, today. When they fill up, I take the button down.",
    ocupadas: "mentoring slots taken",
    ariaCupos: "%s of %t mentoring slots taken",
    explicacion:
      "%t at a time at most, so I can review everyone's assignments properly.",
    actualizado: "Updated on",
    ctaUno: "Take the slot that's left",
    ctaVarios: "Take one of the %n that are left",
    ctaWa:
      "Hi Salomón, I'm starting ___ and I'd like to ask you about the one-to-one mentoring.",
    sinCupo:
      "No slots right now. Write to me and I'll let you know when one opens.",
  },

  preguntas: [
    {
      p: "What should I bring to the first session?",
      r: "What you're building and what has you stuck right now. No need to prepare anything.",
    },
    {
      p: "Is this the same as the consulting?",
      r: "No. In consulting I do the work: I build you the tool. Here you do the work and I review it.",
    },
    {
      p: "What if I don't get the assignments done?",
      r: "One week happens. Two in a row and we stop: without the assignments done, the sessions aren't much use.",
    },
    {
      p: "Does it work if mine is a nonprofit rather than a company?",
      r: "Yes. Of the seven people who've been through it, there are founders, startup founders and people from social organisations. The mechanics are the same.",
    },
    {
      p: "Where do you find the time?",
      r: "Monday to Friday I build Ignia, which is my company. I have four-year-old twins and I don't work Sundays. That's why the ceiling is five people at a time.",
    },
  ],
} as const;

export const mentoria = { es, en } as const;
export type CopiaMentoria = typeof es;

export function copiaMentoria(lang: Lang): CopiaMentoria {
  return (lang === "en" ? en : es) as unknown as CopiaMentoria;
}
