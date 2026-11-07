// The active tab's progress bar is the clock: its CSS animation runs for one
// turn, so pausing it (hover, keyboard focus, the button) also pauses the
// rotation, and its animationend moves to the next system.
export function iniciarTriptico(raiz: HTMLElement) {
  const pestanas = [
    ...raiz.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
  ];
  const paneles = [...raiz.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
  const lista = raiz.querySelector<HTMLElement>('[role="tablist"]');
  const escena = raiz.querySelector<HTMLElement>("[data-escena]");
  const pausa = raiz.querySelector<HTMLButtonElement>("[data-pausa]");
  if (!pestanas.length || !lista || !escena || !pausa) return;

  const quieto = matchMedia("(prefers-reduced-motion: reduce)");
  const total = pestanas.length;
  let actual = 0;
  let ultimoPuntero = "";
  let cerca = false;

  // A panel's screens load only once it is marked ready. The clock runs from
  // page load, so readiness waits for the section to come near; otherwise
  // every panel would be ready, and load at once, by the time it is reached.
  const preparar = (n: number) => {
    if (cerca) paneles[(n + total) % total].setAttribute("data-listo", "");
  };
  const prepararTodos = () => paneles.forEach((_, i) => preparar(i));
  paneles.forEach(panel => panel.removeAttribute("data-listo"));

  const alinearEnLista = (pestana: HTMLElement) => {
    if (lista.scrollWidth <= lista.clientWidth) return;
    const izquierda = pestana.offsetLeft;
    const derecha = izquierda + pestana.offsetWidth;
    const visible =
      izquierda >= lista.scrollLeft &&
      derecha <= lista.scrollLeft + lista.clientWidth;
    if (visible) return;
    lista.scrollTo({
      left: izquierda - (lista.clientWidth - pestana.offsetWidth) / 2,
      behavior: quieto.matches ? "auto" : "smooth",
    });
  };

  const mostrar = (n: number, enfocar = false) => {
    actual = (n + total) % total;
    pestanas.forEach((pestana, i) => {
      const activa = i === actual;
      pestana.setAttribute("aria-selected", String(activa));
      pestana.tabIndex = activa ? 0 : -1;
    });
    paneles.forEach((panel, i) =>
      panel.toggleAttribute("data-activo", i === actual)
    );
    preparar(actual);
    preparar(actual + 1);
    if (enfocar) pestanas[actual].focus();
    alinearEnLista(pestanas[actual]);
  };

  const actualizarEstado = () => {
    const pausado = pausa.getAttribute("aria-pressed") === "true";
    const rota = !quieto.matches && !pausado;
    raiz.toggleAttribute("data-rotando", !quieto.matches);
    raiz.toggleAttribute("data-pausado", pausado);
    escena.setAttribute("aria-live", rota ? "off" : "polite");
  };

  const fijarPausa = (pausado: boolean) => {
    pausa.setAttribute("aria-pressed", String(pausado));
    actualizarEstado();
  };

  lista.addEventListener("animationend", evento => {
    const relleno = pestanas[actual].querySelector("[data-relleno]");
    if (evento.target === relleno) mostrar(actual + 1);
  });

  lista.addEventListener("pointerdown", evento => {
    ultimoPuntero = evento.pointerType;
  });

  pestanas.forEach((pestana, i) => {
    pestana.addEventListener("click", () => {
      mostrar(i);
      // On touch there is no hover to hold the chosen system in place.
      if (ultimoPuntero === "touch") fijarPausa(true);
      ultimoPuntero = "";
    });
  });
  lista.addEventListener("pointerenter", prepararTodos);
  lista.addEventListener("focusin", prepararTodos);

  lista.addEventListener("keydown", evento => {
    const destinos: Record<string, number> = {
      ArrowRight: actual + 1,
      ArrowDown: actual + 1,
      ArrowLeft: actual - 1,
      ArrowUp: actual - 1,
      Home: 0,
      End: total - 1,
    };
    const destino = destinos[evento.key];
    if (destino === undefined) return;
    evento.preventDefault();
    mostrar(destino, true);
  });

  pausa.addEventListener("click", () =>
    fijarPausa(pausa.getAttribute("aria-pressed") !== "true")
  );

  document.addEventListener("visibilitychange", () =>
    raiz.toggleAttribute("data-oculto", document.hidden)
  );
  quieto.addEventListener("change", actualizarEstado);

  new IntersectionObserver(
    (entradas, observador) => {
      if (!entradas.some(entrada => entrada.isIntersecting)) return;
      observador.disconnect();
      cerca = true;
      preparar(actual);
      preparar(actual + 1);
    },
    { rootMargin: "600px 0px" }
  ).observe(raiz);

  actualizarEstado();
  mostrar(0);
}
