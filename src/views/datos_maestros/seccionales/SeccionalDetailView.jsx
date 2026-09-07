import { useParams, useNavigate } from "react-router-dom";
import { Building } from "lucide-react";
import { seccionalSchema } from "@/features/datos_maestros/schemas/seccional.schema";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";

// Mock: reemplazar por la petición real (GET /seccionales/:id) cuando se reconecte la lógica
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

export const SeccionalDetailView = () => {
  const { idSeccional } = useParams();
  const navigate = useNavigate();
  const seccional = seccionalesMock.find((s) => String(s.id) === idSeccional);

  const handleSave = (formData) => {
    // Mock: acá iría el PATCH real /seccionales/:id
    console.log("Guardando seccional (mock):", { idSeccional, formData });
  };

  const handleToggleEstado = (nuevoEstado) => {
    // Mock: acá iría el PATCH real /seccionales/:id/estado
    console.log("Cambiando estado (mock):", { idSeccional, nuevoEstado });
  };

  const handleDelete = () => {
    // Mock: acá iría el DELETE real /seccionales/:id
    console.log("Eliminando seccional (mock):", { idSeccional });
    navigate("/datos-maestros/seccionales");
  };

  return (
    <DatosMaestrosDetail
      icon={Building}
      title="Seccionales"
      data={seccional}
      schema={seccionalSchema}
      fields={[{ name: "nombre", label: "Nombre", type: "text" }]}
      onSave={handleSave}
      onToggleEstado={handleToggleEstado}
      onDelete={handleDelete}
    />
  );
};

export default SeccionalDetailView;