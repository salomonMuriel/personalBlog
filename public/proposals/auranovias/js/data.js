const LANES = [
  { id: "novia", label: "La novia" },
  { id: "comercial", label: "Asesoras" },
  { id: "taller", label: "Taller y entregas" },
  { id: "direccion", label: "Dirección" },
];

const STAGES = [
  { id: "captacion", label: "Captación", when: "Anuncio y WhatsApp" },
  { id: "agenda", label: "Agenda y pago", when: "Días antes de la cita" },
  { id: "preparacion", label: "Preparación", when: "La noche anterior" },
  { id: "cita", label: "La cita", when: "Dos horas en tienda" },
  { id: "cierre", label: "Cierre", when: "Al final de la cita" },
  { id: "seguimiento", label: "No cierra", when: "Cerca de la mitad" },
  { id: "postventa", label: "Post-venta", when: "Meses de espera" },
  { id: "preboda", label: "Antes de la boda", when: "20 días antes" },
  { id: "entrega", label: "Entrega y devolución", when: "Boda y regreso" },
];

const STEPS = [
  { id: "c1", stage: "captacion", lane: "novia", kind: "novia", text: "Ve un anuncio y escribe por WhatsApp", detail: "Las campañas en Instagram y Facebook llevan a WhatsApp o a la página.", tool: "Meta y WhatsApp", cajita: "mercadeo" },
  { id: "c2", stage: "captacion", lane: "comercial", kind: "manual", text: "Responde cada chat desde un celular", detail: "Entre 20 y 30 conversaciones nuevas al día, todas en un solo teléfono.", tool: "WhatsApp", cajita: "mercadeo" },
  { id: "c3", stage: "captacion", lane: "direccion", kind: "vacio", text: "No se registra de qué anuncio llegó", detail: "No hay forma de saber qué campaña trae vestidos reservados.", tool: "Ninguna", cajita: "mercadeo", risk: "Inversión en pauta sin medir resultado" },

  { id: "a1", stage: "agenda", lane: "novia", kind: "digital", text: "Agenda y llena el formulario", detail: "Fecha y lugar de boda, talla, presupuesto y gustos. Es la primera vez que se escriben sus datos.", tool: "Calendly", cajita: "agenda" },
  { id: "a2", stage: "agenda", lane: "novia", kind: "novia", text: "Transfiere y envía el comprobante", detail: "El pago llega después de agendar, por transferencia y foto del comprobante.", tool: "Banco y WhatsApp", cajita: "agenda" },
  { id: "a3", stage: "agenda", lane: "comercial", kind: "manual", text: "Revisa chat por chat quién pagó", detail: "Los martes en la mañana se copia el celular de cada cita en WhatsApp para buscar el comprobante.", tool: "Calendly y WhatsApp", cajita: "agenda" },
  { id: "a4", stage: "agenda", lane: "comercial", kind: "manual", text: "Recuerda, cancela y reenvía el enlace", detail: "Plazo hasta el jueves para una cita del sábado. Si no paga, se cancela y se reenvía el enlace.", tool: "WhatsApp", cajita: "agenda" },
  { id: "a5", stage: "agenda", lane: "comercial", kind: "manual", text: "Hace la factura de la cita", detail: "Una factura hecha a mano por cada cita pagada.", tool: "Facturación", cajita: "administracion", rekey: true , invoice: true },
  { id: "a6", stage: "agenda", lane: "comercial", kind: "manual", text: "Anota la factura en el calendario", detail: "El número de factura se escribe en el evento de la cita.", tool: "Google Calendar", cajita: "agenda", rekey: true },
  { id: "a7", stage: "agenda", lane: "comercial", kind: "manual", text: "La registra en el libro de citas", detail: "Cada recibo se escribe a mano en un libro para poder cuadrar después.", tool: "Libro de citas", cajita: "administracion", rekey: true },
  { id: "a8", stage: "agenda", lane: "comercial", kind: "manual", text: "Envía tips, videos y recordatorio", detail: "Videos y mensajes arrastrados uno por uno al chat de cada novia.", tool: "WhatsApp", cajita: "agenda" },
  { id: "a9", stage: "agenda", lane: "direccion", kind: "manual", text: "Cuadra el libro contra el banco", detail: "Cuando algo no cuadra, se revisa el libro recibo por recibo.", tool: "Libro de citas", cajita: "administracion" },

  { id: "p1", stage: "preparacion", lane: "comercial", kind: "manual", text: "Copia el formulario a la hoja de vida", detail: "Lo que la novia ya escribió se pasa a papel.", tool: "Hoja de vida", cajita: "asesoria", rekey: true },
  { id: "p2", stage: "preparacion", lane: "comercial", kind: "manual", text: "Recorre los Excel mes por mes", detail: "Todo lo reservado 30 días antes y después de su boda. Velos: 7 días antes y 15 después.", tool: "Excel de vestidos y de velos", cajita: "inventario", risk: "Un vestido mal leído se ofrece a dos novias" },
  { id: "p3", stage: "preparacion", lane: "comercial", kind: "manual", text: "Pregunta a Medellín por WhatsApp", detail: "Cada tienda solo ve su propio Excel.", tool: "WhatsApp", cajita: "inventario", risk: "Respuesta lenta o sin respuesta en plena cita" },
  { id: "p4", stage: "preparacion", lane: "comercial", kind: "manual", text: "Escribe la lista de libres y sugeridos", detail: "Una hoja a mano con vestidos y velos que no están, y opciones para proponer.", tool: "Papel", cajita: "asesoria" },

  { id: "q1", stage: "cita", lane: "novia", kind: "novia", text: "Recorre la tienda y se mide 5 o 6", detail: "Entrevista, recorrido, vestidos favoritos y el momento del velo.", tool: "Experiencia en tienda", cajita: "asesoria" },
  { id: "q2", stage: "cita", lane: "comercial", kind: "manual", text: "Reconfirma fecha, talla y presupuesto", detail: "Se vuelve a preguntar lo del formulario. Si la fecha cambió, la lista de la noche anterior ya no sirve.", tool: "Hoja de vida", cajita: "asesoria", rekey: true, risk: "Una fecha cambiada invalida la lista preparada" },
  { id: "q3", stage: "cita", lane: "comercial", kind: "manual", text: "Sale a revisar disponibilidad otra vez", detail: "Antes de medir, la asesora deja a la novia unos minutos para verificar en el Excel.", tool: "Excel de vestidos", cajita: "inventario", risk: "Segunda revisión manual sobre la misma fuente frágil" },
  { id: "q4", stage: "cita", lane: "comercial", kind: "manual", text: "Anota al final lo que se midió", detail: "Durante la cita no hay tiempo; se completa después.", tool: "Hoja de vida", cajita: "asesoria" },

  { id: "k1", stage: "cierre", lane: "comercial", kind: "manual", text: "Busca el precio en otro Excel", detail: "Precios y modalidades viven en un archivo distinto al de disponibilidad.", tool: "Excel de precios", cajita: "asesoria", risk: "Precio o modalidad desactualizados" },
  { id: "k2", stage: "cierre", lane: "comercial", kind: "manual", text: "Valida los tiempos de la modalidad", detail: "Compra nueva y alquiler estrene necesitan hasta 6 meses de fábrica.", tool: "Experiencia de la asesora", cajita: "asesoria", risk: "Prometer un vestido que no alcanza a llegar" },
  { id: "k3", stage: "cierre", lane: "comercial", kind: "manual", text: "Llena el contrato en papel", detail: "Cuatro tipos de contrato, con datos y medidas escritos a mano.", tool: "Contrato impreso", cajita: "asesoria", rekey: true },
  { id: "k4", stage: "cierre", lane: "novia", kind: "novia", text: "Paga la reserva y firma", detail: "Reserva, 50 %, 60 % o pago total según la modalidad.", tool: "Datáfono o transferencia", cajita: "asesoria" },
  { id: "k5", stage: "cierre", lane: "comercial", kind: "manual", text: "Factura la reserva", detail: "Otra factura a mano.", tool: "Facturación", cajita: "administracion", rekey: true , invoice: true },
  { id: "k6", stage: "cierre", lane: "comercial", kind: "manual", text: "Agenda préstamo y primera modista", detail: "Días de préstamo según destino y cita de modista 20 días antes, en otro calendario.", tool: "Google Calendar", cajita: "novia", rekey: true },

  { id: "f1", stage: "seguimiento", lane: "comercial", kind: "manual", text: "Seguimiento según la memoria de cada asesora", detail: "Llamada o WhatsApp a criterio. Si no responde, no se insiste.", tool: "WhatsApp", cajita: "recuperacion", risk: "Novias interesadas a las que nadie vuelve a contactar" },
  { id: "f2", stage: "seguimiento", lane: "direccion", kind: "vacio", text: "Sin contacto ni contenido entre medio", detail: "Cerca de una de cada diez vuelve. No hay nada que la mantenga cerca.", tool: "Ninguna", cajita: "recuperacion" },

  { id: "v1", stage: "postventa", lane: "comercial", kind: "manual", text: "La escribe en el Libro de Novias", detail: "Consecutivo, datos, vestido, valor, cada abono con su factura, citas y entrega.", tool: "Libro de Novias", cajita: "novia", rekey: true },
  { id: "v2", stage: "postventa", lane: "comercial", kind: "manual", text: "Agrega la fila en los Excel", detail: "Una fila en vestidos y otra en velos, en la pestaña del mes de la boda.", tool: "Excel de vestidos y de velos", cajita: "inventario", rekey: true, risk: "Un nombre o una fecha mal escritos rompen la disponibilidad" },
  { id: "v3", stage: "postventa", lane: "comercial", kind: "manual", text: "Guarda el contacto en el celular", detail: "Nombre completo y número de novia del libro.", tool: "Celular de la tienda", cajita: "novia", rekey: true },
  { id: "v4", stage: "postventa", lane: "comercial", kind: "manual", text: "Envía bienvenida y PDFs", detail: "Beneficios con proveedores y guía de la cita de modista, uno por uno.", tool: "WhatsApp", cajita: "novia" },
  { id: "v5", stage: "postventa", lane: "novia", kind: "novia", text: "Abona cuando quiere", detail: "Escribe, pide la cuenta y envía el comprobante.", tool: "WhatsApp", cajita: "novia" },
  { id: "v6", stage: "postventa", lane: "comercial", kind: "manual", text: "Factura y registra cada abono", detail: "Factura, libro y conciliación por cada pago parcial.", tool: "Facturación y libro", cajita: "administracion", rekey: true , invoice: true },
  { id: "v7", stage: "postventa", lane: "direccion", kind: "manual", text: "Pide a fábrica y sigue los tiempos", detail: "Compra nueva y alquiler estrene se siguen de memoria hasta que llega el vestido.", tool: "Memoria", cajita: "novia", risk: "Retrasos de fábrica que se notan tarde" },
  { id: "v8", stage: "postventa", lane: "direccion", kind: "manual", text: "Actualiza la página y el catálogo", detail: "Más o menos una vez al mes se quitan vendidos y se suben nuevos.", tool: "Página web", cajita: "inventario", risk: "Novias que piden vestidos que ya no están" },

  { id: "b1", stage: "preboda", lane: "taller", kind: "manual", text: "Confirma la cita de modista un mes antes", detail: "Se revisa el calendario para saber a quién escribirle.", tool: "Google Calendar y WhatsApp", cajita: "novia" },
  { id: "b2", stage: "preboda", lane: "novia", kind: "novia", text: "Primera cita de modista", detail: "Pruebas, ajustes, consejos y accesorios.", tool: "Taller", cajita: "novia" },
  { id: "b3", stage: "preboda", lane: "taller", kind: "manual", text: "Cobra el saldo y firma el pagaré", detail: "Saldo pendiente, factura y pagaré por el valor del vestido.", tool: "Facturación y papel", cajita: "administracion", rekey: true , invoice: true },

  { id: "e1", stage: "entrega", lane: "taller", kind: "manual", text: "Entrega con checklist y depósito", detail: "Fecha y hora de entrega, depósito en efectivo y lista de chequeo.", tool: "Papel", cajita: "logistica" },
  { id: "e2", stage: "entrega", lane: "novia", kind: "novia", text: "Se casa y devuelve el vestido", detail: "6 días en Bogotá, 8 a 9 en otra ciudad, hasta 15 en el exterior.", tool: "Contrato", cajita: "logistica" },
  { id: "e3", stage: "entrega", lane: "taller", kind: "manual", text: "Revisa, descuenta y manda a lavandería", detail: "Inspección, descuentos del depósito, desarreglos y lavandería de unos 8 días.", tool: "Papel", cajita: "logistica" },
  { id: "e4", stage: "entrega", lane: "taller", kind: "manual", text: "Anota urgencias como notas en el Excel", detail: "\"Enviar urgente a lavandería\" cuando la próxima novia está cerca.", tool: "Excel de vestidos", cajita: "logistica", risk: "Una nota que nadie ve atrasa la próxima entrega" },
  { id: "e5", stage: "entrega", lane: "direccion", kind: "vacio", text: "No se sabe dónde está cada vestido", detail: "Con la novia, en arreglos, en lavandería o en otra tienda: hay que preguntar.", tool: "Ninguna", cajita: "logistica", risk: "Decisiones de venta sin conocer el estado real" },
];

