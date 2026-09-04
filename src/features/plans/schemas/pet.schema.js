import { z } from "zod";

export const petSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre de la mascota es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  species_id: z.coerce
    .string()
    .min(1, "Debe seleccionar una especie"),

  breed: z
    .string()
    .max(100, "La raza no puede superar los 100 caracteres")
    .optional()
    .or(z.literal("")),

  animal_gender_id: z.coerce
    .string()
    .min(1, "Debe seleccionar un género"),

  birth_date: z
    .string()
    .min(1, "La fecha de nacimiento es obligatoria")
    .refine((value) => {
      const fecha = new Date(value);
      return fecha <= new Date();
    }, "La fecha de nacimiento no puede ser futura"),
});