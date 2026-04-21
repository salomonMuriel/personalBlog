export type Attending = "yes" | "no" | "maybe";

export interface RsvpInput {
  name: string;
  attending: Attending;
  plusOne: boolean;
  message?: string;
}

export interface ValidationResult {
  ok: boolean;
  value?: RsvpInput;
  error?: string;
}

export function validateRsvp(body: unknown): ValidationResult {
  if (!body || typeof body !== "object")
    return { ok: false, error: "Body inválido" };
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  if (name.length < 1 || name.length > 60) {
    return { ok: false, error: "Nombre debe tener entre 1 y 60 caracteres" };
  }

  const attending = b.attending;
  if (attending !== "yes" && attending !== "no" && attending !== "maybe") {
    return { ok: false, error: "Confirmación inválida" };
  }

  const plusOne = b.plusOne === true || b.plusOne === "true";

  let message: string | undefined;
  if (b.message !== undefined && b.message !== null && b.message !== "") {
    if (typeof b.message !== "string")
      return { ok: false, error: "Mensaje inválido" };
    if (b.message.length > 500)
      return { ok: false, error: "Mensaje muy largo (máx. 500 caracteres)" };
    message = b.message.trim();
  }

  return { ok: true, value: { name, attending, plusOne, message } };
}
