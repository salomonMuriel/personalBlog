function daysUntil(isoDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((new Date(`${isoDate}T00:00:00`) - today) / 86400000));
}

function setupBridePage() {
  const phone = document.getElementById("phone");
  const tabs = [...phone.querySelectorAll("[data-tab]")];
  const panels = [...phone.querySelectorAll("[data-panel]")];
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(item => item.setAttribute("aria-selected", String(item === tab)));
    panels.forEach(panel => { panel.hidden = panel.dataset.panel !== tab.dataset.tab; });
  }));
  const days = document.getElementById("bride-days");
  onceVisible(phone, () => {
    phone.classList.add("is-live");
    countUp(days, daysUntil("2027-06-12"), 1400);
  });
}

setupBridePage();