const TOOLS = [
  { name: "Meta Ads", kind: "digital", icon: "megaphone" },
  { name: "WhatsApp en un celular", kind: "digital", icon: "whatsapp-logo" },
  { name: "Calendly", kind: "digital", icon: "calendar-blank" },
  { name: "Google Calendar", kind: "digital", icon: "calendar-blank" },
  { name: "Página web", kind: "digital", icon: "globe" },
  { name: "Contactos del celular", kind: "digital", icon: "device-mobile" },
  { name: "Contabilidad", kind: "digital", icon: "calculator" },
  { name: "Excel de vestidos", kind: "excel", icon: "table" },
  { name: "Excel de velos y mangas", kind: "excel", icon: "table" },
  { name: "Excel de precios", kind: "excel", icon: "table" },
  { name: "Hoja de vida", kind: "papel", icon: "clipboard-text" },
  { name: "Contratos impresos", kind: "papel", icon: "signature" },
  { name: "Libro de citas", kind: "papel", icon: "notebook" },
  { name: "Libro de Novias", kind: "papel", icon: "notebook" },
];

const REKEY_CHAIN = [
  { name: "Formulario", kind: "digital", icon: "calendar-blank", by: "Lo escribe la novia" },
  { name: "Hoja de vida", kind: "papel", icon: "clipboard-text", by: "Noche anterior" },
  { name: "Contrato", kind: "papel", icon: "signature", by: "Al cerrar" },
  { name: "Libro de Novias", kind: "papel", icon: "notebook", by: "Después del cierre" },
  { name: "Excel de vestidos", kind: "excel", icon: "table", by: "Pestaña del mes" },
  { name: "Excel de velos", kind: "excel", icon: "table", by: "Pestaña del mes" },
  { name: "Calendario", kind: "digital", icon: "calendar-blank", by: "Préstamo y modista" },
  { name: "Celular", kind: "digital", icon: "device-mobile", by: "Contacto" },
];

