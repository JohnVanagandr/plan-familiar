import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";
import { sectorSchema } from "@/features/datos_maestros/schemas/sector.schema";

const mock = [
  { id: 1, nombre: "Barrio", estado: "Activo" },
  { id: 2, nombre: "Comuna", estado: "Activo" },
  { id: 3, nombre: "Vereda", estado: "Activo" },
  { id: 4, nombre: "Corregimiento", estado: "Activo" },
];

export const SectorDetailView = () => {
  const { idSector } = useParams();
  const sector = mock.find((s) => String(s.id) === idSector);

  return (
    <DatosMaestrosDetail
      icon={MapPin}
      title="Sectores"
      data={sector}
      schema={sectorSchema}
      fields={[{ name: "nombre", label: "Nombre", type: "text" }]}
      onSave={(formData) => console.log("Guardando sector (mock):", formData)}
      onToggleEstado={(estado) => console.log("Cambiando estado (mock):", estado)}
      onDelete={() => console.log("Eliminando sector (mock)")}
    />
  );
};

export default SectorDetailView;