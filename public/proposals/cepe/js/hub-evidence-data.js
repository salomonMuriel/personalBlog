const EVIDENCE_TYPES = {
  study: { label: "Estudio", tone: "blue" },
  program: { label: "Revisión de programa", tone: "green" },
  report: { label: "Reporte de aprendizaje", tone: "orange" },
  gap: { label: "Mapa de brechas", tone: "pink" },
};

const EVIDENCE_LEVELS = {
  high: { label: "Alto", dots: 3, hint: "Equivale a SELect en CASEL" },
  promising: { label: "Prometedor", dots: 2, hint: "Equivale a Promising en CASEL" },
  emerging: { label: "Emergente", dots: 1, hint: "Evidencia inicial o en construcción" },
  descriptive: { label: "Descriptivo", dots: 0, hint: "Diagnóstico, no mide efectos" },
};

const CASEL_URL = "https://pg.casel.org/review-programs/";
const CASEL_SELECT_TEXT = "CASEL lo designa SELect: muestra evidencia de efectividad al más alto nivel, apoya el crecimiento social y emocional en las cinco competencias y ofrece programación de varios años.";
const CASEL_PROMISING_TEXT = "CASEL lo designa Promising: muestra evidencia de efectividad y apoya el crecimiento social y emocional en al menos dos competencias.";
const CASEL_LOCAL_NOTE = "Antes de adoptarlo en un territorio, conviene validar cómo funcionaría en el contexto local.";

const caselItem = (id, title, level) => ({
  id, type: "program", title, topic: FOCUS_SEL, territory: "international", year: 2026, level,
  source: "CASEL · Guía de Programas", format: "Ficha", size: "1 pág.", url: CASEL_URL,
  summary: `${level === "high" ? CASEL_SELECT_TEXT : CASEL_PROMISING_TEXT} ${CASEL_LOCAL_NOTE}`,
});

const EVIDENCE_ITEMS = [
  {
    id: "egra", type: "report", title: "Resultados de las evaluaciones de lectura en Colombia (EGRA 2023–2025)",
    topic: FOCUS_LEARNING, territory: "barranquilla", year: 2026, level: "descriptive",
    source: "Banco Mundial y CEPE", format: "PDF", size: "2,4 MB",
    url: "https://www.bancomundial.org/es/country/colombia/publication/resultados-evaluaciones-de-lectura-en-colombia",
    summary: "Entre 2023 y 2025 se aplicó EGRA en grados 1 a 3 de colegios públicos, midiendo fluidez lectora, comprensión oral y comprensión de lectura. En Barranquilla (2024) se evaluaron 6.530 estudiantes de grados 1 y 2: el 42 % de primero y el 28 % de segundo están en alto riesgo de rezago. Hay avances frente a 2022, pero persisten brechas por grado, edad, origen y condiciones de la escuela. La recomendación es intervenir temprano, con acciones dirigidas y sostenidas.",
  },
  caselItem("casel-paths", "PATHS · Promoting Alternative THinking Strategies", "high"),
  caselItem("casel-second-step", "Second Step Elementary", "high"),
  caselItem("casel-responsive", "Responsive Classroom", "high"),
  caselItem("casel-als-pals", "Al's Pals", "high"),
  caselItem("casel-mindup", "MindUP", "high"),
  caselItem("casel-zippy", "Zippy's Friends", "promising"),
  {
    id: "gap-learning", type: "gap", title: "Mapa de brechas de evidencia: aprendizajes fundamentales", topic: FOCUS_LEARNING, territory: "national", year: 2026, level: "emerging",
    source: "EdLab · Ejemplo ilustrativo", format: "PDF", size: "3,1 MB", illustrative: true,
    summary: "Ejemplo de cómo se vería un mapa de brechas: muestra qué intervenciones de lectura y matemáticas tempranas tienen mucha evidencia, cuáles poca y dónde casi no hay estudios, por ejemplo en contextos rurales dispersos.",
  },
  {
    id: "gap-sel", type: "gap", title: "Mapa de brechas de evidencia: habilidades sociales y emocionales", topic: FOCUS_SEL, territory: "national", year: 2026, level: "emerging",
    source: "EdLab · Ejemplo ilustrativo", format: "PDF", size: "2,7 MB", illustrative: true,
    summary: "Ejemplo de mapa de brechas para habilidades sociales y emocionales: cruza programas, edades y contextos para ver dónde hay evidencia sólida y dónde faltan estudios en territorios colombianos.",
  },
  {
    id: "study-tutoring", type: "study", title: "Tutorías en grupos pequeños para lectura inicial", topic: FOCUS_LEARNING, territory: "meta", year: 2025, level: "promising",
    source: "Ejemplo ilustrativo", format: "PDF", size: "1,8 MB", illustrative: true,
    summary: "Ejemplo de estudio: compara estudiantes con y sin tutorías en grupos pequeños. Muestra mejoras en lectura temprana y advierte que hace falta seguimiento más largo para saber si se sostienen.",
  },
  {
    id: "study-teachers", type: "study", title: "Acompañamiento a docentes en aula multigrado rural", topic: FOCUS_LEARNING, territory: "cauca", year: 2025, level: "emerging",
    source: "Ejemplo ilustrativo", format: "PDF", size: "2,2 MB", illustrative: true,
    summary: "Ejemplo de estudio con pocos casos: describe cómo el acompañamiento en aula ayuda a docentes rurales. Es una evidencia inicial que sirve para plantear un piloto, no para generalizar.",
  },
  {
    id: "study-sel-cali", type: "study", title: "Convivencia escolar y habilidades socioemocionales en colegios de Cali", topic: FOCUS_SEL, territory: "cali", year: 2025, level: "promising",
    source: "Ejemplo ilustrativo", format: "PDF", size: "1,5 MB", illustrative: true,
    summary: "Ejemplo de estudio: relaciona actividades de convivencia con mejores climas de aula en colegios de una ciudad. Los resultados son alentadores y piden una segunda medición.",
  },
  {
    id: "report-territories", type: "report", title: "Aprendizajes fundamentales por territorio: panorama comparado", topic: FOCUS_LEARNING, territory: "national", year: 2026, level: "descriptive",
    source: "EdLab · Ejemplo ilustrativo", format: "PDF", size: "4,0 MB", illustrative: true,
    summary: "Ejemplo de reporte comparado: pone lado a lado los resultados de lectura de varios territorios para que cada Comunidad de Cambio vea dónde está frente a sus pares.",
  },
  {
    id: "report-choco", type: "report", title: "Diagnóstico de participación en la Comunidad de Cambio de Chocó", topic: FOCUS_SEL, territory: "choco", year: 2026, level: "descriptive",
    source: "EdLab · Ejemplo ilustrativo", format: "PDF", size: "1,2 MB", illustrative: true,
    summary: "Ejemplo de reporte interno: resume asistencia, barreras de conectividad y el efecto del cambio de administración en el plan territorial.",
  },
];
