import { z } from "zod";

export const seccionalSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres" }),
});