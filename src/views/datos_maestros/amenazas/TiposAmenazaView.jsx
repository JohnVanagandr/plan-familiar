import { AlertTriangle } from "lucide-react";
import DatosMaestrosList from "@/components/layout/DatosMaestrosList";

const mock = [{ id: 1, nombre: "Inundación", estado: "Activo" }, { id: 2, nombre: "Deslizamiento", estado: "Activo" }];

export const TiposAmenazaView = () => (

  <DatosMaestrosList icon={AlertTriangle} title="Tipos de Amenaza" description="Gestiona los tipos de amenaza registrados en el sistema." items={mock} displayField="nombre" createLabel="Crear Tipo de Amenaza" />
);

export default TiposAmenazaView;