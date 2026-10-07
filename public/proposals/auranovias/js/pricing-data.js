const PLANS = [
  {
    id: "esencial",
    name: "Esencial",
    price: 5600000,
    supportMonths: 1,
    changeHours: 2,
    title: "Inventario y asesoría",
    tagline: "La novia llega y en la tablet ya está todo lo que se le puede ofrecer.",
    pains: ["Recorrer los Excel mes por mes la noche anterior", "Preguntarle a Medellín por WhatsApp si hay un vestido", "Dejar a la novia sola para revisar el Excel", "Copiar el formulario a la hoja de vida", "Buscar el precio en otro Excel"],
    shot: ["tablet-asesoria", "Asesoría en tablet con el perfil de la novia y los vestidos disponibles"],
    modules: [
      { icon: "dress", name: "Catálogo único", detail: "Vestidos, velos y mangas, cada copia con talla, tienda y precio por modalidad. Bogotá, Medellín y lista para Cali.", steps: ["v2"] },
      { icon: "calendar-blank", name: "Disponibilidad automática", detail: "Bloqueos según producto y destino. El sistema no deja reservar lo que ya está prometido y revisa alquileres futuros antes de vender de stock.", steps: ["p2", "p3", "q3"] },
      { icon: "clipboard-text", name: "Citas con el perfil precargado", detail: "Cada cita de Calendly llega con lo que la novia ya escribió y con la lista de lo que hay para ella.", steps: ["p1", "p4"] },
      { icon: "device-tablet", name: "Asesoría en tablet", detail: "Filtros por talla, silueta, presupuesto y fecha en las dos tiendas. Favoritos, vestidos medidos y medidas.", steps: ["q2", "q4"] },
      { icon: "seal-check", name: "Cierre guiado", detail: "Modalidad, tiempos, precio, descuentos permitidos y plan de pagos. La reserva bloquea vestido, velo y mangas, y calcula días de préstamo y cita de modista.", steps: ["k1", "k2", "k6"] },
      { icon: "lock-key", name: "Usuarios por rol", detail: "Usuario y contraseña para cada persona del equipo, en las tablets y en el computador.", steps: [] },
    ],
  },
  {
    id: "operacion",
    name: "Operación",
    price: 9400000,
    supportMonths: 2,
    changeHours: 4,
    title: "Pagos, contrato y ficha de novia",
    tagline: "Del pago de la cita a la devolución del vestido, sin papel.",
    pains: ["Los martes en la mañana buscando quién pagó", "Contrato y pagaré en papel", "El Libro de Novias", "Preguntar dónde está cada vestido", "Anotar las urgencias como notas en el Excel"],
    recommended: true,
    shot: ["desktop-movimientos", "Movimientos de cada vestido: en tienda, con la novia o en lavandería"],
    modules: [
      { icon: "credit-card", name: "Pago de la cita en un paso", detail: "Enlace de pago para los 100 mil, recordatorios y el cupo se libera solo si no paga a tiempo.", steps: ["a3", "a4", "a6"] },
      { icon: "signature", name: "Contrato y pagaré digitales", detail: "Las cuatro plantillas se llenan solas con los datos y las medidas. Firma en la tablet y copia por correo o WhatsApp.", steps: ["k3"] },
      { icon: "notebook", name: "Ficha de novia", detail: "Reemplaza el Libro de Novias: consecutivo automático, vestido, fechas y cada pago registrado una sola vez, con el saldo al día y un recordatorio antes de su fecha límite.", steps: ["v1", "v3", "a7"] },
      { icon: "washing-machine", name: "Movimientos del vestido", detail: "En tienda, con la novia, en lavandería o en la otra tienda. Urgencias calculadas con la próxima reserva y depósito registrado.", steps: ["e4", "e5"] },
    ],
  },
  {
    id: "completo",
    name: "Completo",
    price: 14500000,
    supportMonths: 3,
    changeHours: 6,
    title: "La experiencia de la novia y el negocio en datos",
    tagline: "Cada novia vive su proceso acompañada y dirección ve todo el negocio.",
    pains: ["Cada factura hecha a mano, más de 120 al mes", "Arrastrar videos y PDFs chat por chat", "Revisar el calendario para confirmar cada cita de modista", "Seguir los pedidos a fábrica de memoria", "Pasar la cuenta por chat para cada abono"],
    shot: null,
    modules: [
      { icon: "heart", name: "Mi boda Aura", detail: "Una página para cada novia con su vestido, sus fechas, lo que ha pagado, el botón para abonar, beneficios y recursos.", steps: [] },
      { icon: "whatsapp-logo", name: "Mensajes a la novia", detail: "Por WhatsApp y sin arrastrar nada a mano: bienvenida con los beneficios de los aliados, tips de novia, confirmación de modista, recogida y devolución.", steps: ["a8", "v4", "b1"] },
      { icon: "receipt", name: "Facturación electrónica automática", detail: "Cada pago genera su factura sin escribir nada a mano, conectada con el software contable.", steps: ["a5", "k5", "v6", "b3", "a9"] },
      { icon: "factory", name: "Pedidos a fábrica", detail: "Alquiler estrene y compra nueva con fecha de pedido y alertas de retraso. Cuando llega el vestido, la novia recibe su saldo y su fecha.", steps: ["v7"] },
      { icon: "chart-bar", name: "Tablero de analítica", detail: "Cierres por asesora, modalidades, vestidos que no rotan, ocupación de los próximos meses y saldos por cobrar.", steps: [] },
      { icon: "presentation-chart", name: "Reportes de gerencia", detail: "Cada semana y cada mes llega a dirección cómo le fue al negocio: citas agendadas y atendidas, alquileres y ventas cerrados, tasa de cierre general y por asesora, ingresos y saldos por cobrar.", steps: [] },
    ],
  },
];

