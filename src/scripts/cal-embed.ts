// Cal.com element-click embed — lazy loaded on first user interaction
const calNamespaces = [
  "personal-site-intro-call",
  "30min",
  "ai-tech-consulting",
  "data-science-consulting",
  "company-building-consulting",
  "mentorship",
  "talks",
  "talks-booking",
];

let calLoaded = false;

function loadCal() {
  if (calLoaded) return;
  calLoaded = true;

  const w = window as any;
  const d = document;

  w.Cal =
    w.Cal ||
    function (...args: any[]) {
      const cal = w.Cal;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const s = d.createElement("script");
        s.src = "https://app.cal.com/embed/embed.js";
        d.head.appendChild(s);
        cal.loaded = true;
      }
      if (args[0] === "init") {
        const api = function (...a: any[]) {
          api.q.push(a);
        };
        const namespace = args[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          (cal.ns[namespace] as any).q.push(args);
          cal.q.push(["initNamespace", namespace]);
        } else {
          cal.q.push(args);
        }
        return;
      }
      cal.q.push(args);
    };

  const uiConfig = {
    styles: { branding: { brandColor: "#000000" } },
    hideEventTypeDetails: false,
    layout: "month_view",
  };

  for (const ns of calNamespaces) {
    w.Cal("init", ns, { origin: "https://cal.com" });
    w.Cal.ns[ns]("ui", uiConfig);
  }
}

// Load Cal.com on first user interaction
for (const evt of ["mouseover", "touchstart", "scroll"] as const) {
  document.addEventListener(evt, loadCal, { once: true, passive: true });
}

// Also load if a cal link is clicked before interaction events fire
document.addEventListener("click", e => {
  const el = (e.target as Element).closest("[data-cal-link]");
  if (el) loadCal();
});
