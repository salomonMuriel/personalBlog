let typingTimer = null;

function typeSummaryLines(list, lines) {
  clearTimeout(typingTimer);
  list.innerHTML = "";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    lines.forEach(line => list.append(Object.assign(document.createElement("li"), { textContent: line })));
    return;
  }
  let lineIndex = 0;
  let charCount = 0;
  let item = null;
  const step = () => {
    if (lineIndex >= lines.length) return;
    if (!item) {
      item = document.createElement("li");
      item.className = "is-typing";
      list.append(item);
    }
    charCount += 3;
    item.textContent = lines[lineIndex].slice(0, charCount);
    if (charCount >= lines[lineIndex].length) {
      item.classList.remove("is-typing");
      item = null;
      charCount = 0;
      lineIndex += 1;
    }
    typingTimer = setTimeout(step, 14);
  };
  step();
}

function renderSessionDots(sessions) {
  return sessions.map(attended => `<i class="${attended ? "" : "is-missed"}" title="${attended ? "Asistió" : "No asistió"}"></i>`).join("");
}

function renderDetail(community) {
  const detail = document.getElementById("detail");
  detail.classList.remove("is-fresh");
  detail.innerHTML = `
    <div class="detail__head">
      <img src="img/territory/${community.id}.webp" alt="" width="64" height="64">
      <div><p class="detail__type">${community.type}</p><h2>${community.name}</h2></div>
      <span class="status-pill status-pill--${community.status}">${STATUS_LABELS[community.status]}</span>
    </div>
    <p class="detail__focus">Foco del plan: <strong>${community.focus}</strong></p>
    <dl class="detail__stats">
      <div><dt>Líderes</dt><dd class="display">${community.leaders}</dd></div>
      <div><dt>Miembros</dt><dd class="display">${community.members}</dd></div>
      <div><dt>Iniciativas</dt><dd class="display">${community.initiatives}</dd></div>
    </dl>
    <div class="detail__row"><p><span>Avance del plan territorial</span><b>${community.progress} %</b></p><div class="progress"><i style="--value:${community.progress}%"></i></div></div>
    <div class="detail__row"><p><span>Últimas 8 sesiones</span><b>${community.attendance} % de asistencia</b></p><div class="sessions">${renderSessionDots(community.sessions)}</div></div>
    <div class="detail__ai">
      <span class="chip-ai"><svg class="icon"><use href="img/icons.svg#i-spark"/></svg>Resumen IA · septiembre</span>
      <ul id="detail-summary"></ul>
      <p class="detail__sources">Fuentes: actas, encuestas y asistencia. Validado por EdLab.</p>
    </div>
    <div class="detail__leader"><span class="avatar">${getInitials(community.leader)}</span><div><strong>${community.leader}</strong><span>Líder principal</span></div></div>
    <div class="detail__actions">
      <button type="button" class="btn btn--small btn--navy" data-toast="Reporte simulado: se generaría un PDF para financiadores">Generar reporte<span class="island"><svg class="icon"><use href="img/icons.svg#i-download"/></svg></span></button>
      <button type="button" class="btn btn--small btn--ghost" data-go="people">Ver miembros</button>
    </div>`;
  requestAnimationFrame(() => detail.classList.add("is-fresh"));
  typeSummaryLines(document.getElementById("detail-summary"), AI_SUMMARIES[community.status]);
}

function selectCommunity(id) {
  markSelectedMarker(id);
  renderDetail(COMMUNITIES.find(community => community.id === id));
}
