import { z } from "zod";

export const familyDatosSchema = z.object({
  apellidos: z
    .string()
    .min(1, { message: "El apellido es obligatorio" })
    .max(50, { message: "El apellido no puede tener más de 50 caracteres" }),
    
  zona: z.coerce.string().min(1, { message: "La zona es obligatoria" }),

  departamento: z
    .coerce.string()
    .min(1, { message: "El departamento es obligatorio" }),

  ciudad: z.coerce.string().min(1, { message: "La ciudad es obligatoria" }),

  direccion: z
    .string()
    .min(1, { message: "La dirección es obligatoria" })
    .max(150, { message: "La dirección no puede tener más de 150 caracteres" }),

  sector: z.coerce.string().min(1, { message: "El sector es obligatorio" }),

  sectorNombre: z.
    string()
    .min(3, { message: "El nombre del sector es obligatorio" })
    .max(200, { message: "El nombre del sector no puede tener más de 200 caracteres" }),

  telefono: z.string().optional(),

  calidadVivienda: z
  .coerce.string()
    .min(1, { message: "La calidad de la vivienda es obligatoria" }),
});
