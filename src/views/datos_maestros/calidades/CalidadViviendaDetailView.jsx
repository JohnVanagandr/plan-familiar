// CalidadViviendaDetailView.jsx
import { useParams } from "react-router-dom";
import { Home } from "lucide-react";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";
import { calidadViviendaSchema } from "@/features/datos_maestros/schemas/calidadVivienda.schema";

const mock = [
  { id: 1, nombre: "Arrendado", estado: "Activo" },
  { id: 2, nombre: "Propio", estado: "Activo" },
  { id: 3, nombre: "Familiar", estado: "Activo" },
];

export const CalidadViviendaDetailView = () => {
  const { idCalidadVivienda } = useParams();
  const calidad = mock.find((c) => String(c.id) === idCalidadVivienda);

  return (
    <DatosMaestrosDetail
      icon={Home}
      title="Calidades de Vivienda"
      data={calidad}
      schema={calidadViviendaSchema}
      fields={[{ name: "nombre", label: "Nombre", type: "text" }]}
      onSave={(formData) => console.log("Guardando calidad de vivienda (mock):", formData)}
      onToggleEstado={(estado) => console.log("Cambiando estado (mock):", estado)}
      onDelete={() => console.log("Eliminando calidad de vivienda (mock)")}
    />
  );
};

export default CalidadViviendaDetailView;