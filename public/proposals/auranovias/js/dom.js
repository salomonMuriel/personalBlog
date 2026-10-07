const SVG_NS = "http://www.w3.org/2000/svg";

function svgElement(tag, attributes, parent) {
  const element = document.createElementNS(SVG_NS, tag);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  if (parent) parent.append(element);
  return element;
}

function htmlElement(tag, className, html, parent) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (html) element.innerHTML = html;
  if (parent) parent.append(element);
  return element;
}

const icon = (name, className = "icon") => `<svg class="${className}" aria-hidden="true"><use href="img/icons.svg#i-${name}"/></svg>`;

const { interpolate, spring, Easing, seeded } = Stage;

function onceVisible(element, callback, threshold = 0.3) {
  if (!element) return;
  if (!("IntersectionObserver" in window)) { callback(); return; }
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    callback();
  }, { threshold });
  observer.observe(element);
}

function countUp(node, target, duration = 1100) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { node.textContent = target; return; }
  const startTime = performance.now();
  const step = time => {
    const progress = Math.min(1, (time - startTime) / duration);
    node.textContent = Math.round(target * Easing.out(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
