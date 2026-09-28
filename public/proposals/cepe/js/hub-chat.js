function appendBubble(kind, html) {
  const thread = document.getElementById("chat-thread");
  const bubble = document.createElement("div");
  bubble.className = `bubble bubble--${kind}`;
  bubble.innerHTML = html;
  thread.append(bubble);
  bubble.scrollIntoView({ behavior: "smooth", block: "nearest" });
  return bubble;
}

const AI_CHIP = '<span class="chip-ai"><svg class="icon"><use href="img/icons.svg#i-spark"/></svg>Hub</span>';

function answerWith(answerHtml, sources) {
  const bubble = appendBubble("ai", `${AI_CHIP}<div class="thinking" aria-label="Pensando"><i></i><i></i><i></i></div>`);
  setTimeout(() => {
    const chips = sources.map(source => `<span>${source}</span>`).join("");
    bubble.innerHTML = `${AI_CHIP}<p>${answerHtml}</p><div class="sources"><b>Fuentes</b>${chips}</div>`;
    bubble.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 1200);
}

function askExchange(exchange) {
  appendBubble("user", exchange.question);
  answerWith(exchange.answer, exchange.sources);
}

function setupChat() {
  const suggestions = document.getElementById("chat-suggestions");
  CHAT_EXCHANGES.forEach(exchange => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = exchange.question;
    button.addEventListener("click", () => { button.remove(); askExchange(exchange); });
    suggestions.append(button);
  });
  document.getElementById("chat-form").addEventListener("submit", event => {
    event.preventDefault();
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    appendBubble("user", escapeHtml(text));
    answerWith("En este prototipo respondo a las preguntas sugeridas. En el Hub real, esta pregunta se contestaría con los datos de CEPE y cada respuesta citaría el documento, el acta o el dato de origen.", ["Ejemplo de comportamiento"]);
  });
}
