import { useParams } from "react-router-dom";
import { Map } from "lucide-react";
import { departamentoSchema } from "@/features/datos_maestros/schemas/departamento.schema";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";

const mock = [{ id: 1, nombre: "Amazonas", estado: "Activo" }, { id: 2, nombre: "Antioquia", estado: "Activo" }];

export const DepartamentoDetailView = () => {
    
  const { idDepartamento } = useParams();
  const departamento = mock.find((d) => String(d.id) === idDepartamento);
  return (
    <DatosMaestrosDetail icon={Map} title="Departamentos" data={departamento} schema={departamentoSchema}
      fields={[{ name: "nombre", label: "Nombre", type: "text" }]}
      onSave={(f) => console.log("Guardando departamento (mock):", f)}
      onToggleEstado={(e) => console.log("Cambiando estado (mock):", e)}
      onDelete={() => console.log("Eliminando departamento (mock)")}
    />
  );
};

export default DepartamentoDetailView;