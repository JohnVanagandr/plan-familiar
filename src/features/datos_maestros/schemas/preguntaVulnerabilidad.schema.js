import { z } from "zod";

export const preguntaVulnerabilidadSchema = z.object({
    
  pregunta: z.string().min(1, { message: "La pregunta es obligatoria" }).max(300),
  precaucion: z.enum(["si", "no"], { message: "Selecciona una opción" }),
});