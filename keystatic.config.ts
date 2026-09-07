import { config, collection, singleton, fields } from "@keystatic/core";

/**
 * Keystatic edita los MDX/MD que ya lee Astro: no hay base de datos ni una
 * segunda copia del contenido. Cada esquema de acá tiene que coincidir con
 * el Zod de `src/content.config.ts`, o una edición rompe el build.
 *
 * En local escribe archivos directamente; en producción abre un commit en
 * GitHub a nombre de Salomón.
 */

const repo = "salomonMuriel/personalBlog";

const almacenamiento =
  import.meta.env.DEV || process.env.KEYSTATIC_LOCAL === "true"
    ? ({ kind: "local" } as const)
    : ({ kind: "github", repo } as const);

// ── Charlas ──────────────────────────────────────────────
function charlas(lang: "es" | "en") {
  return collection({
    label: lang === "es" ? "Charlas (ES)" : "Talks (EN)",
    path: `src/content/talks/${lang}/*`,
    slugField: "title",
    format: { contentField: "content" },
    entryLayout: "content",
    schema: {
      title: fields.slug({
        name: {
          label: lang === "es" ? "Título" : "Title",
          validation: { isRequired: true },
        },
      }),
      description: fields.text({
        label: lang === "es" ? "Descripción" : "Description",
        multiline: true,
        validation: { isRequired: true },
      }),
      pubDatetime: fields.datetime({
        label: lang === "es" ? "Fecha" : "Date",
        validation: { isRequired: true },
      }),
      tags: fields.array(fields.text({ label: "Tag" }), {
        label: lang === "es" ? "Pilares" : "Pillars",
        itemLabel: p => p.value,
      }),
      featured: fields.checkbox({
        label: lang === "es" ? "Vigente (se muestra con ficha)" : "Current",
        defaultValue: true,
      }),
      retired: fields.checkbox({
        label:
          lang === "es"
            ? "Retirada (sólo aparece en la lista de abajo)"
            : "Retired (listed as plain text only)",
        defaultValue: false,
      }),
      draft: fields.checkbox({
        label: lang === "es" ? "Borrador" : "Draft",
        defaultValue: false,
      }),
      youtube: fields.url({ label: "YouTube" }),
      pdf: fields.checkbox({
        label:
          lang === "es"
            ? "Hay PDF en /public/talks/<slug>/"
            : "PDF exists under /public/talks/<slug>/",
        defaultValue: false,
      }),
      embed_pdf: fields.checkbox({
        label: lang === "es" ? "Incrustar el PDF" : "Embed the PDF",
        defaultValue: false,
      }),
      embed_html: fields.checkbox({
        label:
          lang === "es"
            ? "Incrustar la presentación HTML"
            : "Embed the HTML deck",
        defaultValue: false,
      }),
      content: fields.mdx({
        label: lang === "es" ? "Contenido" : "Content",
        extension: "md",
      }),
    },
  });
}

// ── Ahora ────────────────────────────────────────────────
function ahora(lang: "es" | "en") {
  return collection({
    label: lang === "es" ? "Ahora (ES)" : "Now (EN)",
    path: `src/content/now/${lang}/*`,
    slugField: "header",
    format: { contentField: "content" },
    entryLayout: "content",
    schema: {
      header: fields.slug({
        name: {
          label: lang === "es" ? "Encabezado" : "Header",
          description:
            lang === "es"
              ? "Ej. «29 de enero de 2026 — Construyendo en Bogotá»"
              : "e.g. “Jan 29, 2026 — Building in Bogotá”",
          validation: { isRequired: true },
        },
        slug: {
          label: lang === "es" ? "Nombre del archivo" : "File name",
          description:
            lang === "es"
              ? "Use la fecha: 2026-03-01"
              : "Use the date: 2026-03-01",
        },
      }),
      date: fields.date({
        label: lang === "es" ? "Fecha" : "Date",
        validation: { isRequired: true },
      }),
      content: fields.mdx({
        label: lang === "es" ? "Actualización" : "Update",
        extension: "mdx",
      }),
    },
  });
}

