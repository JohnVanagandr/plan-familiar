import { z } from "zod";

export const recursoSchema = z.object({
    
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }).max(80),
  servicio: z.string().min(1, { message: "El servicio es obligatorio" }).max(150),
});