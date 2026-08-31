import { z } from 'zod';

// Esquema para el Registro
export const registerSchema = z
  .object({
    nombre: z
      .string()
      .min(1, "El nombre es obligatorio.")
      .min(3, "El nombre debe tener al menos 3 caracteres."),

    apellido: z
      .string()
      .min(1, "El apellido es obligatorio.")
      .min(3, "El apellido debe tener al menos 3 caracteres."),

    tipo_documento: z
      .string()
      .min(1, "Debe seleccionar un tipo de documento."),

    numero_documento: z
      .string()
      .min(1, "El número de documento es obligatorio.")
      .min(5, "El número de documento no es válido."),

    genero: z
      .string()
      .min(1, "Debe seleccionar un género."),

    fecha_nacimiento: z
      .string()
      .min(1, "La fecha de nacimiento es obligatoria."),

    seccional: z
      .string()
      .min(1, "Debe seleccionar una seccional."),

    organizacion: z
      .string()
      .min(1, "Debe seleccionar una organización."),

    telefono: z
      .string()
      .min(1, "El teléfono es obligatorio.")
      .min(7, "El teléfono no es válido."),

    correo: z
      .string()
      .min(1, "El correo electrónico es obligatorio.")
      .email("El formato del correo electrónico no es válido."),

    contrasena: z
      .string()
      .min(1, "La contraseña es obligatoria.")
      .min(6, "La contraseña debe tener al menos 6 caracteres."),

    confirmar_contrasena: z
      .string()
      .min(1, "Debes confirmar la contraseña."),
  })
  .refine((data) => data.contrasena === data.confirmar_contrasena, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmar_contrasena"],
  });