import r5 from "@assets/logos/r5.png";
import ignia from "@assets/logos/ignia.png";
import alianzaEducativa from "@assets/logos/alianza-educativa.png";
import visionamos from "@assets/logos/visionamos.png";
import finco from "@assets/logos/finco.png";
import cosinte from "@assets/logos/cosinte.png";
import visible from "@assets/logos/visible.png";
import prestagente from "@assets/logos/prestagente.png";
import bision from "@assets/logos/bision.png";
import guiacolegio from "@assets/logos/guiacolegio.png";
import jda from "@assets/logos/jda.png";
import beriblock from "@assets/logos/beriblock.png";
import elpalomo from "@assets/logos/elpalomo.png";
import colsubsidio from "@assets/logos/colsubsidio.png";
import eafit from "@assets/logos/eafit.png";
import drReddys from "@assets/logos/dr-reddys.png";
import externado from "@assets/logos/externado.png";
import correlationOne from "@assets/logos/correlation-one.png";
import amarilo from "@assets/logos/amarilo.png";
import ucatolica from "@assets/logos/ucatolica.png";
import confnodo from "@assets/logos/confnodo.png";
import eia from "@assets/logos/eia.png";
import productesas from "@assets/logos/productesas.png";
import halcyon from "@assets/logos/halcyon.png";
import landaClub from "@assets/logos/landa-club.png";
import colombiaEdtech from "@assets/logos/colombia-edtech.png";
import pmBeers from "@assets/logos/pm-beers.png";
import ventaja from "@assets/logos/ventaja.png";

export type Logo = {
  nombre: string;
  logo?: ImageMetadata;
  alt?: string;
  escala?: number;
  rotulo?: boolean;
};

export const clientes: Logo[] = [
  { nombre: "R5", logo: r5, escala: 1.05 },
  { nombre: "Ignia", logo: ignia, escala: 1.35 },
  {
    nombre: "Alianza Educativa",
    alt: "Alianza Educativa (Bogotá)",
    logo: alianzaEducativa,
    escala: 1.2,
  },
  { nombre: "Visionamos", logo: visionamos, escala: 0.9 },
  { nombre: "Finco", logo: finco, rotulo: true },
  { nombre: "Cosinte Ltda.", logo: cosinte, escala: 0.66 },
  { nombre: "Visible", logo: visible, escala: 0.8 },
  { nombre: "PrestaGente", logo: prestagente, escala: 1.35 },
  { nombre: "Bision Consulting", logo: bision, escala: 1 },
  { nombre: "GuiaColegio.com", logo: guiacolegio, escala: 1.25 },
  { nombre: "Juan David Aristizábal", logo: jda, escala: 0.95 },
  { nombre: "Beriblock", logo: beriblock, rotulo: true },
  { nombre: "El Palomo", logo: elpalomo, rotulo: true },
];

export const tarimas: Logo[] = [
  { nombre: "Colsubsidio", logo: colsubsidio, escala: 0.8 },
  { nombre: "Universidad EAFIT", logo: eafit, escala: 1 },
  { nombre: "Dr. Reddy's", logo: drReddys, escala: 0.8 },
  { nombre: "Universidad Externado", logo: externado, escala: 1.05 },
  { nombre: "Correlation One", logo: correlationOne, escala: 0.55 },
  { nombre: "Amarilo", logo: amarilo, escala: 0.72 },
  {
    nombre: "Colombia EdTech",
    logo: colombiaEdtech,
    rotulo: true,
    escala: 0.85,
  },
  { nombre: "Universidad Católica de Colombia", logo: ucatolica, escala: 1.5 },
  { nombre: "ConfNodo", logo: confnodo, escala: 1.3 },
  { nombre: "PM Beers", logo: pmBeers, escala: 1.8 },
  { nombre: "Universidad EIA", logo: eia, escala: 1.15 },
  { nombre: "Productesas", logo: productesas, escala: 0.62 },
  { nombre: "Halcyon", logo: halcyon, escala: 1.4 },
  { nombre: "Podcast Ventaja", logo: ventaja, escala: 1.05 },
  { nombre: "Landa Club", logo: landaClub, escala: 0.75 },
];