const OUT_OF_SCOPE = [
  { steps: ["c2", "c3", "v8"], label: "Mercadeo y página web", note: "Otra cajita" },
  { steps: ["f1", "f2"], label: "Seguimiento de novias que no cerraron", note: "Otra cajita" },
  { steps: ["e1", "e3"], label: "Entrega y revisión del vestido", note: "Siguen en manos del taller" },
];

const INCLUDED_IN_ALL = [
  { icon: "file-text", text: "Diagnóstico del proceso completo y documentación" },
  { icon: "lightning", text: "Primera entrega funcionando en tienda en dos semanas" },
  { icon: "arrows-left-right", text: "Una semana final de ajustes, sin costo" },
  { icon: "chalkboard-teacher", text: "Capacitación en IA para todo el equipo" },
  { icon: "code-block", text: "Código y cuentas a nombre de Aura Novias" },
  { icon: "x", text: "Sin suscripción mensual y sin depender de nosotros" },
];

const COMPARISON_GROUPS = [
  {
    title: "Inventario y asesoría",
    rows: [
      ["Catálogo único de vestidos, velos y mangas", "Las dos tiendas, lista para Cali", [true, true, true]],
      ["Disponibilidad automática", "Reservas sin choques y revisión antes de vender de stock", [true, true, true]],
      ["Citas con el perfil precargado", "Conectado con Calendly", [true, true, true]],
      ["Asesoría y cierre en tablet", "Filtros, favoritos, medidas, precio y plan de pagos", [true, true, true]],
    ],
  },
  {
    title: "Pagos y documentos",
    rows: [
      ["Pago de la cita con enlace", "Recordatorios y liberación automática del cupo", [false, true, true]],
      ["Contrato y pagaré digitales", "Firma en la tablet y copia a la novia", [false, true, true]],
      ["Pagos y saldo de cada novia", "Cada pago registrado una sola vez", [false, true, true]],
      ["Facturación electrónica automática", "Una factura por cada pago, sin hacerla a mano", [false, false, true]],
    ],
  },
  {
    title: "Seguimiento de la novia",
    rows: [
      ["Ficha de novia", "Reemplaza el Libro de Novias", [false, true, true]],
      ["Movimientos del vestido", "Dónde está cada vestido y qué es urgente", [false, true, true]],
      ["Pedidos a fábrica con alertas", "Alquiler estrene y compra nueva", [false, false, true]],
    ],
  },
  {
    title: "La experiencia de la novia",
    rows: [
      ["Mensajes a la novia por WhatsApp", "Bienvenida, beneficios, tips y recordatorios de su proceso", [false, false, true]],
      ["Mi boda Aura", "La página de cada novia", [false, false, true]],
    ],
  },
  {
    title: "Dirección",
    rows: [
      ["Tablero de analítica", "Cierres, rotación, ocupación y saldos", [false, false, true]],
      ["Reportes de gerencia", "Cada semana y cada mes: citas, alquileres, ventas y tasas de cierre", [false, false, true]],
    ],
  },
  {
    title: "Acompañamiento",
    rows: [
      ["Capacitación en IA para el equipo", "Una sesión con todas las personas que quieran incluir", ["1 h", "1 h", "1 h"]],
      ["Arreglos sin costo", "Si algo entregado no funciona como se acordó", ["1 mes", "2 meses", "3 meses"]],
      ["Horas de cambios incluidas", "Para pedidos nuevos o distintos durante esos meses", ["2 h", "4 h", "6 h"]],
      ["Tiempo total de entrega", "Entregas de dos semanas y una semana final de ajustes", ["3 semanas", "5 semanas", "7 semanas"]],
    ],
  },
];

const DELIVERIES = [
  { name: "Inventario y asesoría", weeks: 2, plan: 0 },
  { name: "Pagos, contrato y ficha de novia", weeks: 2, plan: 1 },
  { name: "La experiencia de la novia y el negocio en datos", weeks: 2, plan: 2 },
];

const ADJUSTMENT_WEEKS = 1;
const UPFRONT_SHARE = 0.4;

const ASSUMPTIONS = [
  "Valores en pesos colombianos.",
  "40 % al iniciar y el resto en partes iguales con cada entrega funcionando en tienda.",
  "Los costos de servicios de terceros corren por cuenta de Aura Novias: servidor, base de datos, mensajes de WhatsApp, pasarela de pago y facturación electrónica. Para el volumen actual son bajos o casi cero.",
  "Aura Novias entrega el catálogo con sus referencias, los precios, los contratos y las reservas vigentes.",
  "Si algo falla, respuesta en 24 horas hábiles.",
  "Arreglo es algo entregado que no funciona como se acordó, y no consume horas. Cambio es algo nuevo o distinto a lo acordado.",
  "Las horas de cambios se usan durante los meses de arreglos sin costo de cada plan.",
  "Cambios adicionales y soporte después de esos meses: USD 100 por hora en días hábiles y USD 200 por hora en fines de semana y festivos.",
  "El taller de modistas, el mercadeo y la página web quedan para otras cajitas.",
  "Vigencia de la oferta: 30 días.",
];
