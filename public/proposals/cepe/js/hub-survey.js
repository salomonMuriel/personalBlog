function renderThemes() {
  const maxMentions = Math.max(...SURVEY_THEMES.map(theme => theme.mentions));
  document.getElementById("themes").innerHTML = SURVEY_THEMES.map((theme, index) => `
    <div class="theme" style="--i:${index}">
      <div class="theme__head"><strong>${theme.theme}</strong><span class="num">${theme.mentions} menciones</span></div>
      <div class="progress"><i style="--value:${(theme.mentions / maxMentions) * 100}%"></i></div>
      <blockquote><svg class="icon"><use href="img/icons.svg#i-audio"/></svg>«${theme.quote}»</blockquote>
    </div>`).join("");
}

function setupPhonePreview() {
  const step = document.getElementById("phone-step");
  const progress = document.getElementById("phone-progress");
  const question = document.getElementById("phone-question");
  const recordButton = document.getElementById("phone-rec");
  const time = document.getElementById("phone-time");
  let current = 0;
  let seconds = 0;
  let recordingTimer = null;

  const stopRecording = () => {
    clearInterval(recordingTimer);
    recordButton.setAttribute("aria-pressed", "false");
    recordButton.classList.remove("is-recording");
    time.textContent = seconds ? `Grabado · 0:${String(seconds).padStart(2, "0")}` : "Grabar respuesta";
  };
  const showQuestion = () => {
    step.textContent = `Pregunta ${current + 1} de ${SURVEY_QUESTIONS.length}`;
    progress.style.setProperty("--value", `${((current + 1) / SURVEY_QUESTIONS.length) * 100}%`);
    question.textContent = SURVEY_QUESTIONS[current];
    seconds = 0;
    stopRecording();
  };
  recordButton.addEventListener("click", () => {
    if (recordButton.classList.contains("is-recording")) return stopRecording();
    seconds = 0;
    recordButton.classList.add("is-recording");
    recordButton.setAttribute("aria-pressed", "true");
    recordingTimer = setInterval(() => {
      seconds += 1;
      time.textContent = `Grabando · 0:${String(seconds).padStart(2, "0")}`;
    }, 1000);
    time.textContent = "Grabando · 0:00";
  });
  document.getElementById("phone-next").addEventListener("click", () => {
    current = (current + 1) % SURVEY_QUESTIONS.length;
    showQuestion();
  });
  showQuestion();
}
