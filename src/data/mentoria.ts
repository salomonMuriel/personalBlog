/**
 * Copia de /mentoria. El español sale de las exploraciones de diseño donde
 * el cliente ya escribió esta oferta (direcciones 1–4, 9, 10, 21–34); no se
 * inventa nada acá.
 *
 * Dos reglas duras que esta página no puede romper:
 *  · Nunca un precio, en ninguna forma.
 *  · La mentoría no compite con el Action Lab de Ignia. Cuando alguien
 *    busca cohorte y currículo, se le manda para allá.
 */
import type { Lang } from "@i18n/ui";

const es = {
  meta: {
    title: "Mentoría uno a uno — Salomón Muriel",
    description:
      "Acompañamiento semanal, uno a uno, para el que está arrancando algo: negocio propio, fundación o startup. Tareas prácticas cada semana, revisadas la semana siguiente. Bogotá.",
  },

  rotulo: "Salida 02 · Acompañamiento",
  nota: "Uno a uno, semanal. No es un café ni una charla de motivación.",
  titulo: "Mentoría, uno a uno",
  manuscrita:
    "trabajar conmigo significa que las cosas pasan, así toque a las malas",
  bajada:
    "Para el que está arrancando y necesita que alguien lo empuje todas las semanas. Nos vemos, usted sale con una tarea, y a la siguiente revisamos si la hizo. Si no la hizo, hablamos de por qué no la hizo. Ahí suele estar el negocio de verdad.",

  ficha: {
    rotulo: "Ficha del servicio",
    filas: [
      ["Formato", "Uno a uno, conmigo. Videollamada."],
      ["Cadencia", "Una hora cada semana, con tarea práctica."],
      ["Entre sesiones", "WhatsApp abierto para lo que se atraviese."],
      ["Mínimo", "Tres meses, para que no se vuelva terapia."],
      ["Hasta hoy", "7 personas. Es un número pequeño y así lo digo."],
      ["Idiomas", "Español e inglés."],
    ] as [string, string][],
  },

  comoFunciona: {
    rotulo: "Cómo funciona",
    titulo: "Una semana, y la siguiente arranca revisándola",
    pasos: [
      {
        n: "01",
        t: "La sesión",
        d: "Una hora, usted y yo. No hay clase, no hay grupo y no hay currículo: la conversación sale de su caso y de dónde está trancado hoy.",
      },
      {
        n: "02",
        t: "La lista",
        d: "Cada sesión termina con una lista escrita de tareas para esa semana. Concretas, con fecha, no consejos.",
      },
      {
        n: "03",
        t: "La semana",
        d: "Las hace usted. Yo estoy en el chat para desatascar, no para hacerlas.",
      },
      {
        n: "04",
        t: "La revisión",
        d: "La siguiente sesión arranca revisando esa lista, en vez de conversando. Si no hizo la tarea, hablamos de por qué no la hizo.",
      },
    ],
  },

  semana: {
    rotulo: "Lista de la semana",
    titulo: "Una semana cualquiera",
    texto:
      "Una semana real de mentoría, con los datos del negocio cambiados. Las tareas salen del caso, no de un temario.",
    encabezado: "Lista — semana 3 de 12",
    responsable: "Responsable: usted",
    tareas: [
      "Llamar a cinco clientes que compraron una sola vez y preguntarles por qué no volvieron.",
      "Sacar el costo real de su producto estrella, con mano de obra incluida.",
      "Escribir en una hoja qué se rompe primero si mañana vende el triple.",
      "Poner el precio donde se vea. Sin «cotice con nosotros».",
      "Mandarme el precio nuevo antes del jueves, así no esté perfecto.",
    ],
    pie: "0 de 5 hechas",
    pieNota: "Ninguna se marca sola. Esa es toda la diferencia.",
  },

  regla: {
    rotulo: "La regla, en grande",
    aviso: "Léala ahora",
    texto:
      "Si dos semanas seguidas no hizo las tareas, paramos. Sin resentimientos, pero paramos. Lo escribo acá y no en la letra menuda porque es la regla que hace que esto funcione, y porque prefiero que la lea antes de escribirme.",
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
        "El que quiere que le digan que va muy bien. No soy yo.",
        "El que busca un café y buenos consejos.",
        "El que ya tiene una empresa que vende y lo que le duele es la operación. Eso es consultoría.",
      ],
    },
    remateA:
      "Si su empresa ya vende y el problema es que la operación está pegada con una persona en la mitad, lo suyo es ",
    remateEnlace: "la consultoría",
    remateB: ", no esto.",
  },

  ignia: {
    rotulo: "Antes de escribirme",
    titulo: "Si lo que busca es un grupo, eso ya existe",
    texto:
      "Si lo que busca es aprender en grupo, con estructura, con currículo y con gente que está exactamente en su mismo momento, eso es el Action Lab de Ignia y probablemente le sirva más que yo. Le dejo el enlace de una vez.",
    remate: "Acá somos usted y yo, cada semana, y nada más.",
    cta: "Ver el Action Lab de Ignia",
    url: "https://www.ignia.lat",
  },

  cupos: {
    rotulo: "Capacidad instalada",
    nota: "Números reales de hoy. Cuando se llenan, quito el botón.",
    ocupadas: "cupos de mentoría ocupados",
    ariaCupos: "%s de %t cupos de mentoría ocupados",
    explicacion:
      "Máximo %t al tiempo. Más de ahí ya no alcanzo a revisar tareas, y revisarlas es el trabajo.",
    actualizado: "Actualizado el",
    ctaUno: "Tomar el cupo que queda",
    ctaVarios: "Tomar uno de los %n que quedan",
    ctaWa:
      "Hola Salomón, estoy arrancando ___ y quiero preguntarle por la mentoría uno a uno.",
    sinCupo:
      "Sin cupo por ahora. No hay lista de espera: escríbame y le aviso cuando se libere uno.",
    plata: "Sin costo por escribirme. Del precio hablamos solo si arrancamos.",
  },

  preguntas: [
    {
      p: "¿Qué le llevo a la primera sesión?",
      r: "Lo que esté construyendo y lo que lo tiene trancado ahora mismo. Nada preparado, nada bonito. Si le cuesta escribir en qué está trancado, ya sabemos por dónde arrancar.",
    },
    {
      p: "¿Esto es lo mismo que la consultoría?",
      r: "No. En la consultoría el trabajo lo hago yo: le construyo la herramienta. Acá el trabajo lo hace usted y yo reviso. Esa es toda la diferencia.",
    },
    {
      p: "¿Y si no alcanzo a hacer las tareas?",
      r: "Una semana pasa. Dos seguidas, paramos. No es castigo: es que sin tareas hechas la sesión se vuelve una conversación agradable y eso no le sirve a nadie.",
    },
    {
      p: "¿Sirve si lo mío es una fundación y no una empresa?",
      r: "Sí. De las siete personas que han pasado, hay emprendedores, fundadores de startup y gente de organizaciones sociales. La mecánica es la misma.",
    },
    {
      p: "¿De dónde saca el tiempo?",
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
  nota: "One to one, weekly. It isn't a coffee and it isn't a pep talk.",
  titulo: "Mentoring, one to one",
  manuscrita: "working with me means things happen, even the hard way",
  bajada:
    "For whoever is starting out and needs someone pushing them every week. We meet, you leave with an assignment, and next time we check whether you did it. If you didn't, we talk about why you didn't. That's usually where the real business is.",

  ficha: {
    rotulo: "Service sheet",
    filas: [
      ["Format", "One to one, with me. Video call."],
      ["Cadence", "One hour a week, with a practical assignment."],
      ["Between sessions", "WhatsApp open for whatever comes up."],
      ["Minimum", "Three months, so it doesn't turn into therapy."],
      ["So far", "7 people. It's a small number and I say so."],
      ["Languages", "Spanish and English."],
    ] as [string, string][],
  },

  comoFunciona: {
    rotulo: "How it works",
    titulo: "One week, and the next one starts by reviewing it",
    pasos: [
      {
        n: "01",
        t: "The session",
        d: "One hour, you and me. No class, no group and no curriculum: the conversation comes out of your case and wherever you're stuck today.",
      },
      {
        n: "02",
        t: "The list",
        d: "Every session ends with a written list of assignments for that week. Concrete, with a date, not advice.",
      },
      {
        n: "03",
        t: "The week",
        d: "You do them. I'm in the chat to unstick you, not to do them for you.",
      },
      {
        n: "04",
        t: "The review",
        d: "The next session starts by going through that list instead of chatting. If you didn't do it, we talk about why.",
      },
    ],
  },

  semana: {
    rotulo: "The week's list",
    titulo: "An ordinary week",
    texto:
      "A real week of mentoring, with the business details changed. The assignments come out of the case, not out of a syllabus.",
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
    pieNota: "None of them ticks itself. That's the whole difference.",
  },

  regla: {
    rotulo: "The rule, in large type",
    aviso: "Read it now",
    texto:
      "If you don't do the assignments two weeks running, we stop. No hard feelings, but we stop. I write it here and not in the small print because it's the rule that makes this work, and because I'd rather you read it before writing to me.",
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
        "Anyone who wants to be told they're doing great. That isn't me.",
        "Anyone looking for a coffee and good advice.",
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
      "If what you're after is learning in a group, with structure, a curriculum and people at exactly your stage, that's Ignia's Action Lab and it will probably serve you better than I would. Here's the link straight away.",
    remate: "Here it's you and me, every week, and nothing else.",
    cta: "See Ignia's Action Lab",
    url: "https://www.ignia.lat",
  },

  cupos: {
    rotulo: "Installed capacity",
    nota: "Real numbers, today. When they fill up, I take the button down.",
    ocupadas: "mentoring slots taken",
    ariaCupos: "%s of %t mentoring slots taken",
    explicacion:
      "%t at a time at most. Beyond that I can't keep up with reviewing assignments, and reviewing them is the job.",
    actualizado: "Updated on",
    ctaUno: "Take the slot that's left",
    ctaVarios: "Take one of the %n that are left",
    ctaWa:
      "Hi Salomón, I'm starting ___ and I'd like to ask you about the one-to-one mentoring.",
    sinCupo:
      "No slots right now. There's no waiting list: write to me and I'll let you know when one opens.",
    plata:
      "It costs nothing to write to me. We only talk about price if we start.",
  },

  preguntas: [
    {
      p: "What should I bring to the first session?",
      r: "What you're building and what has you stuck right now. Nothing prepared, nothing polished. If it's hard to write down what you're stuck on, we already know where to start.",
    },
    {
      p: "Is this the same as the consulting?",
      r: "No. In consulting I do the work: I build you the tool. Here you do the work and I review it. That's the whole difference.",
    },
    {
      p: "What if I don't get the assignments done?",
      r: "One week happens. Two in a row and we stop. It isn't a punishment: without assignments done the session turns into a pleasant conversation, and that's no use to anyone.",
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
