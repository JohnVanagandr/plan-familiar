import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Input, Select, Alert } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import {
  Calendar,
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
import * as api from "@/helpers/api";

export const EditarView = () => {
  const { planId, animalId } = useParams();
  const navigate = useNavigate();

  const [especies, setEspecies] = useState([]);
  const [generosAnimal, setGenerosAnimal] = useState([]);
  const [vacunas, setVacunas] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialValues = {
    name: "",
    breed: "",
    birth_date: "",
    animal_gender_id: "",
    species_id: "",
    family_plan_id: planId,
  };

  const { values, errors, handleChange, validate, setValues } = useFormValidation(
    initialValues,
    petSchema
  );

  const [formVacuna, setFormVacuna] = useState(false);
  const [nuevaVacuna, setNuevaVacuna] = useState({ name: "", date: "" });
  const [errorVacuna, setErrorVacuna] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [mascota, vacunasData, especiesData, generosData] = await Promise.all([
          api.get(`pets/${animalId}`),
          api.get(`petVaccines/pet/${animalId}`),
          api.get("species"),
          api.get("animalGenders"),
        ]);

        setEspecies(
          (especiesData || []).map((item) => ({ value: String(item.id), label: item.name }))
        );
        setGenerosAnimal(
          (generosData || []).map((item) => ({ value: String(item.id), label: item.name }))
        );

        setVacunas(
          (vacunasData || []).map((v) => ({
            id: v.id,
            pet_id: v.pet_id,
            name: v.name,
            date: v.date?.slice(0, 10) ?? "",
          }))
        );

        setValues({
          name: mascota.name ?? "",
          breed: mascota.breed ?? "",
          birth_date: mascota.birth_date?.slice(0, 10) ?? "",
          animal_gender_id: String(mascota.animal_gender_id ?? ""),
          species_id: String(mascota.species_id ?? ""),
          family_plan_id: String(mascota.family_plan_id ?? planId),
        });
      } catch (error) {
        console.error("Error al cargar la mascota:", error.details ?? error);
        setAlertVariant("error");
        setAlertMessage("No se pudieron cargar los datos de la mascota.");
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    if (animalId) {
      cargarDatos();
    } else {
      setLoading(false);
    }
  }, [animalId, planId, setValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.warn("El formulario contiene errores de validación.");
      return;
    }

    try {
      await api.patch(`pets/${animalId}`, {
        name: values.name,
        breed: values.breed,
        birth_date: values.birth_date,
        animal_gender_id: values.animal_gender_id,
        species_id: values.species_id,
      });

      setAlertVariant("success");
      setAlertMessage("Datos de la mascota actualizados con éxito.");
      setShowToast(true);
    } catch (error) {
      console.error("Error al actualizar la mascota:", error.details ?? error);
      setAlertVariant("error");
      setAlertMessage("No se pudieron actualizar los datos de la mascota.");
      setShowToast(true);
    }
  };

  const handleGuardarVacuna = async () => {
    if (!nuevaVacuna.name.trim() || !nuevaVacuna.date.trim()) {
      setErrorVacuna("Completa el nombre y la fecha de la vacuna.");
      return;
    }

    try {
      const respuesta = await api.post("petVaccines", {
        pet_id: animalId,
        name: nuevaVacuna.name.trim(),
        date: nuevaVacuna.date.trim(),
      });

      const creada = respuesta?.data ?? respuesta;

      setErrorVacuna("");
      setVacunas((prev) => [
        ...prev,
        {
          id: creada.id,
          pet_id: Number(animalId),
          name: creada.name ?? nuevaVacuna.name.trim(),
          date: creada.date?.slice(0, 10) ?? nuevaVacuna.date.trim(),
        },
      ]);

      setNuevaVacuna({ name: "", date: "" });
      setFormVacuna(false);
    } catch (error) {
      console.error("Error al guardar la vacuna:", error.details ?? error);
      setErrorVacuna(error.message || "No se pudo guardar la vacuna.");
    }
  };

  if (loading) {
    return <p className="text-(--color_azul)">Cargando datos de la mascota...</p>;
  }

  const especieActual =
    especies.find((e) => e.value === String(values.species_id))?.label ?? "";

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={SpecieIcon(especieActual)}
        title={values.name}
        description="Edita y gestiona la mascota o animal de compañia seleccionado."
        image="/svg/ilustracion_mascotas.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(`/planes-familiares/${planId}/animales`)}
      />

      <div className="flex flex-col gap-6">
        {/* Formulario principal */}
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
              Guardar cambios
            </Button>
          </form>
        </Card>

        {/* Panel de vacunas */}
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
        variant={alertVariant}
        text={alertMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default EditarView;