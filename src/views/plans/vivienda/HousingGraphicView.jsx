import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "@/components/ui";
import { ScanBox, PlusCircle, Home, Building, Pencil } from "lucide-react";
import HeaderSection from "@/components/ui/headerSection";

// Mock: reemplazar por la petición real (GET /housingGraphics/familyPlan/:id) cuando se reconecte la lógica
const graficosMock = [
  { id: 1, description: "Planta primer piso", path: "https://picsum.photos/seed/plano12a/500/500" },
  { id: 2, description: "Distribución de habitaciones y rutas de salida", path: "https://picsum.photos/seed/plano12b/500/500" },
  { id: 3, description: "Punto de encuentro y salida de emergencia", path: "https://picsum.photos/seed/plano12c/500/500" },
];

export const HousingGraphicView = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<ScanBox />}
        title="Gráfico de Vivienda"
        description="Registra los planos de la vivienda que respalden el diagnóstico del plan familiar."
        image="/svg/ilustracion_vivienda.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(-1)}
      />

      <div className="w-full flex justify-end items-center gap-2">

        <div className="size-8 bg-(--color_azul) rounded-full flex justify-center items-center"><Home className="text-white size-5"/></div>
        <div className="size-8 bg-(--color_naranja) rounded-full flex justify-center items-center"><Building className="text-white size-5"/></div>
        <div className="size-8 bg-(--color_azul) rounded-full flex justify-center items-center"><Pencil className="text-white size-5"/></div>
        <Button
          variant="accent"
          onClick={() => navigate(`/planes-familiares/${planId}/vivienda/crear`)}
        >
          <PlusCircle className="size-5" /> Agregar grafico
        </Button>
      </div>

      {graficosMock.length === 0 ? (
        <Card padding="md" className="w-full text-center text-slate-500">
          Este plan familiar no tiene gráficos de vivienda registrados.
        </Card>
      ) : (
        <div className="w-full grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {graficosMock.map((grafico) => (
            <Card
              key={grafico.id}
              padding="none"
              className="w-full aspect-square overflow-hidden flex flex-col cursor-pointer relative"
              onClick={() => navigate(`/planes-familiares/${planId}/vivienda/${grafico.id}/editar`)}
            >
              <div className="relative h-2/3 w-full overflow-hidden group z-10">
                <img
                  src={grafico.path}
                  alt={grafico.description || "Gráfico de vivienda"}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              <div className="flex-1 p-3 flex items-center z-10">
                {grafico.description ? (
                  <p className="text-(--color_azul) text-sm line-clamp-2">{grafico.description}</p>
                ) : (
                  <p className="text-slate-400 text-sm italic">Sin descripción</p>
                )}
              </div>

              <ScanBox className="absolute size-20 top-0 left-0 text-(--color_azul)/20"/>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HousingGraphicView;