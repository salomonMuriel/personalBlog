import type { Lang } from "@i18n/ui";
import type { Sistema } from "@data/landing";

// Screens per delivered system, in display order. `archivo` is the file stem in
// src/assets/sistemas; a missing file is skipped, so captures can land later.
type Pantalla = {
  archivo: string;
  titulo: Record<Lang, string>;
  alt: Record<Lang, string>;
};

export const pantallas: Record<Sistema["clave"], Pantalla[]> = {
  aura: [
    {
      archivo: "aura-hoy-1440",
      titulo: { es: "Agenda del día", en: "Today's agenda" },
      alt: {
        es: "Las citas del día en Aura OS con su estado de pago, y una columna de pendientes con vestidos sin devolver y saldos vencidos",
        en: "The day's appointments in Aura OS with their payment status, and a column of pending items with unreturned dresses and overdue balances",
      },
    },
    {
      archivo: "aura-movimientos-1440",
      titulo: { es: "Movimiento de vestidos", en: "Dress movements" },
      alt: {
        es: "Tablero que sigue cada vestido entre arreglos, la novia y la lavandería",
        en: "Board that tracks each dress through alterations, the bride and the laundry",
      },
    },
    {
      archivo: "aura-ficha-1440",
      titulo: { es: "Ficha de la novia", en: "Bride's record" },
      alt: {
        es: "Ficha de una novia con el contrato firmado, los pagos y el saldo",
        en: "A bride's record with the signed contract, payments and balance",
      },
    },
    {
      archivo: "aura-direccion-1440",
      titulo: { es: "Tablero de las dueñas", en: "Owners' dashboard" },
      alt: {
        es: "Tablero de las dueñas con las citas, el cierre por asesora y la cartera",
        en: "The owners' dashboard with appointments, close rate per advisor and receivables",
      },
    },
    {
      archivo: "aura-whatsapp-390",
      titulo: { es: "WhatsApp de la novia", en: "The bride's WhatsApp" },
      alt: {
        es: "Conversación de WhatsApp con la confirmación de la cita y la factura",
        en: "WhatsApp thread with the appointment confirmation and the invoice",
      },
    },
  ],
  guiacolegio: [
    {
      archivo: "guiacolegio-tablero-1440",
      titulo: { es: "Tablero de ventas", en: "Sales board" },
      alt: {
        es: "CRM de Guía Colegio con los colegios por etapa de venta",
        en: "Guía Colegio's CRM with schools by sales stage",
      },
    },
    {
      archivo: "guiacolegio-hoy-1440",
      titulo: { es: "Tareas del día", en: "Today's tasks" },
      alt: {
        es: "Tareas vencidas y del día de un vendedor, varias creadas por automatizaciones",
        en: "A salesperson's overdue and current tasks, several created by automations",
      },
    },
    {
      archivo: "guiacolegio-analitica-1440",
      titulo: { es: "Analítica de ventas", en: "Sales analytics" },
      alt: {
        es: "Embudo de ventas, cierres por mes y conversión por origen",
        en: "Sales funnel, wins per month and close rate by source",
      },
    },
    {
      archivo: "guiacolegio-panel-leads-1440",
      titulo: { es: "Panel del colegio", en: "School panel" },
      alt: {
        es: "Las familias interesadas en un colegio, separadas por origen, con la edad del hijo y cuándo quieren empezar",
        en: "The families interested in a school, split by source, with the child's age and when they want to start",
      },
    },
    {
      archivo: "guiacolegio-panel-embudo-1440",
      titulo: { es: "Embudo de usuarios", en: "User funnel" },
      alt: {
        es: "Embudo de los usuarios del sitio de Guía Colegio, desde que llegan hasta que contactan un colegio",
        en: "Funnel of the users of Guía Colegio's site, from when they arrive to when they contact a school",
      },
    },
  ],
  visible: [
    {
      archivo: "visible-portal-390",
      titulo: { es: "Portal del cliente", en: "Client portal" },
      alt: {
        es: "Diseño propuesto para el portal del cliente de Visible en el celular, con el avance del ciclo y las publicaciones por aprobar",
        en: "Proposed design for Visible's client portal on a phone, with cycle progress and posts to approve",
      },
    },
  ],
  colegio: [
    {
      archivo: "consto-revisar-1440",
      titulo: { es: "Borrador del acta", en: "Draft minutes" },
      alt: {
        es: "Borrador del acta de una reunión con una familia, escrito por la inteligencia artificial y listo para revisar",
        en: "Draft minutes of a meeting with a family, written by AI and ready to review",
      },
    },
    {
      archivo: "consto-coordinacion-1440",
      titulo: { es: "Vista de coordinación", en: "Coordinator view" },
      alt: {
        es: "Vista de coordinación con las actas que esperan la firma de la familia, las familias en desacuerdo y los borradores sin revisar",
        en: "Coordinator view with minutes awaiting the family's signature, families who disagreed and drafts not yet reviewed",
      },
    },
    {
      archivo: "consto-firma-390",
      titulo: { es: "Firma de la familia", en: "Family signature" },
      alt: {
        es: "Una mamá lee el acta en el celular y la firma",
        en: "A mother reads the minutes on her phone and signs them",
      },
    },
    {
      archivo: "memoplan-semana-390",
      titulo: { es: "Plan de la semana", en: "Plan for the week" },
      alt: {
        es: "La semana de una familia, con pagos, permisos y materiales por fecha",
        en: "A family's week, with payments, permission slips and materials by date",
      },
    },
  ],
  ignia: [
    {
      archivo: "ignia-crm-oportunidades-1440",
      titulo: { es: "Tablero de admisiones", en: "Admissions board" },
      alt: {
        es: "Tablero del CRM de admisiones de Ignia, con las oportunidades por etapa",
        en: "Board in Ignia's admissions CRM, with opportunities by stage",
      },
    },
    {
      archivo: "ignia-crm-hoy-1440",
      titulo: { es: "Pendientes del día", en: "Today's to-dos" },
      alt: {
        es: "Los pendientes del día de quien agenda las citas, como pagos atrasados y citas sin confirmar",
        en: "The day's to-dos for the person who books appointments, such as late payments and unconfirmed appointments",
      },
    },
    {
      archivo: "ignia-crm-persona-1440",
      titulo: { es: "Ficha del aspirante", en: "Applicant's record" },
      alt: {
        es: "Ficha de un aspirante con su diagnóstico, plan de pagos e historial",
        en: "An applicant's record with their diagnosis, payment plan and history",
      },
    },
    {
      archivo: "ignia-crm-automatizaciones-1440",
      titulo: { es: "Automatizaciones", en: "Automations" },
      alt: {
        es: "Mensajes automáticos de WhatsApp por etapa, cuántas personas tiene en curso cada uno y los próximos envíos por persona",
        en: "Automated WhatsApp messages by stage, how many people each one has in progress and the upcoming sends by person",
      },
    },
    {
      archivo: "ignia-diagnostico-pregunta-1440",
      titulo: { es: "Diagnóstico de admisión", en: "Admissions diagnosis" },
      alt: {
        es: "Una pregunta del diagnóstico que llena cada aspirante antes de hablar con admisiones",
        en: "A question from the diagnosis each applicant fills in before talking to admissions",
      },
    },
  ],
  entrehilos: [],
};
