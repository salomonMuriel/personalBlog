const PricingStrip = (() => {
  const strip = document.getElementById("strip");
  const toggle = document.getElementById("strip-toggle");
  const count = document.getElementById("strip-count");
  const hint = document.getElementById("strip-hint");
  const manualSteps = STEPS.filter(step => step.kind === "manual" || step.kind === "vacio");
  const outOfScope = new Map(OUT_OF_SCOPE.flatMap(group => group.steps.map(id => [id, group])));
  const resolver = new Map();
  PLANS.forEach((plan, planIndex) => plan.modules.forEach(module => module.steps.forEach(id => resolver.set(id, { planIndex, module }))));
  let currentPlan = 0;
  let shownCount = 0;

  function tileState(id) {
    if (outOfScope.has(id)) return "out";
    const entry = resolver.get(id);
    return entry && entry.planIndex <= currentPlan ? "on" : "manual";
  }

  function render() {
    let order = 0;
    strip.innerHTML = STAGES.map(stage => {
      const steps = manualSteps.filter(step => step.stage === stage.id);
      const tiles = steps.map(step => `<button type="button" class="tile" data-step="${step.id}" style="--o:${order++}">${icon("check", "icon tile__check")}<span>${step.text}</span></button>`).join("");
      return `<div class="strip__col"><p class="strip__stage">${stage.label}</p><div class="strip__tiles">${tiles}</div></div>`;
    }).join("");
    document.getElementById("strip-total").textContent = manualSteps.length;
    hint.textContent = "Toca o pasa el cursor sobre un paso para ver qué lo resuelve.";
    toggle.innerHTML = PLANS.map((plan, index) => `<button type="button" data-plan="${index}">${plan.name}</button>`).join("");
  }

  function describe(id) {
    const step = STEPS.find(item => item.id === id);
    if (outOfScope.has(id)) return `<b>${step.text}</b><span>${outOfScope.get(id).label}: ${outOfScope.get(id).note.toLowerCase()}</span>`;
    const { planIndex, module } = resolver.get(id);
    return `<b>${step.text}</b><span>Lo resuelve ${module.name}, desde el plan ${PLANS[planIndex].name}</span>`;
  }

  function animateCount(target) {
    const from = shownCount;
    shownCount = target;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { count.textContent = target; return; }
    const start = performance.now();
    const step = time => {
      const progress = Math.min(1, (time - start) / 700);
      count.textContent = Math.round(from + (target - from) * Easing.out(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function setPlan(index) {
    currentPlan = index;
    strip.querySelectorAll(".tile").forEach(tile => { tile.dataset.state = tileState(tile.dataset.step); });
    toggle.querySelectorAll("button").forEach(button => button.setAttribute("aria-pressed", String(Number(button.dataset.plan) === index)));
    if (strip.classList.contains("is-drawn")) animateCount(strip.querySelectorAll('.tile[data-state="on"]').length);
  }

  render();
  toggle.addEventListener("click", event => { const button = event.target.closest("button"); if (button) selectPlan(Number(button.dataset.plan)); });
  const showHint = event => { const tile = event.target.closest(".tile"); if (tile) hint.innerHTML = describe(tile.dataset.step); };
  strip.addEventListener("mouseover", showHint);
  strip.addEventListener("focusin", showHint);
  strip.addEventListener("click", showHint);
  onceVisible(strip, () => {
    strip.classList.add("is-drawn");
    animateCount(strip.querySelectorAll('.tile[data-state="on"]').length);
  }, 0.2);

  return { setPlan };
})();
