import { z } from "zod";

export const riskSchema = z.object({
  threat_type_id: z.coerce
    .string()
    .min(1, "El tipo de amenaza es obligatorio"),

  ubication: z
    .string()
    .min(1, "La ubicación es obligatoria")
    .max(100, "La ubicación no puede superar los 100 caracteres"),

  distance: z
    .string()
    .min(1, "La distancia es obligatoria")
    .max(50, "La distancia no puede superar los 50 caracteres"),

  description: z
    .string()
    .min(1, "La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede superar los 500 caracteres"),

  family_plan_id: z.coerce
    .string()
    .min(1, "El identificador del plan familiar es obligatorio"),
});