const CAJITAS = [
  { id: "mercadeo", n: "01", name: "Mercadeo y atracción", start: "El anuncio", end: "La novia escribe o agenda", today: "Campañas que traen muchas conversaciones, sin saber cuál termina en vestido.", automated: "Cada novia guarda su origen y se cruza con su cierre y su modalidad.", scores: { manual: 1, rekey: 0, risk: 1, blind: 3 } },
  { id: "agenda", n: "02", name: "Agenda y pre-cita", start: "Agenda la cita", end: "Llega con la cita paga y su perfil listo", today: "Revisar comprobantes, recordar pagos, facturar y enviar mensajes uno por uno.", automated: "Agendar y pagar en un paso. Recordatorios, factura y tips salen solos.", scores: { manual: 3, rekey: 2, risk: 1, blind: 1 } },
  { id: "asesoria", n: "03", name: "Asesoría y cierre", start: "La novia llega", end: "Contrato firmado y reserva paga", today: "Hoja de vida en papel, revisiones al Excel, precio en otro archivo y contrato a mano.", automated: "En una tablet: su perfil, lo que está libre para su fecha, el contrato y el pago.", scores: { manual: 3, rekey: 3, risk: 3, blind: 2 } },
  { id: "inventario", n: "04", name: "Inventario y disponibilidad", start: "Un vestido entra a tienda", end: "Se vende o se retira", today: "Un Excel por mes y por tienda. La cuenta de los 30 días la hace una persona.", automated: "Un catálogo para todas las tiendas. Las reservas se bloquean solas y no se cruzan.", scores: { manual: 3, rekey: 2, risk: 3, blind: 3 } },
  { id: "novia", n: "05", name: "Seguimiento de la novia", start: "Firma el contrato", end: "Se lleva el vestido", today: "Libro de Novias, contacto, PDFs, abonos, fábrica y modista, todo a mano.", automated: "Una ficha por novia reemplaza el libro. Abonos, pedidos y citas avisan solos.", scores: { manual: 3, rekey: 3, risk: 2, blind: 2 } },
  { id: "logistica", n: "06", name: "Logística del vestido", start: "La novia recoge", end: "Vuelve listo a la tienda", today: "Urgencias como notas en el Excel. No se ve dónde está cada vestido.", automated: "Cada vestido con su estado y su urgencia calculada por la próxima reserva.", scores: { manual: 2, rekey: 1, risk: 2, blind: 3 } },
  { id: "recuperacion", n: "07", name: "Recuperación y nutrición", start: "Se va a pensarlo", end: "Vuelve o decide otra cosa", today: "Seguimiento a criterio de cada asesora. Nada entre medio.", automated: "Lista con próximo contacto y mensajes de valor que salen solos.", scores: { manual: 2, rekey: 0, risk: 2, blind: 3 } },
  { id: "administracion", n: "08", name: "Administración", start: "Cualquier pago", end: "Facturado y cuadrado", today: "Cada cita y cada abono se facturan a mano y se cuadran en libros.", automated: "Cada pago genera su factura y queda en la cuenta de la novia.", scores: { manual: 3, rekey: 3, risk: 2, blind: 1 } },
];

