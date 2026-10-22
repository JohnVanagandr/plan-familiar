import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Input, Select, Alert, Textarea } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { 
  TriangleAlert, 
  MapPin, 
  Ruler, 
  AlignLeft, 
  ShieldAlert 
} from "lucide-react";
import { useFormValidation } from "@/features/auth/hooks/useFormValidation.js";
import { riskSchema } from "@/features/plans/schemas/risk.schema";
import * as api from "@/helpers/api";

// const tiposAmenaza = [
//   { value: "1", label: "Inundación" },
//   { value: "2", label: "Deslizamiento" },
//   { value: "3", label: "Creciente Súbita" },
//   { value: "4", label: "Caída Colapso Estructural" },
//   { value: "5", label: "Contaminación Plagas" },
//   { value: "6", label: "Caída de árboles rocas" },
//   { value: "7", label: "Colapso Estructural Traumas Quemaduras" },
//   { value: "8", label: "Riesgo de Accidentes" },
//   { value: "9", label: "Otro" },
// ];

// Mock simulando la respuesta de búsqueda por ID
// const factoresMock = [
//   { id: 1, threat_type_id: "1", description: "La vivienda se encuentra a orillas de la quebrada, con antecedentes de desbordamiento en temporada de lluvias.", distance: "15 metros", ubication: "Parte trasera de la vivienda" },
//   { id: 2, threat_type_id: "6", description: "Árbol de gran tamaño con raíces expuestas junto al patio, riesgo de caída sobre el techo.", distance: "3 metros", ubication: "Patio trasero" },
//   { id: 3, threat_type_id: "4", description: "Muro perimetral con fisuras visibles y desplome parcial, riesgo de colapso.", distance: "1 metro", ubication: "Muro lateral izquierdo" },
// ];

export const RiskFormView = () => {
  const { planId, riesgoId } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(riesgoId);

  const initialValues = {
    threat_type_id: "",
    description: "",
    ubication: "",
    distance: "",
    family_plan_id: planId,
  };

  const { values, errors, handleChange, validate, setValues } = useFormValidation(
    initialValues,
    riskSchema
  );


  const [tiposAmenaza, setTiposAmenaza] = useState([]);
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


  // Cargar datos existentes si está en modo edición
  // useEffect(() => {
  //   if (isEditing) {
  //     const factorFound = factoresMock.find((item) => item.id === Number(riesgoId));
  //     if (factorFound) {
  //       setValues({
  //         threat_type_id: String(factorFound.threat_type_id),
  //         description: factorFound.description,
  //         ubication: factorFound.ubication,
  //         distance: factorFound.distance,
  //         family_plan_id: planId,
  //       });
  //     }
  //   }
  // }, [isEditing, riesgoId, planId, setValues]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [tiposData, factor] = await Promise.all([
          api.get("threatTypes"),
          isEditing ? api.get(`riskFactors/${riesgoId}`) : Promise.resolve(null),
        ]);
  
        setTiposAmenaza(
          (tiposData || []).map((item) => ({ value: String(item.id), label: item.name }))
        );
  
        if (factor) {
          setValues({
            threat_type_id: String(factor.threat_type_id ?? ""),
            description: factor.description ?? "",
            ubication: factor.ubication ?? "",
            distance: String(factor.distance ?? ""),
            family_plan_id: planId,
          });
        }
      } catch (error) {
        console.error("Error al cargar el factor de riesgo:", error.details ?? error);
        mostrarAlerta("error", "No se pudieron cargar los datos del factor de riesgo.");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [isEditing, riesgoId, planId, setValues]);


  if (loading) {
    return <p className="text-(--color_azul)">Cargando factor de riesgo...</p>;
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (validate()) {
  //     const message = isEditing
  //       ? "El factor de riesgo ha sido actualizado correctamente."
  //       : "El factor de riesgo ha sido creado correctamente.";

  //     setAlertConfig({
  //       isVisible: true,
  //       variant: "info",
  //       text: message,
  //       onConfirm: () => {
  //         setAlertConfig((prev) => ({ ...prev, isVisible: false }));
  //         navigate(`/planes-familiares/${planId}/riesgos`);
  //       },
  //     });
  //   } else {
  //     console.warn("El formulario contiene errores de validación.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) {
      console.warn("El formulario contiene errores de validación.");
      return;
    }
  
    setGuardando(true);
  
    try {
      if (isEditing) {
        await api.patch(`riskFactors/${riesgoId}`, values);
      } else {
        await api.post("riskFactors", values);
      }
  
      mostrarAlerta(
        "success",
        isEditing
          ? "El factor de riesgo ha sido actualizado correctamente."
          : "El factor de riesgo ha sido creado correctamente."
      );
  

      setTimeout(() => navigate(`/planes-familiares/${planId}/riesgos`), 1500);
      
    } catch (error) {

      console.error("Error al guardar el factor de riesgo:", error.details ?? error);
      mostrarAlerta("error", "No se pudo guardar el factor de riesgo.");
      setGuardando(false); // solo si falla, para poder reintentar
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<TriangleAlert />}
        title={isEditing ? "Editar Factor de Riesgo" : "Nuevo Factor de Riesgo"}
        description={
          isEditing
            ? "Modifica los datos del factor de riesgo o amenaza identificada."
            : "Ingresa la información del factor de riesgo identificado en el entorno."
        }
        image="/svg/ilustracion_voluntaria_b.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(`/planes-familiares/${planId}/riesgos`)}
      />

      <Card padding="none" className="w-full p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-(--color_azul) flex items-center gap-2 mb-2">
            <TriangleAlert className="size-5 text-(--color_naranja)" />
            Información del Riesgo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              icon={ShieldAlert}
              placeholder="Tipo de amenaza"
              name="threat_type_id"
              value={values.threat_type_id}
              onChange={handleChange}
              arrayOptions={tiposAmenaza}
              error={errors.threat_type_id}
            />

            <Input
              icon={MapPin}
              type="text"
              placeholder="Ubicación (ej. Patio trasero)"
              name="ubication"
              value={values.ubication}
              onChange={handleChange}
              error={errors.ubication}
            />

            <Input
              icon={Ruler}
              type="text"
              placeholder="Distancia (ej. 5 metros)"
              name="distance"
              value={values.distance}
              onChange={handleChange}
              error={errors.distance}
            />

            <div className="sm:col-span-2">
              <Textarea
                icon={AlignLeft}
                placeholder="Descripción detallada del riesgo"
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

      {/* <Alert
        isVisible={alertConfig.isVisible}
        variant={alertConfig.variant}
        text={alertConfig.text}
        onConfirm={alertConfig.onConfirm}
        onClose={() => setAlertConfig((prev) => ({ ...prev, isVisible: false }))}
      /> */}

      <Alert
        variant={alertVariant}
        text={alertMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

    </div>
  );
};

export default RiskFormView;