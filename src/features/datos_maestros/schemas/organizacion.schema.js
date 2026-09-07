import { z } from "zod";

export const organizacionSchema = z.object({
    
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }).max(100),
  seccionalId: z.coerce.string().min(1, { message: "La seccional es obligatoria" }),
});