const HEAT_DIMENSIONS = [
  { key: "manual", label: "Trabajo manual" },
  { key: "rekey", label: "Doble digitación" },
  { key: "risk", label: "Riesgo de error" },
  { key: "blind", label: "Sin trazabilidad" },
];

const SEVERITY = ["Bajo", "Medio", "Alto", "Crítico"];

const OPPORTUNITIES = [
  { id: "o1", name: "Catálogo único y disponibilidad automática", cajita: "inventario", impact: 5, effort: 3.2, removes: ["p2", "p3", "q3", "v2"], phase: 1 },
  { id: "o2", name: "Asesoría en tablet con perfil precargado", cajita: "asesoria", impact: 4.6, effort: 2.8, removes: ["p1", "p4", "q2", "q4", "k1", "k2"], phase: 1 },
  { id: "o3", name: "Contrato digital con firma en tablet", cajita: "asesoria", impact: 3.8, effort: 2, removes: ["k3", "k6"], phase: 1 },
  { id: "o4", name: "Agendar y pagar en un solo paso", cajita: "agenda", impact: 4.2, effort: 2.2, removes: ["a3", "a4", "a6"], phase: 2 },
  { id: "o5", name: "Mensajes automáticos de cita y bienvenida", cajita: "agenda", impact: 3, effort: 1.2, removes: ["a8", "v4", "b1"], phase: 2 },
  { id: "o6", name: "Ficha de novia que reemplaza el Libro", cajita: "novia", impact: 4.1, effort: 2.4, removes: ["v1", "v3"], phase: 3 },
  { id: "o7", name: "Factura automática por cada pago", cajita: "administracion", impact: 3.9, effort: 3.4, removes: ["a5", "a7", "a9", "k5", "v6", "b3"], phase: 3 },
  { id: "o8", name: "Pedidos a fábrica con alertas", cajita: "novia", impact: 2.8, effort: 1.8, removes: ["v7"], phase: 3 },
  { id: "o9", name: "Estado de cada vestido y urgencias", cajita: "logistica", impact: 3.1, effort: 2.6, removes: ["e4", "e5"], phase: 3 },
  { id: "o10", name: "Seguimiento y nutrición de no cierres", cajita: "recuperacion", impact: 3.2, effort: 2, removes: ["f1", "f2"], phase: 4 },
  { id: "o11", name: "Origen de cada novia y costo por cierre", cajita: "mercadeo", impact: 2.9, effort: 2.3, removes: ["c3"], phase: 5 },
  { id: "o12", name: "Catálogo web alimentado del inventario", cajita: "inventario", impact: 2.2, effort: 3.6, removes: ["v8"], phase: 5 },
];

