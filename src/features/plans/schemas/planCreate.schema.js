import { z } from "zod";

export const planCreateSchema = z.object({
  apellidos: z
    .string()
    .min(1, "los apellidos de la familia son obligatorios")
    .max(300, "los apellidos no puede superar los 300 caracteres"),

  zona: z.coerce.string().min(1, { message: "La zona es obligatoria" }),

  departamento: z.coerce.string().min(1, { message: "El departamento es obligatorio" }),

  ciudad: z.coerce.string().min(1, { message: "La ciudad es obligatoria" }),
});