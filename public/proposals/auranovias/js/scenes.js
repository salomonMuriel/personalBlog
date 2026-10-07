/* Scene 1: the funnel. Each dot is a conversation; the ones that make it turn blush. */
function buildFunnelScene() {
  const root = document.getElementById("scene-funnel");
  if (!root) return;
  const svg = svgElement("svg", { viewBox: "0 0 1200 420", width: 1200, height: 420 }, root.querySelector(".stage__canvas"));
  const gates = [150, 370, 590, 810, 1040];
  const centerY = 285;
  const halfAt = x => interpolate(x, [40, 1160], [96, 30], Easing.linear);

  svgElement("path", { d: `M40 ${centerY - halfAt(40)} L1160 ${centerY - halfAt(1160)} M40 ${centerY + halfAt(40)} L1160 ${centerY + halfAt(1160)}`, stroke: "#d9cfc5", "stroke-width": 1.2, fill: "none" }, svg);

  gates.forEach((x, index) => {
    svgElement("line", { x1: x, x2: x, y1: centerY - halfAt(x) - 8, y2: centerY + halfAt(x) + 8, stroke: "#b4a79e", "stroke-width": 1, "stroke-dasharray": "3 4" }, svg);
    const value = svgElement("text", { x, y: 92, "text-anchor": "middle", class: "funnel__value" }, svg);
    value.textContent = FUNNEL[index].value;
    const label = svgElement("text", { x, y: 120, "text-anchor": "middle", class: "funnel__label" }, svg);
    label.textContent = FUNNEL[index].label;
  });

  const random = seeded(7);
  const exitWeights = [[0, 0.52], [1, 0.06], [2, 0.16], [3, 0.0], [4, 0.04], [5, 0.22]];
  const pickExit = () => {
    let roll = random();
    for (const [gate, weight] of exitWeights) { if ((roll -= weight) <= 0) return gate; }
    return 5;
  };
  const period = 240;
  const dots = Array.from({ length: 170 }, (_, index) => ({
    offset: (index / 170) * period + random() * 6,
    lane: random() * 2 - 1,
    exit: pickExit(),
    node: svgElement("circle", { r: 3.6 }, svg),
  }));

  Stage.mount(root, {
    durationInFrames: period,
    render: frame => {
      dots.forEach(dot => {
        const progress = ((frame + dot.offset) % period) / period;
        const x = 40 + progress * 1120;
        let y = centerY + dot.lane * (halfAt(x) - 8);
        let opacity = interpolate(x, [40, 80], [0, 1]);
        let fill = "#978274";
        if (dot.exit < 5 && x > gates[dot.exit]) {
          const fall = x - gates[dot.exit];
          y += fall * 0.9;
          opacity = interpolate(fall, [0, 90], [0.9, 0]);
          fill = "#b4a79e";
        } else if (dot.exit === 5 && x > gates[3]) {
          fill = "#c98b86";
          opacity = interpolate(x, [1120, 1160], [1, 0]);
        }
        dot.node.setAttribute("cx", x.toFixed(1));
        dot.node.setAttribute("cy", y.toFixed(1));
        dot.node.setAttribute("fill", fill);
        dot.node.setAttribute("opacity", Math.max(0, opacity).toFixed(2));
      });
    },
  });
}

