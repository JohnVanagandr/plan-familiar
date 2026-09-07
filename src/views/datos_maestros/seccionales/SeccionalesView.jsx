import DatosMaestrosList from "@/components/layout/DatosMaestrosList";
import { Building } from "lucide-react";

// Mock: reemplazar por la petición real (GET /seccionales) cuando se reconecte la lógica
const seccionalesMock = [
  { id: 1, nombre: "Antioquia", estado: "Activo" },
  { id: 2, nombre: "Atlántico", estado: "Activo" },
  { id: 3, nombre: "Bogotá D.C.", estado: "Activo" },
  { id: 4, nombre: "Bolívar", estado: "Activo" },
  { id: 5, nombre: "Boyacá", estado: "Activo" },
  { id: 6, nombre: "Caldas", estado: "Activo" },
  { id: 7, nombre: "Caquetá", estado: "Activo" },
  { id: 8, nombre: "Casanare", estado: "Activo" },
  { id: 9, nombre: "Cauca", estado: "Activo" },
];

export const SeccionalesView = () => (
  <DatosMaestrosList
    icon={Building}
    title="Seccionales"
    description="Gestiona las seccionales: divisiones territoriales de la Defensa Civil en cada departamento."
    items={seccionalesMock}
    displayField="nombre"
    createLabel="Crear Seccional"
  />
);

export default SeccionalesView;