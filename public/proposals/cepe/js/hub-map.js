const SVG_NS = "http://www.w3.org/2000/svg";
const MAP_WIDTH = 520;
const MAP_HEIGHT = 660;

function createSvgElement(tag, attributes = {}) {
  const element = document.createElementNS(SVG_NS, tag);
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  return element;
}

function projectPoint(longitude, latitude) {
  return [(longitude + 79.6) * 38 + 10, (12.6 - latitude) * 38 + 10];
}

function buildSmoothOutline() {
  const points = COLOMBIA_OUTLINE.map(([longitude, latitude]) => projectPoint(longitude, latitude));
  const midpoint = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const start = midpoint(points[points.length - 1], points[0]);
  let path = `M${start.join(",")}`;
  points.forEach((point, index) => {
    const next = midpoint(point, points[(index + 1) % points.length]);
    path += `Q${point.join(",")} ${next.join(",")}`;
  });
  return `${path}Z`;
}

function getBadgeRadius(community) {
  return 16 + Math.sqrt(community.members) * 0.55;
}

function relaxMarkerPositions(markers) {
  for (let step = 0; step < 120; step += 1) {
    markers.forEach((first, index) => {
      markers.slice(index + 1).forEach(second => {
        const deltaX = second.x - first.x;
        const deltaY = second.y - first.y;
        const distance = Math.hypot(deltaX, deltaY) || 0.01;
        const minimum = first.radius + second.radius + 6;
        if (distance >= minimum) return;
        const push = (minimum - distance) / 2;
        first.x -= (deltaX / distance) * push;
        first.y -= (deltaY / distance) * push;
        second.x += (deltaX / distance) * push;
        second.y += (deltaY / distance) * push;
      });
      first.x += (first.anchorX - first.x) * 0.02;
      first.y += (first.anchorY - first.y) * 0.02;
    });
  }
}

function createMarkers() {
  const markers = COMMUNITIES.map(community => {
    const [anchorX, anchorY] = projectPoint(community.lon, community.lat);
    return { community, anchorX, anchorY, x: anchorX, y: anchorY, radius: getBadgeRadius(community) + 4 };
  });
  relaxMarkerPositions(markers);
  return markers;
}

function drawMarker(svg, marker) {
  const { community, radius, x, y, anchorX, anchorY } = marker;
  const group = createSvgElement("g", { class: `marker marker--${community.status}`, "data-id": community.id, tabindex: 0, role: "button", "aria-label": `${community.name}, ${STATUS_LABELS[community.status]}, ${community.members} miembros` });
  if (Math.hypot(x - anchorX, y - anchorY) > 5) {
    group.append(createSvgElement("line", { class: "marker__leader", x1: anchorX, y1: anchorY, x2: x, y2: y }));
  }
  group.append(createSvgElement("circle", { class: "marker__anchor", cx: anchorX, cy: anchorY, r: 2.6 }));
  const badge = createSvgElement("g", { class: "marker__badge", transform: `translate(${x} ${y})` });
  const inner = createSvgElement("g", { class: "marker__inner" });
  inner.append(createSvgElement("circle", { class: "marker__pulse", r: radius }));
  inner.append(createSvgElement("circle", { class: "marker__ring", r: radius }));
  inner.append(createSvgElement("image", { href: `img/territory/${community.id}.webp`, x: -(radius - 4), y: -(radius - 4), width: (radius - 4) * 2, height: (radius - 4) * 2 }));
  badge.append(inner);
  group.append(badge);
  group.addEventListener("click", () => selectCommunity(community.id));
  group.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectCommunity(community.id); }
  });
  svg.append(group);
}

function drawSeaLabels(svg) {
  [["Mar Caribe", 12, 40], ["Océano Pacífico", 12, 610]].forEach(([text, x, y]) => {
    const label = createSvgElement("text", { class: "map__sea", x, y });
    label.textContent = text;
    svg.append(label);
  });
}

function renderMap() {
  const svg = document.getElementById("colombia-map");
  const outline = buildSmoothOutline();
  svg.append(createSvgElement("path", { class: "map__shadow", d: outline, transform: "translate(6 8)" }));
  svg.append(createSvgElement("path", { class: "map__country", d: outline }));
  drawSeaLabels(svg);
  const markers = createMarkers();
  markers.sort((first, second) => second.radius - first.radius).forEach(marker => drawMarker(svg, marker));
}

function markSelectedMarker(id) {
  const markers = [...document.querySelectorAll(".marker")];
  markers.forEach(marker => marker.classList.toggle("is-selected", marker.dataset.id === id));
  const selected = markers.find(marker => marker.dataset.id === id);
  if (selected) selected.parentNode.append(selected);
}