/* Scene 2: the same bride, re-typed by hand in seven more places. */
function buildRekeyScene() {
  const root = document.getElementById("scene-rekey");
  if (!root) return;
  const canvas = root.querySelector(".stage__canvas");
  const fields = [["Nombre", "Valentina Restrepo"], ["Fecha de boda", "12 dic 2026"], ["Lugar", "Chía"], ["Talla", "8"], ["Vestido", "Ambra"]];

  const source = htmlElement("div", "rk-source", `<p class="rk-source__title">${icon("calendar-blank")}Formulario de agenda</p><p class="rk-source__by">Lo escribe la novia, una vez</p>`, canvas);
  const fieldNodes = fields.map(([label, value]) => htmlElement("p", "rk-field", `<span>${label}</span><b>${value}</b>`, source));

  const targets = REKEY_CHAIN.slice(1);
  const tiles = targets.map((target, index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    const tile = htmlElement("div", `rk-tile rk-tile--${target.kind}`, `
      <p class="rk-tile__name">${icon(target.icon)}${target.name}</p>
      <p class="rk-tile__by">${target.by}</p>
      <span class="rk-tile__lines"><i></i><i></i><i></i></span>
      <span class="rk-tile__hand">${icon("hand-grabbing")}</span>`, canvas);
    tile.style.left = `${452 + column * 182}px`;
    tile.style.top = `${row === 0 ? 70 : 262}px`;
    return { tile, x: 452 + column * 182 + 80, y: (row === 0 ? 70 : 262) + 80 };
  });

  const ghosts = tiles.map(() => htmlElement("div", "rk-ghost", "<i></i><i></i><i></i>", canvas));
  const counter = htmlElement("p", "rk-counter", "", canvas);
  const summary = htmlElement("p", "rk-summary", `<b>${targets.length}</b> copias escritas a mano del mismo dato`, canvas);

  const start = 40;
  const gap = 24;
  const duration = start + targets.length * gap + 90;

  Stage.mount(root, {
    durationInFrames: duration,
    render: frame => {
      fieldNodes.forEach((node, index) => {
        node.style.opacity = interpolate(frame, [4 + index * 5, 12 + index * 5], [0, 1]);
      });
      let copies = 0;
      tiles.forEach(({ tile, x, y }, index) => {
        const begin = start + index * gap;
        const flight = interpolate(frame, [begin, begin + 16], [0, 1], Easing.inOut);
        const ghost = ghosts[index];
        ghost.style.opacity = frame >= begin && frame < begin + 18 ? 1 : 0;
        ghost.style.translate = `${interpolate(flight, [0, 1], [200, x - 40], Easing.linear)}px ${interpolate(flight, [0, 1], [250, y - 30], Easing.linear)}px`;
        const landed = frame >= begin + 16;
        if (landed) copies++;
        tile.classList.toggle("is-filled", landed);
        tile.querySelector(".rk-tile__hand").style.opacity = interpolate(frame, [begin + 14, begin + 18, begin + 30, begin + 40], [0, 1, 1, 0]);
        tile.querySelectorAll(".rk-tile__lines i").forEach((line, lineIndex) => {
          line.style.scale = `${interpolate(frame, [begin + 16 + lineIndex * 3, begin + 24 + lineIndex * 3], [0, 1])} 1`;
        });
      });
      counter.innerHTML = `${icon("copy")}<span class="num">${copies}</span> de ${targets.length} copias`;
      summary.style.opacity = interpolate(frame, [duration - 70, duration - 55], [0, 1]);
      summary.style.translate = `0 ${interpolate(frame, [duration - 70, duration - 55], [12, 0])}px`;
    },
  });
}

