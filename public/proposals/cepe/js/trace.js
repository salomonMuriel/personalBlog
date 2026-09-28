function setupTraceability() {
  const panel = document.getElementById("trace");
  const steps = [...panel.querySelectorAll(".step")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let timer = null;
  let isHovered = false;

  const show = index => {
    current = index;
    steps.forEach((step, stepIndex) => {
      step.classList.toggle("is-active", stepIndex === index);
      step.classList.toggle("is-done", stepIndex < index);
    });
  };
  const advance = () => {
    if (isHovered) return;
    show(current + 1 >= steps.length + 1 ? 0 : current + 1);
    if (current >= steps.length) steps.forEach(step => step.classList.add("is-done"));
  };
  const start = () => { if (!timer) timer = setInterval(advance, 1900); };
  const stop = () => { clearInterval(timer); timer = null; };

  if (reducedMotion) {
    steps.forEach(step => step.classList.add("is-done"));
    return;
  }
  steps.forEach((step, index) => step.addEventListener("click", () => show(index)));
  panel.addEventListener("mouseenter", () => { isHovered = true; });
  panel.addEventListener("mouseleave", () => { isHovered = false; });
  new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return stop();
    show(0);
    start();
  }, { threshold: 0.4 }).observe(panel);
}

setupTraceability();
