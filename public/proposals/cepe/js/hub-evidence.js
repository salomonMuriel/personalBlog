const EVIDENCE_ICONS = { study: "i-book", program: "i-check", report: "i-form", gap: "i-map" };
const LEVEL_ORDER = ["high", "promising", "emerging", "descriptive"];
const SPECIAL_TERRITORIES = { national: "Nacional", international: "Internacional" };
const evidenceState = { query: "", type: "all", topic: "all", territory: "all", level: "all", sort: "recent" };
const openedSummaries = new Set();

function getTerritoryLabel(territory) {
  return SPECIAL_TERRITORIES[territory] || communityNames[territory];
}

function normalizeText(text) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function matchesEvidence(item) {
  const haystack = normalizeText(`${item.title} ${item.topic} ${getTerritoryLabel(item.territory)} ${item.source} ${EVIDENCE_TYPES[item.type].label}`);
  const query = normalizeText(evidenceState.query.trim());
  return (!query || query.split(/\s+/).every(word => haystack.includes(word)))
    && (evidenceState.type === "all" || item.type === evidenceState.type)
    && (evidenceState.topic === "all" || item.topic === evidenceState.topic)
    && (evidenceState.territory === "all" || item.territory === evidenceState.territory)
    && (evidenceState.level === "all" || item.level === evidenceState.level);
}

function sortEvidence(items) {
  const byRecent = (a, b) => b.year - a.year;
  const byLevel = (a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level);
  return [...items].sort(evidenceState.sort === "level" ? (a, b) => byLevel(a, b) || byRecent(a, b) : byRecent);
}

function renderLevelDots(level) {
  const total = 3;
  return Array.from({ length: total }, (_, index) => `<i class="${index < EVIDENCE_LEVELS[level].dots ? "is-on" : ""}"></i>`).join("");
}

function renderEvidenceCard(item, index) {
  const type = EVIDENCE_TYPES[item.type];
  const level = EVIDENCE_LEVELS[item.level];
  const isOpen = openedSummaries.has(item.id);
  return `
    <article class="evidence-card" data-id="${item.id}" style="--i:${index}">
      <span class="evidence-card__icon evidence-card__icon--${type.tone}"><svg class="icon"><use href="img/icons.svg#${EVIDENCE_ICONS[item.type]}"/></svg></span>
      <div class="evidence-card__body">
        <div class="tags">
          <span class="tag tag--${type.tone}">${type.label}</span>
          <span class="tag">${item.topic}</span>
          <span class="tag">${getTerritoryLabel(item.territory)}</span>
          <span class="tag">${item.year}</span>
          ${item.illustrative ? '<span class="tag tag--dashed">Ejemplo</span>' : ""}
        </div>
        <h3>${item.title}</h3>
        <p class="evidence-card__source">${item.source}</p>
        <p class="level" title="${level.hint}"><span class="level__dots" aria-hidden="true">${renderLevelDots(item.level)}</span>Nivel de evidencia: <strong>${level.label}</strong><small>${level.hint}</small></p>
        <div class="summary${isOpen ? " is-open" : ""}" id="summary-${item.id}"><div class="summary__inner">
          <span class="chip-ai"><svg class="icon"><use href="img/icons.svg#i-spark"/></svg>Resumen en lenguaje sencillo</span>
          <p data-full="${escapeHtml(item.summary)}">${isOpen ? item.summary : ""}</p>
          <small>Generado con IA y validado por EdLab.</small>
        </div></div>
      </div>
      <div class="evidence-card__actions">
        <button type="button" class="btn btn--small btn--ghost" data-summary="${item.id}" aria-expanded="${isOpen}" aria-controls="summary-${item.id}">${isOpen ? "Ocultar resumen" : "Resumen sencillo"}<span class="island"><svg class="icon"><use href="img/icons.svg#i-spark"/></svg></span></button>
        <button type="button" class="btn btn--small btn--navy" data-toast="Descarga simulada: ${escapeHtml(item.title)}">Descargar · ${item.format} ${item.size}<span class="island"><svg class="icon"><use href="img/icons.svg#i-download"/></svg></span></button>
        ${item.url ? `<a class="source-link" href="${item.url}" target="_blank" rel="noopener">Ver fuente original<svg class="icon"><use href="img/icons.svg#i-external"/></svg></a>` : ""}
      </div>
    </article>`;
}

