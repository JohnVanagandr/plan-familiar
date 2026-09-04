import { useState } from "react";
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
import { SpecieIcon } from "@/helpers/SpecieIcon";

export const CrearView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const especies = [
    { value: "1", label: "Perro" },
    { value: "2", label: "Gato" },
    { value: "3", label: "Ave" },
    { value: "4", label: "Roedor" },
  ];

  const generosAnimal = [
    { value: "1", label: "Macho" },
    { value: "2", label: "Hembra" },
  ];

  const initialValues = {
    name: "",
    breed: "",
    birth_date: "",
    animal_gender_id: "",
    species_id: "",
    family_plan_id: id,
  };

  const { values, errors, handleChange, validate } = useFormValidation(
    initialValues,
    petSchema
  );

  const [alertConfig, setAlertConfig] = useState({
    isVisible: false,
    variant: "yesno",
    text: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setAlertConfig({
        isVisible: true,
        variant: "yesno",
        text: "¿Deseas agregar las vacunas que tiene la mascota?",
        onConfirm: () => {
          setAlertConfig((prev) => ({ ...prev, isVisible: false }));
          navigate(`/planes-familiares/${id}/animales/1/editar`);
        },
        onCancel: () => {
          navigate(`/planes-familiares/${id}/animales`);
        },
      });
    } else {
      console.warn("El formulario contiene errores de validación.");
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
        onButtonClick={() => navigate(`/planes-familiares/${id}/animales`)}
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

          <Button type="submit" variant="accent" size="lg" className="mt-4">
            Guardar
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