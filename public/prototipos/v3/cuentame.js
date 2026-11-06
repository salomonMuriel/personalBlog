import { COPIA, OPCIONES, MULTIPLES, ORDEN } from "./cuestionario-datos.js";

const PASOS = [...ORDEN, "contacto"];
const WHATSAPP = /^[+\d][\d\s().-]{6,}$/;
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WA_NUMERO = "573132465100";
const CAL = "https://cal.com/salomonmuriel/consultoria";
const HORAS_SEMANA = { "menos-5": [1, 5], "5-20": [5, 20], "20-40": [20, 40], "40+": [40, null] };
// 48 working weeks, the same conservative year the live site uses.
const SEMANAS_AL_ANIO = 48;
const AVANCE_MS = 260;
const MARCA = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7.2 5.8 10 11 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const inicio = Date.now();

function evento(nombre, parametros = {}) {
  if (typeof window.gtag === "function") window.gtag("event", nombre, parametros);
}

function enlaceWa(texto) {
  return `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(texto)}`;
}

function escapar(texto) {
  return String(texto).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function pistaDe(clave) {
  const max = MULTIPLES[clave];
  if (!max) return "";
  return max >= OPCIONES[clave].length ? COPIA.marcaVarias : COPIA.escogeHasta.replace("%n", max);
}

function pintarOpcion(clave, id, multiple) {
  const texto = COPIA.preguntas[clave].opciones[id];
  return `
    <label class="cq-op">
      <input type="${multiple ? "checkbox" : "radio"}" name="${clave}" value="${escapar(id)}">
      <span class="cq-op__marca${multiple ? " cq-op__marca--varias" : ""}">${MARCA}</span>
      <span class="cq-op__texto">${escapar(texto)}</span>
    </label>`;
}

function pintarPaso(clave, indice) {
  const multiple = Boolean(MULTIPLES[clave]);
  const opciones = OPCIONES[clave].map(id => pintarOpcion(clave, id, multiple)).join("");
  const dos = OPCIONES[clave].length > 5 ? " cq__opciones--dos" : "";
  const otra = clave === "sector"
    ? `<div class="field cq__otra" data-otra hidden><label for="sectorOtro">${COPIA.otraPlaceholder}</label><input id="sectorOtro" name="sectorOtro" type="text" maxlength="80" autocomplete="off"></div>`
    : "";
  return `
    <div class="cq__opciones${dos}" role="group" aria-labelledby="cq-pregunta" data-paso="${clave}"${multiple ? ` data-max="${MULTIPLES[clave]}"` : ""}${indice ? " hidden" : ""}>
      ${opciones}
      ${otra}
    </div>`;
}

function pintarCampo(id, etiqueta, atributos, error) {
  const control = id === "mensaje"
    ? `<textarea id="${id}" name="${id}" maxlength="1200" rows="2"></textarea>`
    : `<input id="${id}" name="${id}" ${atributos}>`;
  const aviso = error ? `<span class="field__error" data-error="${id}" hidden>${error}</span>` : "";
  return `<div class="field${id === "mensaje" ? " field--full" : ""}"><label for="${id}">${etiqueta}</label>${control}${aviso}</div>`;
}

function pintarContacto() {
  const c = COPIA.contacto;
  return `
    <div class="cq__contacto" role="group" aria-labelledby="cq-pregunta" data-paso="contacto" hidden>
      <div class="form">
        ${pintarCampo("nombre", c.nombre, 'type="text" autocomplete="name" maxlength="80" required', c.faltaNombre)}
        ${pintarCampo("empresa", c.empresa, 'type="text" autocomplete="organization" maxlength="120" required', c.faltaEmpresa)}
        ${pintarCampo("whatsapp", c.whatsapp, `type="tel" autocomplete="tel" inputmode="tel" maxlength="30" placeholder="${c.whatsappPlaceholder}" required`, c.faltaWhatsapp)}
        ${pintarCampo("correo", c.correo, 'type="email" autocomplete="email" maxlength="160"', c.correoInvalido)}
        ${pintarCampo("mensaje", c.mensaje, "", "")}
      </div>
      <p class="cq__privacidad">${c.privacidad}</p>
    </div>`;
}

function leerRespuestas(form) {
  const datos = new FormData(form);
  const una = clave => datos.get(clave) ?? undefined;
  return {
    sector: una("sector"),
    sectorOtro: una("sector") === "otra" ? String(datos.get("sectorOtro") ?? "").trim() : "",
    tamano: una("tamano"),
    donde: datos.getAll("donde"),
    excels: una("excels"),
    duele: datos.getAll("duele"),
    horas: una("horas"),
    cuando: una("cuando"),
    decide: una("decide"),
  };
}

function leerContacto(form) {
  const datos = new FormData(form);
  const valor = clave => String(datos.get(clave) ?? "").trim();
  return { nombre: valor("nombre"), empresa: valor("empresa"), whatsapp: valor("whatsapp"), correo: valor("correo"), mensaje: valor("mensaje") };
}

function leerOrigen() {
  let utm = {};
  try {
    const guardado = sessionStorage.getItem("sm_origen");
    if (guardado) utm = JSON.parse(guardado) ?? {};
  } catch (error) {
    console.warn("No se pudo leer el origen de la visita", error);
    utm = {};
  }
  return { pagina: location.pathname, referrer: document.referrer || "", utm };
}

const minusculaInicial = texto => texto.charAt(0).toLowerCase() + texto.slice(1);

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

function boton(clase, href, texto, origen) {
  const externo = href.startsWith("http") ? ' rel="noopener"' : "";
  return `<a class="btn ${clase}" href="${escapar(href)}"${externo} data-origen="${origen}">${escapar(texto)}</a>`;
}

function botonesResultado(encaje, wa) {
  const r = COPIA.resultado;
  if (encaje === "si") return boton("btn--primary", CAL, r.si.ctaAgenda, "resultado") + boton("btn--secondary", wa, r.si.ctaWa, "resultado");
  if (encaje === "temprano") return boton("btn--primary", "/mentoria/", r.temprano.ctaMentoria, "resultado") + boton("btn--secondary", wa, r.temprano.ctaWa, "resultado");
  if (encaje === "explorando") return boton("btn--primary", wa, r.explorando.ctaWa, "resultado");
  return boton("btn--primary", wa, r.error.ctaWa, "resultado");
}

function iniciar() {
  const raiz = document.querySelector("[data-cuestionario]");
  if (!raiz) return;
  const version = raiz.dataset.version ?? "v3";
  const form = raiz.querySelector("[data-formulario]");
  raiz.querySelector("[data-pasos]").innerHTML = ORDEN.map(pintarPaso).join("") + pintarContacto();

  const pasos = PASOS.map(clave => form.querySelector(`[data-paso="${clave}"]`));
  const atras = raiz.querySelector("[data-atras]");
  const siguiente = raiz.querySelector("[data-siguiente]");
  const enviar = raiz.querySelector("[data-enviar]");
  const pregunta = raiz.querySelector("[data-pregunta]");
  const pista = raiz.querySelector("[data-pista]");
  const nota = raiz.querySelector("[data-nota]");
  const textoPaso = raiz.querySelector("[data-paso-texto]");
  const segmentos = raiz.querySelector("[data-segmentos]");
  const otra = form.querySelector("[data-otra]");
  segmentos.innerHTML = PASOS.map(() => "<li></li>").join("");
  atras.textContent = COPIA.atras;
  siguiente.textContent = COPIA.siguiente;
  enviar.textContent = COPIA.contacto.enviar;
  nota.textContent = COPIA.nota;

  let actual = 0;
  let empezo = false;
  let avance;

  const completo = paso => paso.dataset.paso === "contacto" || paso.querySelectorAll("input:checked").length > 0;

  function pintar(enfocar) {
    const clave = PASOS[actual];
    const ultimo = actual === PASOS.length - 1;
    pasos.forEach((paso, i) => (paso.hidden = i !== actual));
    pregunta.textContent = ultimo ? COPIA.contacto.titulo : COPIA.preguntas[clave].titulo;
    const textoPista = ultimo ? "" : pistaDe(clave);
    pista.textContent = textoPista;
    pista.hidden = !textoPista;
    nota.hidden = actual !== 0;
    atras.hidden = actual === 0;
    siguiente.hidden = ultimo;
    enviar.hidden = !ultimo;
    siguiente.disabled = !completo(pasos[actual]);
    textoPaso.textContent = COPIA.paso.replace("%n", actual + 1).replace("%t", PASOS.length);
    [...segmentos.children].forEach((segmento, i) => segmento.classList.toggle("es-hecho", i <= actual));
    if (!enfocar) return;
    pregunta.focus({ preventScroll: true });
    if (window.scrollY > 0) window.scrollTo({ top: 0 });
  }

  function ir(destino) {
    clearTimeout(avance);
    actual = Math.max(0, Math.min(PASOS.length - 1, destino));
    evento("cuestionario_paso", { paso: PASOS[actual], n: actual + 1, version });
    pintar(true);
  }

  function limitar(paso) {
    const max = Number(paso.dataset.max);
    if (!max) return;
    const casillas = [...paso.querySelectorAll("input[type=checkbox]")];
    const lleno = casillas.filter(c => c.checked).length >= max;
    casillas.forEach(c => (c.disabled = lleno && !c.checked));
  }

  form.addEventListener("change", ev => {
    const input = ev.target;
    const paso = pasos[actual];
    if (!empezo) {
      empezo = true;
      evento("cuestionario_inicio", { version });
    }
    if (input.name === "sector") {
      otra.hidden = input.value !== "otra";
      if (!otra.hidden) otra.querySelector("input").focus();
    }
    limitar(paso);
    siguiente.disabled = !completo(paso);
    const unica = input.type === "radio" && !(input.name === "sector" && input.value === "otra");
    if (unica) avance = setTimeout(() => ir(actual + 1), AVANCE_MS);
  });

  atras.addEventListener("click", () => ir(actual - 1));
  siguiente.addEventListener("click", () => {
    if (completo(pasos[actual])) ir(actual + 1);
  });

  function validar(contacto) {
    const fallas = {
      nombre: !contacto.nombre,
      empresa: !contacto.empresa,
      whatsapp: !WHATSAPP.test(contacto.whatsapp),
      correo: Boolean(contacto.correo) && !CORREO.test(contacto.correo),
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

  async function enviarRespuestas(respuestas, contacto, origen) {
    try {
      const respuesta = await fetch("/api/cuestionario", {
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
      const cuerpo = await respuesta.json();
      if (respuesta.ok && cuerpo.ok && ["si", "temprano", "explorando"].includes(cuerpo.encaje)) return cuerpo.encaje;
      console.warn("El cuestionario no se guardó", respuesta.status, cuerpo);
      return "error";
    } catch (error) {
      console.warn("El cuestionario no se pudo enviar", error);
      return "error";
    }
  }

  form.addEventListener("submit", async ev => {
    ev.preventDefault();
    if (actual !== PASOS.length - 1) return;
    const contacto = leerContacto(form);
    if (!validar(contacto)) return;
    const respuestas = leerRespuestas(form);
    const origen = leerOrigen();
    enviar.disabled = true;
    enviar.textContent = COPIA.contacto.enviando;
    const encaje = await enviarRespuestas(respuestas, contacto, origen);
    if (encaje !== "error") evento("cuestionario_enviado", { encaje, tamano: respuestas.tamano, version });
    mostrar(encaje, respuestas, contacto, origen);
    enviar.disabled = false;
    enviar.textContent = COPIA.contacto.enviar;
  });

  function mostrar(encaje, respuestas, contacto, origen) {
    const caja = raiz.querySelector("[data-resultado]");
    const copia = COPIA.resultado[encaje];
    const nombre = contacto.nombre.split(/\s+/)[0] ?? "";
    raiz.classList.add("es-resultado");
    form.hidden = true;
    [raiz.querySelector("[data-cabeza]"), segmentos, pregunta, pista, nota].forEach(nodo => (nodo.hidden = true));
    caja.hidden = false;
    caja.querySelector("[data-res-rotulo]").textContent = encaje === "error" ? "" : COPIA.resultado.rotulo;
    caja.querySelector("[data-res-rotulo]").hidden = encaje === "error";
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
