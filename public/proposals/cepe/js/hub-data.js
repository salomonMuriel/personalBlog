const COLOMBIA_OUTLINE = [
  [-77.9, 7.2], [-77.35, 8.6], [-76.8, 8.65], [-76.1, 9.35], [-75.6, 10.4], [-74.85, 11.1], [-74.2, 11.3],
  [-73.3, 11.3], [-72.25, 11.85], [-71.35, 12.45], [-71.05, 11.9], [-71.9, 11.5], [-72.2, 11.1], [-72.85, 9.95],
  [-73.05, 9.2], [-72.45, 8.2], [-72.4, 7.4], [-71.9, 7.0], [-70.1, 7.0], [-69.4, 6.1], [-67.85, 6.3],
  [-67.45, 5.5], [-67.8, 4.5], [-67.3, 3.4], [-67.85, 2.8], [-67.2, 2.0], [-66.9, 1.2], [-67.9, 1.7],
  [-69.4, 1.1], [-69.85, 1.7], [-70.05, 0.6], [-69.45, 0.1], [-69.6, -0.9], [-69.4, -1.3], [-69.95, -4.2],
  [-70.7, -3.8], [-72.9, -2.4], [-73.6, -1.3], [-75.2, -0.1], [-76.1, 0.4], [-77.4, 0.8], [-78.85, 1.45],
  [-78.6, 2.6], [-77.65, 3.3], [-77.3, 4.0], [-77.4, 5.6], [-77.5, 6.7],
];

const FOCUS_LEARNING = "Aprendizajes fundamentales";
const FOCUS_SEL = "Habilidades sociales y emocionales";

const STATUS_LABELS = { ok: "Al día", warn: "Atención", risk: "En riesgo" };

const COMMUNITIES = [
  { id: "barranquilla", name: "Barranquilla", type: "ETC distrital", lon: -74.8, lat: 10.96, leaders: 14, members: 212, attendance: 91, surveys: 88, progress: 72, status: "ok", focus: FOCUS_LEARNING, leader: "Mariana Pérez Rueda", sessions: [1, 1, 1, 1, 1, 1, 0, 1], initiatives: 6 },
  { id: "cartagena", name: "Cartagena", type: "ETC distrital", lon: -75.51, lat: 10.39, leaders: 12, members: 184, attendance: 84, surveys: 79, progress: 64, status: "ok", focus: FOCUS_SEL, leader: "Andrés Julio Castro", sessions: [1, 1, 0, 1, 1, 1, 1, 1], initiatives: 5 },
  { id: "santa-marta", name: "Santa Marta", type: "ETC distrital", lon: -74.2, lat: 11.24, leaders: 9, members: 131, attendance: 72, surveys: 61, progress: 41, status: "warn", focus: FOCUS_LEARNING, leader: "Luz Dary Mendoza", sessions: [1, 0, 1, 1, 0, 1, 1, 0], initiatives: 3 },
  { id: "cucuta", name: "Cúcuta", type: "ETC municipal", lon: -72.5, lat: 7.9, leaders: 11, members: 158, attendance: 80, surveys: 74, progress: 58, status: "ok", focus: FOCUS_LEARNING, leader: "Jhon Fredy Ortega", sessions: [1, 1, 1, 0, 1, 1, 1, 1], initiatives: 4 },
  { id: "antioquia", name: "Antioquia", type: "ETC departamental", lon: -75.3, lat: 7.1, leaders: 18, members: 296, attendance: 88, surveys: 83, progress: 69, status: "ok", focus: FOCUS_SEL, leader: "Catalina Restrepo Uribe", sessions: [1, 1, 1, 1, 1, 0, 1, 1], initiatives: 7 },
  { id: "medellin", name: "Medellín", type: "ETC distrital", lon: -75.57, lat: 6.25, leaders: 16, members: 251, attendance: 93, surveys: 90, progress: 77, status: "ok", focus: FOCUS_SEL, leader: "Santiago Gil Arango", sessions: [1, 1, 1, 1, 1, 1, 1, 1], initiatives: 8 },
  { id: "choco", name: "Chocó", type: "ETC departamental", lon: -77.0, lat: 6.6, leaders: 8, members: 97, attendance: 58, surveys: 42, progress: 28, status: "risk", focus: FOCUS_LEARNING, leader: "Yesenia Palacios Mosquera", sessions: [1, 0, 0, 1, 0, 1, 0, 0], initiatives: 2 },
  { id: "quibdo", name: "Quibdó", type: "ETC municipal", lon: -76.66, lat: 5.69, leaders: 7, members: 88, attendance: 66, surveys: 55, progress: 37, status: "warn", focus: FOCUS_LEARNING, leader: "Hárold Rentería Córdoba", sessions: [1, 1, 0, 1, 0, 1, 1, 0], initiatives: 3 },
  { id: "manizales", name: "Manizales", type: "ETC municipal", lon: -75.51, lat: 5.07, leaders: 10, members: 142, attendance: 90, surveys: 86, progress: 74, status: "ok", focus: FOCUS_SEL, leader: "Paula Andrea Giraldo", sessions: [1, 1, 1, 1, 1, 1, 1, 0], initiatives: 5 },
  { id: "cundinamarca", name: "Cundinamarca", type: "ETC departamental", lon: -74.1, lat: 4.75, leaders: 15, members: 233, attendance: 82, surveys: 77, progress: 61, status: "ok", focus: FOCUS_LEARNING, leader: "Camilo Andrés Rojas", sessions: [1, 1, 1, 0, 1, 1, 1, 1], initiatives: 6 },
  { id: "meta", name: "Meta", type: "ETC departamental", lon: -73.1, lat: 3.6, leaders: 9, members: 124, attendance: 74, surveys: 68, progress: 49, status: "warn", focus: FOCUS_LEARNING, leader: "Diana Marcela Pardo", sessions: [1, 1, 0, 1, 1, 0, 1, 1], initiatives: 3 },
  { id: "cali", name: "Cali", type: "ETC distrital", lon: -76.52, lat: 3.45, leaders: 17, members: 268, attendance: 86, surveys: 81, progress: 66, status: "ok", focus: FOCUS_SEL, leader: "Valentina Cuero Angulo", sessions: [1, 1, 1, 1, 0, 1, 1, 1], initiatives: 7 },
  { id: "cauca", name: "Cauca", type: "ETC departamental", lon: -76.75, lat: 2.4, leaders: 11, members: 149, attendance: 63, surveys: 51, progress: 34, status: "risk", focus: FOCUS_LEARNING, leader: "Edwin Yace Pechené", sessions: [0, 1, 0, 1, 1, 0, 0, 1], initiatives: 3 },
  { id: "amazonas", name: "Amazonas", type: "ETC departamental", lon: -71.4, lat: -1.6, leaders: 6, members: 71, attendance: 69, surveys: 58, progress: 39, status: "warn", focus: FOCUS_SEL, leader: "Rosa Elvira Tananta", sessions: [1, 0, 1, 1, 0, 1, 1, 0], initiatives: 2 },
];

