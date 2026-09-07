import { useState } from "react";
import { UserRoundCheck, CheckCircle2, XCircle, UserRound } from "lucide-react";
import { Card, Link } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { useBulkSelection } from "@/features/auth/hooks/useBulkSelction";
import { BulkActionsBar } from "@/components/layout/BulkActionsBar";

const peticionesMock = [
  { id: 1, nombre: "Ana Pérez", rol: "Voluntario", fecha: "2026-09-01" },
  { id: 2, nombre: "Luis Gómez", rol: "Supervisor", fecha: "2026-09-02" },
  { id: 3, nombre: "Carla Ruiz", rol: "Voluntario", fecha: "2026-09-03" },
];

const PeticionesAccesoView = () => {
  const [items, setItems] = useState(peticionesMock);

  const { selectedIds, isSelected, toggleOne, toggleSelectAll, allSelect, clearSelection } = useBulkSelection(items);

  const acciones = [
    {
      key: "aprobar",
      label: "Aprobar",
      icon: CheckCircle2,
      variant: "success",
      confirmText: (n) => `¿Aprobar ${n} peticiones seleccionadas?`,
      request: async (ids) => {
        // Mock: acá iría el POST real /users/approve
        console.log("Aprobando (mock):", ids);
        return { success: true };
      },
    },
    {
      key: "reject",
      label: "Rechazar",
      icon: XCircle,
      variant: "danger",
      confirmText: (n) => `¿Rechazar ${n} peticiones seleccionadas?`,
      request: async (ids) => {
        // Mock: acá iría el DELETE real /users/reject-delete
        console.log("Rechazando (mock):", ids);
        return { success: true };
      },
    },
  ];

  const handleDone = () => {
    // Mock: mientras no haya refetch real, quita del array local los ya procesados
    setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    clearSelection();
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-24">
      <HeaderSection
        icon={<UserRoundCheck />}
        title="Peticiones de Acceso"
        description="Aprueba o rechaza las solicitudes de registro de nuevos usuarios."
      />

       <BulkActionsBar
        count={selectedIds.length}
        onClear={clearSelection}
        selectedIds={selectedIds}
        actions={acciones}
        onDone={handleDone}
      />

      {items.length === 0 ? (
        <Card padding="md" className="w-full text-center text-slate-500">
          No hay peticiones de activación pendientes.
        </Card>
      ) : (
        <>
          <div className="w-full flex justify-end">
            <button
              onClick={toggleSelectAll}
              className="text-xs font-semibold text-(--color_azul) cursor-pointer transition-all  hover:scale-110"
            >
              {allSelect ? "Deseleccionar todo" : "Seleccionar todo"}
            </button>
          </div>

          <div className="w-full flex flex-col gap-3">
            {items.map((peticion) => (
              <Card
                key={peticion.id}
                padding="md"
                className="w-full flex gap-2 relative overflow-hidden"
              >
                <input
                  type="checkbox"
                  checked={isSelected(peticion.id)}
                  onChange={() => toggleOne(peticion.id)}
                  className="size-5 accent-(--color_azul) absolute right-4 top-4 z-10"
                />
                <Link className="flex-1 flex flex-col items-start z-10" href={`/peticiones-acceso/${peticion.id}`}>
                  <span className="font-semibold text-(--color_azul) text-sm">
                    {peticion.nombre}
                  </span>
                  <span className="text-xs text-slate-500">
                    {peticion.rol} · {peticion.fecha}
                  </span>
                </Link>

                <UserRound
                    className="size-30 text-(--color_azul)/20 absolute right-4 top-4"
                />
              </Card>
            ))}
          </div>
        </>
      )}
      
    </div>
  );
};

export default PeticionesAccesoView;