import { z } from "astro/zod";
import { OPCIONES, MULTIPLES } from "@data/cuestionario/opciones";

const texto = (max: number) => z.string().trim().max(max);

export const esquemaEnvio = z.object({
  idioma: z.enum(["es", "en"]),
  version: z.enum(["v1", "v2", "v3"]),
  respuestas: z.object({
    sector: z.enum(OPCIONES.sector),
    sectorOtro: texto(80).optional(),
    tamano: z.enum(OPCIONES.tamano),
    donde: z
      .array(z.enum(OPCIONES.donde))
      .min(1)
      .max(MULTIPLES.donde ?? 7),
    excels: z.enum(OPCIONES.excels),
    duele: z
      .array(z.enum(OPCIONES.duele))
      .min(1)
      .max(MULTIPLES.duele ?? 3),
    horas: z.enum(OPCIONES.horas),
    cuando: z.enum(OPCIONES.cuando),
    decide: z.enum(OPCIONES.decide),
  }),
  contacto: z.object({
    nombre: texto(80).min(1),
    empresa: texto(120).min(1),
    whatsapp: texto(30).regex(/^[+\d][\d\s().-]{6,}$/),
    correo: z.union([z.literal(""), z.email().max(160)]).optional(),
    mensaje: texto(1200).optional(),
  }),
  origen: z
    .object({
      pagina: texto(200).optional(),
      referrer: texto(300).optional(),
      utm: z.record(z.string(), texto(200)).optional(),
    })
    .default({}),
  // Honeypot: real people never see this field.
  web: texto(200).optional(),
  msLlenado: z.number().int().nonnegative(),
});

export type Envio = z.infer<typeof esquemaEnvio>;
