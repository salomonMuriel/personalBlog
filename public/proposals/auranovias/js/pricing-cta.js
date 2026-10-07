const WHATSAPP_NUMBER = "573132465100";
const ctaPriceFormat = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

const PricingCta = (() => {
  const container = document.getElementById("plan-ctas");

  function whatsappLink(plan) {
    const message = `¡Hola, Salo! Ya vimos todo y queremos el plan ${plan.name}. ¿Cómo empezamos?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function stepsRemoved(index) {
    return PLANS.slice(0, index + 1).flatMap(plan => plan.modules.flatMap(module => module.steps)).length;
  }

  container.innerHTML = PLANS.map((plan, index) => `
    <a class="pcta reveal" style="--i:${index}" data-plan="${index}" href="${whatsappLink(plan)}" target="_blank" rel="noopener">
      <span class="pcta__name">${plan.name}</span>
      <span class="pcta__price num">${ctaPriceFormat.format(plan.price)}</span>
      <span class="pcta__title">${plan.title}</span>
      <span class="pcta__steps"><b class="num">${stepsRemoved(index)}</b> pasos a mano menos</span>
      <span class="pcta__go">${icon("whatsapp-logo")}Quiero el plan ${plan.name}${icon("arrow-right")}</span>
    </a>`).join("");

  function setPlan(index) {
    container.querySelectorAll(".pcta").forEach(link => link.classList.toggle("is-selected", Number(link.dataset.plan) === index));
  }

  return { setPlan };
})();
