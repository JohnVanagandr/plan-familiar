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

});
