import type { Falla, Renglon, Sistema } from "./tipos";

export const en = {
  meta: {
    title: "Fixing the fake-automated · Salomón Muriel, Bogotá",
    description:
      "I build your company's operating system: the software that replaces the spreadsheets that don't match and the copy-paste, made to fit how you already work. Bogotá.",
  },

  cta: {
    cuestionario: "Tell me about your company",
    cuestionarioNota: "The questionnaire takes about two minutes.",
    wa: "Message me on WhatsApp",
    waTexto:
      "Hi Salomón, I run a ___ business and I'd like to tell you how it runs today.",
  },

  hero: {
    linea1: "We fix",
    linea2: "The fake-automated",
    manuscrita: "one box at a time, starting where it hurts most",
    bajada:
      "I build your company's operating system: the software that replaces the spreadsheets that don't match and the copy-paste, made to fit how you already work.",
    dicc: {
      palabra: "chi·no·má·ti·co, ca",
      categoria: "adj. · Colombian Spanish",
      acepciones: [
        "Said of a process: it <b class='font-bold'>looks</b> automated, but there's someone doing it by hand.",
        "Said of two systems: they don't talk to each other, and someone glues them together by copying and pasting.",
        "Said of a program: the very expensive one nobody opens any more.",
        "Said of a company: yours, probably.",
      ],
    },
    especificacion: "For companies of 5 to 40 people that already sell",
    fichaAlt:
      "Portrait of Salomón Muriel, in a green coat with folded arms, against a dark background",
    ficha: [
      ["Who takes the call", "Salomón", false],
      ["Where", "Bogotá", false],
      ["Own companies", "Five, two sold", false],
      ["Who programs", "Same person", true],
    ] as [string, string, boolean][],
    fichaPie: "If you message me on WhatsApp, I'm the one who replies.",
  },

  cinta: [
    "An operating system for a bridal shop",
    "A CRM for a schools platform",
    "Meeting minutes families sign from their phone",
    "WhatsApp reminders that go out on their own",
    "An agency's whole operation in one place",
  ],

  clientes: {
    rotulo: "I've built technology for",
  },

  danos: {
    rotulo: "Fault log",
    nota: "They repeat across companies that have nothing in common.",
    titulo: "The faults I see most",
    etiqueta: "Fault",
    cierre:
      "If none of this sounds familiar, I'm probably not the right person.",
    ctaTexto:
      "If it feels like the company is still in the stone age, tell me how it runs today.",
    fallas: [
      {
        n: "01",
        quien: "Reported by the owner",
        antes: "There are ",
        marcado: "twenty spreadsheets",
        despues: " and none of them match.",
        nota: "and when they disagree, whoever talks loudest in the meeting wins",
        manuscrita: true,
        giro: "-rotate-[.8deg]",
      },
      {
        n: "02",
        quien: "Reported by whoever does it",
        antes: "People spend the day ",
        marcado: "copying and pasting",
        despues: " from one place to another.",
        nota: "the little boxes aren't connected, and the one who suffers is the one typing",
        manuscrita: true,
        giro: "rotate-[.6deg]",
      },
      {
        n: "03",
        quien: "Reported by sales",
        antes: "Orders arrive on WhatsApp and ",
        marcado: "get lost in the chat",
        despues: ".",
        nota: "Or someone copies them into a spreadsheet at the end of the day.",
        manuscrita: false,
      },
      {
        n: "04",
        quien: "Reported by accounting",
        antes: "To find out how much you sold yesterday, ",
        marcado: "you have to ask someone",
        despues: ".",
        nota: "The number lives in three places and each one says something different.",
        manuscrita: false,
      },
      {
        n: "05",
        quien: "Reported too late",
        antes: "If that person quits, ",
        marcado: "the process walks out with them",
        despues: ".",
        nota: "and whoever comes next learns it by word of mouth",
        manuscrita: true,
        giro: "-rotate-[1deg]",
      },
    ] as Falla[],
  },

  cajitas: {
    rotulo: "How I explain my work",
    nota: "It's the idea I work with.",
    titulo: "A company is a system of little boxes",
    p1: "Marketing sends traffic to the website and to WhatsApp. That produces leads for sales. Sales feeds information back to marketing and opens up work for operations and admin. Each of those is a little box, and each box has its own system.",
    p2: "<b class='font-semibold text-tinta'>I build those boxes and connect them.</b> The CRM your sales process needs, the system operations works in, admin's invoicing: I build whichever one is missing, made to fit how you already work, and I leave it connected to the rest.",
    estadoSistema: "System state",
    btnHoy: "As it is today",
    btnQueda: "As it ends up",
    leyendaManual: "Manual step",
    leyendaConectado: "Connected",
    cajas: {
      mercadeo: {
        titulo: "Marketing",
        rotulo: "Whatever the channel",
        hoy: "A campaign manager on one side and a spreadsheet on the other.",
        queda:
          "The same campaign manager. Now it actually knows which campaign brought the sale.",
        orden: "5th",
      },
      web: {
        titulo: "Website",
        rotulo: "The site",
        hoy: "A separate system, from another vendor, that emails someone.",
        queda:
          "Still your website. What comes in through it lands where it should.",
        orden: "4th",
      },
      chat: {
        titulo: "WhatsApp",
        rotulo: "The chat",
        hoy: "One person's phone. If that person isn't around, nobody is.",
        queda:
          "What's said in the chat is recorded without anyone transcribing it.",
        orden: "4th",
      },
      ventas: {
        titulo: "Sales",
        rotulo: "The leads",
        hoy: "An expensive CRM that's half used, because filling it in is double work.",
        queda:
          "The CRM I build for your sales process. Filling it in stopped being extra work.",
        orden: "1st",
      },
      ops: {
        titulo: "Operations",
        rotulo: "The work",
        hoy: "A spreadsheet only one person understands.",
        queda:
          "The operations system I build you. The work opens by itself when the sale closes.",
        orden: "2nd",
      },
      opsdos: {
        titulo: "Operations",
        titulo2: "(the other one)",
        rotuloHoy: "Two boxes for the same work",
        rotuloQueda: "No longer needed",
        hoy: "The Notion someone set up, with data from eight months ago. And they have to fill in both.",
        queda:
          "The work lives in one. Whatever was worth keeping moved across before it was switched off.",
        orden: "Switched off",
      },
      admin: {
        titulo: "Admin",
        rotulo: "Invoicing and paperwork",
        hoy: "Another spreadsheet. And the invoice is made by hand, one at a time.",
        queda:
          "The invoice comes out of the sale by itself, data already in it.",
        orden: "3rd",
      },
    },
    enlaces: {
      mercadeoWeb: ["The form emails someone", "The lead comes in by itself"],
      mercadeoChat: [
        "The campaign sends people to the chat and there it stays",
        "The chat leaves the lead inside too",
      ],
      webVentas: [
        "Someone copies the email into the CRM",
        "Nobody copies anything",
      ],
      chatVentas: [
        "Someone transcribes the conversation",
        "Nobody transcribes",
      ],
      ventasOps: [
        "Word goes out on an internal chat",
        "The sale opens the work by itself",
      ],
      opsOpsdos: ["The same data, all over again", ""],
      ventasAdmin: [
        "The invoice is made by hand",
        "The invoice comes out by itself",
      ],
      retorno: [
        "Nobody feeds the data back",
        "Every sale tells marketing where it came from",
      ],
    },
    retornoMovil: "And back to marketing:",
    retornoMovilHoy:
      "today nobody feeds the data back, so marketing doesn't know which campaign brought the sale.",
    retornoMovilQueda: "every sale tells marketing where it came from.",
    verdadNoRotulo: "Three versions of the same number",
    verdadNo:
      "None of them agree, and to find out which one is right you have to ask someone.",
    verdadSiRotulo: "The data in one place",
    verdadSi:
      "When someone asks how much was sold yesterday, everyone looks at the same number.",
    cierreTitulo:
      "I build the box and leave it connected <b class='text-rojo2'>before</b> moving to the next one.",
    cierreP1:
      "The fake-automated part shows up in the middle: someone takes data out of one box and puts it into the next, every day. Once the connection is made, that person stops copying and pasting and goes back to the work you hired them for.",
    cierreP2:
      "In “as it ends up”, the red numbers are the order of a typical case. In yours, we start where it hurts most.",
    cierreManuscrita:
      "if two boxes are held together by a person in the middle, they're chinomáticas",
    ctaTexto: "Tell me which of these boxes hurts the most.",
  },

  sistemas: {
    rotulo: "Work delivered",
    nota: "These systems are already running. The screens show test data.",
    titulo: "Systems I've already built for other companies",
    bajada:
      "Nearly all of them ran on spreadsheets, WhatsApp and someone copying and pasting.",
    reemplazo: "Replaced",
    items: [
      {
        clave: "aura",
        sector: "Bridal shop",
        nombre: "Aura Novias",
        que: "Its operating system: the appointment book, the dress inventory, contracts, payments and the WhatsApp messages to each bride.",
        reemplazo:
          "the booking tool, the dress spreadsheets, the paper bride book and the messages typed by hand.",
        alt: "Aura OS screen with the day's appointments and the dresses to move",
      },
      {
        clave: "guiacolegio",
        sector: "Schools platform",
        nombre: "Guía Colegio",
        que: "A CRM built around how they sell: from first contact to close, with the day's tasks and where each school came from.",
        reemplazo: "Kommo, the emails and the team's memory.",
        alt: "Guía Colegio's CRM sales board with schools by stage",
      },
      {
        clave: "visible",
        sector: "Personal branding agency · being built",
        nombre: "Visible",
        que: "Its operating system, which I'm building now: every client, every deliverable and every approval in one place, with a portal for the client.",
        alt: "Visible's client portal on a phone, with cycle progress and posts to approve",
      },
      {
        clave: "colegio",
        sector: "School",
        nombre: "Communications and minutes",
        que: "Meetings with families are recorded, AI writes the draft minutes and the family signs them from their phone. The school's emails turn into the week's plan.",
        reemplazo: "minutes written by hand.",
        alt: "Draft minutes of a meeting with a family, written by AI and ready to review",
      },
      {
        clave: "ignia",
        sector: "Education",
        nombre: "Ignia",
        que: "The admissions CRM, with an assistant that confirms and reminds people of their appointments on WhatsApp, and the system we use to follow each fellow.",
        alt: "Opportunities board in Ignia's CRM",
      },
    ] as Sistema[],
  },

  banda: {
    titulo: "I can build your company its operating system too.",
    texto: "Tell me how it runs today and I'll tell you where I'd start.",
  },

  porque: {
    rotulo: "Differential diagnosis",
    nota: "Compared with an agency or an off-the-shelf program.",
    titulo: "How I work",
    razones: [
      {
        giro: "-rotate-[5deg]",
        titulo: "One person.",
        parrafos: [
          "I do both the strategy and the software. There's no consultant handing over a deck and a vendor interpreting it their own way. <b class='font-semibold text-tinta'>What we decide on Monday, I start building on Tuesday.</b>",
        ],
        manuscrita:
          "the person who listens on the first call is the one who codes",
        giroNota: "-rotate-[1deg]",
      },
      {
        giro: "rotate-[4deg]",
        titulo: "Custom software, in weeks.",
        parrafos: [
          "I code with AI agents instead of subcontracting, which lets me build fast.",
          "I also <b class='font-semibold text-tinta'>teach your people to use them</b> for the office work they do by hand today.",
        ],
        manuscrita: "this changed a lot in the last two years",
        giroNota: "rotate-[1deg]",
      },
      {
        giro: "-rotate-[3deg]",
        titulo: "The software fits your company.",
        parrafos: [
          "The usual approach is to buy a program built for another company and make your people adapt. I start by looking at how the work gets done today and build on that, which is why people actually use it.",
        ],
        manuscrita:
          "in the first week I sit down with whoever is going to use it",
        giroNota: "-rotate-[1deg]",
      },
    ],
  },

  programa: {
    rotulo: "Works schedule · 16 weeks",
    nota: "From the first conversation to your team using it.",
    titulo: "What happens if we work together",
    barras: ["Understand", "Diagnosis", "Build · one box at a time"],
    etapas: [
      {
        cuando: "Weeks 1 to 2",
        titulo: "Understand the operation",
        texto:
          "I talk to the people who run it, not just to you, and I watch how it's really done.",
      },
      {
        cuando: "Weeks 2 to 3",
        titulo: "Diagnosis",
        texto:
          "I hand you a short plan with the bottleneck worth tackling first, and one first thing already working.",
      },
      {
        cuando: "Weeks 4 to 16",
        titulo: "Build",
        texto:
          "I build the system and the connections between boxes, until your team is using it.",
      },
    ],
    garantiaRotulo: "Week three",
    garantia:
      "By then you already have something working. If it isn't useful to you, we stop there.",
  },

  entrega: {
    rotulo: "Packing list",
    nota: "What you get at the end of the project.",
    titulo: "What you're left with when I'm done",
    bajada: "In the end you don't depend on me to use it or to change it.",
    cajaTitulo: "In the box",
    cajaConteo: "04 lines",
    renglones: [
      {
        n: "01",
        t: "The system running, with your real data",
        d: "And your people already using it, with a recording of the training for whoever joins later.",
        resaltado: false,
      },
      {
        n: "02",
        t: "Everything in your company's name",
        d: "The code, the accounts, the passwords and the access. There's no monthly per-seat fee, and if tomorrow you want to work with someone else, you take all of it with you.",
        resaltado: true,
      },
      {
        n: "03",
        t: "How to change it without me",
        d: "I teach you and your team to make changes with AI. You don't have to call me to move a button.",
        resaltado: true,
      },
      {
        n: "04",
        t: "The time measured, and my WhatsApp",
        d: "We time the process going in and coming out, and I hand you the number. There are two reviews, at one month and at two, and you write to me directly.",
        resaltado: false,
      },
    ] as Renglon[],
    menudaTitulo: "What's not included",
    menudaAviso: "Important",
    menuda:
      "I <b class='font-bold'>don't</b> change the whole company: it's one process at a time. I don't build technology teams or sell licences. And if what you need already exists and works, I'll tell you instead of building it.",
    manuscrita:
      "once the first process is up and running, we'll talk about the second",
    tampocoTitulo: "I also don't do",
    tampoco: [
      "Scaling companies that are already large.",
      "Research or developing new technology.",
      "Long reports for the board.",
    ],
  },

  antes: {
    rotulo: "Track record",
    nota: "Including the ones that didn't work.",
    titulo: "Before this, I started my own companies",
    enlace: "The full story, on the about page",
  },

  montado: {
    rotulo: "Track record",
    nota: "Including the ones that didn't work.",
    titulo: "What I've built",
    pieFoto: "The valuation tool I'm showing there is one we built ourselves.",
    fotoAlt:
      "Salomón Muriel showing the Finco platform at a trade fair, next to a teammate",
    empresas: [
      {
        clave: "ignia",
        nombre: "Ignia",
        cuando: "Today",
        texto:
          "A new model for higher education. I built its website, the system the courses run on, the CRM and the community portal.",
      },
      {
        clave: "finco",
        nombre: "Finco",
        cuando: "2019 to 2022",
        texto:
          "Real-estate valuation with data and AI for all of Latin America. A hundred thousand reports a year.",
        remate: "Sold to RED Atlas.",
        remateRojo: false,
      },
      {
        clave: "prestagente",
        nombre: "PrestaGente",
        cuando: "2017 to 2019",
        texto: "Peer-to-peer payroll lending.",
        remate: "Sold to Taurus Capital",
        cola: " and it still runs, without me.",
        remateRojo: false,
      },
      {
        clave: "beriblock",
        nombre: "Beriblock",
        cuando: "2018 to 2019",
        texto: "Promissory-note authentication with blockchain.",
        remate: "Went under.",
        cola: " The technology worked; the market didn't exist.",
        remateRojo: true,
      },
      {
        clave: "elpalomo",
        nombre: "El Palomo",
        cuando: "2016 to 2017",
        texto: "Flowers by subscription.",
        remate: "Failed.",
        cola: " Happy to tell you the story.",
        remateRojo: true,
      },
      {
        clave: "r5",
        nombre: "R5",
        cuando: "As an employee",
        texto:
          "I led around forty people. I built the entire data pipeline and the risk-modelling system.",
      },
    ],
    cierre2: "My father and my grandfather were business owners too.",
  },

  voces: {
    rotulo: "What they say",
    nota: "Owners on what changed.",
    titulo: "What the people I've worked with say",
  },
} as const;