/* Scene 3: the cinta. One rental takes the dress out of stock for 30 to 45 days. */
function buildDressLifeScene() {
  const root = document.getElementById("scene-cinta");
  if (!root) return;
  const svg = svgElement("svg", { viewBox: "0 0 1200 360", width: 1200, height: 360 }, root.querySelector(".stage__canvas"));
  const dayToX = day => 70 + (day + 40) * (1060 / 95);
  const trackY = 200;

  const defs = svgElement("defs", {}, svg);
  const pattern = svgElement("pattern", { id: "hatch", width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(135)" }, defs);
  svgElement("line", { x1: 0, y1: 0, x2: 0, y2: 6, stroke: "#978274", "stroke-width": 1.2 }, pattern);

  svgElement("line", { x1: 50, x2: 1150, y1: trackY, y2: trackY, stroke: "#ebe4dc", "stroke-width": 1 }, svg);
  [-30, -20, 0, 14, 30].forEach(day => {
    svgElement("line", { x1: dayToX(day), x2: dayToX(day), y1: trackY + 20, y2: trackY + 26, stroke: "#d9cfc5" }, svg);
    const tick = svgElement("text", { x: dayToX(day), y: trackY + 44, "text-anchor": "middle", class: "cinta__tick" }, svg);
    tick.textContent = day === 0 ? "Boda" : `${day > 0 ? "+" : "−"}${Math.abs(day)} días`;
  });

  const windowBand = svgElement("rect", { x: dayToX(-30), y: trackY - 16, width: dayToX(30) - dayToX(-30), height: 32, rx: 2, fill: "#c98b86" }, svg);
  const windowLabel = svgElement("text", { x: dayToX(0), y: trackY + 78, "text-anchor": "middle", class: "cinta__note" }, svg);
  windowLabel.textContent = "Ventana bloqueada: ninguna otra novia puede casarse con este vestido aquí";

  const segments = [
    { from: -20, to: -2, label: "Arreglos", fill: "#ffffff", stroke: "#978274", stitch: true, start: 10, labelY: -28, anchor: "middle" },
    { from: -2, to: 5, label: "Con la novia", fill: "#65574e", stroke: "#65574e", start: 40, labelY: -52, anchor: "middle" },
    { from: 5, to: 14, label: "Lavandería", fill: "url(#hatch)", stroke: "#b4a79e", start: 62, labelY: -28, anchor: "start" },
  ].map(segment => {
    const rect = svgElement("rect", { x: dayToX(segment.from), y: trackY - 7, height: 14, rx: 2, fill: segment.fill, stroke: segment.stroke, "stroke-width": 1 }, svg);
    const stitch = segment.stitch ? svgElement("line", { x1: dayToX(segment.from) + 4, y1: trackY, y2: trackY, stroke: "#978274", "stroke-dasharray": "4 3" }, svg) : null;
    const labelX = segment.anchor === "start" ? dayToX(segment.from) + 14 : (dayToX(segment.from) + dayToX(segment.to)) / 2;
    const label = svgElement("text", { x: labelX, y: trackY + segment.labelY, "text-anchor": segment.anchor, class: "cinta__label" }, svg);
    label.textContent = segment.label;
    return { ...segment, rect, stitch, label };
  });

  const ring = svgElement("circle", { cx: dayToX(0), cy: trackY, r: 15, fill: "none", stroke: "#c98b86", "stroke-width": 2.5 }, svg);
  const bracket = svgElement("path", { d: `M${dayToX(-20)} 98 v-10 H${dayToX(14)} v10`, fill: "none", stroke: "#2b2420", "stroke-width": 1.2 }, svg);
  const bracketLabel = svgElement("text", { x: (dayToX(-20) + dayToX(14)) / 2, y: 72, "text-anchor": "middle", class: "cinta__bracket" }, svg);
  bracketLabel.textContent = "Fuera de la tienda entre 30 y 45 días";
  const nextRing = svgElement("circle", { cx: dayToX(31), cy: trackY, r: 12, fill: "#fcfaf7", stroke: "#6e6158", "stroke-width": 1.5, "stroke-dasharray": "3 3" }, svg);
  const nextLabel = svgElement("text", { x: dayToX(31) + 22, y: trackY - 22, class: "cinta__label" }, svg);
  nextLabel.textContent = "Próxima boda posible";

  const bracketLength = bracket.getTotalLength();
  bracket.setAttribute("stroke-dasharray", bracketLength);

  Stage.mount(root, {
    durationInFrames: 270,
    render: frame => {
      segments.forEach(segment => {
        const grow = interpolate(frame, [segment.start, segment.start + 22], [0, 1]);
        const width = (dayToX(segment.to) - dayToX(segment.from)) * grow;
        segment.rect.setAttribute("width", Math.max(0.01, width).toFixed(1));
        segment.label.setAttribute("opacity", interpolate(frame, [segment.start + 8, segment.start + 22], [0, 1]).toFixed(2));
        if (segment.stitch) segment.stitch.setAttribute("x2", (dayToX(segment.from) + Math.max(4, width - 4)).toFixed(1));
      });
      const ringScale = spring(frame - 88);
      ring.setAttribute("r", (15 * ringScale).toFixed(2));
      ring.setAttribute("opacity", frame >= 88 ? 1 : 0);
      windowBand.setAttribute("opacity", interpolate(frame, [112, 140], [0, 0.28]).toFixed(2));
      windowLabel.setAttribute("opacity", interpolate(frame, [120, 145], [0, 1]).toFixed(2));
      bracket.setAttribute("stroke-dashoffset", interpolate(frame, [150, 178], [bracketLength, 0]).toFixed(1));
      bracketLabel.setAttribute("opacity", interpolate(frame, [168, 186], [0, 1]).toFixed(2));
      nextRing.setAttribute("opacity", interpolate(frame, [196, 214], [0, 1]).toFixed(2));
      nextLabel.setAttribute("opacity", interpolate(frame, [204, 222], [0, 1]).toFixed(2));
    },
  });
}

if (window.matchMedia("(max-width: 640px)").matches) {
  buildFunnelSceneCompact();
  buildRekeySceneCompact();
  buildDressLifeSceneCompact();
} else {
  buildFunnelScene();
  buildRekeyScene();
  buildDressLifeScene();
}
