# /// script
# requires-python = ">=3.12"
# dependencies = ["pillow>=11", "cairosvg>=2.7", "pydantic>=2"]
# ///
"""Turns every raw logo into a one-ink PNG so the belt reads as one family.

uv run scripts/logos.py            # all logos
uv run scripts/logos.py r5 eafit   # only these
"""

import io
import sys
from pathlib import Path

import cairosvg
from PIL import Image, ImageChops
from pydantic import BaseModel

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "src/assets/logos/originales"
OUT = ROOT / "src/assets/logos"
INK = (22, 23, 26)
HEIGHT = 120
PAD = 4


class Ajuste(BaseModel):
    fuente: str | None = None
    invertir: bool = False
    silueta: bool = False
    invertir_desde: float | None = None
    fondo: tuple[int, int, int] | None = None
    solo_blanco: bool = False
    recorte: tuple[float, float, float, float] | None = None
    borrar: list[tuple[float, float, float, float]] = []
    umbral: tuple[float, float] = (0.1, 0.4)


AJUSTES: dict[str, Ajuste] = {
    "ignia": Ajuste(fuente="src/assets/site/ignia.png"),
    "finco": Ajuste(fuente="src/assets/site/finco.png"),
    "prestagente": Ajuste(fuente="src/assets/site/prestagente.png", recorte=(0, 0, 1, 0.84)),
    "beriblock": Ajuste(fuente="src/assets/site/beriblock.png"),
    "elpalomo": Ajuste(fuente="src/assets/site/elpalomo.png"),
    "cosinte": Ajuste(invertir=True, borrar=[(0.66, 0, 1, 0.47)], recorte=(0, 0, 1, 0.79)),
    "jda": Ajuste(silueta=True),
    "ucatolica": Ajuste(invertir_desde=0.46, borrar=[(0.46, 0.66, 1, 1)]),
    "eia": Ajuste(invertir=True),
    "externado": Ajuste(invertir=True),
    "dr-reddys": Ajuste(invertir=True),
    "correlation-one": Ajuste(invertir=True),
    "pm-beers": Ajuste(fondo=(157, 36, 142)),
    "ventaja": Ajuste(solo_blanco=True, umbral=(0.7, 0.9), recorte=(0.02, 0.05, 0.98, 0.27)),
    "confnodo": Ajuste(silueta=True, borrar=[(0.38, 0.6, 1, 1)]),
    "alianza-educativa": Ajuste(invertir=True),
}


def find_source(slug: str, ajuste: Ajuste) -> Path:
    if ajuste.fuente:
        return ROOT / ajuste.fuente
    matches = sorted(RAW.glob(f"{slug}.*"))
    if not matches:
        raise FileNotFoundError(f"no raw logo for {slug} in {RAW}")
    return matches[0]


def load(path: Path) -> Image.Image:
    if path.suffix.lower() == ".svg":
        png = cairosvg.svg2png(url=str(path), output_height=HEIGHT * 6)
        return Image.open(io.BytesIO(png)).convert("RGBA")
    return Image.open(path).convert("RGBA")


def crop_fraction(image: Image.Image, box: tuple[float, float, float, float]) -> Image.Image:
    width, height = image.size
    left, top, right, bottom = box
    return image.crop((int(left * width), int(top * height), int(right * width), int(bottom * height)))


def erase_fraction(image: Image.Image, box: tuple[float, float, float, float]) -> None:
    width, height = image.size
    left, top, right, bottom = box
    image.paste((0, 0, 0, 0), (int(left * width), int(top * height), int(right * width), int(bottom * height)))


def ink_mask(image: Image.Image, ajuste: Ajuste) -> Image.Image:
    """Alpha = how far each pixel is from the logo's background colour."""
    red, green, blue, alpha = image.split()
    if ajuste.silueta:
        return alpha
    if ajuste.fondo:
        distance = distance_from(image, ajuste.fondo)
    elif ajuste.solo_blanco:
        distance = ImageChops.darker(ImageChops.darker(red, green), blue)
    elif ajuste.invertir:
        distance = ImageChops.lighter(ImageChops.lighter(red, green), blue)
    else:
        darkest = ImageChops.darker(ImageChops.darker(red, green), blue)
        distance = ImageChops.invert(darkest)
    return ramp(distance, alpha, ajuste)


def distance_from(image: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    solid = Image.new("RGB", image.size, color)
    difference = ImageChops.difference(image.convert("RGB"), solid).split()
    return ImageChops.lighter(ImageChops.lighter(difference[0], difference[1]), difference[2])


def ramp(distance: Image.Image, alpha: Image.Image, ajuste: Ajuste) -> Image.Image:
    low, high = (int(v * 255) for v in ajuste.umbral)
    span = max(high - low, 1)
    ramped = distance.point(lambda v: 0 if v <= low else 255 if v >= high else (v - low) * 255 // span)
    return ImageChops.multiply(ramped, alpha)


def split_mask(image: Image.Image, ajuste: Ajuste) -> Image.Image:
    """Dark-on-light left of the cut, light-on-dark right of it."""
    cut = int(image.width * (ajuste.invertir_desde or 0))
    mask = ink_mask(image, ajuste.model_copy(update={"invertir": False}))
    inverted = ink_mask(image, ajuste.model_copy(update={"invertir": True}))
    mask.paste(inverted.crop((cut, 0, image.width, image.height)), (cut, 0))
    return mask


def normalize(slug: str) -> Path:
    ajuste = AJUSTES.get(slug, Ajuste())
    image = load(find_source(slug, ajuste))
    for box in ajuste.borrar:
        erase_fraction(image, box)
    if ajuste.recorte:
        image = crop_fraction(image, ajuste.recorte)
    mask = split_mask(image, ajuste) if ajuste.invertir_desde else ink_mask(image, ajuste)
    bbox = mask.point(lambda v: 255 if v > 24 else 0).getbbox()
    if not bbox:
        raise ValueError(f"{slug}: nothing left after masking")
    mask = mask.crop(bbox)
    scaled_width = max(1, round(mask.width * (HEIGHT - 2 * PAD) / mask.height))
    mask = mask.resize((scaled_width, HEIGHT - 2 * PAD), Image.LANCZOS)
    result = Image.new("RGBA", (scaled_width + 2 * PAD, HEIGHT), (*INK, 0))
    result.paste(Image.new("RGBA", mask.size, (*INK, 255)), (PAD, PAD), mask)
    target = OUT / f"{slug}.png"
    result.save(target, optimize=True)
    return target


def all_slugs() -> list[str]:
    raw = {p.stem for p in RAW.iterdir() if p.is_file()}
    return sorted(raw | set(AJUSTES))


def main() -> None:
    slugs = sys.argv[1:] or all_slugs()
    for slug in slugs:
        target = normalize(slug)
        with Image.open(target) as image:
            print(f"{slug:18} {image.width}x{image.height}")


if __name__ == "__main__":
    main()
