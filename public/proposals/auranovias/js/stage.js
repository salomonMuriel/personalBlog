// Frame-based compositions, Remotion style: each scene is a pure render(frame).
const Stage = (() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function cubicBezier(x1, y1, x2, y2) {
    const sampleX = t => ((1 - 3 * x2 + 3 * x1) * t + (3 * x2 - 6 * x1)) * t * t + 3 * x1 * t;
    const sampleY = t => ((1 - 3 * y2 + 3 * y1) * t + (3 * y2 - 6 * y1)) * t * t + 3 * y1 * t;
    return x => {
      let low = 0;
      let high = 1;
      for (let index = 0; index < 24; index++) {
        const mid = (low + high) / 2;
        if (sampleX(mid) < x) low = mid;
        else high = mid;
      }
      return sampleY((low + high) / 2);
    };
  }

  const Easing = {
    linear: t => t,
    out: cubicBezier(0.16, 1, 0.3, 1),
    inOut: cubicBezier(0.45, 0, 0.55, 1),
    in: cubicBezier(0.5, 0, 0.75, 0),
  };

  function interpolate(frame, input, output, easing = Easing.out) {
    if (frame <= input[0]) return output[0];
    const last = input.length - 1;
    if (frame >= input[last]) return output[last];
    let segment = 0;
    while (frame > input[segment + 1]) segment++;
    const progress = (frame - input[segment]) / (input[segment + 1] - input[segment]);
    return output[segment] + (output[segment + 1] - output[segment]) * easing(progress);
  }

  function spring(frame, fps = 30, damping = 14, stiffness = 120) {
    if (frame <= 0) return 0;
    const time = frame / fps;
    const omega = Math.sqrt(stiffness);
    const zeta = damping / (2 * omega);
    if (zeta >= 1) return 1 - Math.exp(-omega * time) * (1 + omega * time);
    const omegaD = omega * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * omega * time) * (Math.cos(omegaD * time) + (zeta * omega / omegaD) * Math.sin(omegaD * time));
  }

  function seeded(seed) {
    let value = seed % 2147483647;
    if (value <= 0) value += 2147483646;
    return () => (value = (value * 16807) % 2147483647) / 2147483647;
  }

  function fitToWidth(viewport, canvas, width) {
    const apply = () => viewport.style.setProperty("--scale", viewport.clientWidth / width);
    apply();
    if ("ResizeObserver" in window) new ResizeObserver(apply).observe(viewport);
  }

  function mount(root, { fps = 30, durationInFrames, loop = true, render }) {
    const viewport = root.querySelector(".stage__viewport");
    const canvas = root.querySelector(".stage__canvas");
    const toggle = root.querySelector(".stage__toggle");
    const bar = root.querySelector(".stage__progress i");
    fitToWidth(viewport, canvas, Number(canvas.dataset.width));

    let frame = 0;
    let playing = !reduceMotion;
    let visible = false;
    let lastTime = null;
    let rafId = null;

    const draw = () => {
      render(Math.floor(frame));
      if (bar) bar.style.transform = `scaleX(${frame / (durationInFrames - 1)})`;
    };

    const tick = time => {
      rafId = null;
      if (!playing || !visible) { lastTime = null; return; }
      if (lastTime !== null) frame += ((time - lastTime) / 1000) * fps;
      lastTime = time;
      if (frame >= durationInFrames) {
        if (loop) frame = 0;
        else { frame = durationInFrames - 1; playing = false; syncToggle(); }
      }
      draw();
      rafId = requestAnimationFrame(tick);
    };

    const start = () => { if (rafId === null && playing && visible) rafId = requestAnimationFrame(tick); };

    const syncToggle = () => {
      if (!toggle) return;
      toggle.setAttribute("aria-pressed", String(playing));
      toggle.setAttribute("aria-label", playing ? "Pausar animación" : "Reproducir animación");
      toggle.querySelector("use").setAttribute("href", `img/icons.svg#i-${playing ? "pause" : "play"}`);
    };

    if (toggle) {
      toggle.addEventListener("click", () => {
        playing = !playing;
        if (playing && frame >= durationInFrames - 1) frame = 0;
        syncToggle();
        start();
      });
    }

    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    }, { threshold: 0.25 }).observe(root);

    frame = reduceMotion ? durationInFrames - 1 : 0;
    syncToggle();
    draw();
    root.seek = target => { frame = Math.min(durationInFrames - 1, Math.max(0, target)); draw(); };
  }

  return { mount, interpolate, spring, Easing, seeded };
})();
