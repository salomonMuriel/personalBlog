// Glob instead of static imports so a missing screenshot drops its slide
// instead of breaking the build.
const archivos = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/sistemas/*.webp",
  { eager: true }
);

export function imagenDe(archivo: string): ImageMetadata | undefined {
  const ruta = Object.keys(archivos).find(r => r.endsWith(`/${archivo}.webp`));
  return ruta ? archivos[ruta].default : undefined;
}
