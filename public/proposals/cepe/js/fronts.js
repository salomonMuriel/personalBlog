function renderFrontPanel(front, index) {
  const panel = document.getElementById("fronts-panel");
  panel.setAttribute("aria-labelledby", `front-tab-${index}`);
  panel.innerHTML = `
    <h3>${front.title}</h3>
    <p class="fronts__text">${front.text}</p>
    <div class="timebars">
      <div class="timebar"><span class="timebar__label">Antes</span><span class="timebar__track"><i class="timebar__fill timebar__fill--before"></i></span><b>${front.before}</b></div>
      <div class="timebar timebar--ai"><span class="timebar__label">Con IA</span><span class="timebar__track"><i class="timebar__fill" style="--ratio:${front.ratio}"></i></span><b>${front.after}</b></div>
    </div>
    <p class="fronts__human"><svg class="icon"><use href="img/icons.svg#i-check"/></svg>${front.human}</p>
    <p class="fronts__disclaimer">Estimación propia de nuestro método de trabajo; se afina con CEPE en el Producto 1.</p>`;
  requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add("is-ready")));
}

function selectFront(tabs, index) {
  const panel = document.getElementById("fronts-panel");
  panel.classList.remove("is-ready");
  tabs.forEach((tab, tabIndex) => {
    tab.setAttribute("aria-selected", String(tabIndex === index));
    tab.tabIndex = tabIndex === index ? 0 : -1;
  });
  renderFrontPanel(AI_FRONTS[index], index);
}

function renderFronts() {
  const tabList = document.getElementById("fronts-tabs");
  AI_FRONTS.forEach((front, index) => {
    const tab = createElement("button", "fronts__tab", `<span class="display">${index + 1}</span><span>${front.label}</span>`);
    tab.type = "button";
    tab.role = "tab";
    tab.id = `front-tab-${index}`;
    tabList.append(tab);
  });
  const tabs = [...tabList.children];
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectFront(tabs, index));
    tab.addEventListener("keydown", event => {
      const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
      if (!step) return;
      event.preventDefault();
      const next = (index + step + tabs.length) % tabs.length;
      selectFront(tabs, next);
      tabs[next].focus();
    });
  });
  selectFront(tabs, 0);
}

renderFronts();
