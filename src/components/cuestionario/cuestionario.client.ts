import { wa } from "@config";
import {
  MULTIPLES,
  ORDEN,
  type ClavePregunta,
  type Contacto,
  type Encaje,
  type Respuestas,
} from "@data/cuestionario/opciones";
import type { CopiaCuestionario } from "@data/cuestionario/tipos";
import {
  leerOrigen,
  mensajeWhatsapp,
  type Origen,
} from "@utils/cuestionario-cliente";
import { horasAlAnio } from "@utils/encaje";

type Gtag = (...args: unknown[]) => void;
type Paso = ClavePregunta | "contacto";

const PASOS: Paso[] = [...ORDEN, "contacto"];
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP = /^[+\d][\d\s().-]{6,}$/;

function evento(nombre: string, params: Record<string, unknown> = {}) {
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof g === "function") g("event", nombre, params);
}

function leerRespuestas(form: HTMLFormElement): Partial<Respuestas> {
  const d = new FormData(form);
  const una = (k: string) => (d.get(k) as string | null) ?? undefined;
  const varias = (k: string) => d.getAll(k) as string[];
  return {
    sector: una("sector"),
    sectorOtro: una("sectorOtro")?.trim() || undefined,
    tamano: una("tamano"),
    donde: varias("donde"),
    excels: una("excels"),
    duele: varias("duele"),
    horas: una("horas"),
    cuando: una("cuando"),
    decide: una("decide"),
  } as Partial<Respuestas>;
}

function leerContacto(form: HTMLFormElement): Contacto {
  const d = new FormData(form);
  const v = (k: string) => ((d.get(k) as string | null) ?? "").trim();
  return {
    nombre: v("nombre"),
    empresa: v("empresa"),
    whatsapp: v("whatsapp"),
    correo: v("correo"),
    mensaje: v("mensaje"),
  };
}

function pasoCompleto(fieldset: HTMLFieldSetElement): boolean {
  return fieldset.querySelectorAll("input:checked").length > 0;
}

function limitarMultiples(fieldset: HTMLFieldSetElement) {
  const max = Number(fieldset.dataset.max);
  if (!max) return;
  const casillas = [
    ...fieldset.querySelectorAll<HTMLInputElement>("input[type=checkbox]"),
  ];
  const lleno = casillas.filter(c => c.checked).length >= max;
  casillas.forEach(c => {
    c.disabled = lleno && !c.checked;
    c.closest("label")?.classList.toggle("opacity-45", c.disabled);
  });
}

function validarContacto(form: HTMLFormElement, c: Contacto): boolean {
  const fallas: Record<string, boolean> = {
    nombre: !c.nombre,
    empresa: !c.empresa,
    whatsapp: !WHATSAPP.test(c.whatsapp),
    correo: !!c.correo && !CORREO.test(c.correo),
  };
  let primera: HTMLElement | null = null;
  for (const [campo, falla] of Object.entries(fallas)) {
    const input = form.elements.namedItem(campo) as HTMLInputElement | null;
    const aviso = form.querySelector<HTMLElement>(`[data-error="${campo}"]`);
    input?.setAttribute("aria-invalid", String(falla));
    if (aviso) aviso.hidden = !falla;
    if (falla && !primera) primera = input;
  }
  primera?.focus();
  return !primera;
}

