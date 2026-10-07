function setupScorecard() {
  const card = document.getElementById("scorecard");
  const numbers = [...card.querySelectorAll("[data-count]")];
  numbers.forEach(node => (node.textContent = "0"));
  onceVisible(card, () => numbers.forEach(node => countUp(node, FINDINGS[node.dataset.count])));
  card.addEventListener("click", event => {
    const item = event.target.closest("[data-filter]");
    if (!item) return;
    ProcessMap.setFilter(item.dataset.filter);
    document.getElementById("proceso").scrollIntoView({ behavior: "smooth" });
  });
}

function renderWeddings() {
  const chart = document.getElementById("weddings-chart");
  const max = Math.max(...WEDDINGS_PER_YEAR.map(item => item.value));
  chart.innerHTML = WEDDINGS_PER_YEAR.map((item, index) => `
    <div class="wchart__col" style="--h:${item.value / max}; --i:${index}">
      <b class="num">${item.value}</b>
      <span class="wchart__bar${item.note ? " is-partial" : ""}"></span>
      <span class="wchart__year">${item.year}</span>
    </div>`).join("");
  onceVisible(chart, () => chart.classList.add("is-drawn"));
}

function renderTools() {
  const container = document.getElementById("tools-grid");
  const groups = [["digital", "Digitales, cada una por su lado"], ["excel", "Hojas de Excel"], ["papel", "Papel"]];
  container.innerHTML = groups.map(([kind, title]) => {
    const items = TOOLS.filter(tool => tool.kind === kind);
    return `<div class="tools__group tools__group--${kind}"><p class="tools__title">${title}<span class="num">${items.length}</span></p><ul>${items.map((tool, index) => `<li class="reveal" style="--i:${index}">${icon(tool.icon)}${tool.name}</li>`).join("")}</ul></div>`;
  }).join("");
}

function renderHeatmap() {
  const grid = document.getElementById("heatmap");
  const head = `<div class="hm__row hm__row--head"><span></span>${HEAT_DIMENSIONS.map(dimension => `<span class="hm__dim">${dimension.label}</span>`).join("")}<span class="hm__dim">Total</span></div>`;
  const rows = CAJITAS.map((cajita, rowIndex) => {
    const total = HEAT_DIMENSIONS.reduce((sum, dimension) => sum + cajita.scores[dimension.key], 0);
    const cells = HEAT_DIMENSIONS.map((dimension, cellIndex) => {
      const score = cajita.scores[dimension.key];
      return `<span class="hm__cell s${score}" style="--d:${rowIndex * 4 + cellIndex}" title="${dimension.label}: ${SEVERITY[score]}">${SEVERITY[score]}</span>`;
    }).join("");
    const dots = Array.from({ length: 12 }, (_, index) => `<i class="${index < total ? "on" : ""}"></i>`).join("");
    return `<button type="button" class="hm__row" data-cajita="${cajita.id}"><span class="hm__name"><span class="num">${cajita.n}</span>${cajita.name}</span>${cells}<span class="hm__total" title="${total} de 12">${dots}</span></button>`;
  }).join("");
  grid.innerHTML = head + rows;
  onceVisible(grid, () => grid.classList.add("is-drawn"), 0.2);
  grid.addEventListener("click", event => {
    const row = event.target.closest("[data-cajita]");
    if (!row) return;
    Cajitas.open(row.dataset.cajita);
    document.getElementById("cajitas").scrollIntoView({ behavior: "smooth" });
  });
}

function renderInvoices() {
  const track = document.getElementById("invoice-track");
  track.innerHTML = INVOICE_MOMENTS.map((item, index) => `
    <li class="itrack__stop reveal${item.repeat ? " is-repeat" : ""}" style="--i:${index}">
      <span class="itrack__receipt">${icon("receipt")}</span>
      <p class="itrack__moment">${item.moment}</p>
      <p class="itrack__when">${item.when}</p>
      <p class="itrack__per num">${item.per}</p>
      <p class="itrack__also">Luego se anota en ${item.also.map(name => `<span>${name}</span>`).join("")}</p>
    </li>`).join("");
  document.getElementById("invoice-month").innerHTML = INVOICE_MONTH.map(part => `<div><dt class="num">${part.value}</dt><dd>${part.label}</dd></div>`).join("");
  document.querySelector("[data-show-filter]").addEventListener("click", event => {
    ProcessMap.setFilter(event.currentTarget.dataset.showFilter);
    document.getElementById("proceso").scrollIntoView({ behavior: "smooth" });
  });
}

setupScorecard();
renderInvoices();
renderWeddings();
renderTools();
renderHeatmap();
