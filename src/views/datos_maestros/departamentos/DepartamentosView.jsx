import { Map } from "lucide-react";
import DatosMaestrosList from "@/components/layout/DatosMaestrosList";

const mock = [{ id: 1, nombre: "Amazonas", estado: "Activo" }, { id: 2, nombre: "Antioquia", estado: "Activo" }];

export const DepartamentosView = () => (
    
  <DatosMaestrosList icon={Map} title="Departamentos" description="Gestiona el catálogo de departamentos registrados en el sistema." items={mock} displayField="nombre" createLabel="Crear Departamento" />
);

export default DepartamentosView;