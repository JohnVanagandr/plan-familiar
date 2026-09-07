import { useNavigate } from "react-router-dom";
import { Card, Button } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { Plus } from "lucide-react";

/**
 * Lista genérica reutilizable para cualquier catálogo de Datos Maestros.
 *
 * @param {object} props
 * @param {React.ComponentType} props.icon - Ícono lucide del catálogo
 * @param {string} props.title - Título mostrado en el header
 * @param {string} props.description - Descripción bajo el título
 * @param {Array}  props.items - Registros a listar, ya resueltos (mock o API)
 * @param {string} props.displayField - Nombre del campo a mostrar como título de cada card
 * @param {string} props.createLabel - Texto del botón de creación (ej. "Crear Seccional")
 */
export const DatosMaestrosList = ({ icon: Icon, title, description, items, displayField, createLabel }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection icon={<Icon />} title={title} description={description} />

      <div className="w-full flex justify-end">
        <Button variant="accent">
          <Plus className="size-5" /> {createLabel}
        </Button>
      </div>

      <div className="w-full flex flex-col gap-3">
        {items.length === 0 ? (
          <Card padding="md" className="w-full text-center text-slate-500">
            No hay registros en este catálogo.
          </Card>
        ) : (
          items.map((item) => (
            <Card
              key={item.id}
              padding="md"
              className="w-full flex flex-row items-center gap-4 cursor-pointer"
              onClick={() => navigate(`${item.id}`)}
            >
              <div className="size-10 rounded-full bg-(--color_azul)/10 flex items-center justify-center shrink-0">
                <Icon className="size-5 text-(--color_azul)" />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="font-semibold text-(--color_azul) text-sm truncate">{item[displayField]}</span>
                <span className={`text-xs w-fit ${item.estado === "Activo" ? "text-green-600" : "text-slate-400"}`}>
                  {item.estado}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DatosMaestrosList;