const PHASES = [
  { n: 1, name: "Inventario + Asesoría y cierre", summary: "Desde que la novia llega hasta que reserva, con la disponibilidad real de las dos tiendas.", shots: [["tablet-asesoria", "Asesoría en tablet: solo aparece lo que está libre para su fecha"], ["desktop-agenda", "Agenda de vestidos: cada reserva bloquea su ventana sola"], ["state-reservation-success", "Reserva confirmada sin pasar por el Excel"]] },
  { n: 2, name: "Agenda y pre-cita", summary: "Agendar y pagar en un paso, con recordatorios y mensajes automáticos.", shots: [["desktop-hoy", "Las citas del día con su estado de pago"]] },
  { n: 3, name: "Seguimiento de la novia + Administración", summary: "La ficha de cada novia reemplaza el Libro. Abonos, facturas y fábrica avisan solos.", shots: [["desktop-movimientos", "Movimientos: qué vestido sale, vuelve o va a lavandería hoy"]] },
  { n: 4, name: "Recuperación y nutrición", summary: "Ninguna novia que se fue a pensarlo se queda sin un segundo contacto.", shots: [["state-seleccion", "La selección de la novia, para retomar la conversación"]] },
  { n: 5, name: "Mercadeo", summary: "Saber qué campaña trae vestidos reservados, no solo conversaciones.", shots: [] },
];

