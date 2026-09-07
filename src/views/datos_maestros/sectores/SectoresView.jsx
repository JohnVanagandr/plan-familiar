import { MapPin } from "lucide-react";
import DatosMaestrosList from "@/components/layout/DatosMaestrosList";

const mock = [
  { id: 1, nombre: "Barrio", estado: "Activo" },
  { id: 2, nombre: "Comuna", estado: "Activo" },
  { id: 3, nombre: "Vereda", estado: "Activo" },
  { id: 4, nombre: "Corregimiento", estado: "Activo" },
];

export const SectoresView = () => (
  <DatosMaestrosList icon={MapPin} title="Sectores" description="Gestiona los sectores disponibles para la asignación territorial." items={mock} displayField="nombre" createLabel="Crear Sector" />
);

export default SectoresView;