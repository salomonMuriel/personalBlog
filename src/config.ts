export const SITE = {
  website: "https://www.salomonmuriel.com",
  author: "Salomón Muriel",
  title: "Salomón Muriel",
  desc: "Te construyo software hecho a la medida de tu empresa y de como ya trabajas, en vez de que te toque torcer la empresa para caber en un programa que compraste.",
  ogImage: "/og.png",
} as const;

/** Un solo lugar para los canales de contacto: son la conversión del sitio. */
export const CONTACTO = {
  whatsapp: "573132465100",
  whatsappBonito: "+57 313 246 5100",
  cal: "https://cal.com/salomonmuriel",
  calConsultoria: "https://cal.com/salomonmuriel/consultoria",
  calMentoria: "https://cal.com/salomonmuriel/mentoria",
  calCharla: "https://cal.com/salomonmuriel/charla",
  linkedin: "https://www.linkedin.com/in/smuriel/",
  correo: "salomon.muriel@gmail.com",
} as const;

/** Arma un enlace de WhatsApp con el mensaje ya escrito. */
export function wa(texto?: string): string {
  const base = `https://wa.me/${CONTACTO.whatsapp}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}
