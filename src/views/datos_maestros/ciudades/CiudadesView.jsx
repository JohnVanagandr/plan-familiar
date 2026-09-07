import { Landmark } from "lucide-react";
import DatosMaestrosList from "@/components/layout/DatosMaestrosList";

const mock = [{ id: 1, nombre: "Leticia", estado: "Activo" }, { id: 2, nombre: "Medellín", estado: "Activo" }];

export const CiudadesView = () => (
    
  <DatosMaestrosList icon={Landmark} title="Ciudades" description="Administra las ciudades disponibles para el registro de los planes familiares." items={mock} displayField="nombre" createLabel="Crear Ciudad" />
);

export default CiudadesView;