import { useParams } from "react-router-dom";
import { PawPrint } from "lucide-react";
import { especieSchema } from "@/features/datos_maestros/schemas/especie.schema";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";

const mock = [{ id: 1, nombre: "Canino", estado: "Activo" }, { id: 2, nombre: "Felino", estado: "Activo" }];

export const EspecieDetailView = () => {
    
  const { idEspecie } = useParams();
  const especie = mock.find((e) => String(e.id) === idEspecie);
  return (
    <DatosMaestrosDetail icon={PawPrint} title="Especies" data={especie} schema={especieSchema}
      fields={[{ name: "nombre", label: "Nombre", type: "text" }]}
      onSave={(f) => console.log("Guardando especie (mock):", f)}
      onToggleEstado={(e) => console.log("Cambiando estado (mock):", e)}
      onDelete={() => console.log("Eliminando especie (mock)")}
    />
  );
};

export default EspecieDetailView;