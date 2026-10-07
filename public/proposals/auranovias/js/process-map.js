const KIND_ICON = { novia: "heart", digital: "check-circle", manual: "hand-grabbing", vacio: "eye-slash" };
const KIND_LABEL = { novia: "Lo hace la novia", digital: "Ya es digital", manual: "Paso a mano", vacio: "Hueco: nadie lo hace" };
const cajitaName = id => CAJITAS.find(cajita => cajita.id === id).name;
const laneName = id => LANES.find(lane => lane.id === id).label;
const stageName = id => STAGES.find(stage => stage.id === id).label;

const ProcessMap = (() => {
  const map = document.getElementById("process-map");
  const detail = document.getElementById("process-detail");
  const filterGroup = document.getElementById("process-filters");
  const playButton = document.getElementById("process-play");
  let playTimer = null;

  function nodeMarkup(step) {
    const classes = ["node", `node--${step.kind}`, step.rekey ? "is-rekey" : "", step.risk ? "is-risk" : "", step.invoice ? "is-invoice" : ""].join(" ");
    const badges = `${step.invoice ? `<span class="node__badge node__badge--invoice" title="Factura hecha a mano">${icon("receipt")}</span>` : ""}${step.rekey ? `<span class="node__badge" title="Se vuelve a escribir un dato">${icon("copy")}</span>` : ""}${step.risk ? `<span class="node__badge node__badge--risk" title="Punto de error">${icon("warning")}</span>` : ""}`;
    return `<button type="button" class="${classes}" data-id="${step.id}">${icon(KIND_ICON[step.kind], "icon node__icon")}<span class="node__text">${step.text}</span>${badges}</button>`;
  }

  function stageCounts(stageId) {
    const inStage = STEPS.filter(step => step.stage === stageId);
    return {
      manual: inStage.filter(step => step.kind === "manual").length,
      rekey: inStage.filter(step => step.rekey).length,
      risk: inStage.filter(step => step.risk).length,
    };
  }

  function render() {
    const header = `<div class="pm__row pm__row--head"><div class="pm__corner"></div>${LANES.map(lane => { const manual = STEPS.filter(step => step.lane === lane.id && step.kind === "manual").length; return `<div class="pm__lane">${lane.label}${manual ? `<span class="pm__lane-count">${icon("hand-grabbing")}<b class="num">${manual}</b></span>` : ""}</div>`; }).join("")}</div>`;
    const rows = STAGES.map((stage, index) => {
      const counts = stageCounts(stage.id);
      const cells = LANES.map(lane => {
        const steps = STEPS.filter(step => step.stage === stage.id && step.lane === lane.id);
        return `<div class="pm__cell" data-lane="${lane.label}">${steps.map(nodeMarkup).join("")}</div>`;
      }).join("");
      const tally = `<span class="pm__tally" title="Pasos a mano">${icon("hand-grabbing")}<b class="num">${counts.manual}</b></span>${counts.risk ? `<span class="pm__tally pm__tally--risk" title="Puntos de error">${icon("warning")}<b class="num">${counts.risk}</b></span>` : ""}`;
      return `<div class="pm__row reveal" style="--i:${index}" data-stage="${stage.id}"><div class="pm__stage"><span class="num pm__n">${String(index + 1).padStart(2, "0")}</span><b>${stage.label}</b><span class="pm__when">${stage.when}</span><span class="pm__tallies">${tally}</span></div>${cells}</div>`;
    }).join("");
    map.innerHTML = header + rows;
  }

  function showStep(step) {
    map.querySelectorAll(".node.is-selected").forEach(node => node.classList.remove("is-selected"));
    map.querySelector(`.node[data-id="${step.id}"]`)?.classList.add("is-selected");
    detail.innerHTML = `
      <p class="pd__where">${stageName(step.stage)}<span>${laneName(step.lane)}</span></p>
      <h3 class="pd__title">${step.text}</h3>
      <p class="pd__body">${step.detail}</p>
      <dl class="pd__facts">
        <div><dt>Tipo</dt><dd><span class="sw sw--${step.kind}"></span>${KIND_LABEL[step.kind]}</dd></div>
        <div><dt>Herramienta</dt><dd>${step.tool}</dd></div>
        <div><dt>Cajita</dt><dd>${cajitaName(step.cajita)}</dd></div>
      </dl>
      ${step.invoice ? `<p class="pd__flag">${icon("receipt")}Factura hecha a mano</p>` : ""}
      ${step.rekey ? `<p class="pd__flag">${icon("copy")}Se vuelve a escribir un dato que ya existía</p>` : ""}
      ${step.risk ? `<p class="pd__flag pd__flag--risk">${icon("warning")}${step.risk}</p>` : ""}`;
    detail.classList.add("is-filled");
  }

  function showStage(stageId) {
    const counts = stageCounts(stageId);
    const stage = STAGES.find(item => item.id === stageId);
    const risks = STEPS.filter(step => step.stage === stageId && step.risk);
    detail.innerHTML = `
      <p class="pd__where">Etapa ${STAGES.indexOf(stage) + 1} de ${STAGES.length}<span>${stage.when}</span></p>
      <h3 class="pd__title">${stage.label}</h3>
      <div class="pd__counts">
        <p><b class="num">${counts.manual}</b>pasos a mano</p>
        <p><b class="num">${counts.rekey}</b>datos reescritos</p>
        <p><b class="num">${counts.risk}</b>puntos de error</p>
      </div>
      ${risks.map(step => `<p class="pd__flag pd__flag--risk">${icon("warning")}${step.risk}</p>`).join("")}`;
    detail.classList.add("is-filled");
  }

  function setFilter(filter) {
    map.dataset.filter = filter;
    filterGroup.querySelectorAll("button").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.filter === filter)));
  }

  function stopTour() {
    clearInterval(playTimer);
    playTimer = null;
    delete map.dataset.active;
    map.querySelectorAll(".pm__row.is-current").forEach(row => row.classList.remove("is-current"));
    playButton.setAttribute("aria-pressed", "false");
    playButton.querySelector(".label").textContent = "Recorrer etapa por etapa";
  }

  function startTour() {
    let index = 0;
    const highlight = () => {
      map.querySelectorAll(".pm__row.is-current").forEach(row => row.classList.remove("is-current"));
      map.querySelector(`.pm__row[data-stage="${STAGES[index].id}"]`).classList.add("is-current");
      showStage(STAGES[index].id);
      index++;
      if (index > STAGES.length) stopTour();
    };
    map.dataset.active = "true";
    playButton.setAttribute("aria-pressed", "true");
    playButton.querySelector(".label").textContent = "Detener recorrido";
    highlight();
    playTimer = setInterval(() => (index < STAGES.length ? highlight() : stopTour()), 2200);
  }

  function bind() {
    map.addEventListener("click", event => {
      const node = event.target.closest(".node");
      if (node) { stopTour(); showStep(STEPS.find(step => step.id === node.dataset.id)); return; }
      const stageCell = event.target.closest(".pm__stage");
      if (stageCell) { stopTour(); showStage(stageCell.parentElement.dataset.stage); }
    });
    filterGroup.addEventListener("click", event => {
      const button = event.target.closest("button");
      if (button) setFilter(button.dataset.filter);
    });
    playButton.addEventListener("click", () => (playTimer ? stopTour() : startTour()));
  }

  function renderFilterCounts() {
    filterGroup.querySelector('[data-filter="manual"] .num').textContent = FINDINGS.manual;
    filterGroup.querySelector('[data-filter="rekey"] .num').textContent = FINDINGS.rekey;
    filterGroup.querySelector('[data-filter="risk"] .num').textContent = FINDINGS.risk;
    filterGroup.querySelector('[data-filter="invoice"] .num').textContent = FINDINGS.invoice;
  }

  render();
  renderFilterCounts();
  bind();
  setFilter("all");
  return { setFilter };
})();
