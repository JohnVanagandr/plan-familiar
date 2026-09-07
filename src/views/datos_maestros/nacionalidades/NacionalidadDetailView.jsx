// NacionalidadDetailView.jsx
import { useParams } from "react-router-dom";
import { Flag } from "lucide-react";
import { nacionalidadSchema } from "@/features/datos_maestros/schemas/nacionalidad.schema";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";

const mock = [{ id: 1, nombre: "Colombiana", estado: "Activo" }, { id: 2, nombre: "Venezolana", estado: "Activo" }];

export const NacionalidadDetailView = () => {

  const { idNacionalidad } = useParams();
  const nacionalidad = mock.find((n) => String(n.id) === idNacionalidad);
  return (
    <DatosMaestrosDetail icon={Flag} title="Nacionalidades" data={nacionalidad} schema={nacionalidadSchema}
      fields={[{ name: "nombre", label: "Nombre", type: "text" }]}
      onSave={(f) => console.log("Guardando nacionalidad (mock):", f)}
      onToggleEstado={(e) => console.log("Cambiando estado (mock):", e)}
      onDelete={() => console.log("Eliminando nacionalidad (mock)")}
    />
  );
};

export default NacionalidadDetailView;