import type { Columna, Falla, Nodo, Sistema } from "./tipos";

export const en = {
  meta: {
    title: "Fixing the fake-automated · Salomón Muriel, Bogotá",
    description:
      "I build your company its operating system: the software that replaces the spreadsheets that don't match and the copying and pasting, made to fit how you already work. Bogotá.",
  },

  cta: {
    cuestionario: "Tell me about your company",
    cuestionarioNota: "",
    wa: "Message me on WhatsApp",
    waTexto:
      "Hi Salomón, my name is ______ and I run a ______ business. I want to fix what's fake-automated in it.",
  },

  hero: {
    linea1: "We fix",
    linea2: "The fake-automated",
    manuscrita: "I go box by box, from the one that hurts most",
    bajada:
      "I build your company its operating system: the software that replaces the spreadsheets that don't match and the copying and pasting, made to fit how you already work.",
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
      ["Where", "Bogotá", false],
      ["Own companies", "Five, two sold", false],
    ] as [string, string, boolean][],
  },

  clientes: {
    rotulo: "I've built technology for",
  },

  danos: {
    rotulo: "Fault log",
    nota: "",
    titulo: "The problems I hear about most",
    etiqueta: "Fault",
    cierre:
      "If none of this sounds familiar, I'm probably not the right person.",
    ctaTexto:
      "If your company is still in the stone age, tell me how it runs today.",
    fallas: [
      {
        n: "01",
        titulo: "The spreadsheets don't match",
        texto:
          "There are twenty spreadsheets nobody keeps up to date, and each one says something different.",
        nota: "and when they disagree, whoever talks loudest in the meeting wins",
        imagen: "torre-excel",
        alt: "A tower of binders and spreadsheets about to topple",
      },
      {
        n: "02",
        titulo: "Orders get lost in the chat",
        texto:
          "They arrive on WhatsApp and someone copies them into a spreadsheet at the end of the day.",
        nota: "and if someone forgets to copy one, the customer is left waiting",
        imagen: "chat-pedidos",
        alt: "A phone full of WhatsApp messages surrounded by boxes and invoices",
      },
      {
        n: "03",
        titulo: "We're still in the stone age",
        texto:
          "To find out what sold yesterday you have to ask someone, and if that person quits, the process leaves with them.",
        nota: "and whoever comes next learns it by word of mouth",
        imagen: "tabla-piedra",
        alt: "A spreadsheet carved into a stone tablet on a desk",
      },
    ] as Falla[],
  },

  cajitas: {
    rotulo: "How I explain my work",
    nota: "",
    titulo: "A company is a system of little boxes",
    texto:
      "Marketing brings people to the website and to WhatsApp, those people reach sales, and every sale opens work for operations and an invoice for admin. In most companies each box has its own spreadsheet or its own program, and someone moves the data from one to the next by hand.",
    texto2:
      "<b class='font-semibold text-tinta'>Once the boxes are connected, your company has its operating system.</b> Information goes in once and reaches wherever it needs to on its own. I build the missing box and leave it connected before moving to the next one.",
    marco: "Operating system",
    alt: "Marketing leads to the website and to WhatsApp, both feed sales, and sales opens work for operations and an invoice for admin. All of it sits inside the company's operating system.",
    nodos: {
      mercadeo: { titulo: "Marketing", sub: "Campaigns" },
      web: { titulo: "Website", sub: "Forms" },
      chat: { titulo: "WhatsApp", sub: "Conversations" },
      ventas: { titulo: "Sales", sub: "CRM" },
      ops: { titulo: "Operations", sub: "Orders" },
      admin: { titulo: "Admin", sub: "Invoices" },
    } as Record<string, Nodo>,
    manuscrita:
      "if two boxes are held together by a person in the middle, they're chinomáticas",
    ctaTexto: "Tell me which of these boxes hurts the most.",
  },

  sistemas: {
    rotulo: "Work delivered",
    nota: "All of these systems are in use except Visible, which is being built. The screens show test data.",
    titulo: "Operating systems I've built",
    bajada:
      "Most of these companies ran on Excel and WhatsApp, with someone copying and pasting from one to the other.",
    reemplazo: "Replaced",
    items: [
      {
        clave: "aura",
        sector: "Bridal shop",
        nombre: "Aura Novias",
        que: "Its operating system keeps the appointment book, the dress inventory, contracts, payments and the WhatsApp messages to each bride.",
        reemplazo:
          "the booking tool, the dress spreadsheets, the paper bride book and the messages that were sent by hand.",
        alt: "The day's appointments in Aura OS with their payment status, and a column of pending items with unreturned dresses and overdue balances",
      },
      {
        clave: "guiacolegio",
        sector: "Schools platform",
        nombre: "Guía Colegio",
        que: "A CRM built for how they sell, from first contact to close, and a panel where each school sees the families that come to it.",
        reemplazo:
          "Kommo and the follow-up the team kept by email and from memory.",
        alt: "Sales board in Guía Colegio's CRM, with schools by stage",
      },
      {
        clave: "visible",
        sector: "Personal branding agency · being built",
        nombre: "Visible",
        que: "Its operating system will bring together clients, deliverables and approvals, and each client will have their own portal.",
        alt: "Proposed design for Visible's client portal on a phone, with cycle progress and posts to approve",
      },
      {
        clave: "colegio",
        sector: "School",
        nombre: "Communications and minutes",
        que: "Meetings with families are recorded, AI writes the draft minutes and the family signs them from their phone. The system also turns the school's emails into each family's plan for the week.",
        reemplazo: "minutes written by hand.",
        alt: "Draft minutes of a meeting with a family, written by AI and ready to review",
      },
      {
        clave: "ignia",
        sector: "Education",
        nombre: "Ignia",
        que: "Its admissions system starts with a diagnosis each applicant fills in. After that, each case is followed in a CRM that confirms appointments and sends reminders over WhatsApp.",
        alt: "Board in Ignia's admissions CRM, with opportunities by stage",
      },
    ] as Sistema[],
  },

  banda: {
    titulo: "I can build your company its own operating system too.",
    texto: "Tell me how it runs today and I'll tell you where I'd start.",
  },

  porque: {
    rotulo: "Differential diagnosis",
    nota: "Compared with an agency or a program off the shelf.",
    titulo: "How I work",
    razones: [
      {
        giro: "-rotate-[5deg]",
        titulo: "A single operating system.",
        parrafos: [
          "Many companies buy one program per area and end up with ten that don't talk to each other. I build a system that connects the programs that work and replaces the ones that aren't needed.",
        ],
        manuscrita: "",
        giroNota: "-rotate-[1deg]",
      },
      {
        giro: "rotate-[4deg]",
        titulo: "I build with AI.",
        parrafos: [
          "I use AI agents to write the code, which lets me deliver a custom system in weeks.",
          "I also <b class='font-semibold text-tinta'>teach your people to use them</b> for the office work they do by hand today.",
        ],
        manuscrita: "this changed a lot in the last two years",
        giroNota: "rotate-[1deg]",
      },
      {
        giro: "-rotate-[3deg]",
        titulo: "The system fits your company.",
        parrafos: [
          "A program you buy was made for another company, and your people have to adapt to it. I start by looking at how the work gets done today and build on that. That's why people actually use it.",
        ],
        manuscrita:
          "in the first week I sit down with whoever is going to use it",
        giroNota: "-rotate-[1deg]",
      },
    ],
  },

  programa: {
    rotulo: "Works schedule",
    nota: "From the first conversation to your team using it.",
    titulo: "A 16-week project",
    etapas: [
      {
        cuando: "Weeks 1 and 2",
        titulo: "Understand the operation",
        texto: "I talk to you and to the people who do the work.",
      },
      {
        cuando: "Weeks 2 and 3",
        titulo: "Diagnosis",
        texto: "I tell you what to tackle first and hand you a working piece.",
      },
      {
        cuando: "Weeks 4 to 16",
        titulo: "Build",
        texto:
          "I put the operating system together box by box, until your team uses it without me.",
      },
    ],
    garantiaRotulo: "Week three",
    garantia:
      "If what I hand you in week three isn't useful to you, we stop there.",
    alt: "A crane sets a new box down next to others that are already connected",
  },

  entrega: {
    rotulo: "Packing list",
    nota: "",
    titulo: "What you take with you when I'm done",
    bajada: "",
    alt: "An open box with a laptop and a manual, next to a key ring and an open padlock",
    columnas: [
      {
        t: "Your operating system, running",
        d: "With your real data, your people already using it and the training recorded for whoever joins later.",
      },
      {
        t: "Everything in your name",
        d: "The code, the accounts and the access belong to your company, and there's no monthly per-seat fee.",
      },
      {
        t: "How to change it without me",
        d: "I teach you and your team to make changes with AI.",
      },
      {
        t: "The time, measured",
        d: "We time the process before and after, and review it at one month and at two.",
      },
    ] as Columna[],
    noIncluye:
      "<b class='font-semibold text-tinta'>Not included:</b> changing the whole company at once, building technology teams or selling licences. And if what you need already exists and works, I'll tell you before building it.",
  },

  antes: {
    rotulo: "Track record",
    nota: "",
    titulo: "Before this, I started my own companies",
    enlace: "Read the full story",
  },

  montado: {
    rotulo: "Track record",
    nota: "",
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
        cola: " and is still operating.",
        remateRojo: false,
      },
      {
        clave: "beriblock",
        nombre: "Beriblock",
        cuando: "2018 to 2019",
        texto: "Promissory-note authentication with blockchain.",
        remate: "Went under.",
        cola: " The technology worked, but there was no market.",
        remateRojo: true,
      },
      {
        clave: "elpalomo",
        nombre: "El Palomo",
        cuando: "2016 to 2017",
        texto: "Flowers by subscription.",
        remate: "Failed.",
        cola: "",
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
    rotulo: "Testimonials",
    nota: "",
    titulo: "What the people I've worked with say",
  },
} as const;
