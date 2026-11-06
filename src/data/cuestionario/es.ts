import type { CopiaCuestionario } from "./tipos";

export const es: CopiaCuestionario = {
  meta: {
    title: "Cuéntame de tu empresa · Salomón Muriel",
    description:
      "Ocho preguntas sobre cómo funciona hoy tu empresa. Las leo yo y te escribo por WhatsApp.",
  },
  rotulo: "Orden de trabajo",
  nota: "Son ocho preguntas y toma unos dos minutos.",
  titulo: "Cuéntame de tu empresa",
  paso: "Paso %n de %t",
  siguiente: "Siguiente",
  atras: "Atrás",
  escogeHasta: "Escoge hasta %n.",
  marcaVarias: "Marca todas las que apliquen.",
  otraPlaceholder: "¿Cuál?",
  preguntas: {
    sector: {
      titulo: "¿A qué se dedica tu empresa?",
      opciones: {
        comercio: "Comercio o distribución",
        manufactura: "Fabricamos algo",
        alimentos: "Restaurante o alimentos",
        moda: "Ropa, moda o tiendas",
        servicios: "Servicios",
        construccion: "Construcción o inmobiliaria",
        educacion: "Educación",
        otra: "Otra",
      },
    },
    tamano: {
      titulo: "¿Cuántas personas trabajan ahí, contándote a ti?",
      opciones: {
        "1-4": "1 a 4",
        "5-15": "5 a 15",
        "16-40": "16 a 40",
        "41-100": "41 a 100",
        "100+": "Más de 100",
      },
    },
    donde: {
      titulo: "¿Dónde vive hoy la información de la operación?",
      opciones: {
        excel: "Excel o Google Sheets",
        whatsapp: "Chats de WhatsApp",
        papel: "Papel o un tablero en la pared",
        contable: "Programa contable (Siigo, Alegra…)",
        crm: "Un CRM o un ERP",
        notion: "Notion, Trello o algo parecido",
        cabeza: "En la cabeza de alguien",
      },
    },
    excels: {
      titulo: "¿Cuántos Excel hay que mover para que la operación funcione?",
      opciones: {
        "0": "Ninguno",
        "1-3": "1 a 3",
        "4-10": "4 a 10",
        "10+": "Más de 10",
        "perdi-la-cuenta": "Ya perdí la cuenta",
      },
    },
    duele: {
      titulo: "¿Qué es lo que más te pesa hoy?",
      opciones: {
        copiar: "Se nos va el día copiando y pegando",
        excels: "Los Excel no cuadran entre sí",
        preguntar: "No sé cuánto vendimos sin preguntar",
        pedidos: "Los pedidos se pierden en WhatsApp",
        facturas: "Cotizamos y facturamos a mano",
        dueno: "Si me voy una semana, todo se frena",
        persona: "Hay cosas que solo sabe una persona",
        piedra: "Seguimos en la edad de piedra",
      },
    },
    horas: {
      titulo: "¿Cuántas horas a la semana se le van al equipo en eso?",
      opciones: {
        "menos-5": "Menos de 5",
        "5-20": "5 a 20",
        "20-40": "20 a 40",
        "40+": "Más de 40",
        "no-se": "No tengo idea",
      },
    },
    cuando: {
      titulo: "¿Para cuándo lo quieres resuelto?",
      opciones: {
        ya: "Para ayer",
        trimestre: "En los próximos tres meses",
        semestre: "En los próximos seis meses",
        explorando: "Solo estoy mirando opciones",
      },
    },
    decide: {
      titulo: "¿Quién toma la decisión?",
      opciones: {
        yo: "Yo",
        socios: "Yo, con mis socios o la junta",
        otro: "Estoy averiguando para alguien más",
      },
    },
  },
  contacto: {
    titulo: "¿A dónde te escribo?",
    nombre: "Tu nombre",
    empresa: "Empresa",
    whatsapp: "WhatsApp",
    whatsappPlaceholder: "300 123 4567",
    correo: "Correo (opcional)",
    mensaje: "¿Algo más que deba saber? (opcional)",
    enviar: "Enviar",
    enviando: "Enviando…",
    privacidad:
      "Lo leo yo y no lo comparto con nadie. No te voy a meter a ninguna lista de correos.",
    faltaNombre: "Escribe tu nombre.",
    faltaEmpresa: "Escribe el nombre de la empresa.",
    faltaWhatsapp: "Escribe un número de WhatsApp.",
    correoInvalido: "Revisa el correo.",
  },
  resultado: {
    rotulo: "Recibido",
    si: {
      titulo: "Gracias, %nombre. Creo que te puedo ayudar.",
      texto:
        "Ya me llegó todo. El siguiente paso es una llamada de 45 minutos en la que me muestras cómo funciona hoy la operación. Si prefieres, seguimos por WhatsApp.",
      ctaAgenda: "Agendar la llamada",
      ctaWa: "Seguir por WhatsApp",
    },
    temprano: {
      titulo: "Gracias, %nombre.",
      texto:
        "Con menos de cinco personas, creo que te sirve más la mentoría, donde trabajamos uno a uno sobre lo que estás construyendo. Si igual quieres hablar del sistema, escríbeme.",
      ctaMentoria: "Ver la mentoría",
      ctaWa: "Escribirme por WhatsApp",
    },
    explorando: {
      titulo: "Gracias, %nombre, ya me llegó.",
      texto:
        "En estos días te escribo por WhatsApp para que me cuentes con calma. Si quieres adelantar, escríbeme tú.",
      ctaWa: "Escribirme por WhatsApp",
    },
    horas:
      "Por lo que me cuentas, son entre %a y %b horas al año de gente pasando datos de un lado a otro.",
    horasMas:
      "Por lo que me cuentas, son más de %a horas al año de gente pasando datos de un lado a otro.",
    error: {
      titulo: "No se pudo enviar.",
      texto:
        "Algo falló de mi lado. Mándame lo mismo por WhatsApp, que el mensaje ya va escrito.",
      ctaWa: "Mandarlo por WhatsApp",
    },
  },
  wa: {
    encabezado: "Hola Salomón, llené el cuestionario de tu página.",
    empresa: "Empresa",
    personas: "personas",
    pesa: "Lo que más pesa",
    excels: "Excel en la operación",
    cuando: "Para cuándo",
    procedencia: "Llegué por",
  },
};
