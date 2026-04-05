import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://www.salomonmuriel.com/", // replace this with your deployed domain
  author: "Salomón Muriel",
  desc: "Salomón's little corner of the internet.",
  title: "Salomón Muriel",
  ogImage: undefined,
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN", "es-419"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/smuriel/",
    linkTitle: `Let's connect on LinkedIn!`,
    active: true,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/573132465100",
    linkTitle: `Text me on WhatsApp`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:salomon.muriel@gmail.com",
    linkTitle: `Shoot me an email`,
    active: true,
  },
  {
    name: "Github",
    href: "https://github.com/salomonMuriel",
    linkTitle: `Check out my Github`,
    active: true,
  },
];
