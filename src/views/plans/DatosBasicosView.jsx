// import { DatosPrincipalesForm } from '@/features/plans/components/DatosPrincipalesForm';

// export const DatosBasicosView = () => {
//   return <DatosPrincipalesForm />;
// };

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Input, Select, Alert } from "@/components/ui";
import * as api from "@/helpers/api";
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
import { familyDatosSchema } from "@/features/plans/schemas/familyDatos.schema";

// Reemplazar por catálogos de la API cuando estén disponibles.
const zonas = [
  { value: "1", label: "Rural" },
  { value: "2", label: "Urbana" },
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
  const { planId } = useParams();
  const [familiaData, setFamiliaData] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [loadingCiudades, setLoadingCiudades] = useState(false);
  const [loading, setLoading] = useState(true);

  const initialState = {
    apellidos: "",
    zona: "",
    departamento: "",
    ciudad: "",
    direccion: "",
    sector: "",
    sectorNombre: "",
    telefono: "",
    calidadVivienda: "",
  };

  const { values, errors, handleChange, validate, setValues } = useFormValidation(initialState, familyDatosSchema);

  const [showToast, setShowToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  useEffect(() => {
    const cargarPlan = async () => {
      try {
        const [data, departmentsData] = await Promise.all([
          api.get(`familyPlans/${planId}`),
          api.get("departments"),
        ]);

        setFamiliaData(data);
        setDepartamentos(
          (departmentsData ?? []).map((department) => ({
            value: String(department.id),
            label: department.name ?? department.nombre,
          }))
        );
        setValues({
          apellidos: data.last_names ?? "",
          zona: String(data.zone_id ?? ""),
          departamento: String(data.department_id ?? ""),
          ciudad: String(data.city_id ?? ""),
          direccion: data.address ?? "",
          sector: String(data.sector_id ?? ""),
          sectorNombre: data.sector_name ?? "",
          telefono: data.landline_phone ?? "",
          calidadVivienda: String(data.housing_quality_id ?? ""),
        });
      } catch (error) {
        console.error("Error cargando el plan:", error);
        setAlertVariant("danger");
        setAlertMessage("No se pudieron cargar los datos del plan.");
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    if (planId) cargarPlan();
  }, [planId, setValues]);

  useEffect(() => {
    const cargarCiudades = async () => {
      if (!values.departamento) {
        setCiudades([]);
        return;
      }

      setLoadingCiudades(true);

      try {
        const data = await api.get(`cities/department/${values.departamento}`);
        setCiudades(
          (data ?? []).map((city) => ({
            value: String(city.id),
            label: city.name ?? city.nombre,
          }))
        );
      } catch (error) {
        console.error("Error cargando ciudades:", error);
        setCiudades([]);
        setAlertVariant("danger");
        setAlertMessage("No se pudieron cargar las ciudades.");
        setShowToast(true);
      } finally {
        setLoadingCiudades(false);
      }
    };

    cargarCiudades();
  }, [values.departamento]);

  const handleDepartamentoChange = (event) => {
    handleChange(event);
    setValues((previous) => ({ ...previous, ciudad: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.warn("El formulario tiene errores de validación que deben corregirse.");
      return;
    }

    try {
      await api.patch(`familyPlans/${planId}`, {
        last_names: values.apellidos,
        zone_id: values.zona,
        department_id: values.departamento,
        city_id: values.ciudad,
        address: values.direccion,
        sector_id: values.sector,
        sector_name: values.sectorNombre,
        landline_phone: values.telefono,
        housing_quality_id: values.calidadVivienda,
      });
      setAlertVariant("success");
      setAlertMessage("Datos actualizados con éxito.");
      setShowToast(true);
    } catch (error) {
      console.error("Error actualizando el plan:", error);
      setAlertVariant("danger");
      setAlertMessage("No se pudieron actualizar los datos del plan.");
      setShowToast(true);
    }
  };

  if (loading) {
    return <p className="text-(--color_azul)">Cargando datos del plan...</p>;
  }

  if (!familiaData) {
    return <p className="text-(--color_azul)">No se encontró el plan familiar.</p>;
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row">

      {/* Panel de presentación */}
      <Card
        padding="none"
        className=" relative w-full p-4! flex flex-col sm:flex-row lg:flex-col justify-between items-center gap-6 lg:max-w-md"
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
            arrayOptions={zonas}
            error={errors.zona}
          />

          <Select
            icon={Building2}
            placeholder="Seleccione el departamento"
            name="departamento"
            value={values.departamento}
            onChange={handleDepartamentoChange}
            arrayOptions={departamentos}
            error={errors.departamento}
          />

          <Select
            icon={Building2}
            placeholder="Seleccione la ciudad"
            name="ciudad"
            value={values.ciudad}
            onChange={handleChange}
            arrayOptions={ciudades}
            disabled={!values.departamento || loadingCiudades}
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
            arrayOptions={sectores}
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
            arrayOptions={calidadesVivienda}
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