function renderKpis() {
  const atRisk = COMMUNITIES.filter(community => community.status === "risk").length;
  const kpis = [
    { label: "Comunidades", value: COMMUNITIES.length, delta: "14 de 14 activas", tone: "blue" },
    { label: "Líderes", value: sumCommunities("leaders"), delta: "+12 este trimestre" },
    { label: "Miembros", value: numberFormat.format(sumCommunities("members")), delta: "+8 % frente a junio" },
    { label: "Asistencia", value: `${averageCommunities("attendance")} %`, delta: "+4 puntos" },
    { label: "Avance de planes", value: `${averageCommunities("progress")} %`, delta: "7 planes consolidados" },
    { label: "En riesgo", value: atRisk, delta: "Requieren visita", tone: "risk" },
  ];
  document.getElementById("kpis").innerHTML = kpis
    .map((kpi, index) => `<div class="kpi${kpi.tone ? ` kpi--${kpi.tone}` : ""}" style="--i:${index}"><p>${kpi.label}</p><strong class="display">${kpi.value}</strong><span>${kpi.delta}</span></div>`)
    .join("");
}

function renderChips(containerId, options, onChoose) {
  const container = document.getElementById(containerId);
  container.innerHTML = options
    .map(([value, label, count], index) => `<button type="button" class="chip${index ? "" : " is-active"}" data-value="${value}" aria-pressed="${index === 0}">${label}${count === undefined ? "" : `<b>${count}</b>`}</button>`)
    .join("");
  container.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      container.querySelectorAll(".chip").forEach(other => {
        other.classList.toggle("is-active", other === chip);
        other.setAttribute("aria-pressed", String(other === chip));
      });
      onChoose(chip.dataset.value);
    });
  });
}

function renderCommunityRow(community, index) {
  return `<tr data-id="${community.id}" tabindex="0" style="--i:${index}">
    <td class="cell-name"><img src="img/territory/${community.id}.webp" alt="" width="36" height="36"><div><strong>${community.name}</strong><span>${community.type}</span></div></td>
    <td>${community.leader}</td>
    <td class="num">${community.leaders}</td>
    <td class="num">${community.members}</td>
    <td><div class="sessions">${renderSessionDots(community.sessions)}</div></td>
    <td><div class="mini-bar"><div class="progress"><i style="--value:${community.surveys}%"></i></div><span class="num">${community.surveys} %</span></div></td>
    <td><div class="mini-bar"><div class="progress"><i style="--value:${community.progress}%"></i></div><span class="num">${community.progress} %</span></div></td>
    <td><span class="status-pill status-pill--${community.status}">${STATUS_LABELS[community.status]}</span></td>
  </tr>`;
}

function renderCommunitiesTable(status) {
  const rows = COMMUNITIES.filter(community => status === "all" || community.status === status).sort((a, b) => a.progress - b.progress);
  const table = document.getElementById("communities-table");
  table.innerHTML = `<thead><tr><th>Comunidad</th><th>Líder principal</th><th class="num">Líderes</th><th class="num">Miembros</th><th>Sesiones</th><th>Encuestas</th><th>Avance del plan</th><th>Estado</th></tr></thead><tbody>${rows.map(renderCommunityRow).join("")}</tbody>`;
  table.querySelectorAll("tbody tr").forEach(row => {
    const open = () => { showView("map"); selectCommunity(row.dataset.id); };
    row.addEventListener("click", open);
    row.addEventListener("keydown", event => { if (event.key === "Enter") open(); });
  });
}

function getEngagementTone(value) {
  if (value >= 80) return "var(--ok)";
  if (value >= 60) return "var(--warn)";
  return "var(--risk)";
}

function renderPeople(role) {
  const visible = PEOPLE.filter(person => role === "all" || person.role === role);
  document.getElementById("people-grid").innerHTML = visible.map((person, index) => `
    <article class="person-card${person.role === "Líder" ? " person-card--leader" : ""}" style="--i:${index}">
      <span class="avatar">${getInitials(person.name)}</span>
      <div><strong>${person.name}</strong><span>${person.role} · ${communityNames[person.community]}</span></div>
      <span class="ring" style="--value:${person.engagement};--tone:${getEngagementTone(person.engagement)}" title="Participación"><b class="num">${person.engagement}</b></span>
      <p class="person-card__foot"><span>${person.org}</span><span>${person.lastSeen}</span></p>
    </article>`).join("");
}

function countBy(list, key, value) {
  return list.filter(item => item[key] === value).length;
}

function setupCommunityViews() {
  renderKpis();
  renderChips("status-filters", [["all", "Todas", COMMUNITIES.length], ["risk", "En riesgo", countBy(COMMUNITIES, "status", "risk")], ["warn", "Atención", countBy(COMMUNITIES, "status", "warn")], ["ok", "Al día", countBy(COMMUNITIES, "status", "ok")]], renderCommunitiesTable);
  renderCommunitiesTable("all");
  renderChips("role-filters", [["all", "Todos", PEOPLE.length], ["Líder", "Líderes", countBy(PEOPLE, "role", "Líder")], ["Co-líder", "Co-líderes", countBy(PEOPLE, "role", "Co-líder")], ["Miembro", "Miembros", countBy(PEOPLE, "role", "Miembro")]], renderPeople);
  renderPeople("all");
}
