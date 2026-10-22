import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Input, Select, Alert } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import {
  Calendar,
  VenusAndMars,
  PawPrint,
  Dna,
  Heart
} from "lucide-react";
import { useFormValidation } from "@/features/auth/hooks/useFormValidation.js";
import { petSchema } from "@/features/plans/schemas/pet.schema";
import * as api from "@/helpers/api";

export const CrearView = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [especies, setEspecies] = useState([]);
  const [generosAnimal, setGenerosAnimal] = useState([]);

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const [especiesData, generosData] = await Promise.all([
          api.get("species"),
          api.get("animalGenders"),
        ]);

        setEspecies(
          (especiesData || []).map((item) => ({ value: String(item.id), label: item.name }))
        );
        setGenerosAnimal(
          (generosData || []).map((item) => ({ value: String(item.id), label: item.name }))
        );
      } catch (error) {
        console.error("Error al cargar los catálogos:", error.details ?? error);
      }
    };

    cargarCatalogos();
  }, []);

  const initialValues = {
    name: "",
    breed: "",
    birth_date: "",
    animal_gender_id: "",
    species_id: "",
    family_plan_id: planId,
  };

  const { values, errors, handleChange, validate } = useFormValidation(
    initialValues,
    petSchema
  );

  const [guardando, setGuardando] = useState(false);

  const [alertConfig, setAlertConfig] = useState({
    isVisible: false,
    variant: "yesno",
    text: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.warn("El formulario contiene errores de validación.");
      return;
    }

    setGuardando(true);

    try {
      const respuesta = await api.post("pets", {
        name: values.name,
        breed: values.breed,
        birth_date: values.birth_date,
        animal_gender_id: values.animal_gender_id,
        species_id: values.species_id,
        family_plan_id: planId,
      });

      console.log("Respuesta POST pets:", respuesta);

      // El id puede venir en la raíz o envuelto en "data"
      const nuevoId = respuesta?.id ?? respuesta?.data?.id;

      setAlertConfig({
        isVisible: true,
        variant: "yesno",
        text: "¿Deseas agregar las vacunas que tiene la mascota?",
        onConfirm: () => {
          setAlertConfig((prev) => ({ ...prev, isVisible: false }));
          if (nuevoId) {
            navigate(`/planes-familiares/${planId}/animales/${nuevoId}/editar`);
          } else {
            navigate(`/planes-familiares/${planId}/animales`);
          }
        },
        onCancel: () => {
          navigate(`/planes-familiares/${planId}/animales`);
        },
      });
    } catch (error) {
      console.error("Error al guardar la mascota:", error.details ?? error);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<PawPrint />}
        title="Nueva Mascota"
        description="Ingresa los datos para registrar una nueva mascota o animal de compañía."
        image="/svg/ilustracion_mascotas.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(`/planes-familiares/${planId}/animales`)}
      />

      <Card padding="none" className="w-full p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-(--color_azul) flex items-center gap-2 mb-2">
            <PawPrint className="size-5 text-(--color_naranja)" />
            Datos de la mascota
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              icon={PawPrint}
              type="text"
              placeholder="Nombre"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
            />

            <Select
              icon={Dna}
              placeholder="Especie"
              name="species_id"
              value={values.species_id}
              onChange={handleChange}
              arrayOptions={especies}
              error={errors.species_id}
            />

            <Input
              icon={Heart}
              type="text"
              placeholder="Raza"
              name="breed"
              value={values.breed}
              onChange={handleChange}
              error={errors.breed}
            />

            <Select
              icon={VenusAndMars}
              placeholder="Género"
              name="animal_gender_id"
              value={values.animal_gender_id}
              onChange={handleChange}
              arrayOptions={generosAnimal}
              error={errors.animal_gender_id}
            />

            <Input
              icon={Calendar}
              type="date"
              placeholder="Fecha de nacimiento"
              name="birth_date"
              value={values.birth_date}
              onChange={handleChange}
              error={errors.birth_date}
            />
          </div>

          <Button type="submit" variant="accent" size="lg" className="mt-4" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar"}
          </Button>
        </form>
      </Card>

      <Alert
        isVisible={alertConfig.isVisible}
        variant={alertConfig.variant}
        text={alertConfig.text}
        onConfirm={alertConfig.onConfirm}
        onCancel={alertConfig.onCancel}
        onClose={() => setAlertConfig((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default CrearView;