import type { CopiaCuestionario } from "./tipos";

export const en: CopiaCuestionario = {
  meta: {
    title: "Tell me about your company · Salomón Muriel",
    description:
      "Eight questions about how your operation runs today. I answer myself.",
  },
  rotulo: "Work order",
  nota: "Two minutes. I answer myself.",
  titulo: "Tell me about your company",
  paso: "Step %n of %t",
  siguiente: "Next",
  atras: "Back",
  escogeHasta: "Pick up to %n.",
  marcaVarias: "Tick all that apply.",
  otraPlaceholder: "Which one?",
  preguntas: {
    sector: {
      titulo: "What does your company do?",
      opciones: {
        comercio: "Trade or distribution",
        manufactura: "We make something",
        alimentos: "Restaurant or food",
        moda: "Clothing, fashion or shops",
        servicios: "Services",
        construccion: "Construction or real estate",
        educacion: "Education",
        otra: "Something else",
      },
    },
    tamano: {
      titulo: "How many people work there, including you?",
      opciones: {
        "1-4": "1 to 4",
        "5-15": "5 to 15",
        "16-40": "16 to 40",
        "41-100": "41 to 100",
        "100+": "More than 100",
      },
    },
    donde: {
      titulo: "Where does the operation's information live today?",
      opciones: {
        excel: "Excel or Google Sheets",
        whatsapp: "WhatsApp chats",
        papel: "Paper, notebooks or a board on the wall",
        contable: "The accounting software",
        crm: "A CRM or an ERP",
        notion: "Notion, Trello or something similar",
        cabeza: "In someone's head",
      },
    },
    excels: {
      titulo:
        "How many spreadsheets does it take to keep the operation running?",
      opciones: {
        "0": "None",
        "1-3": "1 to 3",
        "4-10": "4 to 10",
        "10+": "More than 10",
        "perdi-la-cuenta": "I've lost count",
      },
    },
    duele: {
      titulo: "What weighs on you most today?",
      opciones: {
        copiar: "The day goes on copying and pasting from one place to another",
        excels: "The spreadsheets don't match and nobody keeps them up to date",
        preguntar:
          "To know what we sold or what's in stock, someone has to be asked",
        pedidos: "Orders arrive on WhatsApp and get lost or retyped by hand",
        facturas: "Quotes and invoices are made by hand, one at a time",
        dueno:
          "Everything goes through my phone, and if I'm away a week it stops",
        persona: "When someone quits, the process leaves with them",
        software: "We bought a program and hardly anyone uses it",
        crecer: "To serve more customers we have to hire more people",
        piedra: "It feels like we're still in the stone age",
      },
    },
    horas: {
      titulo:
        "Across the whole team, how many hours a week go into that manual work?",
      opciones: {
        "menos-5": "Fewer than 5",
        "5-20": "5 to 20",
        "20-40": "20 to 40",
        "40+": "More than 40",
        "no-se": "No idea",
      },
    },
    cuando: {
      titulo: "When do you want it solved?",
      opciones: {
        ya: "Yesterday",
        trimestre: "In the next three months",
        semestre: "In the next six months",
        explorando: "I'm just looking at options",
      },
    },
    decide: {
      titulo: "Who makes the decision?",
      opciones: {
        yo: "Me",
        socios: "Me, with my partners or the board",
        otro: "I'm looking into it for someone else",
      },
    },
  },
  contacto: {
    titulo: "Where do I reach you?",
    nombre: "Your name",
    empresa: "Company",
    whatsapp: "WhatsApp",
    whatsappPlaceholder: "+57 300 123 4567",
    correo: "Email (optional)",
    mensaje: "Anything else I should know? (optional)",
    enviar: "Send",
    enviando: "Sending…",
    privacidad:
      "I read it myself and share it with no one. I won't add you to any mailing list.",
    faltaNombre: "Write your name.",
    faltaEmpresa: "Write the company's name.",
    faltaWhatsapp: "Write a WhatsApp number.",
    correoInvalido: "Check the email address.",
  },
  resultado: {
    rotulo: "Received",
    si: {
      titulo: "Done, %nombre. This is exactly what I do.",
      texto:
        "I've got everything. The next step is a 45-minute call where you show me how the operation runs today. If you'd rather, let's carry on over WhatsApp.",
      ctaAgenda: "Book the call",
      ctaWa: "Carry on over WhatsApp",
    },
    temprano: {
      titulo: "Thanks, %nombre.",
      texto:
        "With fewer than five people, what will help you most right now is mentoring: we work one to one on what you're building. If you still want to talk about a system, message me.",
      ctaMentoria: "See the mentoring",
      ctaWa: "Message me on WhatsApp",
    },
    explorando: {
      titulo: "Thanks, %nombre. It came through.",
      texto:
        "I'll message you on WhatsApp in the next few days so you can tell me more. If you'd rather get ahead, message me first.",
      ctaWa: "Message me on WhatsApp",
    },
    horas:
      "From what you tell me, that's between %a and %b hours a year of people moving data from one place to another.",
    horasMas:
      "From what you tell me, that's more than %a hours a year of people moving data from one place to another.",
    error: {
      titulo: "It didn't go through.",
      texto:
        "Something failed on my end. Send me the same thing on WhatsApp; it's already written.",
      ctaWa: "Send it on WhatsApp",
    },
  },
  wa: {
    encabezado: "Hi Salomón, I filled in the questionnaire on your site.",
    empresa: "Company",
    personas: "people",
    pesa: "What weighs most",
    excels: "Spreadsheets in the operation",
    cuando: "When",
    procedencia: "I came from",
  },
};
