import { Home } from "lucide-react";
import DatosMaestrosList from "@/components/layout/DatosMaestrosList";

const mock = [
  { id: 1, nombre: "Arrendado", estado: "Activo" },
  { id: 2, nombre: "Propio", estado: "Activo" },
  { id: 3, nombre: "Familiar", estado: "Activo" },
];

export const CalidadesViviendaView = () => (
  <DatosMaestrosList icon={Home} title="Calidades de Vivienda" description="Gestiona las calidades de vivienda registradas en el sistema." items={mock} displayField="nombre" createLabel="Crear Calidad de Vivienda" />
);

export default CalidadesViviendaView;