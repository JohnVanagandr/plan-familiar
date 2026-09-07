import { PawPrint } from "lucide-react";
import DatosMaestrosList from "@/components/layout/DatosMaestrosList";

const mock = [{ id: 1, nombre: "Canino", estado: "Activo" }, { id: 2, nombre: "Felino", estado: "Activo" }];

export const EspeciesView = () => (

  <DatosMaestrosList icon={PawPrint} title="Especies" description="Gestiona el catálogo de especies registradas en el sistema." items={mock} displayField="nombre" createLabel="Crear Especie" />
);

export default EspeciesView;