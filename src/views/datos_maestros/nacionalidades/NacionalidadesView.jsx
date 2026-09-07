import { Flag } from "lucide-react";
import DatosMaestrosList from "@/components/layout/DatosMaestrosList";

const mock = [{ id: 1, nombre: "Colombiana", estado: "Activo" }, { id: 2, nombre: "Venezolana", estado: "Activo" }];

export const NacionalidadesView = () => (
    
  <DatosMaestrosList icon={Flag} title="Nacionalidades" description="Gestiona el catálogo de nacionalidades del sistema." items={mock} displayField="nombre" createLabel="Crear Nacionalidad" />
);
export default NacionalidadesView;