import { ShieldPlus } from "lucide-react";
import DatosMaestrosList from "@/components/layout/DatosMaestrosList";

const mock = [{ id: 1, nombre: "Alcantarillado Viviendas", estado: "Activo" }, { id: 2, nombre: "Salud familiar", estado: "Activo" }];

export const VulnerabilidadesView = () => (
    
  <DatosMaestrosList icon={ShieldPlus} title="Vulnerabilidades" description="Administra las vulnerabilidades identificadas en los planes familiares ante una amenaza." items={mock} displayField="nombre" createLabel="Crear Vulnerabilidad" />
);

export default VulnerabilidadesView;