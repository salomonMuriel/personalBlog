/* Portrait versions of the three scenes for phones, so the text stays readable. */
const COMPACT_WIDTH = 420;

function resizeStage(root, width, height) {
  const canvas = root.querySelector(".stage__canvas");
  canvas.dataset.width = width;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  root.querySelector(".stage__viewport").style.aspectRatio = `${width} / ${height}`;
  root.classList.add("stage--compact");
  return canvas;
}

function buildFunnelSceneCompact() {
  const root = document.getElementById("scene-funnel");
  if (!root) return;
  const height = 820;
  const svg = svgElement("svg", { viewBox: `0 0 ${COMPACT_WIDTH} ${height}`, width: COMPACT_WIDTH, height }, resizeStage(root, COMPACT_WIDTH, height));
  const gates = [130, 280, 430, 580, 730];
  const centerX = 330;
  const halfAt = y => interpolate(y, [30, 790], [70, 24], Easing.linear);

  svgElement("path", { d: `M${centerX - halfAt(30)} 30 L${centerX - halfAt(790)} 790 M${centerX + halfAt(30)} 30 L${centerX + halfAt(790)} 790`, stroke: "#d9cfc5", "stroke-width": 1.2, fill: "none" }, svg);
  gates.forEach((y, index) => {
    svgElement("line", { x1: centerX - halfAt(y) - 8, x2: centerX + halfAt(y) + 8, y1: y, y2: y, stroke: "#b4a79e", "stroke-width": 1, "stroke-dasharray": "3 4" }, svg);
    const value = svgElement("text", { x: 20, y: y - 2, class: "funnel__value" }, svg);
    value.textContent = FUNNEL[index].value;
    const label = svgElement("text", { x: 20, y: y + 22, class: "funnel__label" }, svg);
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
  const dots = Array.from({ length: 150 }, (_, index) => ({
    offset: (index / 150) * period + random() * 6,
    lane: random() * 2 - 1,
    exit: pickExit(),
    node: svgElement("circle", { r: 3.6 }, svg),
  }));

  Stage.mount(root, {
    durationInFrames: period,
    render: frame => {
      dots.forEach(dot => {
        const progress = ((frame + dot.offset) % period) / period;
        const y = 30 + progress * 760;
        let x = centerX + dot.lane * (halfAt(y) - 8);
        let opacity = interpolate(y, [30, 70], [0, 1]);
        let fill = "#978274";
        if (dot.exit < 5 && y > gates[dot.exit]) {
          const fall = y - gates[dot.exit];
          x += fall * 0.9;
          opacity = interpolate(fall, [0, 80], [0.9, 0]);
          fill = "#b4a79e";
        } else if (dot.exit === 5 && y > gates[3]) {
          fill = "#c98b86";
          opacity = interpolate(y, [750, 790], [1, 0]);
        }
        dot.node.setAttribute("cx", x.toFixed(1));
        dot.node.setAttribute("cy", y.toFixed(1));
        dot.node.setAttribute("fill", fill);
        dot.node.setAttribute("opacity", Math.max(0, opacity).toFixed(2));
      });
    },
  });
}

function buildRekeySceneCompact() {
  const root = document.getElementById("scene-rekey");
  if (!root) return;
  const canvas = resizeStage(root, COMPACT_WIDTH, 1000);
  const fields = [["Nombre", "Valentina Restrepo"], ["Fecha de boda", "12 dic 2026"], ["Lugar", "Chía"], ["Talla", "8"], ["Vestido", "Ambra"]];

  const counter = htmlElement("p", "rk-counter", "", canvas);
  const source = htmlElement("div", "rk-source", `<p class="rk-source__title">${icon("calendar-blank")}Formulario de agenda</p><p class="rk-source__by">Lo escribe la novia, una vez</p>`, canvas);
  const fieldNodes = fields.map(([label, value]) => htmlElement("p", "rk-field", `<span>${label}</span><b>${value}</b>`, source));
  const tilesTop = 70 + source.offsetHeight + 28;
  const sourceCenter = { x: 210, y: 70 + source.offsetHeight / 2 };

  const targets = REKEY_CHAIN.slice(1);
  const tiles = targets.map((target, index) => {
    const left = index % 2 === 0 ? 20 : 218;
    const top = tilesTop + Math.floor(index / 2) * 124;
    const tile = htmlElement("div", `rk-tile rk-tile--${target.kind}`, `
      <p class="rk-tile__name">${icon(target.icon)}${target.name}</p>
      <p class="rk-tile__by">${target.by}</p>
      <span class="rk-tile__lines"><i></i><i></i><i></i></span>
      <span class="rk-tile__hand">${icon("hand-grabbing")}</span>`, canvas);
    tile.style.left = `${left}px`;
    tile.style.top = `${top}px`;
    return { tile, x: left + 91, y: top + 56 };
  });

  const summaryTop = tilesTop + Math.ceil(targets.length / 2) * 124 + 8;
  const ghosts = tiles.map(() => htmlElement("div", "rk-ghost", "<i></i><i></i><i></i>", canvas));
  const summary = htmlElement("p", "rk-summary", `<b>${targets.length}</b> copias escritas a mano del mismo dato`, canvas);
  summary.style.top = `${summaryTop}px`;
  const height = summaryTop + summary.offsetHeight + 24;
  resizeStage(root, COMPACT_WIDTH, height);

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
        ghost.style.translate = `${interpolate(flight, [0, 1], [sourceCenter.x - 42, x - 42], Easing.linear)}px ${interpolate(flight, [0, 1], [sourceCenter.y, y - 30], Easing.linear)}px`;
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
    },
  });
}

