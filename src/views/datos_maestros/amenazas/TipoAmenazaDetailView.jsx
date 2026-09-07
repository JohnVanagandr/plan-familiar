// TipoAmenazaDetailView.jsx
import { useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { tipoAmenazaSchema } from "@/features/datos_maestros/schemas/tipoAmenaza.schema";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";

const mock = [{ id: 1, nombre: "Inundación", estado: "Activo" }, { id: 2, nombre: "Deslizamiento", estado: "Activo" }];

export const TipoAmenazaDetailView = () => {
    
  const { idTipoAmenaza } = useParams();
  const tipo = mock.find((t) => String(t.id) === idTipoAmenaza);
  return (
    <DatosMaestrosDetail icon={AlertTriangle} title="Tipos de Amenaza" data={tipo} schema={tipoAmenazaSchema}
      fields={[{ name: "nombre", label: "Nombre", type: "text" }]}
      onSave={(f) => console.log("Guardando tipo de amenaza (mock):", f)}
      onToggleEstado={(e) => console.log("Cambiando estado (mock):", e)}
      onDelete={() => console.log("Eliminando tipo de amenaza (mock)")}
    />
  );
};

export default TipoAmenazaDetailView;