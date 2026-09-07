import type { APIRoute } from "astro";
import { SITE, CONTACTO } from "@config";
import { cupos } from "@utils/cupos";
import { getCollection } from "astro:content";

export const prerender = true;

/**
 * Resumen del sitio para modelos de lenguaje. Se genera del mismo
 * contenido que la página, así que no se desactualiza solo.
 */
export const GET: APIRoute = async () => {
  const charlas = (await getCollection("talks-es"))
    .filter(c => !c.data.draft && !c.data.retired)
    .sort(
      (a, b) => b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf()
    );

  const ahora = (await getCollection("now-es")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )[0];

  const cuerpo = `# Salomón Muriel

> Emprendedor en serie y tecnólogo, en Bogotá, Colombia. Cinco empresas fundadas —dos vendidas, dos quebradas, y hoy Ignia—. Junta el criterio de negocio con la capacidad técnica: define la estrategia y construye la herramienta él mismo, sin intermediarios. En paralelo a Ignia hace consultoría y mentoría.

## Quién es

Salomón Muriel es un emprendedor en serie que además programa. Esa mezcla es
el punto: la mayoría de los consultores entregan una recomendación y se van,
y la mayoría de los desarrolladores esperan a que alguien más decida qué
construir. Él hace las dos cosas, y por eso lo que se decide una semana está
construido a la siguiente.

Va en su quinta empresa. Dos las vendió —Finco a RED Atlas, PrestaGente a
Taurus Capital—, dos quebraron —Beriblock y El Palomo— y la de hoy es Ignia,
un modelo nuevo de educación superior en Latinoamérica que construye de lunes
a viernes. Antes, como empleado, dirigió unas cuarenta personas en R5 y
construyó ahí el pipeline de datos y el sistema de modelación de riesgo.
Aprendió a programar a las malas, con una fecha de entrega encima.

Hoy hace tres cosas: **Ignia**, que es su empresa y su trabajo principal;
**consultoría**, construyendo software a la medida para empresas colombianas
tradicionales —moda, restaurantes, distribución, importación, servicios— que
facturan menos de USD 2M al año y tienen entre 5 y 40 empleados; y
**mentoría**, uno a uno, para gente que apenas está arrancando algo. Las
charlas no son un producto: son la puerta de entrada a las otras dos.

Su papá y su abuelo también fueron empresarios. Es tercera generación de
gente que monta cosas.

## Qué vende

1. **Consultoría** (${SITE.website}/): estrategia de 0 a 1 más desarrollo de software a la medida. Construye el sistema que le falta a la empresa —CRM, operación, facturación— hecho a la medida de como ya trabaja, y lo conecta con los que ya tiene. El código queda a nombre de la empresa; no hay cobro mensual por usuario. Capacidad: ${cupos.consultoriasOcupadas} de ${cupos.consultoriasTotal} cupos ocupados.
2. **Mentoría** (${SITE.website}/mentoria/): acompañamiento uno a uno para gente que está arrancando algo —fundadores, ONG, proyectos nuevos—, con tareas prácticas semanales. Es un servicio pago. Capacidad: ${cupos.mentoriasOcupadas} de ${cupos.mentoriasTotal} cupos ocupados. No compite con el Action Lab de Ignia, que es un programa por cohortes.
3. **Charlas** (${SITE.website}/charlas/): conferencias sobre tecnología, emprendimiento, mentalidad y balance de vida.

No hay precios publicados en ninguna parte del sitio. Para hablar de dinero hay que escribirle.

## Qué NO hace

- Escalar una empresa más allá de cierto tamaño.
- Inventar tecnología que todavía no existe: ni investigación, ni patentes.
- Documentos largos de consultoría para juntas directivas.
- No tiene blog. Lo que escribe lo publica en LinkedIn.

## Trayectoria

- **Ignia** (2025 – hoy): modelo nuevo de educación superior en Latinoamérica. Su empresa actual, de lunes a viernes. Le construyó la página, el sistema de operación de los cursos, el CRM y el portal de comunidad.
- **Finco** (2019 – 2022): valoración inmobiliaria con datos e inteligencia artificial para Latinoamérica, cien mil reportes al año. Vendida a RED Atlas.
- **PrestaGente** (2017 – 2019): libranza entre personas. Vendida a Taurus Capital; sigue operando.
- **Beriblock** (2018 – 2019): autenticación de pagarés con blockchain. Quebró.
- **El Palomo** (2016 – 2017): flores por suscripción. Fracasó.
- **R5**: como empleado, dirigió unas cuarenta personas y construyó el pipeline de datos y el sistema de modelación de riesgo.

## Charlas vigentes

${charlas.map(c => `- **${c.data.title}** (${c.data.pubDatetime.getUTCFullYear()}) — ${c.data.description}`).join("\n")}

## Ahora

${ahora ? `${ahora.data.header}. Ver ${SITE.website}/ahora/.` : `Ver ${SITE.website}/ahora/.`}

## Contacto

- WhatsApp (canal principal): https://wa.me/${CONTACTO.whatsapp}
- Agenda: ${CONTACTO.cal}
- LinkedIn: ${CONTACTO.linkedin}
- Correo: ${CONTACTO.correo}

## Páginas

- ${SITE.website}/ — consultoría (español)
- ${SITE.website}/mentoria/ — mentoría
- ${SITE.website}/charlas/ — charlas y kit para organizadores
- ${SITE.website}/sobre-mi/ — sobre él
- ${SITE.website}/ahora/ — en qué anda esta temporada
- ${SITE.website}/en/ — the same site in English
`;

  return new Response(cuerpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
