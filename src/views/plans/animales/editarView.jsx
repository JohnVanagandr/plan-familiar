import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Input, Select, Alert } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { 
  Calendar, 
  Pill, 
  Plus, 
  Eye,
  VenusAndMars,
  Calendar1,
  PawPrint,
  Dna,
  Heart,
  Syringe
} from "lucide-react";
import { useFormValidation } from "@/features/auth/hooks/useFormValidation.js";
import { petSchema } from "@/features/plans/schemas/pet.schema";
import { SpecieIcon } from "@/helpers/SpecieIcon";


export const EditarView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const especies = [ { value: 1, label: "Perro" } ];
  const generosAnimal = [ { value: 1, label: "Macho" } ];

  // Datos mock visuales iniciales del integrante
  const initialValues = {
    name: "Lucas",
    breed: "Criollo",
    birth_date: "2020-04-10",
    animal_gender_id: 1,
    species_id: 1,
    family_plan_id: 12
  };

  const { values, errors, handleChange, validate } = useFormValidation(
    initialValues,
    petSchema
  );

  const [vacunas, setVacunas] = useState([
    { id: 1, pet_id: 1, name: "Rabia", date: "2021-04-12" },
    { id: 2, pet_id: 1, name: "Pentavalente", date: "2021-05-10" }
  ]);

  const [formVacuna, setFormVacuna] = useState(false);
  const [nuevaVacuna, setNuevaVacuna] = useState({ name: "", date: "" });
  const [errorVacuna, setErrorVacuna] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setAlertMessage("Datos de la mascota actualizados con éxito.");
      setShowToast(true);
    } else {
      console.warn("El formulario contiene errores de validación.");
    }
  };

  const handleGuardarVacuna = () => {
    if (!nuevaVacuna.name.trim() || !nuevaVacuna.date.trim()) {
      setErrorVacuna("Completa el nombre y la fecha de la vacuna.");
      return;
    }

    setErrorVacuna("");
    setVacunas((prev) => [
      ...prev,
      {
        id: Date.now(),
        pet_id: Number(id),
        name: nuevaVacuna.name.trim(),
        date: nuevaVacuna.date.trim()
      }
    ]);

    setNuevaVacuna({ name: "", date: "" });
    setFormVacuna(false);
  };

  // console.log(values.especie)
  
  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={SpecieIcon("perro")}
        title={`${values.name}`}
        description="Edita y gestiona la mascota o animal de compañia seleccionado."
        image="/svg/ilustracion_mascotas.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(`/planes-familiares/${id}/animales`)}
      />

      <div className="flex flex-col gap-6">
        {/* Formulario Principal */}
        <Card padding="none" className="w-full p-5 sm:p-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-(--color_azul) flex items-center gap-2 mb-2">
              <PawPrint className="size-5 text-(--color_naranja)" />
              Datos del integrante
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                icon={PawPrint}
                type="text"
                placeholder="Nombres"
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
              Guardar cambios
            </Button>
          </form>
        </Card>

        {/* Panel de Vacunas */}
        <Card padding="none" className="w-full p-5 sm:p-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-(--color_azul) flex items-center gap-2">
              <Syringe className="size-5 text-(--color_naranja)" />
              Vacunas
            </h2>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFormVacuna((prev) => !prev)}
            >
              <Plus className="size-4" />
              {formVacuna ? "Cancelar" : "Agregar nueva"}
            </Button>
          </div>

          {formVacuna && (
            <div className="flex flex-col gap-3 p-4 border border-slate-200 rounded-2xl bg-slate-50/50">
              <Input
                icon={Syringe}
                type="text"
                placeholder="Nombre de vacuna"
                name="name"
                value={nuevaVacuna.name}
                onChange={(e) =>
                  setNuevaVacuna((prev) => ({ ...prev, name: e.target.value }))
                }
                // error={errorVacuna}
              />

              <Input
                icon={Calendar1}
                type="date"
                placeholder="Fecha de aplicación"
                name="date"
                value={nuevaVacuna.date}
                onChange={(e) =>
                  setNuevaVacuna((prev) => ({ ...prev, date: e.target.value }))
                }
                error={errorVacuna}
              />

              <Button type="button" variant="accent" onClick={handleGuardarVacuna}>
                Guardar vacuna
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {vacunas.length === 0 ? (
              <p className="text-sm text-slate-400">
                El animal no cuenta con vacunas registradas.
              </p>
            ) : (
              vacunas.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-(--color_azul)/10 text-(--color_azul) font-medium text-sm"
                >
                  <Eye className="size-4 text-(--color_azul) shrink-0" />
                  <span>
                    {item.name} - {item.date}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <Alert
        variant="success"
        text={alertMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default EditarView;