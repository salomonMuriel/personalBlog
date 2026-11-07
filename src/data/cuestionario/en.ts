import type { CopiaCuestionario } from "./tipos";

export const en: CopiaCuestionario = {
  meta: {
    title: "Tell me about your company · Salomón Muriel",
    description:
      "Eight questions about how your company runs today. I'll reply on WhatsApp.",
  },
  rotulo: "Work order",
  nota: "You can also message me on WhatsApp.",
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
      titulo: "Where is the operation's information kept today?",
      opciones: {
        excel: "Excel or Google Sheets",
        whatsapp: "WhatsApp chats",
        papel: "Paper or a board on the wall",
        contable: "Accounting tool (Siigo, Alegra…)",
        crm: "A CRM or an ERP",
        notion: "Notion, Trello or something similar",
        cabeza: "In someone's head",
      },
    },
    excels: {
      titulo: "How many spreadsheets does it take to run the operation?",
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
        copiar: "We lose the day copying and pasting",
        excels: "The spreadsheets don't match",
        preguntar: "I can't see our sales without asking",
        pedidos: "Orders get lost in WhatsApp",
        facturas: "We quote and invoice by hand",
        dueno: "If I'm away a week, everything stops",
        persona: "Some things only one person knows",
        piedra: "We're still in the stone age",
      },
    },
    horas: {
      titulo: "How many hours a week does that take the team?",
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
    privacidad: "I only use these details to reply to you.",
    faltaNombre: "Write your name.",
    faltaEmpresa: "Write the company's name.",
    faltaWhatsapp: "Write a WhatsApp number.",
    correoInvalido: "Check the email address.",
  },
  resultado: {
    rotulo: "Received",
    si: {
      titulo: "Thanks, %nombre. I think I can help.",
      texto:
        "The next step is a 45-minute call where you show me how the operation runs today. If you'd rather, we can carry on over WhatsApp.",
      ctaAgenda: "Book the call",
      ctaWa: "Carry on over WhatsApp",
    },
    temprano: {
      titulo: "Thanks, %nombre.",
      texto:
        "With fewer than five people, I think mentoring is a better fit, where we work one to one on what you're building. If you still want to talk about an operating system for your company, message me.",
      ctaMentoria: "See the mentoring",
      ctaWa: "Message me on WhatsApp",
    },
    explorando: {
      titulo: "Thanks, %nombre.",
      texto:
        "I'll message you on WhatsApp in the next few days so you can tell me more. If you don't want to wait, message me first.",
      ctaWa: "Message me on WhatsApp",
    },
    horas:
      "From what you tell me, that's between %a and %b hours a year of people moving data from one place to another.",
    horasMas:
      "From what you tell me, that's more than %a hours a year of people moving data from one place to another.",
    error: {
      titulo: "It didn't go through.",
      texto:
        "Something failed on my end. Send me the same thing on WhatsApp; the message is already written.",
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
