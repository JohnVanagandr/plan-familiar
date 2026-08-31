import { z } from 'zod';

//Esquema para el login
export const loginSchema = z.object({
  correo: z
    .string()
    .min(1, "El correo electrónico es obligatorio.")
    .email("El formato del correo electrónico no es válido."),
  contrasena: z
    .string()
    .min(1, "La contraseña es obligatoria.")
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});