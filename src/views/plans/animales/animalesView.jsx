import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "@/components/ui";
import { Droplet, UsersRound, UserRoundPlus, Plus, FaceSlightlySmilingPlus, FilePlus, Smile, PawPrint, Dog, Fish, Bird, PlusCircle } from "lucide-react";
import HeaderSection from "@/components/ui/headerSection";

// Mock: reemplazar por la petición real (GET /members/plan/:id) cuando se reconecte la lógica
const especies = [
  { value: "1", label: "Perro" },
  { value: "2", label: "Gato" },
  { value: "3", label: "Conejo" },
  { value: "4", label: "Roedor" },
  { value: "5", label: "Ave" },
  { value: "6", label: "Insecto" },
  { value: "7", label: "Pez" },
  { value: "8", label: "Rana" },
  { value: "9", label: "Serpiente" },
  { value: "10", label: "Tortuga" },
];

const generos = [
  { value: "1", label: "Macho" },
  { value: "2", label: "Hembra" },
];

const mascotasMock = [
  { id: 1, name: "Lucas", breed: "Criollo", birth_date: "2020-04-10", animal_gender_id: 1, species_id: 1, family_plan_id: 12 },
  { id: 2, name: "Michi", breed: "Siamés", birth_date: "2021-08-15", animal_gender_id: 2, species_id: 2, family_plan_id: 12 },
  { id: 3, name: "Bruno", breed: "Golden Retriever", birth_date: "2019-01-20", animal_gender_id: 1, species_id: 1, family_plan_id: 13 },
  { id: 4, name: "Copito", breed: "Cabeza de León", birth_date: "2022-11-05", animal_gender_id: 1, species_id: 3, family_plan_id: 14 },
];

// Mock de vacunas
// const vacunasMascotasMock = [
//   { id: 1, pet_id: 1, name: "Rabia", date: "2021-04-12" },
//   { id: 2, pet_id: 1, name: "Pentavalente", date: "2021-05-10" },
//   { id: 3, pet_id: 2, name: "Triple Felina", date: "2022-01-15" },
//   { id: 4, pet_id: 3, name: "Parvovirus", date: "2019-03-01" },
// ];

export const AnimalesView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock: en un futuro esto vendría de filtrar por `id` (useParams) contra la API real
  const mascotas = mascotasMock.map((m) => ({
    ...m,
    gender: generos.find((g) => Number(g.value) === m.animal_gender_id)?.label ?? "Sin definir",
    specie: especies.find((e) => Number(e.value) === m.species_id)?.label ?? "N/D",
  }));

  return (
    <div className="w-full flex flex-col gap-6">

      <HeaderSection
        icon={<PawPrint />}
        title="Mascotas y Animales"
        description="Consulta y gestiona las mascotas y/o animales de compañia registrados en el plan familiar."
        image="/svg/ilustracion_mascotas.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(-1)}
      />

      <div className="w-full flex justify-end items-center gap-2">

        <div className="size-8 bg-(--color_azul) rounded-full flex justify-center items-center"><Dog className="text-white size-5"/></div>
        <div className="size-8 bg-(--color_naranja) rounded-full flex justify-center items-center"><Fish className="text-white size-5"/></div>
        <div className="size-8 bg-(--color_azul) rounded-full flex justify-center items-center"><Bird className="text-white size-5"/></div>
        <Button
          variant="accent"
          onClick={() => navigate(`/planes-familiares/${id}/integrantes/crear`)}
        >
          <PlusCircle className="size-5" /> Agregar animal
        </Button>
      </div>

      {mascotas.length === 0 ? (
        <Card padding="md" className="w-full text-center text-slate-500">
          No hay integrantes registrados para este plan.
        </Card>
      ) : (
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mascotas.map((mascota) => (
            <Card
              key={mascota.id}
              padding="md"
              className="relative w-full flex flex-col items-start justify-between gap-4 cursor-pointer overflow-hidden"
              onClick={() => navigate(`/planes-familiares/${id}/integrantes/${mascota.id}/editar`)}
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-1 text-white font-semibold text-sm bg-(--color_naranja) size-15 min-h-15 min-w-15 rounded-full z-10">
                  <span className="w-full text-center text-xl">

                    {mascota.gender}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-(--color_azul) text-lg">
                    {mascota.name}
                  </span>
                  <span className="text-slate-500 text-sm">{mascota.breed}</span>
                  <span className="text-slate-400 text-xs">{mascota.birth_date}</span>
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

export default AnimalesView;