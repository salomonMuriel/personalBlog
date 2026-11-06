import type { Ilustracion } from "@data/landing";
import cajitasConectadas from "@assets/ilustraciones/cajitas-conectadas.webp";
import chatPedidos from "@assets/ilustraciones/chat-pedidos.webp";
import llaves from "@assets/ilustraciones/llaves.webp";
import tablaPiedra from "@assets/ilustraciones/tabla-piedra.webp";
import torreExcel from "@assets/ilustraciones/torre-excel.webp";
import unaCajita from "@assets/ilustraciones/una-cajita.webp";

export const ilustraciones: Record<Ilustracion, ImageMetadata> = {
  "cajitas-conectadas": cajitasConectadas,
  "chat-pedidos": chatPedidos,
  llaves,
  "tabla-piedra": tablaPiedra,
  "torre-excel": torreExcel,
  "una-cajita": unaCajita,
};
