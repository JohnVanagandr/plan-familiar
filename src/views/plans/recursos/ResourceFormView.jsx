import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Input, Select, Alert, Textarea } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import {
  Hospital,
  MapPin,
  Ruler,
  Phone,
  AlignLeft,
  HandHeart,
} from "lucide-react";
import { useFormValidation } from "@/features/auth/hooks/useFormValidation.js";
import { resourceSchema } from "@/features/plans/schemas/resource.schema";

const recursos = [
  { value: "1", label: "Puesto de Salud - Clinica u Hospital" },
  { value: "2", label: "Estación de Bomberos" },
  { value: "3", label: "Estacion de Policia - CAI" },
  { value: "4", label: "Defensa Civil" },
  { value: "5", label: "Cruz Roja" },
  { value: "6", label: "Ejercito Nacional" },
  { value: "7", label: "Enfermeria" },
  { value: "8", label: "Extintores" },
];

// Mock simulando la respuesta de búsqueda por ID
const recursosMock = [
  { id: 1, resource_id: "1", location: "Hospital San Rafael, Girón", distance: "1.2 km", phone: "6076461234", description: "Atiende urgencias 24 horas" },
  { id: 2, resource_id: "2", location: "Estación de Bomberos Girón", distance: "800 metros", phone: "6076469876", description: "" },
  { id: 3, resource_id: "4", location: "Sede Defensa Civil Bucaramanga", distance: "3 km", phone: "6076123456", description: "Punto de encuentro y atención en emergencias" },
];

export const ResourceFormView = () => {
  const { planId, recursoId } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(recursoId);

  const initialValues = {
    resource_id: "",
    location: "",
    distance: "",
    phone: "",
    description: "",
    family_plan_id: planId,
  };

  const { values, errors, handleChange, validate, setValues } = useFormValidation(
    initialValues,
    resourceSchema
  );

  const [alertConfig, setAlertConfig] = useState({
    isVisible: false,
    variant: "info",
    text: "",
    onConfirm: () => {},
  });

  // Cargar datos existentes si está en modo edición
  useEffect(() => {
    if (isEditing) {
      const recursoFound = recursosMock.find((item) => item.id === Number(recursoId));
      if (recursoFound) {
        setValues({
          resource_id: String(recursoFound.resource_id),
          location: recursoFound.location,
          distance: recursoFound.distance,
          phone: recursoFound.phone,
          description: recursoFound.description,
          family_plan_id: planId,
        });
      }
    }
  }, [isEditing, recursoId, planId, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const message = isEditing
        ? "El recurso disponible ha sido actualizado correctamente."
        : "El recurso disponible ha sido creado correctamente.";

      setAlertConfig({
        isVisible: true,
        variant: "info",
        text: message,
        onConfirm: () => {
          setAlertConfig((prev) => ({ ...prev, isVisible: false }));
          navigate(`/planes-familiares/${planId}/recursos`);
        },
      });
    } else {
      console.warn("El formulario contiene errores de validación.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<Hospital />}
        title={isEditing ? "Editar Recurso Disponible" : "Nuevo Recurso Disponible"}
        description={
          isEditing
            ? "Modifica los datos del recurso de emergencia."
            : "Registra un recurso de emergencia cercano a la vivienda de la familia."
        }
        image="/svg/ilustracion_voluntaria_a.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(`/planes-familiares/${planId}/recursos`)}
      />

      <Card padding="none" className="w-full p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-(--color_azul) flex items-center gap-2 mb-2">
            <Hospital className="size-5 text-(--color_naranja)" />
            Información del Recurso
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              icon={HandHeart}
              placeholder="Tipo de recurso"
              name="resource_id"
              value={values.resource_id}
              onChange={handleChange}
              arrayOptions={recursos}
              error={errors.resource_id}
            />

            <Input
              icon={MapPin}
              type="text"
              placeholder="Ubicación (ej. Hospital San Rafael, Girón)"
              name="location"
              value={values.location}
              onChange={handleChange}
              error={errors.location}
            />

            <Input
              icon={Ruler}
              type="text"
              placeholder="Distancia (ej. 1.2 km)"
              name="distance"
              value={values.distance}
              onChange={handleChange}
              error={errors.distance}
            />

            <Input
              icon={Phone}
              type="text"
              placeholder="Teléfono de contacto (opcional)"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <div className="sm:col-span-2">
              <Textarea
                icon={AlignLeft}
                placeholder="Descripción (opcional)"
                name="description"
                value={values.description}
                onChange={handleChange}
                error={errors.description}
              />
            </div>
          </div>

          <Button type="submit" variant="accent" size="lg" className="mt-4">
            {isEditing ? "Guardar cambios" : "Guardar"}
          </Button>
        </form>
      </Card>

      <Alert
        isVisible={alertConfig.isVisible}
        variant={alertConfig.variant}
        text={alertConfig.text}
        onConfirm={alertConfig.onConfirm}
        onClose={() => setAlertConfig((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default ResourceFormView;