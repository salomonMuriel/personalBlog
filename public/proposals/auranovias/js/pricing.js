const copFormat = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
const millionsFormat = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 1 });

function formatMillions(value) {
  return millionsFormat.format(value / 1000000);
}

function stepsRemovedBy(plan) {
  return plan.modules.flatMap(module => module.steps).length;
}

function stepsRemovedUpTo(index) {
  return PLANS.slice(0, index + 1).reduce((total, plan) => total + stepsRemovedBy(plan), 0);
}

function renderPlanCard(plan, index) {
  const pains = plan.pains.map(item => `<li>${icon("x")}<span>${item}</span></li>`).join("");
  const badge = plan.recommended ? '<span class="plan__badge">Recomendado</span>' : "";
  const added = index > 0 ? `<span class="plan__added">${stepsRemovedBy(plan)} más que ${PLANS[index - 1].name}</span>` : "";
  return `<button type="button" class="plan reveal" style="--i:${index}" data-plan="${index}" aria-pressed="false">
    ${badge}
    <span class="plan__name">${plan.name}</span>
    <span class="plan__price"><span class="num">$${formatMillions(plan.price)}</span><span class="plan__unit">millones</span></span>
    <span class="plan__vat">COP</span>
    <span class="plan__saves"><b class="num">${stepsRemovedUpTo(index)}</b><span class="plan__saves-text"><span>pasos a mano que desaparecen</span>${added}</span></span>
    <span class="plan__ends">Se acaba</span>
    <ul class="plan__list">${pains}</ul>
    <span class="plan__extras"><span>${icon("chalkboard-teacher")}Capacitación en IA para el equipo</span><span>${icon("wrench")}${plan.supportMonths} ${plan.supportMonths === 1 ? "mes" : "meses"} de arreglos sin costo</span><span>${icon("clock")}${plan.changeHours} horas de cambios incluidas</span></span>
    <span class="plan__select"><span class="plan__radio" aria-hidden="true"></span><span class="plan__select-label"></span></span>
  </button>`;
}

function renderPlans() {
  document.getElementById("pricing-plans").innerHTML = PLANS.map(renderPlanCard).join("");
}

function renderCell(value) {
  if (value === true) return `<span class="cmp__yes" aria-label="Incluido">${icon("check")}</span>`;
  if (value === false) return '<span class="cmp__no" aria-label="No incluido"></span>';
  return `<span class="num">${value}</span>`;
}

function renderComparison() {
  const head = `<thead><tr><th scope="col"><span class="sr-only">Componente</span></th>${PLANS.map((plan, index) => `<th scope="col" data-col="${index}">${plan.name}<small class="num">$${formatMillions(plan.price)} M</small></th>`).join("")}</tr></thead>`;
  const firstPlanWith = values => values.findIndex(value => value !== false);
  const body = COMPARISON_GROUPS.map(group => {
    const ordered = [...group.rows].sort((a, b) => firstPlanWith(a[2]) - firstPlanWith(b[2]));
    const rows = ordered.map(([label, note, values]) => `<tr>
      <th scope="row"><span class="cmp__label">${label}</span><span class="cmp__note">${note}</span></th>
      ${values.map((value, index) => `<td data-col="${index}">${renderCell(value)}</td>`).join("")}
    </tr>`).join("");
    return `<tbody><tr class="cmp__group"><th colspan="4" scope="colgroup">${group.title}</th></tr>${rows}</tbody>`;
  }).join("");
  const removed = `<tbody><tr class="cmp__total"><th scope="row"><span class="cmp__label">Pasos a mano que desaparecen</span></th>${PLANS.map((_, index) => `<td data-col="${index}"><span class="num">${stepsRemovedUpTo(index)}</span></td>`).join("")}</tr></tbody>`;
  document.getElementById("pricing-table").innerHTML = `<caption class="sr-only">Comparación de los tres planes</caption>${head}${removed}${body}`;
}

function deliveryStages(index) {
  let week = 1;
  const stages = DELIVERIES.filter(delivery => delivery.plan <= index).map(delivery => {
    const stage = { name: delivery.name, weeks: delivery.weeks, label: `Semana ${week} y ${week + 1}` };
    week += delivery.weeks;
    return stage;
  });
  stages.push({ name: "Ajustes finales", weeks: ADJUSTMENT_WEEKS, label: `Semana ${week}`, isAdjustment: true });
  return stages;
}

