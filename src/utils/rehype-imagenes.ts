import { visit } from "unist-util-visit";
import { join } from "node:path";
import sharp from "sharp";
import type { Root, Element } from "hast";

/**
 * Las imágenes de /ahora y /sobre-mi vienen de MDX y apuntan a /public,
 * así que Astro no las procesa. Este plugin les pone `loading="lazy"`,
 * `decoding="async"` y —leyendo el archivo en disco— el `width`/`height`
 * real, que es lo que evita que la página salte al cargarlas.
 */

const cache = new Map<string, Promise<{ w: number; h: number } | null>>();

function medir(src: string) {
  let p = cache.get(src);
  if (!p) {
    p = (async () => {
      try {
        // sharp lee el encabezado; no decodifica el archivo entero.
        const m = await sharp(join(process.cwd(), "public", src)).metadata();
        const alto = m.pageHeight ?? m.height;
        return m.width && alto ? { w: m.width, h: alto } : null;
      } catch {
        return null;
      }
    })();
    cache.set(src, p);
  }
  return p;
}

export function rehypeImagenes() {
  return async (tree: Root) => {
    const pendientes: Element[] = [];
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "img") return;
      const props = node.properties ?? (node.properties = {});
      props.loading ??= "lazy";
      props.decoding ??= "async";
      if (String(props.src ?? "").startsWith("/")) pendientes.push(node);
    });

    await Promise.all(
      pendientes.map(async node => {
        const props = node.properties!;
        if (props.width || props.height) return;
        const medida = await medir(String(props.src));
        if (medida) {
          props.width = medida.w;
          props.height = medida.h;
        }
      })
    );
  };
}
