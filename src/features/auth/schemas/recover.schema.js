import { z } from 'zod';

// Esquema para la Recuperación
export const recoverSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es obligatorio.")
    .email("El formato del correo electrónico no es válido."),
});