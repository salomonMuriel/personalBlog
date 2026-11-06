import { COPIA, OPCIONES, MULTIPLES, ORDEN } from "./cuestionario-datos.js";

const PASOS = [...ORDEN, "contacto"];
const WHATSAPP = /^[+\d][\d\s().-]{6,}$/;
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WA_NUMERO = "573132465100";
const CAL = "https://cal.com/salomonmuriel/consultoria";
const HORAS_SEMANA = { "menos-5": [1, 5], "5-20": [5, 20], "20-40": [20, 40], "40+": [40, null] };
const SEMANAS_AL_ANIO = 48;
const CHECK = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7.2 5.8 10 11 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const FLECHA = '<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8"/><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5"/></svg>';

const inicio = Date.now();

function evento(nombre, params = {}) {
  if (typeof window.gtag === "function") window.gtag("event", nombre, params);
}

function enlaceWa(texto) {
  return `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(texto)}`;
}

function escapar(texto) {
  return String(texto).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function pintarPregunta(clave, indice) {
  const p = COPIA.preguntas[clave];
  const max = MULTIPLES[clave];
  const tipo = max ? "checkbox" : "radio";
  const pista = max ? (max >= OPCIONES[clave].length ? COPIA.marcaVarias : COPIA.escogeHasta.replace("%n", max)) : "";
  const opciones = OPCIONES[clave].map(id => [id, p.opciones[id]]).map(([id, texto]) => `
    <label class="opt${max ? " opt--multi" : ""}">
      <input type="${tipo}" name="${clave}" value="${escapar(id)}">
      <span class="opt__box">${CHECK}</span>
      <span>${escapar(texto)}</span>
    </label>`).join("");
  const otra = clave === "sector"
    ? `<div class="field cq__otra" data-otra hidden><label for="sectorOtro">${COPIA.otraPlaceholder}</label><input id="sectorOtro" name="sectorOtro" type="text" maxlength="80" autocomplete="off"></div>`
    : "";
  return `
    <fieldset data-paso="${clave}" ${max ? `data-max="${max}"` : ""} ${indice ? "hidden" : ""}>
      <legend tabindex="-1">${escapar(p.titulo)}</legend>
      ${pista ? `<p class="cq__hint">${pista}</p>` : ""}
      <div class="cq__opts${OPCIONES[clave].length > 5 ? " cq__opts--dos" : ""}" data-visual>${opciones}</div>
      ${otra}
    </fieldset>`;
}

function pintarContacto() {
  const c = COPIA.contacto;
  const campo = (id, etiqueta, extra = "", error = "") => `
    <div class="field${id === "mensaje" ? " field--full" : ""}">
      <label for="${id}">${etiqueta}</label>
      ${id === "mensaje" ? `<textarea id="${id}" name="${id}" maxlength="1200" rows="3"></textarea>` : `<input id="${id}" name="${id}" ${extra}>`}
      ${error ? `<span class="field__error" data-error="${id}" hidden>${error}</span>` : ""}
    </div>`;
  return `
    <fieldset data-paso="contacto" hidden>
      <legend tabindex="-1">${c.titulo}</legend>
      <div class="form">
        ${campo("nombre", c.nombre, 'type="text" autocomplete="name" maxlength="80" required', c.faltaNombre)}
        ${campo("empresa", c.empresa, 'type="text" autocomplete="organization" maxlength="120" required', c.faltaEmpresa)}
        ${campo("whatsapp", c.whatsapp, `type="tel" autocomplete="tel" inputmode="tel" maxlength="30" placeholder="${c.whatsappPlaceholder}" required`, c.faltaWhatsapp)}
        ${campo("correo", c.correo, 'type="email" autocomplete="email" maxlength="160"', c.correoInvalido)}
        ${campo("mensaje", c.mensaje)}
      </div>
      <p class="cq__privacy">${c.privacidad}</p>
    </fieldset>`;
}

function leerRespuestas(form) {
  const d = new FormData(form);
  const una = k => d.get(k) ?? undefined;
  return {
    sector: una("sector"),
    sectorOtro: una("sector") === "otra" ? String(d.get("sectorOtro") ?? "").trim() : "",
    tamano: una("tamano"),
    donde: d.getAll("donde"),
    excels: una("excels"),
    duele: d.getAll("duele"),
    horas: una("horas"),
    cuando: una("cuando"),
    decide: una("decide"),
  };
}

function leerContacto(form) {
  const d = new FormData(form);
  const v = k => String(d.get(k) ?? "").trim();
  return { nombre: v("nombre"), empresa: v("empresa"), whatsapp: v("whatsapp"), correo: v("correo"), mensaje: v("mensaje") };
}

function leerOrigen() {
  let utm = {};
  try {
    const raw = sessionStorage.getItem("sm_origen");
    if (raw) utm = JSON.parse(raw) ?? {};
  } catch {
    utm = {};
  }
  return { pagina: location.pathname, referrer: document.referrer || "", utm };
}

const minusculaInicial = t => t.charAt(0).toLowerCase() + t.slice(1);

function mensajeWhatsapp(r, c, origen) {
  const p = COPIA.preguntas;
  const w = COPIA.wa;
  const lineas = [w.encabezado];
  const sector = r.sector && (r.sector === "otra" && r.sectorOtro ? r.sectorOtro : p.sector.opciones[r.sector]);
  const empresa = [c.empresa, sector, r.tamano && `${p.tamano.opciones[r.tamano]} ${w.personas}`].filter(Boolean);
  if (empresa.length) lineas.push(`${w.empresa}: ${empresa.join(", ")}`);
  if (r.duele?.length) lineas.push(`${w.pesa}: ${r.duele.map(d => minusculaInicial(p.duele.opciones[d])).join("; ")}`);
  if (r.excels) lineas.push(`${w.excels}: ${p.excels.opciones[r.excels]}`);
  if (r.cuando) lineas.push(`${w.cuando}: ${p.cuando.opciones[r.cuando]}`);
  const utm = origen?.utm ?? {};
  const etiqueta = [utm.utm_source, utm.utm_campaign].filter(Boolean).join(" / ");
  if (etiqueta) lineas.push(`${w.procedencia}: ${etiqueta}`);
  if (c.nombre) lineas.push("", c.nombre);
  return lineas.join("\n");
}

function lineaHoras(horas) {
  const rango = HORAS_SEMANA[horas];
  if (!rango) return "";
  const formato = new Intl.NumberFormat("es-CO");
  const [desde, hasta] = rango;
  if (hasta === null) return COPIA.resultado.horasMas.replace("%a", formato.format(desde * SEMANAS_AL_ANIO));
  return COPIA.resultado.horas
    .replace("%a", formato.format(desde * SEMANAS_AL_ANIO))
    .replace("%b", formato.format(hasta * SEMANAS_AL_ANIO));
}

function boton(clase, href, texto, flecha = false) {
  const externo = href.startsWith("http") ? ' rel="noopener"' : "";
  return `<a class="btn ${clase}" href="${escapar(href)}"${externo}>${escapar(texto)}${flecha ? FLECHA : ""}</a>`;
}

function botonesResultado(encaje, wa) {
  const r = COPIA.resultado;
  if (encaje === "si") return boton("btn--primary", CAL, r.si.ctaAgenda, true) + boton("btn--secondary", wa, r.si.ctaWa);
  if (encaje === "temprano") return boton("btn--primary", "/mentoria/", r.temprano.ctaMentoria, true) + boton("btn--secondary", wa, r.temprano.ctaWa);
  if (encaje === "explorando") return boton("btn--primary", wa, r.explorando.ctaWa, true);
  return boton("btn--primary", wa, r.error.ctaWa, true);
}

function ponerTexto(boton, texto) {
  const nodo = [...boton.childNodes].find(n => n.nodeType === Node.TEXT_NODE);
  if (nodo) nodo.textContent = texto;
}

function rotular(raiz, atras, siguiente, enviar) {
  raiz.querySelector("[data-cabecera]").textContent = COPIA.titulo;
  raiz.querySelector("[data-res-rotulo]").textContent = COPIA.resultado.rotulo;
  const nota = document.querySelector("[data-nota]");
  if (nota) nota.textContent = COPIA.nota;
  ponerTexto(atras, COPIA.atras);
  ponerTexto(siguiente, COPIA.siguiente);
  ponerTexto(enviar, COPIA.contacto.enviar);
}

function iniciar() {
  const raiz = document.querySelector("[data-cuestionario]");
  if (!raiz) return;
  const version = raiz.dataset.version ?? "v2";
  const form = raiz.querySelector("[data-formulario]");
  raiz.querySelector("[data-pasos]").innerHTML = ORDEN.map(pintarPregunta).join("") + pintarContacto();

  const fieldsets = PASOS.map(p => form.querySelector(`[data-paso="${p}"]`));
  const atras = raiz.querySelector("[data-atras]");
  const siguiente = raiz.querySelector("[data-siguiente]");
  const enviar = raiz.querySelector("[data-enviar]");
  const textoPaso = document.querySelector("[data-paso-texto]");
  const barra = document.querySelector("[data-barra]");
  rotular(raiz, atras, siguiente, enviar);
  const otra = form.querySelector("[data-otra]");
  let actual = 0;
  let empezo = false;
  let avance;

  const completo = f => f.dataset.paso === "contacto" || f.querySelectorAll("input:checked").length > 0;

  function pintar(enfocar) {
    fieldsets.forEach((f, i) => (f.hidden = i !== actual));
    const ultimo = actual === PASOS.length - 1;
    atras.hidden = actual === 0;
    siguiente.hidden = ultimo;
    enviar.hidden = !ultimo;
    siguiente.disabled = !completo(fieldsets[actual]);
    textoPaso.textContent = COPIA.paso.replace("%n", actual + 1).replace("%t", PASOS.length);
    barra.style.width = `${((actual + 1) / PASOS.length) * 100}%`;
    if (!enfocar) return;
    fieldsets[actual].querySelector("legend").focus({ preventScroll: true });
    if (window.scrollY > 0) window.scrollTo({ top: 0 });
  }

  function ir(destino) {
    clearTimeout(avance);
    actual = Math.max(0, Math.min(PASOS.length - 1, destino));
    evento("cuestionario_paso", { paso: PASOS[actual], n: actual + 1, version });
    pintar(true);
  }

  function limitar(fieldset) {
    const max = Number(fieldset.dataset.max);
    if (!max) return;
    const casillas = [...fieldset.querySelectorAll("input[type=checkbox]")];
    const lleno = casillas.filter(c => c.checked).length >= max;
    casillas.forEach(c => (c.disabled = lleno && !c.checked));
  }

  form.addEventListener("change", ev => {
    const input = ev.target;
    const fieldset = fieldsets[actual];
    if (!empezo) {
      empezo = true;
      evento("cuestionario_inicio", { version });
    }
    if (input.name === "sector") {
      otra.hidden = input.value !== "otra";
      if (!otra.hidden) otra.querySelector("input").focus();
    }
    limitar(fieldset);
    siguiente.disabled = !completo(fieldset);
    const unica = input.type === "radio" && !(input.name === "sector" && input.value === "otra");
    if (unica) avance = setTimeout(() => ir(actual + 1), 260);
  });

  atras.addEventListener("click", () => ir(actual - 1));
  siguiente.addEventListener("click", () => {
    if (completo(fieldsets[actual])) ir(actual + 1);
  });

  function validar(c) {
    const fallas = {
      nombre: !c.nombre,
      empresa: !c.empresa,
      whatsapp: !WHATSAPP.test(c.whatsapp),
      correo: !!c.correo && !CORREO.test(c.correo),
    };
    let primera = null;
    for (const [campo, falla] of Object.entries(fallas)) {
      const input = form.elements.namedItem(campo);
      input?.setAttribute("aria-invalid", String(falla));
      const aviso = form.querySelector(`[data-error="${campo}"]`);
      if (aviso) aviso.hidden = !falla;
      if (falla && !primera) primera = input;
    }
    primera?.focus();
    return !primera;
  }

  form.addEventListener("submit", async ev => {
    ev.preventDefault();
    if (actual !== PASOS.length - 1) return;
    const contacto = leerContacto(form);
    if (!validar(contacto)) return;
    const respuestas = leerRespuestas(form);
    const origen = leerOrigen();
    enviar.disabled = true;
    const etiqueta = enviar.innerHTML;
    enviar.textContent = COPIA.contacto.enviando;

    let encaje = "error";
    try {
      const res = await fetch("/api/cuestionario", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          idioma: "es",
          version,
          respuestas,
          contacto,
          origen,
          web: form.elements.namedItem("web")?.value ?? "",
          msLlenado: Date.now() - inicio,
        }),
      });
      const cuerpo = await res.json();
      if (res.ok && cuerpo.ok && ["si", "temprano", "explorando"].includes(cuerpo.encaje)) encaje = cuerpo.encaje;
    } catch {
      encaje = "error";
    }

    if (encaje !== "error") evento("cuestionario_enviado", { encaje, tamano: respuestas.tamano, version });
    mostrar(encaje, respuestas, contacto, origen);
    enviar.disabled = false;
    enviar.innerHTML = etiqueta;
  });

  function mostrar(encaje, respuestas, contacto, origen) {
    const caja = raiz.querySelector("[data-resultado]");
    const copia = COPIA.resultado[encaje];
    const nombre = contacto.nombre.split(/\s+/)[0] ?? "";
    form.hidden = true;
    raiz.querySelector("[data-cabecera]").hidden = true;
    caja.hidden = false;
    const titulo = caja.querySelector("[data-res-titulo]");
    titulo.textContent = copia.titulo.replace("%nombre", nombre);
    caja.querySelector("[data-res-texto]").textContent = copia.texto;
    const wa = enlaceWa(mensajeWhatsapp(respuestas, contacto, origen));
    caja.querySelector("[data-res-botones]").innerHTML = botonesResultado(encaje, wa);
    const horas = caja.querySelector("[data-horas]");
    const linea = encaje === "si" || encaje === "explorando" ? lineaHoras(respuestas.horas) : "";
    horas.textContent = linea;
    horas.hidden = !linea;
    titulo.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }

  pintar(false);
}

iniciar();