function buildDressLifeSceneCompact() {
  const root = document.getElementById("scene-cinta");
  if (!root) return;
  const dayToY = day => 110 + (day + 40) * (600 / 95);
  const trackEnd = dayToY(38);
  const height = Math.round(trackEnd + 96);
  const svg = svgElement("svg", { viewBox: `0 0 ${COMPACT_WIDTH} ${height}`, width: COMPACT_WIDTH, height }, resizeStage(root, COMPACT_WIDTH, height));
  const trackX = 130;

  const defs = svgElement("defs", {}, svg);
  const pattern = svgElement("pattern", { id: "hatch-compact", width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(135)" }, defs);
  svgElement("line", { x1: 0, y1: 0, x2: 0, y2: 6, stroke: "#978274", "stroke-width": 1.2 }, pattern);

  const bracketLabel = svgElement("text", { x: 20, y: 46, class: "cinta__bracket" }, svg);
  bracketLabel.textContent = "Fuera de la tienda entre 30 y 45 días";

  svgElement("line", { x1: trackX, x2: trackX, y1: 90, y2: trackEnd, stroke: "#ebe4dc", "stroke-width": 1 }, svg);
  [-30, -20, 0, 14, 30].forEach(day => {
    svgElement("line", { x1: trackX - 26, x2: trackX - 20, y1: dayToY(day), y2: dayToY(day), stroke: "#d9cfc5" }, svg);
    const tick = svgElement("text", { x: trackX - 32, y: dayToY(day) + 5, "text-anchor": "end", class: "cinta__tick" }, svg);
    tick.textContent = day === 0 ? "Boda" : `${day > 0 ? "+" : "−"}${Math.abs(day)} días`;
  });

  const windowBand = svgElement("rect", { x: trackX - 16, y: dayToY(-30), width: 32, height: dayToY(30) - dayToY(-30), rx: 2, fill: "#c98b86" }, svg);
  const windowLabel = ["Ventana bloqueada: ninguna otra novia", "puede casarse con este vestido aquí"].map((line, index) => {
    const text = svgElement("text", { x: 20, y: trackEnd + 44 + index * 22, class: "cinta__note" }, svg);
    text.textContent = line;
    return text;
  });

  const segments = [
    { from: -20, to: -2, label: "Arreglos", fill: "#ffffff", stroke: "#978274", stitch: true, start: 10 },
    { from: -2, to: 5, label: "Con la novia", fill: "#65574e", stroke: "#65574e", start: 40 },
    { from: 5, to: 14, label: "Lavandería", fill: "url(#hatch-compact)", stroke: "#b4a79e", start: 62 },
  ].map(segment => {
    const rect = svgElement("rect", { x: trackX - 7, y: dayToY(segment.from), width: 14, rx: 2, fill: segment.fill, stroke: segment.stroke, "stroke-width": 1 }, svg);
    const stitch = segment.stitch ? svgElement("line", { x1: trackX, x2: trackX, y1: dayToY(segment.from) + 4, stroke: "#978274", "stroke-dasharray": "4 3" }, svg) : null;
    const label = svgElement("text", { x: trackX + 34, y: (dayToY(segment.from) + dayToY(segment.to)) / 2 + 5, class: "cinta__label" }, svg);
    label.textContent = segment.label;
    return { ...segment, rect, stitch, label };
  });

  const ring = svgElement("circle", { cx: trackX, cy: dayToY(0), r: 15, fill: "none", stroke: "#c98b86", "stroke-width": 2.5 }, svg);
  const bracket = svgElement("path", { d: `M330 ${dayToY(-20)} h10 V${dayToY(14)} h-10`, fill: "none", stroke: "#2b2420", "stroke-width": 1.2 }, svg);
  const nextRing = svgElement("circle", { cx: trackX, cy: dayToY(31), r: 12, fill: "#fcfaf7", stroke: "#6e6158", "stroke-width": 1.5, "stroke-dasharray": "3 3" }, svg);
  const nextLabel = svgElement("text", { x: trackX + 34, y: dayToY(31) + 5, class: "cinta__label" }, svg);
  nextLabel.textContent = "Próxima boda posible";

  const bracketLength = bracket.getTotalLength();
  bracket.setAttribute("stroke-dasharray", bracketLength);

  Stage.mount(root, {
    durationInFrames: 270,
    render: frame => {
      segments.forEach(segment => {
        const grow = interpolate(frame, [segment.start, segment.start + 22], [0, 1]);
        const length = (dayToY(segment.to) - dayToY(segment.from)) * grow;
        segment.rect.setAttribute("height", Math.max(0.01, length).toFixed(1));
        segment.label.setAttribute("opacity", interpolate(frame, [segment.start + 8, segment.start + 22], [0, 1]).toFixed(2));
        if (segment.stitch) segment.stitch.setAttribute("y2", (dayToY(segment.from) + Math.max(4, length - 4)).toFixed(1));
      });
      ring.setAttribute("r", (15 * spring(frame - 88)).toFixed(2));
      ring.setAttribute("opacity", frame >= 88 ? 1 : 0);
      windowBand.setAttribute("opacity", interpolate(frame, [112, 140], [0, 0.28]).toFixed(2));
      windowLabel.forEach(text => text.setAttribute("opacity", interpolate(frame, [120, 145], [0, 1]).toFixed(2)));
      bracket.setAttribute("stroke-dashoffset", interpolate(frame, [150, 178], [bracketLength, 0]).toFixed(1));
      bracketLabel.setAttribute("opacity", interpolate(frame, [168, 186], [0, 1]).toFixed(2));
      nextRing.setAttribute("opacity", interpolate(frame, [196, 214], [0, 1]).toFixed(2));
      nextLabel.setAttribute("opacity", interpolate(frame, [204, 222], [0, 1]).toFixed(2));
    },
  });
}
