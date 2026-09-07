// PreguntaVulnerabilidadDetailView.jsx
import { useParams } from "react-router-dom";
import { MessageCircleQuestion } from "lucide-react";
import { preguntaVulnerabilidadSchema } from "@/features/datos_maestros/schemas/preguntaVulnerabilidad.schema";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";

const mock = [{ id: 1, pregunta: "¿Tiene su vivienda elementos que puedan caer?", precaucion: "no", estado: "Activo" }];

export const PreguntaVulnerabilidadDetailView = () => {
    
  const { idPregunta } = useParams();
  const pregunta = mock.find((p) => String(p.id) === idPregunta);
  return (
    <DatosMaestrosDetail
      icon={MessageCircleQuestion}
      title="Preguntas de Vulnerabilidad"
      data={pregunta}
      schema={preguntaVulnerabilidadSchema}
      fields={[
        { name: "pregunta", label: "Pregunta", type: "text" },
        { name: "precaucion", label: "Precaución", type: "select", options: [{ value: "si", label: "Sí" }, { value: "no", label: "No" }] },
      ]}
      onSave={(f) => console.log("Guardando pregunta (mock):", f)}
      onToggleEstado={(e) => console.log("Cambiando estado (mock):", e)}
      onDelete={() => console.log("Eliminando pregunta (mock)")}
    />
  );
};

export default PreguntaVulnerabilidadDetailView;