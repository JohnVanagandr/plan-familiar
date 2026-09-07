import { useParams } from "react-router-dom";
import { ShieldPlus } from "lucide-react";
import { vulnerabilidadSchema } from "@/features/datos_maestros/schemas/vulnerabilidad.schema";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";

const mock = [{ id: 1, nombre: "Alcantarillado Viviendas", estado: "Activo" }, { id: 2, nombre: "Salud familiar", estado: "Activo" }];

export const VulnerabilidadDetailView = () => {
    
  const { idVulnerabilidad } = useParams();
  const vulnerabilidad = mock.find((v) => String(v.id) === idVulnerabilidad);
  return (
    <DatosMaestrosDetail icon={ShieldPlus} title="Vulnerabilidades" data={vulnerabilidad} schema={vulnerabilidadSchema}
      fields={[{ name: "nombre", label: "Nombre", type: "text" }]}
      onSave={(f) => console.log("Guardando vulnerabilidad (mock):", f)}
      onToggleEstado={(e) => console.log("Cambiando estado (mock):", e)}
      onDelete={() => console.log("Eliminando vulnerabilidad (mock)")}
    />
  );
};

export default VulnerabilidadDetailView;