// ── Testimonios ──────────────────────────────────────────
function testimonios(lang: "es" | "en") {
  return collection({
    label: lang === "es" ? "Testimonios (ES)" : "Testimonials (EN)",
    path: `src/content/testimonios/${lang}/*`,
    slugField: "name",
    format: { contentField: "content" },
    columns: ["role"],
    schema: {
      name: fields.slug({
        name: {
          label: lang === "es" ? "Nombre de quien lo dice" : "Who said it",
          validation: { isRequired: true },
        },
      }),
      role: fields.text({
        label:
          lang === "es" ? "Cargo · Empresa · Ciudad" : "Role · Company · City",
        validation: { isRequired: true },
      }),
      initials: fields.text({
        label: lang === "es" ? "Iniciales" : "Initials",
        description:
          lang === "es"
            ? "Dos o tres letras, en mayúscula"
            : "Two or three capitals",
        validation: { isRequired: true, length: { max: 3 } },
      }),
      quote: fields.text({
        label: lang === "es" ? "Lo que dijo" : "The quote",
        multiline: true,
        validation: { isRequired: true },
      }),
      order: fields.integer({
        label: lang === "es" ? "Orden" : "Order",
        defaultValue: 0,
      }),
      draft: fields.checkbox({
        label:
          lang === "es"
            ? "Borrador — no publicar hasta que la persona diga que sí"
            : "Draft — don't publish until they say yes",
        defaultValue: true,
      }),
      content: fields.mdx({ label: "Notas", extension: "md" }),
    },
  });
}

export default config({
  storage: almacenamiento,
  ui: {
    brand: { name: "salomonmuriel.com" },
    navigation: {
      Español: ["ahoraEs", "charlasEs", "sobreMiEs", "testimoniosEs"],
      English: ["ahoraEn", "charlasEn", "sobreMiEn", "testimoniosEn"],
      Sitio: ["cupos"],
    },
  },
  collections: {
    ahoraEs: ahora("es"),
    ahoraEn: ahora("en"),
    charlasEs: charlas("es"),
    charlasEn: charlas("en"),
    testimoniosEs: testimonios("es"),
    testimoniosEn: testimonios("en"),
  },
  singletons: {
    cupos: singleton({
      label: "Cupos y capacidad",
      path: "src/content/settings/cupos",
      format: { data: "json" },
      schema: {
        consultoriasOcupadas: fields.integer({
          label: "Consultorías ocupadas",
          validation: { isRequired: true, min: 0, max: 20 },
        }),
        consultoriasTotal: fields.integer({
          label: "Consultorías, máximo al tiempo",
          validation: { isRequired: true, min: 1, max: 20 },
        }),
        mentoriasOcupadas: fields.integer({
          label: "Mentorías ocupadas",
          validation: { isRequired: true, min: 0, max: 20 },
        }),
        mentoriasTotal: fields.integer({
          label: "Mentorías, máximo al tiempo",
          validation: { isRequired: true, min: 1, max: 20 },
        }),
        actualizado: fields.date({
          label: "Actualizado el",
          validation: { isRequired: true },
        }),
      },
    }),
    sobreMiEs: singleton({
      label: "Sobre mí (ES)",
      path: "src/content/pages/about-es",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.text({
          label: "Título",
          validation: { isRequired: true },
        }),
        description: fields.text({ label: "Descripción", multiline: true }),
        content: fields.mdx({ label: "Contenido", extension: "mdx" }),
      },
    }),
    sobreMiEn: singleton({
      label: "About (EN)",
      path: "src/content/pages/about-en",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.text({
          label: "Title",
          validation: { isRequired: true },
        }),
        description: fields.text({ label: "Description", multiline: true }),
        content: fields.mdx({ label: "Content", extension: "mdx" }),
      },
    }),
  },
});
