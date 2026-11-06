// The phone bar waits until the hero's own buttons leave the screen.
const LLAVE_ORIGEN = "sm_origen";
const CAMPOS_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

function vigilarBarra() {
  const barra = document.querySelector("[data-barra]");
  const pliegue = document.querySelector("[data-pliegue]");
  if (!barra) return;
  if (!pliegue || !("IntersectionObserver" in window)) {
    barra.classList.remove("es-oculta");
    return;
  }
  const observador = new IntersectionObserver(([entrada]) => {
    barra.classList.toggle("es-oculta", entrada.isIntersecting);
  });
  observador.observe(pliegue);
}

// Same key and shape the live site uses, so the questionnaire can attach the first visit's UTMs.
function guardarOrigen() {
  const parametros = new URLSearchParams(location.search);
  const utm = Object.fromEntries(CAMPOS_UTM.filter(c => parametros.get(c)).map(c => [c, parametros.get(c)]));
  if (!Object.keys(utm).length) return;
  try {
    if (!sessionStorage.getItem(LLAVE_ORIGEN)) sessionStorage.setItem(LLAVE_ORIGEN, JSON.stringify(utm));
  } catch (error) {
    console.warn("No se pudo guardar el origen de la visita", error);
  }
}

vigilarBarra();
guardarOrigen();