const AI_SUMMARIES = {
  ok: [
    "La comunidad sostiene asistencia alta y ya reporta resultados de la primera medición de su plan.",
    "Los docentes piden más material para el aula; tres instituciones quieren replicar la iniciativa líder.",
    "Recomendación: invitarla a compartir su experiencia en la próxima sesión nacional.",
  ],
  warn: [
    "La participación bajó en las últimas dos sesiones, sobre todo entre rectores rurales.",
    "Los líderes mencionan conectividad y distancias como barrera principal para asistir.",
    "Recomendación: habilitar sesiones híbridas y levantamiento por celular con audio.",
  ],
  risk: [
    "Tres sesiones sin quórum en el último mes y encuestas por debajo del 55 %.",
    "El cambio de secretario de educación frenó la aprobación del plan territorial.",
    "Recomendación: visita de acompañamiento de EdLab y reunión con la nueva administración.",
  ],
};

const PEOPLE = [
  { name: "Mariana Pérez Rueda", role: "Líder", org: "Secretaría de Educación", community: "barranquilla", engagement: 96, lastSeen: "Hoy" },
  { name: "Santiago Gil Arango", role: "Líder", org: "Secretaría de Educación", community: "medellin", engagement: 94, lastSeen: "Hoy" },
  { name: "Valentina Cuero Angulo", role: "Líder", org: "Universidad del Valle", community: "cali", engagement: 91, lastSeen: "Ayer" },
  { name: "Catalina Restrepo Uribe", role: "Líder", org: "Secretaría de Educación", community: "antioquia", engagement: 89, lastSeen: "Hoy" },
  { name: "Luis Carlos Mosquera", role: "Co-líder", org: "IE Normal Superior", community: "quibdo", engagement: 62, lastSeen: "Hace 9 días" },
  { name: "Ana Milena Herrera", role: "Miembro", org: "Fundación aliada", community: "cartagena", engagement: 84, lastSeen: "Hace 2 días" },
  { name: "Yesenia Palacios Mosquera", role: "Líder", org: "Secretaría de Educación", community: "choco", engagement: 48, lastSeen: "Hace 16 días" },
  { name: "Jorge Iván Salazar", role: "Miembro", org: "Rector · IE rural", community: "manizales", engagement: 88, lastSeen: "Ayer" },
  { name: "Edwin Yace Pechené", role: "Líder", org: "Secretaría de Educación", community: "cauca", engagement: 51, lastSeen: "Hace 12 días" },
  { name: "Daniela Ospina Toro", role: "Co-líder", org: "Universidad de Caldas", community: "manizales", engagement: 92, lastSeen: "Hoy" },
  { name: "Rosa Elvira Tananta", role: "Líder", org: "Secretaría de Educación", community: "amazonas", engagement: 67, lastSeen: "Hace 6 días" },
  { name: "Camilo Andrés Rojas", role: "Líder", org: "Secretaría de Educación", community: "cundinamarca", engagement: 85, lastSeen: "Hace 3 días" },
  { name: "Nelly Johana Barrios", role: "Miembro", org: "Docente · IE urbana", community: "santa-marta", engagement: 58, lastSeen: "Hace 11 días" },
  { name: "Jhon Fredy Ortega", role: "Líder", org: "Secretaría de Educación", community: "cucuta", engagement: 81, lastSeen: "Ayer" },
  { name: "Diana Marcela Pardo", role: "Líder", org: "Secretaría de Educación", community: "meta", engagement: 70, lastSeen: "Hace 5 días" },
  { name: "Felipe Arrieta Díaz", role: "Miembro", org: "Sector privado", community: "barranquilla", engagement: 77, lastSeen: "Hace 4 días" },
];

