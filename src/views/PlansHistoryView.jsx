// PlansHistoryView.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { FileText, Plus, ArrowRight } from "lucide-react";
import * as api from "@/helpers/api";

const estadoColor = {
  "Aprobado": "bg-green-100 text-green-700",
  "En Proceso": "bg-amber-100 text-amber-700",
  "En Revisión": "bg-blue-100 text-blue-700",
  "Devuelto con Observaciones": "bg-orange-100 text-orange-700",
  "Rechazado": "bg-red-100 text-red-700",
  "Creado": "bg-slate-100 text-slate-500",
};

export const PlansHistoryView = () => {
  const navigate = useNavigate();
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPlanes = async () => {
      try {
        const data = await api.get("familyPlans");
        setPlanes(data ?? []);
      } catch (error) {
        console.error("Error cargando planes:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarPlanes();
  }, []);

  const handleCreateNew = () => {
    const newId = Date.now().toString();
    navigate(`/planes-familiares/${newId}`);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<FileText />}
        title="Historial de Planes"
        description="Administra, crea y consulta el estado de validación de tus planes de emergencia familiares."
        buttonSection
        buttonText="Crear Nuevo Plan"
        onButtonClick={handleCreateNew}
      />

      {loading ? (
        <Card padding="md" className="w-full text-center text-slate-500">
          Cargando planes...
        </Card>
      ) : planes.length === 0 ? (
        <Card padding="md" className="w-full text-center text-slate-500">
          No tienes planes familiares registrados.
        </Card>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {planes.map((plan) => (
            <Card key={plan.id} padding="md" className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-full bg-(--color_azul)/10 flex items-center justify-center">
                  <FileText className="size-5 text-(--color_azul)" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${estadoColor[plan.statusPlan?.name ?? plan.statusPlan] ?? "bg-slate-100 text-slate-500"}`}>
                  {plan.statusPlan?.name ?? plan.statusPlan}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-(--color_azul)">
                  {plan.name} {plan.last_names}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {plan.city?.name} · Actualizado: {plan.updated_at?.slice(0, 10)}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <Button variant="secondary" size="sm" onClick={() => navigate(`/planes-familiares/${plan.id}`)}>
                  Administrar Plan <ArrowRight className="size-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlansHistoryView;