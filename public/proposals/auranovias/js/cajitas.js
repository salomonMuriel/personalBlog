const Cajitas = (() => {
  const board = document.getElementById("cajitas-board");
  const wires = document.getElementById("cajitas-wires");
  const panel = document.getElementById("cajita-panel");
  const toggle = document.getElementById("cajitas-toggle");
  const layout = { mercadeo: "a", agenda: "b", asesoria: "c", novia: "d", logistica: "e", recuperacion: "f", inventario: "g", administracion: "h" };
  const links = [
    ["mercadeo", "agenda", "h"], ["agenda", "asesoria", "h"], ["asesoria", "novia", "h"], ["novia", "logistica", "h"],
    ["asesoria", "recuperacion", "down"],
    ["administracion", "agenda", "down"], ["administracion", "asesoria", "down", 0.5], ["administracion", "novia", "down"],
    ["inventario", "mercadeo", "up", 0.5], ["inventario", "asesoria", "up", 0.16], ["inventario", "novia", "up", 0.5], ["inventario", "logistica", "up", 0.5],
  ];
  const isWide = window.matchMedia("(min-width: 1000px)");

  function render() {
    board.insertAdjacentHTML("beforeend", CAJITAS.map(cajita => `
      <button type="button" class="cbox cbox--${layout[cajita.id]}${cajita.id === "inventario" || cajita.id === "asesoria" ? " is-first" : ""}" data-cajita="${cajita.id}" style="grid-area:${layout[cajita.id]}">
        <span class="cbox__n num">${cajita.n}</span>
        <span class="cbox__name">${cajita.name}</span>
        <span class="cbox__text cbox__text--hoy">${cajita.today}</span>
        <span class="cbox__text cbox__text--queda">${cajita.automated}</span>
      </button>`).join(""));
  }

  function box(id) {
    const element = board.querySelector(`[data-cajita="${id}"]`);
    return { x: element.offsetLeft, y: element.offsetTop, w: element.offsetWidth, h: element.offsetHeight };
  }

  function pathFor([from, to, type, ratio = 0.5]) {
    const a = box(from);
    const b = box(to);
    if (type === "h") return `M${a.x + a.w} ${a.y + a.h / 2} H${b.x}`;
    if (type === "down") {
      const x = from === "asesoria" ? b.x + b.w / 2 : b.x + b.w * ratio;
      return `M${x} ${a.y + a.h} V${b.y}`;
    }
    return `M${b.x + b.w * ratio} ${a.y} V${b.y + b.h}`;
  }

  function drawWires() {
    wires.innerHTML = "";
    if (!isWide.matches) return;
    wires.setAttribute("viewBox", `0 0 ${board.offsetWidth} ${board.offsetHeight}`);
    links.forEach((link, index) => {
      const id = `wire-${index}`;
      svgElement("path", { id, d: pathFor(link), class: "wire" }, wires);
      const runner = svgElement("g", { class: "wire__runner" }, wires);
      svgElement("circle", { r: 9, class: "wire__hand-bg" }, runner);
      const glyph = svgElement("use", { href: "img/icons.svg#i-hand-grabbing", x: -7, y: -7, width: 14, height: 14, class: "wire__hand" }, runner);
      glyph.setAttribute("href", "img/icons.svg#i-hand-grabbing");
      svgElement("circle", { r: 3.5, class: "wire__dot" }, runner);
      const motion = svgElement("animateMotion", { dur: `${3.2 + (index % 3) * 0.6}s`, repeatCount: "indefinite", begin: `${(index * 0.37) % 2}s` }, runner);
      svgElement("mpath", { href: `#${id}` }, motion);
    });
  }

  function stepItem(step) {
    return `<li class="cstep cstep--${step.kind}">${icon(KIND_ICON[step.kind])}<span>${step.text}</span>${step.rekey ? icon("copy", "icon cstep__flag") : ""}${step.risk ? icon("warning", "icon cstep__flag cstep__flag--risk") : ""}</li>`;
  }

  function open(id) {
    const cajita = CAJITAS.find(item => item.id === id);
    const steps = STEPS.filter(step => step.cajita === id);
    const manual = steps.filter(step => step.kind === "manual").length;
    const opportunities = OPPORTUNITIES.filter(item => item.cajita === id);
    board.querySelectorAll(".cbox").forEach(element => element.classList.toggle("is-open", element.dataset.cajita === id));
    panel.innerHTML = `
      <div class="cp__head">
        <span class="cp__n num">${cajita.n}</span>
        <div><h3>${cajita.name}</h3><p class="cp__span">Empieza: <b>${cajita.start}</b><span>Termina: <b>${cajita.end}</b></span></p></div>
      </div>
      <div class="cp__grid">
        <div class="cp__col cp__col--hoy"><p class="cp__label">Hoy</p><p>${cajita.today}</p><ul class="cp__steps">${steps.map(stepItem).join("")}</ul><p class="cp__count">${icon("hand-grabbing")}<b class="num">${manual}</b> de ${steps.length} pasos son a mano</p></div>
        <div class="cp__col cp__col--queda"><p class="cp__label">Se puede automatizar</p><p>${cajita.automated}</p><ul class="cp__opps">${opportunities.map(item => `<li>${icon("sparkle")}${item.name}<span class="num">−${item.removes.length}</span></li>`).join("")}</ul></div>
      </div>`;
    panel.classList.add("is-filled");
  }

  function setMode(mode) {
    board.dataset.mode = mode;
    toggle.querySelectorAll("button").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.mode === mode)));
  }

  render();
  board.addEventListener("click", event => {
    const element = event.target.closest(".cbox");
    if (element) open(element.dataset.cajita);
  });
  toggle.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (button) setMode(button.dataset.mode);
  });
  setMode("hoy");
  open("inventario");
  drawWires();
  if ("ResizeObserver" in window) new ResizeObserver(() => requestAnimationFrame(drawWires)).observe(board);
  document.fonts?.ready.then(drawWires);
  return { open };
})();
