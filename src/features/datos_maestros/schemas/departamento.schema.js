import { z } from "zod";

export const departamentoSchema = z.object({

  nombre: z.string().min(1, { message: "El nombre es obligatorio" }).max(50),
});