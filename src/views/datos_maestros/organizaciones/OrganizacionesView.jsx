import { Building2 } from "lucide-react";
import DatosMaestrosList from "@/components/layout/DatosMaestrosList";

const mock = [
  { id: 1, nombre: "Arenal", estado: "Activo" },
  { id: 2, nombre: "Barbosa", estado: "Activo" },
];

export const OrganizacionesView = () => (
  <DatosMaestrosList icon={Building2} title="Organizaciones" description="Administra las organizaciones registradas dentro de cada seccional." items={mock} displayField="nombre" createLabel="Crear Organización" />
);

export default OrganizacionesView;