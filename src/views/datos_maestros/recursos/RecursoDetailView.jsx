// RecursoDetailView.jsx
import { useParams } from "react-router-dom";
import { Hospital } from "lucide-react";
import { recursoSchema } from "@/features/datos_maestros/schemas/recurso.schema";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";

const mock = [
  { id: 1, nombre: "Puesto de Salud - Clínica u Hospital", servicio: "Atención médica y servicios de salud", estado: "Activo" },
  { id: 2, nombre: "Estación de Bomberos", servicio: "Atención de incendios y emergencias", estado: "Activo" },
];

export const RecursoDetailView = () => {
    
  const { idRecurso } = useParams();
  const recurso = mock.find((r) => String(r.id) === idRecurso);
  return (
    <DatosMaestrosDetail icon={Hospital} title="Recursos" data={recurso} schema={recursoSchema}
      fields={[
        { name: "nombre", label: "Nombre", type: "text" },
        { name: "servicio", label: "Servicio", type: "text" },
      ]}
      onSave={(f) => console.log("Guardando recurso (mock):", f)}
      onToggleEstado={(e) => console.log("Cambiando estado (mock):", e)}
      onDelete={() => console.log("Eliminando recurso (mock)")}
    />
  );
};

export default RecursoDetailView;