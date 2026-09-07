import { Hospital } from "lucide-react";

import DatosMaestrosList from "@/components/layout/DatosMaestrosList";

const mock = [
  { id: 1, nombre: "Puesto de Salud - Clínica u Hospital", servicio: "Atención médica y servicios de salud", estado: "Activo" },
  { id: 2, nombre: "Estación de Bomberos", servicio: "Atención de incendios y emergencias", estado: "Activo" },
];

export const RecursosView = () => (
    
  <DatosMaestrosList icon={Hospital} title="Recursos" description="Gestiona los recursos con los que puede contar una familia en caso de emergencia." items={mock} displayField="nombre" createLabel="Crear Recurso" />
);

export default RecursosView;