const TERRITORIES = [
  ["choco", "Chocó"], ["quibdo", "Quibdó"], ["cali", "Cali"], ["cartagena", "Cartagena"], ["antioquia", "Antioquia"],
  ["barranquilla", "Barranquilla"], ["manizales", "Manizales"], ["santa-marta", "Santa Marta"], ["medellin", "Medellín"],
  ["meta", "Meta"], ["cundinamarca", "Cundinamarca"], ["cauca", "Cauca"], ["cucuta", "Cúcuta"], ["amazonas", "Amazonas"],
];

const SCHEDULE_GROUPS = [
  {
    code: "P1", name: "Plan de trabajo y gobierno", milestone: { week: 2, label: "Producto 1 aprobado · 15 %" },
    tasks: [
      { name: "Arranque y acuerdos de gobierno", from: 1, to: 1 },
      { name: "Revisión de insumos institucionales", from: 1, to: 2, aiRatio: 0.5 },
      { name: "Metodología, riesgos y plan de campo", from: 1, to: 2 },
    ],
  },
  {
    code: "P2", name: "Descubrimiento y diagnóstico de fuentes", milestone: { week: 6, label: "Producto 2 aprobado · 30 %" },
    tasks: [
      { name: "Entrevistas y talleres con usuarios", from: 2, to: 5, aiRatio: 0.55 },
      { name: "Sistema de captura de datos en territorio", from: 2, to: 4, aiRatio: 0.4 },
      { name: "Inventario y evaluación de fuentes públicas", from: 3, to: 6, aiRatio: 0.45 },
      { name: "Diagnóstico de presencia digital", from: 3, to: 4, aiRatio: 0.5 },
      { name: "Casos de uso priorizados y trazables", from: 5, to: 6, aiRatio: 0.5 },
    ],
  },
  {
    code: "P3", name: "Diseño integral y prototipo", milestone: { week: 10, label: "Producto 3 aprobado · 30 %" },
    tasks: [
      { name: "Requerimientos e historias de usuario", from: 5, to: 7, aiRatio: 0.45 },
      { name: "Arquitectura de información y datos", from: 6, to: 8 },
      { name: "Prototipo navegable (escritorio y móvil)", from: 6, to: 9, aiRatio: 0.4 },
      { name: "Mapa territorial, intranet y administración", from: 7, to: 9, aiRatio: 0.55 },
      { name: "Pruebas de usabilidad y WCAG 2.2 AA", from: 9, to: 10 },
    ],
  },
  {
    code: "P4", name: "Alternativas, presupuesto y hoja de ruta", milestone: { week: 12, label: "Producto 4 aprobado · 25 %" },
    tasks: [
      { name: "Arquitectura tecnológica y seguridad", from: 9, to: 10 },
      { name: "Tres alternativas con costos trazables", from: 10, to: 11, aiRatio: 0.5 },
      { name: "Hoja de ruta y especificaciones de fase 2", from: 11, to: 12, aiRatio: 0.5 },
    ],
  },
];

const BONUS_TASKS = [
  { name: "Validación con los 14 territorios", from: 4, to: 7 },
  { name: "Prototipo funcional sobre datos reales", from: 8, to: 12 },
];

const SCHEDULE_NOTES = {
  ai: "Las fechas de entrega no se mueven. La holgura que libera la IA se reinvierte en <strong>más territorios escuchados</strong>, <strong>más fuentes evaluadas</strong> y un <strong>prototipo funcional</strong> que deja la fase 2 adelantada.",
  base: "Sin apoyo de IA, levantamiento, diagnóstico y prototipado ocupan casi todo el calendario. Los hitos se cumplen, pero con <strong>menos territorios escuchados</strong> y un prototipo solo en diapositivas.",
};

const AI_FRONTS = [
  {
    label: "Levantamiento", title: "Entrevistas que se transcriben y se resumen solas",
    text: "Grabamos con consentimiento, la IA transcribe y propone hallazgos por perfil. Escuchamos a más personas sin ahogarnos en notas.",
    human: "El equipo de Anagrama revisa cada hallazgo contra la grabación.",
    before: "3 semanas", after: "4 días", ratio: 0.27,
  },
  {
    label: "Captura de datos", title: "Sistemas de captura listos en horas",
    text: "Formularios para líderes y secretarías, desde el celular y con respuestas en audio. Es la misma base que ya operamos en producción para comunidades.",
    human: "EdLab aprueba las preguntas y las reglas de privacidad antes de salir a campo.",
    before: "2 semanas", after: "2 días", ratio: 0.2,
  },
  {
    label: "Diagnóstico de fuentes", title: "Agentes que revisan bases públicas y llenan la matriz",
    text: "La IA revisa cobertura, formato, licencia y periodicidad de cada fuente pública y deja cada celda con su enlace de origen.",
    human: "El equipo de datos verifica cada celda y firma la matriz.",
    before: "4 semanas", after: "1,5 semanas", ratio: 0.38,
  },
  {
    label: "Síntesis e insights", title: "De cientos de respuestas a patrones por territorio",
    text: "Agrupamos necesidades, detectamos contradicciones entre perfiles y resumimos reportes largos, como los de lectura, en lenguaje sencillo.",
    human: "Cada síntesis se contrasta con las citas originales antes de priorizar casos de uso.",
    before: "2 semanas", after: "3 días", ratio: 0.3,
  },
  {
    label: "Prototipos", title: "Prototipos en código, no en diapositivas",
    text: "Probamos con usuarios algo que se siente real, iteramos entre sesiones y reutilizamos esa base cuando llegue la fase 2.",
    human: "Las pruebas de usabilidad y accesibilidad las conducen personas, con usuarios representativos.",
    before: "4 semanas", after: "1 semana", ratio: 0.25,
  },
];
