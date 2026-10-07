const JOURNEY = [
  {
    when: "Al reservar",
    label: "Bienvenida y beneficios",
    icon: "heart",
    date: "sáb 17 oct",
    messages: [
      { time: "11:42", text: "Querida Laura 🌸<br><br>¡Estamos felices de poder acompañarte en este nuevo comienzo! 👰🏻<br><br>Nos alegra que hayas encontrado tu vestido soñado en Aura Novias, un vestido que, sin duda alguna, realzará tu esencia.<br><br>Haremos todo lo que esté en nuestras manos para que este día tan importante en tu vida sea inolvidable, y te sientas tú misma. 💕<br><br>Para ello queremos brindarte una lista de proveedores con quienes podrás encontrar lo que necesites para tu boda ✨" },
      { time: "11:42", thumb: "favoritos", doc: "Favoritos Aura · Beneficios exclusivos", meta: "PDF · Wedding planner, flores, maquillaje, fotografía, zapatos y más" },
    ],
  },
  {
    when: "Meses de espera",
    label: "Beneficios del mes",
    icon: "gift",
    date: "mar 12 ene",
    messages: [
      { time: "10:00", text: "Hola Laura ✨ Faltan 5 meses para tu boda: buen momento para agendar tu prueba de maquillaje y peinado. Como novia Aura tienes beneficios exclusivos con nuestros aliados, están en tu página Mi boda Aura." },
    ],
  },
  {
    when: "Meses de espera",
    label: "Tips de novia",
    icon: "sparkle",
    date: "vie 5 mar",
    messages: [
      { time: "10:00", text: "Tip Aura 🤍 Empieza a usar en casa los zapatos de tu boda unos minutos al día. Tus pies y tu modista te lo van a agradecer." },
    ],
  },
  {
    when: "Un mes antes",
    label: "Cita de modista",
    icon: "calendar-blank",
    date: "mié 21 abr",
    messages: [
      { time: "9:30", text: "Laura, tu primera cita con modista es el viernes 21 de mayo a las 10:00 a. m. Recuerda traer los zapatos que usarás el día de tu boda 👠" },
      { time: "9:30", thumb: "cita-modista", doc: "Primera cita con modista", meta: "PDF · Zapatos, saldo pagado y firma del pagaré" },
      { time: "9:30", replies: ["Confirmo mi cita", "Necesito cambiarla"] },
    ],
  },
  {
    when: "Antes de la fecha límite",
    label: "Recordatorio de saldo",
    icon: "coin",
    date: "lun 3 may",
    messages: [
      { time: "10:15", text: "Hola Laura 🌸 Tu saldo de $3.100.000 debe quedar pago antes de tu cita de modista del 21 de mayo. Puedes abonar desde tu página Mi boda Aura." },
    ],
  },
  {
    when: "Un día antes",
    label: "Recoges tu vestido",
    icon: "dress",
    date: "lun 7 jun",
    messages: [
      { time: "16:00", text: "¡Mañana recoges tu vestido! 💕 Recuerda traer el depósito de $1.000.000 en efectivo." },
    ],
  },
  {
    when: "Después de la boda",
    label: "Devolución",
    icon: "arrows-left-right",
    date: "dom 13 jun",
    messages: [
      { time: "12:00", text: "Esperamos que tu boda haya sido inolvidable 🤍 Te esperamos el lunes 14 de junio antes de las 5:00 p. m. para recibir tu vestido." },
    ],
  },
];

const BrideJourney = (() => {
  const stops = document.getElementById("journey-stops");
  const thread = document.getElementById("journey-thread");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stepMs = 6500;
  let current = 0;
  let timer = null;
  let typing = [];

  function renderMessage(message) {
    if (message.doc) return `<div class="msg msg--doc"><img class="msg__thumb msg__thumb--${message.thumb}" src="img/experiencia/${message.thumb}.webp" alt="${message.doc}"><div class="msg__docline"><span class="msg__file">${icon("file-text")}</span><div><b>${message.doc}</b><small>${message.meta}</small></div></div><time>${message.time}</time></div>`;
    if (message.replies) return `<div class="msg__replies">${message.replies.map(reply => `<span>${reply}</span>`).join("")}</div>`;
    return `<div class="msg"><p>${message.text}</p><time>${message.time}</time></div>`;
  }

  function show(index) {
    current = index;
    typing.forEach(clearTimeout);
    typing = [];
    stops.querySelectorAll("button").forEach((button, buttonIndex) => {
      button.setAttribute("aria-pressed", String(buttonIndex === index));
      button.classList.toggle("is-past", buttonIndex < index);
    });
    const active = stops.querySelector(`[data-stop="${index}"]`);
    if (stops.scrollWidth > stops.clientWidth) stops.scrollTo({ left: active.parentElement.offsetLeft - stops.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
    const stop = JOURNEY[index];
    thread.innerHTML = `<p class="thread__date">${stop.date}</p>`;
    stop.messages.forEach((message, messageIndex) => {
      const delay = reduceMotion ? 0 : 450 + messageIndex * 900;
      const indicator = reduceMotion ? null : htmlElement("div", "msg msg--typing", "<i></i><i></i><i></i>", thread);
      typing.push(setTimeout(() => {
        if (indicator) indicator.remove();
        thread.insertAdjacentHTML("beforeend", renderMessage(message));
        thread.scrollTop = thread.scrollHeight;
      }, delay));
      if (indicator) typing.push(setTimeout(() => indicator.remove(), delay));
    });
  }

  function stopAutoplay() {
    clearInterval(timer);
    timer = null;
    stops.classList.remove("is-playing");
  }

  function startAutoplay() {
    if (reduceMotion || timer) return;
    stops.classList.add("is-playing");
    timer = setInterval(() => show((current + 1) % JOURNEY.length), stepMs);
  }

  stops.innerHTML = JOURNEY.map((stop, index) => `<li><button type="button" data-stop="${index}" aria-pressed="false" style="--ms:${stepMs}ms">
    <span class="jstop__icon">${icon(stop.icon)}</span>
    <span class="jstop__text"><small>${stop.when}</small><b>${stop.label}</b></span>
  </button></li>`).join("");
  stops.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    stopAutoplay();
    show(Number(button.dataset.stop));
  });
  show(0);
  onceVisible(thread, startAutoplay, 0.4);

  return { show };
})();