function renderEvidenceList() {
  const visible = sortEvidence(EVIDENCE_ITEMS.filter(matchesEvidence));
  const list = document.getElementById("evidence-list");
  document.getElementById("evidence-count").textContent = visible.length === EVIDENCE_ITEMS.length ? `${EVIDENCE_ITEMS.length} documentos` : `${visible.length} de ${EVIDENCE_ITEMS.length} documentos`;
  if (!visible.length) {
    list.innerHTML = `<div class="empty"><strong class="display">Sin resultados</strong><p>Prueba con otra palabra o quita algún filtro.</p><button type="button" class="btn btn--small btn--navy" id="empty-reset">Limpiar filtros</button></div>`;
    document.getElementById("empty-reset").addEventListener("click", resetEvidenceFilters);
    return;
  }
  list.innerHTML = visible.map(renderEvidenceCard).join("");
}

function revealSummaryText(paragraph) {
  const fullText = paragraph.dataset.full;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { paragraph.textContent = fullText; return; }
  const words = fullText.split(" ");
  let shown = 0;
  const step = () => {
    shown += 2;
    paragraph.textContent = words.slice(0, shown).join(" ");
    if (shown < words.length) setTimeout(step, 22);
  };
  step();
}

function toggleSummary(id) {
  const summary = document.getElementById(`summary-${id}`);
  const button = document.querySelector(`[data-summary="${id}"]`);
  const willOpen = !summary.classList.contains("is-open");
  summary.classList.toggle("is-open", willOpen);
  button.setAttribute("aria-expanded", String(willOpen));
  button.firstChild.textContent = willOpen ? "Ocultar resumen" : "Resumen sencillo";
  if (!willOpen) { openedSummaries.delete(id); return; }
  openedSummaries.add(id);
  const paragraph = summary.querySelector("p");
  if (!paragraph.textContent) revealSummaryText(paragraph);
}

function fillSelect(selectId, options) {
  document.getElementById(selectId).innerHTML = options.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
}

function countEvidence(key, value) {
  return EVIDENCE_ITEMS.filter(item => item[key] === value).length;
}

function updateEvidence(key, value) {
  evidenceState[key] = value;
  renderEvidenceList();
}

function syncFilterControls() {
  document.getElementById("evidence-query").value = evidenceState.query;
  ["topic", "territory"].forEach(key => { document.getElementById(`filter-${key}`).value = evidenceState[key]; });
  document.getElementById("evidence-sort").value = evidenceState.sort;
  [["filter-type", "type"], ["filter-level", "level"]].forEach(([containerId, key]) => {
    document.querySelectorAll(`#${containerId} .chip`).forEach(chip => {
      const isActive = chip.dataset.value === evidenceState[key];
      chip.classList.toggle("is-active", isActive);
      chip.setAttribute("aria-pressed", String(isActive));
    });
  });
}

function resetEvidenceFilters() {
  Object.assign(evidenceState, { query: "", type: "all", topic: "all", territory: "all", level: "all" });
  syncFilterControls();
  renderEvidenceList();
}

function setEvidenceQuery(query) {
  evidenceState.query = query;
  syncFilterControls();
  renderEvidenceList();
}

function setupEvidence() {
  renderChips("filter-type", [["all", "Todos", EVIDENCE_ITEMS.length], ...Object.entries(EVIDENCE_TYPES).map(([key, type]) => [key, type.label, countEvidence("type", key)])], value => updateEvidence("type", value));
  renderChips("filter-level", [["all", "Todos"], ...Object.entries(EVIDENCE_LEVELS).map(([key, level]) => [key, level.label, countEvidence("level", key)])], value => updateEvidence("level", value));
  fillSelect("filter-topic", [["all", "Todos los temas"], [FOCUS_LEARNING, FOCUS_LEARNING], [FOCUS_SEL, FOCUS_SEL]]);
  fillSelect("filter-territory", [["all", "Todos los territorios"], ["national", "Nacional"], ["international", "Internacional"], ...COMMUNITIES.map(community => [community.id, community.name])]);
  document.getElementById("evidence-query").addEventListener("input", event => updateEvidence("query", event.target.value));
  document.getElementById("filter-topic").addEventListener("change", event => updateEvidence("topic", event.target.value));
  document.getElementById("filter-territory").addEventListener("change", event => updateEvidence("territory", event.target.value));
  document.getElementById("evidence-sort").addEventListener("change", event => updateEvidence("sort", event.target.value));
  document.getElementById("filter-reset").addEventListener("click", resetEvidenceFilters);
  document.getElementById("evidence-list").addEventListener("click", event => {
    const button = event.target.closest("[data-summary]");
    if (button) toggleSummary(button.dataset.summary);
  });
  renderEvidenceList();
}