function renderDeliveries(index) {
  const stages = deliveryStages(index);
  const totalWeeks = stages.reduce((total, stage) => total + stage.weeks, 0);
  const track = document.getElementById("delivery-track");
  track.style.gridTemplateColumns = stages.map(stage => `${stage.weeks}fr`).join(" ");
  track.innerHTML = stages.map((stage, stageIndex) => `<li class="${stage.isAdjustment ? "is-adjust" : ""}" style="--i:${stageIndex}">
    <span class="dlv__weeks num">${stage.label}</span>
    <span class="dlv__bar" aria-hidden="true"></span>
    <b>${stage.name}</b>
  </li>`).join("");
  const plan = PLANS[index];
  const releases = stages.filter(stage => !stage.isAdjustment);
  const perRelease = (plan.price * (1 - UPFRONT_SHARE)) / releases.length;
  const schedule = [["Al iniciar", plan.price * UPFRONT_SHARE], ...releases.map(stage => [`Entrega: ${stage.name}`, perRelease])];
  document.getElementById("pricing-total").innerHTML = `
    <p><span>Plan ${plan.name}</span><strong class="num">${copFormat.format(plan.price)}</strong><small>COP</small></p>
    <p class="dlv__weeks-total">Tiempo de entrega<b class="num">${totalWeeks} semanas</b></p>
    <dl>${schedule.map(([label, amount]) => `<div><dt>${label}</dt><dd class="num">${copFormat.format(amount)}</dd></div>`).join("")}</dl>`;
}

function renderTerms() {
  document.getElementById("pricing-included").innerHTML = INCLUDED_IN_ALL.map(item => `<li>${icon(item.icon)}${item.text}</li>`).join("");
  document.getElementById("pricing-assumptions").innerHTML = ASSUMPTIONS.map(item => `<li>${item}</li>`).join("");
}

function renderDock() {
  const dock = document.getElementById("plan-dock");
  dock.innerHTML = PLANS.map((plan, index) => `<button type="button" data-plan="${index}" aria-pressed="false"><b>${plan.name}</b><span class="num">$${formatMillions(plan.price)} M</span></button>`).join("");
  dock.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (button) selectPlan(Number(button.dataset.plan));
  });
  const cards = document.getElementById("pricing-plans");
  let pastCards = false;
  let atClosing = false;
  const update = () => dock.classList.toggle("is-shown", pastCards && !atClosing);
  new IntersectionObserver(([entry]) => {
    pastCards = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    update();
  }).observe(cards);
  new IntersectionObserver(([entry]) => {
    atClosing = entry.isIntersecting;
    update();
  }, { rootMargin: "0px 0px -30% 0px" }).observe(document.getElementById("plan-ctas"));
}

function sectionInView() {
  return [...document.querySelectorAll("main > section")].find(section => section.getBoundingClientRect().bottom > window.innerHeight / 2);
}

function selectPlan(selectedIndex) {
  const anchor = sectionInView();
  const anchorTop = anchor ? anchor.getBoundingClientRect().top : 0;
  document.querySelectorAll("#plan-dock button").forEach((button, index) => button.setAttribute("aria-pressed", String(index === selectedIndex)));
  document.querySelectorAll(".plan").forEach((card, index) => {
    const isSelected = index === selectedIndex;
    card.setAttribute("aria-pressed", String(isSelected));
    card.querySelector(".plan__select-label").textContent = isSelected ? "Seleccionado" : "Ver este plan";
  });
  document.getElementById("pricing-table").dataset.selected = String(selectedIndex);
  PricingTiers.setPlan(selectedIndex);
  renderDeliveries(selectedIndex);
  PricingStrip.setPlan(selectedIndex);
  PricingCta.setPlan(selectedIndex);
  if (anchor) window.scrollBy({ top: anchor.getBoundingClientRect().top - anchorTop, behavior: "instant" });
}

function setupPricing() {
  renderPlans();
  renderDock();
  renderComparison();
  renderTerms();
  document.getElementById("pricing-plans").addEventListener("click", event => {
    const card = event.target.closest(".plan");
    if (card) selectPlan(Number(card.dataset.plan));
  });
  selectPlan(PLANS.findIndex(plan => plan.recommended));
}

setupPricing();
