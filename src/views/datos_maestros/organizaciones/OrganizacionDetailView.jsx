import { useParams } from "react-router-dom";
import { Building2 } from "lucide-react";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";
import { organizacionSchema } from "@/features/datos_maestros/schemas/organizacion.schema";

const mock = [
  { id: 1, nombre: "Arenal", seccionalId: "3", estado: "Activo" },
  { id: 2, nombre: "Barbosa", seccionalId: "3", estado: "Activo" },
];

const seccionalesOptions = [
  { value: 1, label: "Antioquia" },
  { value: 3, label: "Santander" },
];

export const OrganizacionDetailView = () => {
  const { idOrganizacion } = useParams();
  const organizacion = mock.find((o) => String(o.id) === idOrganizacion);

  return (
    <DatosMaestrosDetail
      icon={Building2}
      title="Organizaciones"
      data={organizacion}
      schema={organizacionSchema}
      fields={[
        { name: "nombre", label: "Nombre", type: "text" },
        { name: "seccionalId", label: "Seccional", type: "select", options: seccionalesOptions },
      ]}
      onSave={(formData) => console.log("Guardando organización (mock):", formData)}
      onToggleEstado={(estado) => console.log("Cambiando estado (mock):", estado)}
      onDelete={() => console.log("Eliminando organización (mock)")}
    />
  );
};
export default OrganizacionDetailView;