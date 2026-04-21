const EVENT = {
  title: "Cumple 35 de Salo",
  location: "La Rana Dorada, Bogotá, Colombia",
  description:
    "35 años. La Rana Dorada. Nos vemos el 25 de abril a las 7pm. No traigan regalos, solo ganas.",
  url: "https://maps.app.goo.gl/krJCM93AZrA8PmbT9",
  start: "20260425T190000",
  end: "20260426T000000",
  tzid: "America/Bogota",
};

function escape(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function dtstamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

export function buildIcs(): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//salomonmuriel.com//cumple-35//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    `TZID:${EVENT.tzid}`,
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0500",
    "TZNAME:-05",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:cumple-35-salo@salomonmuriel.com`,
    `DTSTAMP:${dtstamp()}`,
    `DTSTART;TZID=${EVENT.tzid}:${EVENT.start}`,
    `DTEND;TZID=${EVENT.tzid}:${EVENT.end}`,
    `SUMMARY:${escape(EVENT.title)}`,
    `DESCRIPTION:${escape(EVENT.description)}`,
    `LOCATION:${escape(EVENT.location)}`,
    `URL:${EVENT.url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(): void {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cumple-35-salo.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
