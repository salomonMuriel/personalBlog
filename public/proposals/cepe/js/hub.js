const VIEW_NAMES = ["map", "communities", "people", "evidence", "survey", "assistant"];
let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function isIntranetView(name) {
  return Boolean(document.querySelector(`.sidebar__nav [data-view="${name}"][data-intranet]`));
}

function showView(name) {
  if (document.body.dataset.access === "public" && isIntranetView(name)) name = "map";
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("is-active", view.dataset.view === name));
  document.querySelectorAll(".sidebar__nav button").forEach(button => {
    const isCurrent = button.dataset.view === name;
    button.classList.toggle("is-active", isCurrent);
    if (isCurrent) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current");
  });
  if (location.hash !== `#${name}`) history.replaceState(null, "", `#${name}`);
  window.scrollTo({ top: 0 });
}

function setAccess(mode) {
  document.body.dataset.access = mode;
  document.querySelectorAll(".segmented button").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.access === mode));
  });
  const current = document.querySelector(".view.is-active").dataset.view;
  if (mode === "public" && isIntranetView(current)) showView("map");
  showToast(mode === "public" ? "Sitio público: solo se muestra contenido abierto" : "Intranet: acceso completo para el equipo de CEPE");
}

function setupDelegatedActions() {
  document.addEventListener("click", event => {
    const toastTrigger = event.target.closest("[data-toast]");
    if (toastTrigger) showToast(toastTrigger.dataset.toast);
    const goTrigger = event.target.closest("[data-go]");
    if (goTrigger) showView(goTrigger.dataset.go);
  });
}

function setupNavigation() {
  document.querySelectorAll(".sidebar__nav button").forEach(button => {
    button.addEventListener("click", () => showView(button.dataset.view));
  });
  document.querySelectorAll(".segmented button").forEach(button => {
    button.addEventListener("click", () => setAccess(button.dataset.access));
  });
  document.getElementById("global-search").addEventListener("submit", event => {
    event.preventDefault();
    setEvidenceQuery(document.getElementById("global-search-input").value);
    showView("evidence");
  });
  window.addEventListener("hashchange", () => {
    const name = location.hash.slice(1);
    if (VIEW_NAMES.includes(name)) showView(name);
  });
}

function initialView() {
  const fromHash = location.hash.slice(1);
  return VIEW_NAMES.includes(fromHash) ? fromHash : "map";
}

if (new URLSearchParams(location.search).has("preview")) document.body.classList.add("is-preview");
renderMap();
setupCommunityViews();
setupEvidence();
renderThemes();
setupPhonePreview();
setupChat();
setupDelegatedActions();
setupNavigation();
selectCommunity("choco");
showView(initialView());
