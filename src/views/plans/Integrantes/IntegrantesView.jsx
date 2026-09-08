import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "@/components/ui";
import { Droplet, UsersRound, UserRoundPlus, Plus, FaceSlightlySmilingPlus, FilePlus, Smile } from "lucide-react";
import HeaderSection from "@/components/ui/headerSection";
import { use, useEffect, useState } from "react";
import * as api from "@/helpers/api";

// Mock: reemplazar por la petición real (GET /members/plan/:id) cuando se reconecte la lógica
const parentescos = [
  { value: "1", label: "Cabeza de familia" },
  { value: "2", label: "Cónyuge" },
  { value: "3", label: "Hermano/a" },
  { value: "4", label: "Hijo/a" },
  { value: "13", label: "Abuelo/a" },
];

const gruposSanguineos = [
  { value: "1", label: "A+" },
  { value: "3", label: "B+" },
  { value: "7", label: "O+" },
];

export const IntegrantesView = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    const cargarPlan = async () => {
      try {

        const Integrantes = await api.get(`members/familyPlan/${planId}`);
        setMiembros(Integrantes);

        console.log(Integrantes);
        
        
      } catch (error) {
        console.error("Error al cargar los integrantes:", error);
      }
    };

    cargarPlan();
  }, [planId]);

  return (
    <div className="w-full flex flex-col gap-6">

      <HeaderSection
        icon={<UsersRound />}
        title="Integrantes"
        description="Consulta y gestiona los integrantes registrados en el plan familiar."
        image="/svg/ilustracion_familia_c.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(-1)}
      />

      <div className="w-full flex justify-end items-center gap-2">

        <div className="size-8 bg-(--color_azul) rounded-full flex justify-center items-center"><Plus className="text-white size-5"/></div>
        <div className="size-8 bg-(--color_naranja) rounded-full flex justify-center items-center"><FaceSlightlySmilingPlus className="text-white size-5"/></div>
        <div className="size-8 bg-(--color_azul) rounded-full flex justify-center items-center"><FilePlus className="text-white size-5"/></div>
        <Button
          variant="accent"
          onClick={() => navigate(`/planes-familiares/${planId}/integrantes/crear`)}
        >
          <UserRoundPlus className="size-5" /> Agregar integrante
        </Button>
      </div>

      {miembros.length === 0 ? (
        <Card padding="md" className="w-full text-center text-slate-500">
          No hay integrantes registrados para este plan.
        </Card>
      ) : (
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
          {miembros.map((miembro) => (
            <Card
              key={miembro.id}
              padding="md"
              className="relative w-full flex flex-col items-start justify-between gap-4 cursor-pointer overflow-hidden"
              onClick={() => navigate(`/planes-familiares/${planId}/integrantes/${miembro.id}/editar`)}
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-1 text-white font-semibold text-sm bg-(--color_naranja) size-15 min-h-15 min-w-15 rounded-full z-10">
                  <span className="w-full text-center text-xl">

                    {miembro.blood_group}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-(--color_azul) text-lg">
                    {miembro.full_name}
                  </span>
                  <span className="text-slate-500 text-sm">{miembro.kinship}</span>
                  <span className="text-slate-400 text-xs">{miembro.birth_date}</span>
                </div>

              </div>

              <Smile className="absolute size-40 z-5 text-(--color_azul)/20 top-2 right-5"/>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};

export default IntegrantesView;