import { z } from "zod";

// Regex: solo letras (incluye tildes/ñ) y espacios — replica la validación "textoNombres" del vanilla
const soloTexto = /^[a-zA-ZÀ-ÿ\s]+$/;

// Verifica que la fecha de nacimiento corresponda a alguien mayor de edad —
// replica la validación "mayorDeEdad" del vanilla (data-validacion="mayorDeEdad")
const esMayorDeEdad = (fecha) => {
    if (!fecha) return false;
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad >= 18;
};

export const memberSchema = z.object({
    nombres: z.string()
        .min(1, { message: "Los nombres son obligatorios" })
        .max(50, { message: "Los nombres no pueden tener más de 50 caracteres" })
        .regex(soloTexto, { message: "Los nombres solo pueden contener letras" }),

    apellidos: z.string()
        .min(1, { message: "Los apellidos son obligatorios" })
        .max(50, { message: "Los apellidos no pueden tener más de 50 caracteres" })
        .regex(soloTexto, { message: "Los apellidos solo pueden contener letras" }),

    tipoDocumento: z.coerce.string().min(1, { message: "El tipo de documento es obligatorio" }),

    numeroDocumento: z.string()
        .min(1, { message: "El número de documento es obligatorio" })
        .regex(/^\d+$/, { message: "El número de documento solo puede contener números" })
        .min(5, { message: "El número de documento debe tener al menos 5 dígitos" })
        .max(15, { message: "El número de documento no puede tener más de 15 dígitos" }),

    genero: z.coerce.string().min(1, { message: "El género es obligatorio" }),

    nacimiento: z.string()
        .min(1, { message: "La fecha de nacimiento es obligatoria" })
        .refine((fecha) => new Date(fecha) <= new Date(), {
            message: "La fecha de nacimiento no puede ser futura",
        }),

    eps: z.coerce.string().min(1, { message: "La EPS es obligatoria" }),

    parentesco: z.coerce.string().min(1, { message: "El parentesco es obligatorio" }),

    grupoSanguineo: z.coerce.string().min(1, { message: "El grupo sanguíneo es obligatorio" }),

    nacionalidad: z.coerce.string().min(1, { message: "La nacionalidad es obligatoria" }),

    celularPersonal: z.string()
        .min(1, { message: "El celular es obligatorio" })
        .regex(/^\d{7,10}$/, { message: "El celular debe tener entre 7 y 10 dígitos" }),
});