const Availability = (() => {
  const root = document.getElementById("simulator");
  if (!root) return null;
  const DAY = 86400000;
  const rangeStart = new Date("2027-01-01T12:00:00");
  const rangeEnd = new Date("2027-07-15T12:00:00");
  const firstSaturday = new Date("2027-01-09T12:00:00");
  const span = (rangeEnd - rangeStart) / DAY;
  const position = date => (((date - rangeStart) / DAY) / span) * 100;
  const parse = value => new Date(`${value}T12:00:00`);
  const longDate = new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const shortDate = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short" });

  const slider = root.querySelector("#sim-date");
  const dateLabel = root.querySelector("#sim-date-label");
  const destinationGroup = root.querySelector("#sim-destination");
  const grid = root.querySelector("#sim-grid");
  const result = root.querySelector("#sim-result");
  const months = root.querySelector("#sim-months");

  const state = { week: 16, destination: "bogota" };

  function weddingDate() {
    return new Date(firstSaturday.getTime() + state.week * 7 * DAY);
  }

  function renderMonths() {
    const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
    months.innerHTML = labels.map((label, index) => `<span style="left:${position(new Date(2027, index, 1, 12))}%">${label}</span>`).join("");
  }

  function renderCards() {
    grid.innerHTML = SAMPLE_DRESSES.map(dress => `
      <article class="dress" data-name="${dress.name}">
        <div class="dress__photo"><img src="img/vestidos/${dress.photo}-1.webp" alt="Vestido ${dress.name}" width="300" height="450" loading="lazy"></div>
        <div class="dress__body">
          <p class="dress__name">${dress.name}</p>
          <p class="dress__meta">${dress.silhouette}, talla ${dress.size}</p>
          <div class="dress__cinta">
            ${dress.bookings.map(booking => `<span class="dress__window" data-booking="${booking}"></span><span class="dress__loan" style="left:${position(parse(booking))}%"></span>`).join("")}
            <span class="dress__ring"></span>
          </div>
          <p class="dress__state"></p>
        </div>
      </article>`).join("");
  }

  function update() {
    const date = weddingDate();
    const destination = DESTINATIONS.find(item => item.id === state.destination);
    const windowDays = destination.windowDays;
    dateLabel.textContent = longDate.format(date);
    let free = 0;

    grid.querySelectorAll(".dress").forEach(card => {
      const dress = SAMPLE_DRESSES.find(item => item.name === card.dataset.name);
      const conflict = dress.bookings.map(parse).find(booking => Math.abs(booking - date) / DAY < windowDays);
      card.classList.toggle("is-busy", Boolean(conflict));
      if (!conflict) free++;
      card.querySelector(".dress__ring").style.left = `${position(date)}%`;
      card.querySelectorAll(".dress__window").forEach(windowNode => {
        const booking = parse(windowNode.dataset.booking);
        const left = Math.max(0, position(new Date(booking.getTime() - windowDays * DAY)));
        const right = Math.min(100, position(new Date(booking.getTime() + windowDays * DAY)));
        windowNode.style.left = `${left}%`;
        windowNode.style.width = `${right - left}%`;
        windowNode.classList.toggle("is-conflict", Math.abs(booking - date) / DAY < windowDays);
      });
      card.querySelector(".dress__state").innerHTML = conflict
        ? `${icon("warning")}Reservado para una boda el ${shortDate.format(conflict)}`
        : `${icon("check-circle")}Se puede ofrecer`;
    });

    result.innerHTML = `<b class="num">${free}</b> de ${SAMPLE_DRESSES.length} se pueden ofrecer para esta fecha`;
    destinationGroup.querySelectorAll("button").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.destination === state.destination)));
  }

  function bind() {
    slider.addEventListener("input", () => { state.week = Number(slider.value); update(); });
    destinationGroup.addEventListener("click", event => {
      const button = event.target.closest("button");
      if (!button) return;
      state.destination = button.dataset.destination;
      update();
    });
  }

  slider.max = String(Math.floor((new Date("2027-06-26T12:00:00") - firstSaturday) / (7 * DAY)));
  slider.value = String(state.week);
  renderMonths();
  renderCards();
  bind();
  update();
  return { update };
})();
