import { z } from "zod";

export const ciudadSchema = z.object({
    
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }).max(80),
  departamentoId: z.coerce.string().min(1, { message: "El departamento es obligatorio" }),
});