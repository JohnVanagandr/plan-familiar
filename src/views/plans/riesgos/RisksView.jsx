import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "@/components/ui";
import { 
  TriangleAlert, 
  PlusCircle, 
  MapPin, 
  Ruler, 
  ShieldAlert, 
  AlertCircle, 
  FileWarning 
} from "lucide-react";
import HeaderSection from "@/components/ui/headerSection";
import { RiskIcon } from "@/helpers/RiskIcon";

const tiposAmenaza = [
  { value: "1", label: "Inundación" },
  { value: "2", label: "Deslizamiento" },
  { value: "3", label: "Creciente Súbita" },
  { value: "4", label: "Caída Colapso Estructural" },
  { value: "5", label: "Contaminación Plagas" },
  { value: "6", label: "Caída de árboles rocas" },
  { value: "7", label: "Colapso Estructural Traumas Quemaduras" },
  { value: "8", label: "Riesgo de Accidentes" },
  { value: "9", label: "Otro" },
];
const factoresMock = [
  { id: 1, threat_type_id: 1, description: "La vivienda se encuentra a orillas de la quebrada, con antecedentes de desbordamiento en temporada de lluvias.", distance: "15 metros", ubication: "Parte trasera de la vivienda" },
  { id: 2, threat_type_id: 6, description: "Árbol de gran tamaño con raíces expuestas junto al patio, riesgo de caída sobre el techo.", distance: "3 metros", ubication: "Patio trasero" },
  { id: 3, threat_type_id: 4, description: "Muro perimetral con fisuras visibles y desplome parcial, riesgo de colapso.", distance: "1 metro", ubication: "Muro lateral izquierdo" },
];

export const RisksView = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  // Mapeo del mock resolviendo la etiqueta de la amenaza
  const factores = factoresMock.map((f) => ({
    ...f,
    threatType: tiposAmenaza.find((t) => Number(t.value) === f.threat_type_id)?.label ?? "Otro riesgo",
  }));
  

  return (

    <div className="w-full flex flex-col gap-6">

      <HeaderSection
        icon={<TriangleAlert />}
        title="Factores de Riesgo"
        description="Consulta y gestiona las amenazas y factores de riesgo identificados en la vivienda y entorno."
        image="/svg/ilustracion_voluntarios.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(-1)}
      />

      <div className="w-full flex justify-end items-center gap-2">
        <div className="size-8 bg-(--color_azul) rounded-full flex justify-center items-center">
          <ShieldAlert className="text-white size-5" />
        </div>

        <div className="size-8 bg-(--color_naranja) rounded-full flex justify-center items-center">
          <AlertCircle className="text-white size-5" />
        </div>

        <div className="size-8 bg-(--color_azul) rounded-full flex justify-center items-center">
          <FileWarning className="text-white size-5" />
        </div>

        <Button
          variant="accent"
          onClick={() => navigate(`/planes-familiares/${planId}/riesgos/crear`)}
        >
          <PlusCircle className="size-5" /> Agregar riesgo
        </Button>

      </div>

      {factores.length === 0 ? (
        <Card padding="md" className="w-full text-center text-slate-500">
          No hay factores de riesgo registrados para este plan.
        </Card>
      ) : (
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
          {factores.map((factor) => (
            <Card
              key={factor.id}
              padding="md"
              className="relative w-full flex flex-col items-start justify-between gap-4 cursor-pointer overflow-hidden"
              onClick={() => navigate(`/planes-familiares/${planId}/riesgos/${factor.id}/editar`)}
            >
              <div className="flex items-start gap-4 z-10">
                <div className="flex items-center justify-center text-white bg-(--color_naranja) size-15 min-h-15 min-w-15 rounded-full z-10">
                  {/* <TriangleAlert className="size-8 text-white" /> */}
                  {RiskIcon(factor.threatType, "size-8 text-white")}
                </div>
                <div className="flex flex-col gap-1 pr-6">
                  <span className="font-bold text-(--color_azul) text-lg leading-tight">
                    {factor.threatType}
                  </span>
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {factor.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-slate-500 text-xs">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5 text-(--color_naranja)" />
                      {factor.ubication}
                    </span>
                    <span className="flex items-center gap-1">
                      <Ruler className="size-3.5 text-(--color_azul)" />
                      {factor.distance}
                    </span>
                  </div>
                </div>
              </div>

              <TriangleAlert className="absolute size-40 z-5 text-(--color_azul)/20 -bottom-9 right-5 pointer-events-none" />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RisksView;