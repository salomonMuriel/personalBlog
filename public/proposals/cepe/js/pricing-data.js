const PLANS = [
  {
    id: "fundamental",
    name: "Fundamental",
    price: 40000000,
    tagline: "Todo lo que piden los TdR, más un MVP funcional.",
    highlights: ["Hasta 20 entrevistas + hasta 20 asíncronas", "3 propuestas de diseño", "MVP con funciones básicas"],
  },
  {
    id: "ampliado",
    name: "Ampliado",
    price: 60000000,
    tagline: "Más voces, más diseños y un asistente de IA sobre la evidencia.",
    highlights: ["Hasta 30 entrevistas + hasta 30 asíncronas", "5 propuestas de diseño", "MVP + asistente de IA"],
    recommended: true,
  },
  {
    id: "integral",
    name: "Integral",
    price: 80000000,
    tagline: "La mayor cobertura y comunicación automatizada con los territorios.",
    highlights: ["Hasta 40 entrevistas + hasta 40 asíncronas", "8 propuestas de diseño", "MVP + IA + correos y WhatsApp"],
  },
];

const INCLUDED_IN_ALL = [
  "Los 4 productos de los TdR",
  "Tres alternativas de fase 2 con presupuesto trazable",
  "Evaluación de todas las fuentes públicas pertinentes",
  "Fichas de hallazgos por territorio",
  "Prototipo navegable en escritorio y móvil",
  "Pruebas con usuarios y WCAG 2.2 AA",
  "Herramienta de levantamiento con audio y síntesis IA",
  "Trazabilidad de evidencia a caso de uso",
  "Carga al Repositorio de Evidencia de todo el material de CEPE",
  "Código fuente, manuales de integración e instalación",
  "Capacitación para que su equipo haga cambios con IA",
];

const COMPARISON_GROUPS = [
  {
    title: "Levantamiento",
    rows: [
      ["Entrevistas sincrónicas", "Virtuales o presenciales en Bogotá; CEPE convoca y agenda a los participantes", ["hasta 20", "hasta 30", "hasta 40"]],
      ["Entrevistas asíncronas", "Con nuestra herramienta; CEPE convoca a los participantes", ["hasta 20", "hasta 30", "hasta 40"]],
      ["Talleres de cocreación", "Con Comunidades de Cambio y equipo EdLab", ["2", "3", "4"]],
    ],
  },
  {
    title: "Diseño",
    rows: [
      ["Propuestas de diseño del Hub", "Mockups con enfoques visuales distintos", ["3", "5", "8"]],
      ["Participantes en pruebas de usabilidad", "Usuarios representativos de cada perfil", ["5", "8", "12"]],
    ],
  },
  {
    title: "MVP funcional",
    rows: [
      ["MVP con las funciones básicas", "Repositorio de Evidencia, mapa territorial, intranet, gestor de contenidos y administración", [true, true, true]],
      ["Asistente de IA", "Preguntas sobre la plataforma, la evidencia y los datos, con fuentes citadas", [false, true, true]],
      ["Comunicaciones automatizadas", "Correos y mensajes de WhatsApp a los miembros de la plataforma", [false, false, true]],
      ["Tablero de analítica de uso", "Navegación, búsquedas, descargas y consultas", [false, true, true]],
    ],
  },
  {
    title: "Acompañamiento",
    rows: [
      ["Soporte técnico después de la entrega", "Acompañamiento al equipo de CEPE en el uso del MVP", ["1 mes", "2 meses", "3 meses"]],
      ["Horas de dudas y ajustes al MVP sin costo", "Durante el soporte; las horas adicionales se cobran por hora", ["4 h", "6 h", "8 h"]],
      ["Sesiones de transferencia", "Al equipo técnico y editorial de CEPE", ["1", "2", "3"]],
      ["Instalación en la infraestructura de CEPE", "Configuración en sus servidores y cuentas propias", [false, true, true]],
    ],
  },
];

const PAYMENTS = [
  { product: "Producto 1", name: "Plan de trabajo y gobierno", week: "Semana 2", share: 0.15 },
  { product: "Producto 2", name: "Descubrimiento y fuentes", week: "Semana 6", share: 0.3 },
  { product: "Producto 3", name: "Diseño, prototipo y MVP", week: "Semana 10", share: 0.3 },
  { product: "Producto 4", name: "Alternativas y hoja de ruta", week: "Semana 12", share: 0.25 },
];

const ASSUMPTIONS = [
  "Valores en pesos colombianos, más IVA.",
  "Pagos contra entrega y aprobación de cada producto, según la sección 13 de los TdR.",
  "Las cantidades de entrevistas son máximos. CEPE convoca y agenda a los participantes de entrevistas, talleres y encuestas asíncronas.",
  "Talleres virtuales o en Bogotá. Los viajes a territorio se acuerdan y cotizan aparte.",
  "El MVP sirve para validar con usuarios; no es código productivo y queda como base para la fase 2.",
  "Durante el soporte, las dudas y los ajustes al MVP se cobran por hora. Cada plan incluye 4, 6 u 8 horas sin costo.",
  "Vigencia de la oferta: 60 días.",
];
