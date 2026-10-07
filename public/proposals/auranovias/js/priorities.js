function setupMatrix() {
  const svg = document.getElementById("matrix");
  const list = document.getElementById("matrix-list");
  const info = document.getElementById("matrix-info");
  const width = 760;
  const height = 520;
  const pad = { left: 56, right: 24, top: 24, bottom: 56 };
  const x = effort => pad.left + ((effort - 1) / 3) * (width - pad.left - pad.right);
  const y = impact => height - pad.bottom - ((impact - 2) / 3.2) * (height - pad.top - pad.bottom);
  const midX = x(2.5);
  const midY = y(3.6);
  const phaseClass = phase => (phase === 1 ? "p1" : phase === 2 ? "p2" : phase === 3 ? "p3" : "p4");

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svgElement("rect", { x: pad.left, y: pad.top, width: midX - pad.left, height: midY - pad.top, class: "mx__quick" }, svg);
  svgElement("line", { x1: midX, x2: midX, y1: pad.top, y2: height - pad.bottom, class: "mx__axis" }, svg);
  svgElement("line", { x1: pad.left, x2: width - pad.right, y1: midY, y2: midY, class: "mx__axis" }, svg);
  [["Victorias rápidas", pad.left + 12, pad.top + 22], ["Proyectos clave", midX + 12, pad.top + 22], ["Cuando haya tiempo", pad.left + 12, height - pad.bottom - 12], ["Después", midX + 12, height - pad.bottom - 12]].forEach(([text, tx, ty]) => {
    const label = svgElement("text", { x: tx, y: ty, class: "mx__quad" }, svg);
    label.textContent = text;
  });
  const xLabel = svgElement("text", { x: (pad.left + width - pad.right) / 2, y: height - 16, "text-anchor": "middle", class: "mx__axis-label" }, svg);
  xLabel.textContent = "Esfuerzo para construirlo →";
  const yLabel = svgElement("text", { x: 18, y: (pad.top + height - pad.bottom) / 2, "text-anchor": "middle", transform: `rotate(-90 18 ${(pad.top + height - pad.bottom) / 2})`, class: "mx__axis-label" }, svg);
  yLabel.textContent = "Impacto en la operación →";

  OPPORTUNITIES.forEach((item, index) => {
    const group = svgElement("g", { class: `mx__bubble ${phaseClass(item.phase)}`, "data-id": item.id, tabindex: 0, style: `--i:${index}; transform-origin:${x(item.effort)}px ${y(item.impact)}px` }, svg);
    svgElement("circle", { cx: x(item.effort), cy: y(item.impact), r: 12 + item.removes.length * 3 }, group);
    const number = svgElement("text", { x: x(item.effort), y: y(item.impact) + 4, "text-anchor": "middle" }, group);
    number.textContent = index + 1;
  });

  list.innerHTML = OPPORTUNITIES.map((item, index) => `<li><button type="button" data-id="${item.id}"><span class="num mx__n ${phaseClass(item.phase)}">${index + 1}</span>${item.name}</button></li>`).join("");

  const select = id => {
    const item = OPPORTUNITIES.find(opportunity => opportunity.id === id);
    svg.querySelectorAll(".mx__bubble").forEach(bubble => bubble.classList.toggle("is-active", bubble.dataset.id === id));
    list.querySelectorAll("button").forEach(button => button.classList.toggle("is-active", button.dataset.id === id));
    const removed = item.removes.map(stepId => STEPS.find(step => step.id === stepId));
    info.innerHTML = `
      <p class="mi__phase">Etapa ${item.phase} de la hoja de ruta<span>${cajitaName(item.cajita)}</span></p>
      <h3>${item.name}</h3>
      <p class="mi__removes"><b class="num">${item.removes.length}</b> pasos que dejan de hacerse a mano</p>
      <ul>${removed.map(step => `<li>${icon(step.risk ? "warning" : "hand-grabbing")}${step.text}</li>`).join("")}</ul>`;
  };

  svg.addEventListener("click", event => { const bubble = event.target.closest(".mx__bubble"); if (bubble) select(bubble.dataset.id); });
  svg.addEventListener("keydown", event => { if (event.key === "Enter" && event.target.dataset.id) select(event.target.dataset.id); });
  svg.addEventListener("mouseover", event => { const bubble = event.target.closest(".mx__bubble"); if (bubble) select(bubble.dataset.id); });
  list.addEventListener("click", event => { const button = event.target.closest("button"); if (button) select(button.dataset.id); });
  list.addEventListener("mouseover", event => { const button = event.target.closest("button"); if (button) select(button.dataset.id); });

  onceVisible(svg, () => svg.classList.add("is-drawn"), 0.25);
  select("o1");
}

