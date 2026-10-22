import { z } from "zod";

export const resourceSchema = z.object({
  resource_id: z.coerce
    .string()
    .min(1, { message: "Debe seleccionar un tipo de recurso" }),

  location: z
    .string()
    .min(1, { message: "La ubicación es obligatoria" })
    .max(200, { message: "La ubicación no puede tener más de 200 caracteres" }),

  distance: z
    .string()
    .min(1, { message: "La distancia es obligatoria" })
    .max(50, { message: "La distancia no puede tener más de 50 caracteres" }),

  phone: z
    .string()
    .min(1, { message: "El télefono es obligatoria" })
    .max(20, { message: "El teléfono no puede tener más de 20 caracteres" }),

  description: z
    .string()
    .min(1, { message: "La descripción es obligatoria" })
    .max(500, { message: "La descripción no puede tener más de 500 caracteres" }),
    // .or(z.literal("")),
});