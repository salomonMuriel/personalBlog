function setupReveals() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach(target => target.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  targets.forEach(target => observer.observe(target));
}

function renderTicker() {
  const track = document.getElementById("ticker");
  const badges = [...TERRITORIES, ...TERRITORIES];
  track.innerHTML = badges.map(([id, name], index) => `<li><img src="img/territory/${id}.webp" alt="${index < TERRITORIES.length ? name : ""}" width="76" height="76"></li>`).join("");
}

function setupMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  const setOpen = isOpen => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    links.classList.toggle("is-open", isOpen);
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  links.addEventListener("click", event => { if (event.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") setOpen(false); });
}

function highlightCurrentSection() {
  const links = [...document.querySelectorAll(".nav__links a")];
  const byId = new Map(links.map(link => [link.getAttribute("href").slice(1), link]));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle("is-active", link === byId.get(entry.target.id)));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  byId.forEach((_, id) => { const section = document.getElementById(id); if (section) observer.observe(section); });
}

function scalePreview() {
  const preview = document.getElementById("cta-preview");
  if (!preview || !("ResizeObserver" in window)) return;
  new ResizeObserver(([entry]) => {
    preview.style.setProperty("--preview-scale", entry.contentRect.width / 1440);
  }).observe(preview);
}

renderTicker();
setupReveals();
setupMobileNav();
highlightCurrentSection();
scalePreview();
