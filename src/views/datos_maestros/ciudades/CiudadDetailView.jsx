import { useParams } from "react-router-dom";
import { Landmark } from "lucide-react";
import { ciudadSchema } from "@/features/datos_maestros/schemas/ciudad.schema";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";

const mock = [
  { id: 1, nombre: "Leticia", departamentoId: "1", estado: "Activo" },
  { id: 2, nombre: "Medellín", departamentoId: "2", estado: "Activo" },
];

const departamentosOptions = [
  { value: 1, label: "Amazonas" },
  { value: 2, label: "Antioquia" },
];

export const CiudadDetailView = () => {
    
  const { idCiudad } = useParams();
  const ciudad = mock.find((c) => String(c.id) === idCiudad);
  return (
    <DatosMaestrosDetail icon={Landmark} title="Ciudades" data={ciudad} schema={ciudadSchema}
      fields={[
        { name: "nombre", label: "Nombre", type: "text" },
        { name: "departamentoId", label: "Departamento", type: "select", options: departamentosOptions },
      ]}
      onSave={(f) => console.log("Guardando ciudad (mock):", f)}
      onToggleEstado={(e) => console.log("Cambiando estado (mock):", e)}
      onDelete={() => console.log("Eliminando ciudad (mock)")}
    />
  );
};

export default CiudadDetailView;