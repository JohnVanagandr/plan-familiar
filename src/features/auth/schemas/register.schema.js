import { z } from 'zod';

// Esquema para el Registro
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre completo es obligatorio.")
    .min(3, "El nombre debe tener al menos 3 caracteres."),
  email: z
    .string()
    .min(1, "El correo electrónico es obligatorio.")
    .email("El formato del correo electrónico no es válido."),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria.")
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});