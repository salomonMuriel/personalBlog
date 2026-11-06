import type { ClavePregunta, OPCIONES } from "./opciones";

type CopiaPregunta<K extends ClavePregunta> = {
  titulo: string;
  opciones: Record<(typeof OPCIONES)[K][number], string>;
};

export type CopiaCuestionario = {
  meta: { title: string; description: string };
  rotulo: string;
  nota: string;
  titulo: string;
  paso: string;
  siguiente: string;
  atras: string;
  escogeHasta: string;
  marcaVarias: string;
  otraPlaceholder: string;
  preguntas: { [K in ClavePregunta]: CopiaPregunta<K> };
  contacto: {
    titulo: string;
    nombre: string;
    empresa: string;
    whatsapp: string;
    whatsappPlaceholder: string;
    correo: string;
    mensaje: string;
    enviar: string;
    enviando: string;
    privacidad: string;
    faltaNombre: string;
    faltaEmpresa: string;
    faltaWhatsapp: string;
    correoInvalido: string;
  };
  resultado: {
    rotulo: string;
    si: { titulo: string; texto: string; ctaAgenda: string; ctaWa: string };
    temprano: {
      titulo: string;
      texto: string;
      ctaMentoria: string;
      ctaWa: string;
    };
    explorando: { titulo: string; texto: string; ctaWa: string };
    horas: string;
    horasMas: string;
    error: { titulo: string; texto: string; ctaWa: string };
  };
  wa: {
    encabezado: string;
    empresa: string;
    personas: string;
    pesa: string;
    excels: string;
    cuando: string;
    procedencia: string;
  };
};
