import { z } from "zod";

export const tipoDocumentoSchema = z.object({
    
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }).max(60),
  acronimo: z.string().min(1, { message: "El acrónimo es obligatorio" }).max(10),
});