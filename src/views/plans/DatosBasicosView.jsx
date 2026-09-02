// import { DatosPrincipalesForm } from '@/features/plans/components/DatosPrincipalesForm';

// export const DatosBasicosView = () => {
//   return <DatosPrincipalesForm />;
// };

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Input, Select, Alert } from "@/components/ui";
import {
  FileEdit,
  UserRound,
  Compass,
  Building2,
  MapPin,
  UserRoundCog,
  Phone,
  Home,
  UsersRound,
} from "lucide-react";
import { useFormValidation } from "@/features/auth/hooks/useFormValidation.js";

// Mock: reemplazar por la petición real (GET /familyPlans/:id) cuando se reconecte la lógica
const familiaMock = {
  id: 12,
  last_names: "García Pérez",
  zone_id: "2",
  city_id: "1",
  address: "Calle 45 #12-34",
  sector_id: "1",
  sector_name: "La Esperanza",
  landline_phone: "6017894561",
  housing_quality_id: "1",
  familyType: { name: "Vulnerable" },
};

// Mock: reemplazar por catálogos reales cuando se reconecte la lógica
const zonas = [
  { value: "1", label: "Rural" },
  { value: "2", label: "Urbana" },
];

const ciudades = [
  { value: "1", label: "Bucaramanga" },
  { value: "2", label: "Girón" },
  { value: "3", label: "Floridablanca" },
];

const sectores = [
  { value: "1", label: "Barrio" },
  { value: "2", label: "Comuna" },
  { value: "3", label: "Localidad" },
];

const calidadesVivienda = [
  { value: "1", label: "Propio" },
  { value: "2", label: "Arrendado" },
  { value: "3", label: "Familiar" },
];

export const DatosBasicosView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock: en un futuro esto vendría de buscar familiaMock por `id` (useParams) contra la API real
  const familiaData = familiaMock;

  const initial_state = {
    apellidos: familiaData.last_names ?? "",
    zona: familiaData.zone_id ?? "",
    ciudad: familiaData.city_id ?? "",
    direccion: familiaData.address ?? "",
    sector: familiaData.sector_id ?? "",
    sectorNombre: familiaData.sector_name ?? "",
    telefono: familiaData.landline_phone ?? "",
    calidadVivienda: familiaData.housing_quality_id ?? "",
  };

  const { values, errors, handleChange, validate } = useFormValidation(initial_state);

  const [showToast, setShowToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Mock: PATCH real
      setAlertVariant("success");
      setAlertMessage("Datos actualizados con éxito.");
      setShowToast(true);
    } else {
      console.warn("El formulario tiene errores de validación que deben corregirse.");
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row">

      {/* Panel de presentación */}
      <Card
        padding="none"
        className=" relative w-full p-4! flex flex-col justify-between items-center gap-6 lg:max-w-md"
      >
        <div className="w-full">
          <h1 className="w-full text-3xl font-bold flex items-center gap-2 text-(--color_azul) sm:text-4xl">
            <FileEdit className="size-8 text-(--color_naranja)" />
            Datos Básicos
          </h1>
          <p className="text-(--color_azul)/80 mt-1">
            Tipo de familia: {familiaData.familyType?.name ?? "Sin definir"}
          </p>
        </div>

        <img src="/svg/ilustracion_datos.svg" alt="" className="w-56 lg:w-full translate-y-4" />
      </Card>

      {/* Formulario */}
      <Card padding="none" className="w-full p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <Input
            icon={UserRound}
            type="text"
            placeholder="Apellidos de la familia"
            name="apellidos"
            value={values.apellidos}
            onChange={handleChange}
            error={errors.apellidos}
          />

          <Select
            icon={Compass}
            placeholder="Seleccione el tipo de zona"
            name="zona"
            value={values.zona}
            onChange={handleChange}
            options={zonas}
            error={errors.zona}
          />

          <Select
            icon={Building2}
            placeholder="Seleccione la ciudad"
            name="ciudad"
            value={values.ciudad}
            onChange={handleChange}
            options={ciudades}
            error={errors.ciudad}
          />

          <Input
            icon={MapPin}
            type="text"
            placeholder="Dirección exacta"
            name="direccion"
            value={values.direccion}
            onChange={handleChange}
            error={errors.direccion}
          />

          <Select
            icon={UsersRound}
            placeholder="Seleccione el sector"
            name="sector"
            value={values.sector}
            onChange={handleChange}
            options={sectores}
            error={errors.sector}
          />

          <Input
            icon={UserRoundCog}
            type="text"
            placeholder="Nombre del sector"
            name="sectorNombre"
            value={values.sectorNombre}
            onChange={handleChange}
            error={errors.sectorNombre}
          />

          <Input
            icon={Phone}
            type="text"
            placeholder="Teléfono fijo"
            name="telefono"
            value={values.telefono}
            onChange={handleChange}
            error={errors.telefono}
          />

          <Select
            icon={Home}
            placeholder="Seleccione la calidad de la vivienda"
            name="calidadVivienda"
            value={values.calidadVivienda}
            onChange={handleChange}
            options={calidadesVivienda}
            error={errors.calidadVivienda}
          />

          <Button type="submit" variant="accent" size="lg">
            Guardar cambios
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

export default DatosBasicosView;