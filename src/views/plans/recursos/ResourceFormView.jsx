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

import * as api from "@/helpers/api";


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

  const [tiposRecurso, setTiposRecurso] = useState([]);
  const [loading, setLoading] = useState(isEditing);
  const [guardando, setGuardando] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  
  const mostrarAlerta = (variant, message) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [tiposData, recurso] = await Promise.all([
          api.get("resources"),
          isEditing ? api.get(`availableResources/${recursoId}`) : Promise.resolve(null),
        ]);
    
        setTiposRecurso(
          (tiposData || []).map((item) => ({ value: String(item.id), label: item.name }))
        );
    
        if (recurso) {
          setValues({
            resource_id: String(recurso.resource_id),
            location: recurso.location,
            distance: String(recurso.distance ?? ""),
            phone: recurso.phone,
            description: recurso.description,
            family_plan_id: planId,
          });
        }
      } catch (error) {
        console.error("Error al cargar los recursos disponibles:", error.details ?? error);
        mostrarAlerta("error", "No se pudieron cargar los recursos disponibles.");
      } finally {
        setLoading(false);
      }
    };
  
    cargarDatos();
  }, [isEditing, recursoId, planId, setValues]);
  
  
  if (loading) {
    return <p className="text-(--color_azul)">Cargando factor de riesgo...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.warn("El formulario contiene errores de validación.");
      return;
    }

    setGuardando(true);

    try {
      if (isEditing) {
        await api.patch(`availableResources/${recursoId}`, values);
      } else {
        await api.post("availableResources", values);
      }

      mostrarAlerta(
        "success",
        isEditing
          ? "El recurso disponible ha sido actualizado correctamente."
          : "El recurso disponible ha sido creado correctamente."
      );

      setTimeout(() => navigate(`/planes-familiares/${planId}/recursos`), 1500);
    } catch (error) {
      console.error("Error al guardar el recurso disponible:", error.details ?? error);
      mostrarAlerta("error", "No se pudo guardar el recurso disponible.");
      setGuardando(false);
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
              arrayOptions={tiposRecurso}
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
              placeholder="Teléfono de contacto"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <div className="sm:col-span-2">
              <Textarea
                icon={AlignLeft}
                placeholder="Descripción"
                name="description"
                value={values.description}
                onChange={handleChange}
                error={errors.description}
              />
            </div>
          </div>

          <Button type="submit" variant="accent" size="lg" className="mt-4" isLoading={guardando}>
            {isEditing ? "Guardar cambios" : "Guardar"}
          </Button>
        </form>
      </Card>

      <Alert
        variant={alertVariant}
        text={alertMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default ResourceFormView;