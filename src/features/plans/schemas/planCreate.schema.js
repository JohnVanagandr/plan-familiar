import { z } from "zod";

export const planCreateSchema = z.object({
  nombres: z
    .string()
    .min(1, "El nombre de la familia es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  departamento: z
    .coerce.string()
    .min(1, { message: "El departamento es obligatorio" }),

  ciudad: z.coerce.string().min(1, { message: "La ciudad es obligatoria" }),

  birth_date: z
    .string()
    .min(1, "La fecha de nacimiento es obligatoria")
    .refine((value) => {
      const fecha = new Date(value);
      return fecha <= new Date();
    }, "La fecha de nacimiento no puede ser futura"),
});