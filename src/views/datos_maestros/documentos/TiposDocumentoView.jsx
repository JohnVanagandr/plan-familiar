import { IdCard } from "lucide-react";
import DatosMaestrosList from "@/components/layout/DatosMaestrosList";

const mock = [
  { id: 1, nombre: "Cédula de Ciudadanía", acronimo: "CC", estado: "Activo" },
  { id: 2, nombre: "Tarjeta de Identidad", acronimo: "TI", estado: "Activo" },
];

export const TiposDocumentoView = () => (
  <DatosMaestrosList icon={IdCard} title="Tipos de Documento" description="Gestiona los tipos de documento utilizados en el sistema." items={mock} displayField="nombre" createLabel="Crear Tipo de Documento" />
);

export default TiposDocumentoView;