function setupRoadmap() {
  const tabs = document.getElementById("roadmap-tabs");
  const panel = document.getElementById("roadmap-panel");
  const removedByPhase = n => OPPORTUNITIES.filter(item => item.phase <= n).flatMap(item => item.removes);

  tabs.innerHTML = PHASES.map(phase => `<button type="button" data-phase="${phase.n}"><span class="num">${phase.n}</span>${phase.name}</button>`).join("");

  const show = n => {
    const phase = PHASES.find(item => item.n === n);
    const items = OPPORTUNITIES.filter(item => item.phase === n);
    const cumulative = new Set(removedByPhase(n));
    const manualIds = STEPS.filter(step => step.kind === "manual" || step.kind === "vacio").map(step => step.id);
    const squares = manualIds.map(id => `<i class="${cumulative.has(id) ? "on" : ""}" title="${STEPS.find(step => step.id === id).text}"></i>`).join("");
    const shots = phase.shots.length
      ? `<figure class="rp__shot"><div class="rp__frame"><img src="img/prototipo/${phase.shots[0][0]}.webp" alt="${phase.shots[0][1]}" loading="lazy"></div><figcaption>${phase.shots[0][1]}</figcaption>${phase.shots.length > 1 ? `<div class="rp__thumbs">${phase.shots.map(([file, caption], index) => `<button type="button" data-shot="${file}" data-caption="${caption}" aria-pressed="${index === 0}"><img src="img/prototipo/${file}.webp" alt="" loading="lazy"></button>`).join("")}</div>` : ""}</figure>`
      : `<div class="rp__noshot">${icon("chart-bar")}<p>Tablero de origen de cada novia, costo por cierre y modalidad por campaña.</p></div>`;
    panel.innerHTML = `
      <div class="rp__text">
        <h3>${phase.name}</h3>
        <p>${phase.summary}</p>
        <ul class="rp__items">${items.map(item => `<li>${icon("sparkle")}${item.name}</li>`).join("")}</ul>
        <div class="rp__progress"><p><b class="num">${cumulative.size}</b> de ${manualIds.length} pasos a mano o sin dueño resueltos al terminar esta etapa</p><div class="rp__squares">${squares}</div></div>
      </div>
      ${shots}`;
    tabs.querySelectorAll("button").forEach(button => button.setAttribute("aria-pressed", String(Number(button.dataset.phase) === n)));
  };

  tabs.addEventListener("click", event => { const button = event.target.closest("button"); if (button) show(Number(button.dataset.phase)); });
  panel.addEventListener("click", event => {
    const thumb = event.target.closest("[data-shot]");
    if (!thumb) return;
    const figure = thumb.closest(".rp__shot");
    figure.querySelector(".rp__frame img").src = `img/prototipo/${thumb.dataset.shot}.webp`;
    figure.querySelector("figcaption").textContent = thumb.dataset.caption;
    figure.querySelectorAll("[data-shot]").forEach(button => button.setAttribute("aria-pressed", String(button === thumb)));
  });
  show(1);
}

setupMatrix();
setupRoadmap();
