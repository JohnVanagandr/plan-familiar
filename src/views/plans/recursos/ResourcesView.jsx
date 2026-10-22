import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "@/components/ui";
import {
  Hospital,
  PlusCircle,
  MapPin,
  Phone,
  HandHeart,
  ShieldCheck,
  Siren,
  Ruler,
} from "lucide-react";
import HeaderSection from "@/components/ui/headerSection";
import { useEffect, useState } from "react";
import * as api from "@/helpers/api";


export const ResourcesView = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [recursos, setRecursos] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const cargarRecursos = async () => {
      try {
        const data = await api.get(`availableResources/familyPlan/${planId}`);
        setRecursos(data || []);
      } catch (error) {
        // Un 404 solo significa que el plan todavía no tiene recursos
        if (error?.code !== 404) {
          console.error("Error al cargar los recursos disponibles:", error.details ?? error);
        }
      } finally {
        setLoading(false);
      }
    };

    cargarRecursos();
  }, [planId]);
    
  if (loading) {
    return <p className="text-(--color_azul)">Cargando recursos disponibles...</p>;
  }

  return (

    <div className="w-full flex flex-col gap-6">

      <HeaderSection
        icon={<Hospital />}
        title="Recursos Disponibles"
        description="Consulta y gestiona los recursos de emergencia cercanos a la vivienda."
        image="/svg/ilustracion_voluntarios.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(-1)}
      />

      <div className="w-full flex justify-end items-center gap-2">
        <div className="size-8 bg-(--color_azul) rounded-full flex justify-center items-center">
          <ShieldCheck className="text-white size-5" />
        </div>

        <div className="size-8 bg-(--color_naranja) rounded-full flex justify-center items-center">
          <Siren className="text-white size-5" />
        </div>

        <div className="size-8 bg-(--color_azul) rounded-full flex justify-center items-center">
          <HandHeart className="text-white size-5" />
        </div>

        <Button
          variant="accent"
          onClick={() => navigate(`/planes-familiares/${planId}/recursos/crear`)}
        >
          <PlusCircle className="size-5" /> Agregar recurso
        </Button>

      </div>

      {recursos.length === 0 ? (
        <Card padding="md" className="w-full text-center text-slate-500">
          Este plan familiar no tiene recursos disponibles registrados.
        </Card>
      ) : (
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recursos.map((recurso) => (
            <Card
              key={recurso.id}
              padding="md"
              className="relative w-full flex flex-col items-start justify-between gap-4 cursor-pointer overflow-hidden"
              onClick={() => navigate(`/planes-familiares/${planId}/recursos/${recurso.id}/editar`)}
            >
              <div className="flex items-start gap-4 z-10">
                <div className="flex items-center justify-center text-white bg-(--color_naranja) size-15 min-h-15 min-w-15 rounded-full z-10">
                  <Hospital className="size-8 text-white" />
                </div>
                <div className="flex flex-col gap-1 pr-6">
                  {/* CAMBIO: antes recurso.resourceName (ya no existe); ahora resource_name de la API */}
                  <span className="font-bold text-(--color_azul) text-lg leading-tight">
                    {recurso.resource_name}
                  </span>
                  {/* CAMBIO (opcional): la API también manda "service", se muestra como subtítulo */}
                  {recurso.service && (
                    <span className="text-slate-600 text-sm">{recurso.service}</span>
                  )}
                  <div className="flex flex-col gap-3 mt-1 text-slate-500 text-xs">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5 text-(--color_naranja)" />
                      {recurso.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Ruler className="size-3.5 text-(--color_azul)" />
                      {recurso.distance}
                    </span>
                    {recurso.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="size-3.5 text-(--color_azul)" />
                        {recurso.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Hospital className="absolute size-40 z-5 text-(--color_azul)/20 -bottom-9 right-5 pointer-events-none" />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesView;