const copFormat = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

function formatMillions(value) {
  return `${value / 1000000} M`;
}

function renderIncluded() {
  document.getElementById("pricing-included").innerHTML = INCLUDED_IN_ALL
    .map(item => `<li><svg class="icon"><use href="img/icons.svg#i-check"/></svg>${item}</li>`)
    .join("");
}

function renderPlanCard(plan, index) {
  const highlights = plan.highlights.map(item => `<li>${item}</li>`).join("");
  const badge = plan.recommended ? '<span class="plan__badge">Recomendado</span>' : "";
  return `<button type="button" class="plan plan--${plan.id} reveal" style="--i:${index}" data-plan="${index}" aria-pressed="false">
    ${badge}
    <span class="plan__name">${plan.name}</span>
    <span class="plan__price"><span class="display num">$${plan.price / 1000000}</span><span class="plan__unit">millones</span></span>
    <span class="plan__vat">COP + IVA</span>
    <span class="plan__tagline">${plan.tagline}</span>
    <ul class="plan__list">${highlights}</ul>
    <span class="plan__select"><span class="plan__radio" aria-hidden="true"></span><span class="plan__select-label"></span></span>
  </button>`;
}

function renderPlans() {
  document.getElementById("pricing-plans").innerHTML = PLANS.map(renderPlanCard).join("");
}

function renderCell(value) {
  if (value === true) return '<span class="cmp__yes" aria-label="Incluido"><svg class="icon"><use href="img/icons.svg#i-check"/></svg></span>';
  if (value === false) return '<span class="cmp__no" aria-label="No incluido">—</span>';
  return `<span class="num">${value}</span>`;
}

function renderComparison() {
  const head = `<thead><tr><th scope="col"><span class="sr-only">Componente</span></th>${PLANS.map((plan, index) => `<th scope="col" data-col="${index}">${plan.name}<small class="num">$${formatMillions(plan.price)}</small></th>`).join("")}</tr></thead>`;
  const body = COMPARISON_GROUPS.map(group => {
    const rows = group.rows.map(([label, note, values]) => `<tr>
      <th scope="row"><span class="cmp__label">${label}</span><span class="cmp__note">${note}</span></th>
      ${values.map((value, index) => `<td data-col="${index}">${renderCell(value)}</td>`).join("")}
    </tr>`).join("");
    return `<tbody><tr class="cmp__group"><th colspan="4" scope="colgroup">${group.title}</th></tr>${rows}</tbody>`;
  }).join("");
  document.getElementById("pricing-table").innerHTML = `<caption class="sr-only">Comparación de los tres planes</caption>${head}${body}`;
}

function renderPayments(plan) {
  document.getElementById("pricing-payments").innerHTML = PAYMENTS.map((payment, index) => `<li style="--share:${payment.share}; --i:${index}">
    <span class="pay__bar" aria-hidden="true"></span>
    <span class="pay__meta">${payment.product} · ${payment.week}</span>
    <strong class="pay__name">${payment.name}</strong>
    <span class="pay__amount num">${copFormat.format(plan.price * payment.share)}</span>
    <span class="pay__share num">${Math.round(payment.share * 100)} %</span>
  </li>`).join("");
  document.getElementById("pricing-total").innerHTML = `<span>Total ${plan.name}</span><strong class="num">${copFormat.format(plan.price)} <small>+ IVA</small></strong>`;
}

function renderAssumptions() {
  document.getElementById("pricing-assumptions").innerHTML = ASSUMPTIONS.map(item => `<li>${item}</li>`).join("");
}

function selectPlan(selectedIndex) {
  document.querySelectorAll(".plan").forEach((card, index) => {
    const isSelected = index === selectedIndex;
    card.setAttribute("aria-pressed", String(isSelected));
    card.querySelector(".plan__select-label").textContent = isSelected ? "Seleccionado" : "Ver este plan";
  });
  document.getElementById("pricing-table").dataset.selected = String(selectedIndex);
  renderPayments(PLANS[selectedIndex]);
}

function setupPricing() {
  renderIncluded();
  renderPlans();
  renderComparison();
  renderAssumptions();
  document.querySelectorAll(".plan").forEach(card => {
    card.addEventListener("click", () => selectPlan(Number(card.dataset.plan)));
  });
  selectPlan(PLANS.findIndex(plan => plan.recommended));
}

setupPricing();
