// PlanAccionView.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Select, Textarea } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { ClipboardList, UserRound, ShieldAlert, Plus, TriangleAlert } from "lucide-react";

// Mock: reemplazar por la petición real (GET /members/plan/:id, GET /riskFactors/plan/:id) cuando se reconecte la lógica
const miembrosMock = [
  { value: "1", label: "Marco García - (Cabeza de familia)" },
  { value: "2", label: "Ana García - (Cónyuge)" },
];

const riesgosMock = [
  { value: "1", label: "Inundación - vivienda a orillas de la quebrada" },
  { value: "2", label: "Caída de árboles rocas - descripcion" },
];

const tiposAccion = [
  { value: "1", label: "Antes" },
  { value: "2", label: "Durante" },
  { value: "3", label: "Despues" },
];

export const PlanAccionView = () => {
  const { planId } = useParams();

  // Paso 1: encabezado del plan de acción (member_id + risk_factor_id)
  const [liderId, setLiderId] = useState("");
  const [riesgoId, setRiesgoId] = useState("");
  const [planCreado, setPlanCreado] = useState(false);

  // Paso 2: acciones dentro del plan, por fase
  const [tabActiva, setTabActiva] = useState("1"); // "1" Antes, "2" Durante, "3" Despues
  const [acciones, setAcciones] = useState([]); // { id, action_type_id, member_id, member_name, description }

  const [formAccion, setFormAccion] = useState(false);
  const [nuevaAccion, setNuevaAccion] = useState({ member_id: "", description: "" });
  const [errorAccion, setErrorAccion] = useState("");

  const handleGuardarPlan = () => {
    if (!liderId || !riesgoId) return;

    // Mock: acá iría el POST real /actionPlans { member_id: liderId, risk_factor_id: riesgoId }
    setPlanCreado(true);
  };

  const handleGuardarAccion = () => {
    if (!nuevaAccion.member_id || !nuevaAccion.description.trim()) {
      setErrorAccion("Selecciona un integrante y escribe la acción a realizar");
      return;
    }

    const miembro = miembrosMock.find((m) => m.value === nuevaAccion.member_id);

    // Mock: acá iría el POST real /actionPlanActions { action_type_id: tabActiva, member_id, description, action_plan_id }
    setAcciones((prev) => [
      ...prev,
      {
        id: Date.now(),
        action_type_id: tabActiva,
        member_id: nuevaAccion.member_id,
        member_name: miembro?.label.split(" - ")[0] ?? "Integrante",
        description: nuevaAccion.description.trim(),
      },
    ]);

    setNuevaAccion({ member_id: "", description: "" });
    setErrorAccion("");
    setFormAccion(false);
  };

  const accionesDeLaFase = acciones.filter((a) => a.action_type_id === tabActiva);

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<ClipboardList />}
        title="Plan de Acción"
        description="Guía de tareas creada por toda la familia para saber cómo actuar y protegerse ante un desastre. Se divide en tres etapas vitales: antes, durante y después."
        image="/svg/ilustracion_familia_c.svg"
      />

      {/* Paso 1: líder + riesgo principal */}
      <Card padding="none" className="w-full p-5 sm:p-7 flex flex-col gap-4">
        <Select
          icon={UserRound}
          placeholder="Seleccione un miembro..."
          value={liderId}
          onChange={(e) => setLiderId(e.target.value)}
          arrayOptions={miembrosMock}
        />

        <Select
          icon={TriangleAlert}
          placeholder="Seleccione un factor de riesgo..."
          value={riesgoId}
          onChange={(e) => setRiesgoId(e.target.value)}
          arrayOptions={riesgosMock}
        />

        <div className="w-full flex justify-center">
          <Button variant="accent" onClick={handleGuardarPlan}>
            Guardar
          </Button>
        </div>
      </Card>

      {/* Paso 2: fases del plan, solo una vez que hay líder + riesgo */}
      {planCreado && (
        <Card padding="none" className="w-full p-5 sm:p-7 flex flex-col gap-4">

          <div className="w-full flex justify-center">
            <div className="inline-flex bg-slate-100 rounded-full p-1">
              {tiposAccion.map((tipo) => (
                <button
                  key={tipo.value}
                  onClick={() => setTabActiva(tipo.value)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                    tabActiva === tipo.value
                      ? "bg-(--color_azul) text-white"
                      : "text-slate-500 hover:bg-white"
                  }`}
                >
                  {tipo.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-(--color_azul) flex items-center gap-2">
              <ClipboardList className="size-5 text-(--color_naranja)" />
              Acciones
            </h2>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFormAccion((prev) => !prev)}
            >
              <Plus className="size-4" />
              {formAccion ? "Cancelar" : "Agregar acción"}
            </Button>
          </div>

          {formAccion && (
            <div className="flex flex-col gap-3 p-4 border border-slate-200 rounded-2xl bg-slate-50/50">
              <Select
                icon={UserRound}
                placeholder="Seleccione un miembro"
                value={nuevaAccion.member_id}
                onChange={(e) => setNuevaAccion((prev) => ({ ...prev, member_id: e.target.value }))}
                arrayOptions={miembrosMock}
              />

              <Textarea
                placeholder="Descripción"
                value={nuevaAccion.description}
                onChange={(e) => setNuevaAccion((prev) => ({ ...prev, description: e.target.value }))}
                error={errorAccion}
              />

              <Button type="button" variant="accent" onClick={handleGuardarAccion}>
                Guardar acción
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {accionesDeLaFase.length === 0 ? (
              <p className="text-sm text-slate-400">
                No hay registros disponibles para esta fase.
              </p>
            ) : (
              accionesDeLaFase.map((accion) => (
                <div
                  key={accion.id}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-(--color_azul)/10 text-(--color_azul) font-medium text-sm"
                >
                  <UserRound className="size-4 text-(--color_azul) shrink-0" />
                  <span>
                    <strong>{accion.member_name}</strong> — {accion.description}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default PlanAccionView;