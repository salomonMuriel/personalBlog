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

setupReveals();
highlightCurrentSection();
