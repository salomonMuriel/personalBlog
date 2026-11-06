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
        es: "Aura OS con las citas del día y los vestidos por mover",
        en: "Aura OS with the day's appointments and the dresses to move",
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
      titulo: { es: "Tablero de dirección", en: "Owners' dashboard" },
      alt: {
        es: "Tablero de las dueñas con citas, cierre por asesora y cartera",
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
        es: "Tareas vencidas y del día del vendedor, varias creadas por automatizaciones",
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
      titulo: { es: "Panel para colegios", en: "Schools' panel" },
      alt: {
        es: "Panel donde cada colegio ve y gestiona las familias interesadas",
        en: "Panel where each school sees and manages interested families",
      },
    },
  ],
  visible: [
    {
      archivo: "visible-portal-390",
      titulo: { es: "Portal del cliente", en: "Client portal" },
      alt: {
        es: "Portal del cliente de Visible en el celular, con el avance del ciclo y las publicaciones por aprobar",
        en: "Visible's client portal on a phone, with cycle progress and posts to approve",
      },
    },
  ],
  colegio: [
    {
      archivo: "consto-revisar-1440",
      titulo: { es: "Actas escritas con IA", en: "Minutes drafted by AI" },
      alt: {
        es: "Borrador del acta de una reunión con la familia, escrito por la inteligencia artificial",
        en: "Draft minutes of a meeting with a family, written by AI",
      },
    },
    {
      archivo: "consto-coordinacion-1440",
      titulo: { es: "Seguimiento de coordinación", en: "Coordinator view" },
      alt: {
        es: "Actas pendientes de firma, desacuerdos y borradores sin revisar",
        en: "Minutes awaiting signature, disagreements and unreviewed drafts",
      },
    },
    {
      archivo: "consto-firma-390",
      titulo: { es: "Firma de la familia", en: "The family signs" },
      alt: {
        es: "Una mamá lee el acta en el celular y la firma",
        en: "A parent reads the minutes on her phone and signs",
      },
    },
    {
      archivo: "memoplan-semana-390",
      titulo: { es: "La semana de cada familia", en: "Each family's week" },
      alt: {
        es: "La semana de una familia con pagos, permisos y materiales por fecha",
        en: "A family's week with payments, permission slips and materials by date",
      },
    },
  ],
  ignia: [
    {
      archivo: "ignia-crm-oportunidades-1440",
      titulo: { es: "CRM de admisiones", en: "Admissions CRM" },
      alt: {
        es: "Tablero de oportunidades del CRM de admisiones de Ignia",
        en: "Opportunities board in Ignia's admissions CRM",
      },
    },
    {
      archivo: "ignia-crm-hoy-1440",
      titulo: { es: "Cola del día", en: "Today's queue" },
      alt: {
        es: "Cola de trabajo del día para quien agenda las citas",
        en: "The day's work queue for the person who books appointments",
      },
    },
    {
      archivo: "ignia-crm-persona-1440",
      titulo: { es: "Ficha de cada persona", en: "Person record" },
      alt: {
        es: "Ficha de una persona con su diagnóstico, plan de pagos e historial",
        en: "A person's record with diagnosis, payment plan and history",
      },
    },
    {
      archivo: "ignia-comunidad-metrics-1440",
      titulo: { es: "Seguimiento de fellows", en: "Fellows tracking" },
      alt: {
        es: "Métricas de participación de los fellows de Ignia",
        en: "Engagement metrics for Ignia's fellows",
      },
    },
    {
      archivo: "ignia-diagnostico-inicio-1440",
      titulo: { es: "Diagnóstico de admisión", en: "Admissions diagnosis" },
      alt: {
        es: "Primer paso del diagnóstico de admisión de Ignia",
        en: "First step of Ignia's admissions diagnosis",
      },
    },
  ],
  entrehilos: [],
};
