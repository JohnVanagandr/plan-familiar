import { MessageCircleQuestion } from "lucide-react";
import DatosMaestrosList from "@/components/layout/DatosMaestrosList";

const mock = [{ id: 1, pregunta: "¿Tiene su vivienda elementos que puedan caer?", precaucion: "no", estado: "Activo" }];

export const PreguntasVulnerabilidadView = () => (

  <DatosMaestrosList icon={MessageCircleQuestion} title="Preguntas de Vulnerabilidad" description="Administra las preguntas utilizadas en la evaluación de vulnerabilidad." items={mock} displayField="pregunta" createLabel="Crear Pregunta" />
);

export default PreguntasVulnerabilidadView;