const SURVEY_QUESTIONS = [
  "¿Qué información te hace falta para tomar decisiones en tu comunidad?",
  "¿Qué evidencia has usado en el último año y qué tan fácil fue encontrarla?",
  "¿Qué te impide participar en las sesiones de la Comunidad de Cambio?",
];

const SURVEY_THEMES = [
  { theme: "Retroalimentación sobre lo que se reporta", mentions: 142, quote: "Mandamos el reporte y nunca sabemos si alguien lo leyó." },
  { theme: "Acceso a evidencia en lenguaje sencillo", mentions: 118, quote: "Los estudios son buenos, pero no tengo tiempo de leer 80 páginas." },
  { theme: "Comparación con otros territorios", mentions: 97, quote: "Quiero saber qué le funcionó a Cali antes de inventarme algo." },
  { theme: "Conectividad para participar", mentions: 64, quote: "Desde la vereda la reunión virtual se cae a los diez minutos." },
  { theme: "Datos desagregados por institución", mentions: 51, quote: "El dato departamental no me dice nada de mi colegio." },
];

const CHAT_EXCHANGES = [
  {
    question: "¿Qué comunidades necesitan acompañamiento este mes y por qué?",
    answer: "Dos comunidades están <b>en riesgo</b> y una bajando:<br><br><b>Chocó</b>: asistencia de 58 % y tres sesiones sin quórum. El cambio de secretario frenó el plan.<br><b>Cauca</b>: encuestas en 51 %; los líderes rurales citan distancias y conectividad.<br><b>Quibdó</b>: el avance del plan se estancó en 37 %.<br><br>Sugiero una visita de EdLab a Chocó y levantamiento por celular con audio en Cauca.",
    sources: ["Tablero de comunidades", "Encuesta de necesidades · 312 respuestas", "Actas CdC Chocó"],
  },
  {
    question: "Resume para el comité de financiadores el avance del trimestre",
    answer: "<b>Trimestre jul–sep 2026 (datos ilustrativos)</b><br><br>• 14 Comunidades de Cambio activas, con seguimiento de asistencia, encuestas y planes.<br>• Medellín y Barranquilla superan el 70 % de avance de su plan territorial.<br>• Tres territorios requieren acompañamiento presencial.<br>• Principal pedido: evidencia en lenguaje sencillo y comparación entre pares.<br><br>¿Lo exporto como documento con gráficos para enviar?",
    sources: ["Tablero de comunidades", "Planes territoriales", "Síntesis de levantamiento"],
  },
  {
    question: "¿Qué dice el reporte de lectura sobre Barranquilla?",
    answer: "Del Repositorio de Evidencia: <b>Resultados de las evaluaciones de lectura en Colombia (EGRA 2023–2025)</b>.<br><br>• En 2024 se evaluaron <b>6.530 estudiantes</b> de grados 1 y 2 en Barranquilla.<br>• <b>42 %</b> de primero y <b>28 %</b> de segundo están en alto riesgo de rezago.<br>• Hay avances frente a 2022, pero persisten brechas por grado, edad, origen y condiciones de la escuela.<br><br>Barranquilla trabaja el foco de aprendizajes fundamentales. ¿Quieres ver la ficha completa?",
    sources: ["Repositorio de Evidencia · Banco Mundial y CEPE, 2026", "Iniciativas por territorio"],
  },
];

const numberFormat = new Intl.NumberFormat("es-CO");
const communityNames = Object.fromEntries(COMMUNITIES.map(community => [community.id, community.name]));

function sumCommunities(field) {
  return COMMUNITIES.reduce((total, community) => total + community[field], 0);
}

function averageCommunities(field) {
  return Math.round(sumCommunities(field) / COMMUNITIES.length);
}

function getInitials(fullName) {
  return fullName.split(" ").slice(0, 2).map(part => part[0]).join("");
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}