const SAMPLE_DRESSES = [
  { name: "Ambra", photo: "ambra", silhouette: "Princesa", size: 8, bookings: ["2027-02-13", "2027-05-22"] },
  { name: "Garnet", photo: "garnet", silhouette: "Princesa", size: 8, bookings: ["2027-03-27"] },
  { name: "Elena", photo: "elena", silhouette: "Línea A", size: 6, bookings: ["2027-01-16", "2027-04-10"] },
  { name: "Alda", photo: "alda", silhouette: "Sirena", size: 8, bookings: ["2027-02-27"] },
  { name: "Elliot", photo: "elliot", silhouette: "Sirena", size: 8, bookings: ["2027-03-06", "2027-06-12"] },
  { name: "Georgina", photo: "georgina", silhouette: "Línea A", size: 8, bookings: ["2027-01-30", "2027-04-24"] },
  { name: "Nuria", photo: "nuria", silhouette: "Línea A", size: 10, bookings: ["2027-05-08"] },
  { name: "Heidi", photo: "heidi", silhouette: "Sirena", size: 6, bookings: ["2027-02-06", "2027-03-20"] },
];

const DESTINATIONS = [
  { id: "bogota", label: "Bogotá", windowDays: 30, loanDays: 6 },
  { id: "colombia", label: "Otra ciudad", windowDays: 30, loanDays: 9 },
  { id: "exterior", label: "Exterior", windowDays: 45, loanDays: 15 },
];

const FUNNEL = [
  { value: "20-30", label: "chats al día por WhatsApp" },
  { value: "60-70", label: "citas agendadas al mes" },
  { value: "93 %", label: "llegan a su cita" },
  { value: "≈50 %", label: "eligen su vestido" },
  { value: "85-90 %", label: "de los cierres son alquiler" },
];

const WEDDINGS_PER_YEAR = [
  { year: "2024", value: 233 },
  { year: "2025", value: 261 },
  { year: "2026", value: 372, note: "incluye meses ya reservados" },
];

const FINDINGS = {
  manual: STEPS.filter(step => step.kind === "manual").length,
  rekey: STEPS.filter(step => step.rekey).length,
  risk: STEPS.filter(step => step.risk).length,
  tools: TOOLS.length,
  invoice: STEPS.filter(step => step.invoice).length,
};

const INVOICE_MOMENTS = [
  { step: "a5", moment: "Paga la cita", when: "Antes de venir a la tienda", per: "1 por cita", also: ["Calendario", "Libro de citas"] },
  { step: "k5", moment: "Reserva su vestido", when: "Al final de la cita", per: "1 por reserva", also: ["Contrato", "Libro de Novias"] },
  { step: "v6", moment: "Hace un abono", when: "Durante los meses de espera", per: "1 por cada abono", repeat: true, also: ["Libro de Novias"] },
  { step: "b3", moment: "Paga el saldo", when: "Cita de modista, o cuando llega un vestido nuevo", per: "1 por novia", also: ["Pagaré", "Libro de Novias"] },
];

const INVOICE_MONTH = [
  { label: "Citas pagadas", value: "60-70" },
  { label: "Reservas", value: "≈30-35" },
  { label: "Saldos de novias que se casan", value: "≈30" },
  { label: "Abonos", value: "sin contar" },
];