export function iniciarCuestionario() {
  const raiz = document.querySelector<HTMLElement>("[data-cuestionario]");
  const datos = document.getElementById("cuestionario-copia");
  if (!raiz || !datos?.textContent) return;

  const copia = JSON.parse(datos.textContent) as CopiaCuestionario;
  const idioma = raiz.dataset.idioma === "en" ? "en" : "es";
  const version = raiz.dataset.version ?? "v1";
  const form = raiz.querySelector<HTMLFormElement>("[data-formulario]")!;
  const fieldsets = PASOS.map(
    p => form.querySelector<HTMLFieldSetElement>(`[data-paso="${p}"]`)!
  );
  const atras = raiz.querySelector<HTMLButtonElement>("[data-atras]")!;
  const siguiente = raiz.querySelector<HTMLButtonElement>("[data-siguiente]")!;
  const enviar = raiz.querySelector<HTMLButtonElement>("[data-enviar]")!;
  const textoPaso = raiz.querySelector<HTMLElement>("[data-paso-texto]")!;
  const barra = raiz.querySelector<HTMLElement>("[data-barra]")!;
  const otro = form.querySelector<HTMLInputElement>("[data-otro]");

  const inicio = Date.now();
  let actual = 0;
  let empezo = false;
  let avance: number | undefined;

  function pintar(enfocar: boolean) {
    fieldsets.forEach((f, i) => (f.hidden = i !== actual));
    const ultimo = actual === PASOS.length - 1;
    atras.hidden = actual === 0;
    siguiente.hidden = ultimo;
    enviar.hidden = !ultimo;
    siguiente.disabled = !ultimo && !pasoCompleto(fieldsets[actual]);
    textoPaso.textContent = (textoPaso.dataset.plantilla ?? "")
      .replace("%n", String(actual + 1))
      .replace("%t", String(PASOS.length));
    barra.style.width = `${((actual + 1) / PASOS.length) * 100}%`;
    if (!enfocar) return;
    fieldsets[actual].querySelector<HTMLElement>("legend")?.focus();
    if (raiz!.getBoundingClientRect().top < 0) {
      raiz!.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  function ir(destino: number) {
    window.clearTimeout(avance);
    actual = Math.max(0, Math.min(PASOS.length - 1, destino));
    evento("cuestionario_paso", { paso: PASOS[actual], n: actual + 1 });
    pintar(true);
  }

  form.addEventListener("change", ev => {
    const input = ev.target as HTMLInputElement;
    const fieldset = fieldsets[actual];
    if (!empezo) {
      empezo = true;
      evento("cuestionario_inicio", { version });
    }
    if (input.name === "sector" && otro) {
      otro.hidden = input.value !== "otra";
      if (!otro.hidden) otro.focus();
    }
    limitarMultiples(fieldset);
    siguiente.disabled = !pasoCompleto(fieldset);
    const esUnica = input.type === "radio";
    if (esUnica && !(input.name === "sector" && input.value === "otra")) {
      avance = window.setTimeout(() => ir(actual + 1), 260);
    }
  });

  atras.addEventListener("click", () => ir(actual - 1));
  siguiente.addEventListener("click", () => {
    if (pasoCompleto(fieldsets[actual])) ir(actual + 1);
  });

  form.addEventListener("submit", async ev => {
    ev.preventDefault();
    const contacto = leerContacto(form);
    if (!validarContacto(form, contacto)) return;

    const respuestas = leerRespuestas(form);
    const origen = leerOrigen();
    enviar.disabled = true;
    const etiqueta = enviar.innerHTML;
    enviar.textContent = enviar.dataset.textoEnviando ?? "…";

    let encaje: Encaje | "error" = "error";
    try {
      const res = await fetch("/api/cuestionario", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          idioma,
          version,
          respuestas,
          contacto,
          origen,
          web: (form.elements.namedItem("web") as HTMLInputElement)?.value,
          msLlenado: Date.now() - inicio,
        }),
      });
      const cuerpo = (await res.json()) as { ok: boolean; encaje?: Encaje };
      if (res.ok && cuerpo.ok && cuerpo.encaje) encaje = cuerpo.encaje;
    } catch {
      encaje = "error";
    }

    if (encaje !== "error") {
      evento("cuestionario_enviado", {
        encaje,
        tamano: respuestas.tamano,
        version,
      });
    }
    mostrarResultado(encaje, respuestas, contacto, origen);
    enviar.disabled = false;
    enviar.innerHTML = etiqueta;
  });

  function mostrarResultado(
    encaje: Encaje | "error",
    respuestas: Partial<Respuestas>,
    contacto: Contacto,
    origen: Origen
  ) {
    const caja = raiz!.querySelector<HTMLElement>("[data-resultados]")!;
    const nombre = contacto.nombre.split(/\s+/)[0] ?? "";
    form.hidden = true;
    raiz!.querySelector<HTMLElement>("[data-cabecera]")!.hidden = true;
    caja.hidden = false;

    const panel = caja.querySelector<HTMLElement>(
      `[data-resultado="${encaje}"]`
    )!;
    panel.hidden = false;
    const titulo = panel.querySelector<HTMLElement>("h2")!;
    if (titulo.dataset.plantilla) {
      titulo.textContent = titulo.dataset.plantilla.replace("%nombre", nombre);
    }

    const mensaje = mensajeWhatsapp(copia, respuestas, contacto, origen);
    panel
      .querySelectorAll<HTMLAnchorElement>("[data-wa-resumen]")
      .forEach(a => (a.href = wa(mensaje)));

    const horas = respuestas.horas && horasAlAnio(respuestas.horas);
    const linea = caja.querySelector<HTMLElement>("[data-horas]")!;
    if (horas && (encaje === "si" || encaje === "explorando")) {
      const formato = new Intl.NumberFormat(
        idioma === "es" ? "es-CO" : "en-GB"
      );
      const [desde, hasta] = horas;
      const plantilla =
        hasta === null ? linea.dataset.plantillaMas : linea.dataset.plantilla;
      linea.textContent = (plantilla ?? "")
        .replace("%a", formato.format(desde))
        .replace("%b", hasta === null ? "" : formato.format(hasta));
      linea.hidden = false;
    }

    titulo.focus();
    raiz!.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  pintar(false);
}
