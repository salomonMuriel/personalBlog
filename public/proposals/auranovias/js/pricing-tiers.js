const PricingTiers = (() => {
  const container = document.getElementById("plan-detail");

  function replacedSteps(module) {
    if (!module.steps.length) return "";
    const steps = module.steps.map(id => STEPS.find(step => step.id === id));
    return `<ul class="tmod__gone">${steps.map(step => `<li>${icon("hand-grabbing")}<s>${step.text}</s></li>`).join("")}</ul>`;
  }

  function renderModule(module) {
    return `<li class="tmod">
      <span class="tmod__icon">${icon(module.icon)}</span>
      <div><b>${module.name}</b><p>${module.detail}</p>${replacedSteps(module)}</div>
    </li>`;
  }

  function renderVisual(plan) {
    if (plan.shot) {
      const [file, caption] = plan.shot;
      return `<figure class="tier__shot"><img src="img/prototipo/${file}.webp" alt="${caption}" loading="lazy"><figcaption>${caption}</figcaption></figure>`;
    }
    return `<a class="tier__shot tier__shot--bride" href="#experiencia"><img src="img/vestidos/elena-1.webp" alt="" loading="lazy"><span>Ver la experiencia de la novia${icon("arrow-down")}</span></a>`;
  }

  function renderTier(plan, index) {
    const removed = plan.modules.flatMap(module => module.steps).length;
    return `<article class="tier" data-tier="${index}">
      <header class="tier__head">
        <span class="tier__mark">${icon("check")}</span>
        <h3>${plan.title}</h3>
        <span class="tier__plan">${index === 0 ? "Base de todos los planes" : `Se suma desde ${plan.name}`}</span>
        <span class="tier__steps num">−${removed} pasos</span>
      </header>
      <div class="tier__body">
        ${renderVisual(plan)}
        <ul class="tier__mods">${plan.modules.map(renderModule).join("")}</ul>
      </div>
      <button type="button" class="tier__add" data-plan="${index}">
        <span>${plan.modules.map(module => module.name).join(", ")}</span>
        <b>Agregar con ${plan.name}${icon("arrow-right")}</b>
      </button>
    </article>`;
  }

  function render() {
    container.innerHTML = `
      <div class="tiers__head">
        <p>Lo que incluye <b id="tiers-plan"></b></p>
        <p class="tiers__total"><b class="num" id="tiers-total"></b>pasos a mano menos</p>
      </div>
      ${PLANS.map(renderTier).join("")}`;
    container.addEventListener("click", event => {
      const button = event.target.closest(".tier__add");
      if (button) selectPlan(Number(button.dataset.plan));
    });
  }

  function setPlan(index) {
    document.getElementById("tiers-plan").textContent = PLANS[index].name;
    document.getElementById("tiers-total").textContent = stepsRemovedUpTo(index);
    container.querySelectorAll(".tier").forEach(tier => {
      const tierIndex = Number(tier.dataset.tier);
      tier.classList.toggle("is-on", tierIndex <= index);
      tier.classList.toggle("is-new", tierIndex === index && index > 0);
    });
  }

  render();
  return { setPlan };
})();
