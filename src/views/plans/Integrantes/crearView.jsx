import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Input, Select, Alert } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { 
  UserRound, 
  IdCard,
  Calendar, 
  Activity, 
  Flag, 
  Phone,  
  UserRoundPlus,
  Hash,
  VenusAndMars,
  UsersRound,
  Droplet
} from "lucide-react";
import { useFormValidation } from "@/features/auth/hooks/useFormValidation.js";
import { memberSchema } from "@/features/plans/schemas/member.schema"; // Ajusta según tu esquema

export const CrearView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Opciones estáticas para maquetación visual
  const tiposDocumento = [
    { value: "1", label: "Cédula de Ciudadanía" },
    { value: "2", label: "Tarjeta de Identidad" },
    { value: "3", label: "Registro Civil" },
  ];

  const generos = [
    { value: "1", label: "Masculino" },
    { value: "2", label: "Femenino" },
  ];

  const parentescos = [
    { value: "1", label: "Cabeza de familia" },
    { value: "2", label: "Cónyuge" },
    { value: "4", label: "Hijo/a" },
  ];

  const gruposSanguineos = [
    { value: "1", label: "A+" },
    { value: "3", label: "B+" },
    { value: "7", label: "O+" },
  ];

  const nacionalidades = [
    { value: "1", label: "Colombiana" },
    { value: "2", label: "Venezolana" },
  ];

  const eps = [
    { value: "1", label: "Sura" },
    { value: "2", label: "Sanitas" },
    { value: "3", label: "Salud Total" },
  ];

  const initialValues = {
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    genero: "",
    nacimiento: "",
    eps: "",
    parentesco: "",
    grupoSanguineo: "",
    nacionalidad: "",
    celularPersonal: "",
  };

  const { values, errors, handleChange, validate } = useFormValidation(
    initialValues,
    memberSchema
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
        text: "¿Deseas agregar enfermedades o afecciones que padezca el integrante?",
        onConfirm: () => {
          setAlertConfig((prev) => ({ ...prev, isVisible: false }));
          navigate(`/planes-familiares/${id}/integrantes/1/editar`);
        },
        onCancel: () => {
          navigate(`/planes-familiares/${id}/integrantes`);
        },
      });
    } else {
      console.warn("El formulario contiene errores de validación.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<UserRoundPlus />}
        title="Nuevo Integrante"
        description="Ingresa los datos para registrar un nuevo integrante a la familia."
        image="/svg/ilustracion_familia_c.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(`/planes-familiares/${id}/integrantes`)}
      />

      <Card padding="none" className="w-full p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-(--color_azul) flex items-center gap-2 mb-2">
            <UserRound className="size-5 text-(--color_naranja)" />
            Datos del integrante
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              icon={UserRound}
              type="text"
              placeholder="Nombres"
              name="nombres"
              value={values.nombres}
              onChange={handleChange}
              error={errors.nombres}
            />

            <Input
              icon={UserRound}
              type="text"
              placeholder="Apellidos"
              name="apellidos"
              value={values.apellidos}
              onChange={handleChange}
              error={errors.apellidos}
            />

            <Select
              icon={IdCard}
              placeholder="Tipo de documento"
              name="tipoDocumento"
              value={values.tipoDocumento}
              onChange={handleChange}
              arrayOptions={tiposDocumento}
              error={errors.tipoDocumento}
            />

            <Input
              icon={Hash}
              type="text"
              placeholder="Número de documento"
              name="numeroDocumento"
              value={values.numeroDocumento}
              onChange={handleChange}
              error={errors.numeroDocumento}
            />

            <Select
              icon={VenusAndMars}
              placeholder="Género"
              name="genero"
              value={values.genero}
              onChange={handleChange}
              arrayOptions={generos}
              error={errors.genero}
            />

            <Input
              icon={Calendar}
              type="date"
              placeholder="Fecha de nacimiento"
              name="nacimiento"
              value={values.nacimiento}
              onChange={handleChange}
              error={errors.nacimiento}
            />

            <Select
              icon={Activity}
              placeholder="EPS"
              name="eps"
              value={values.eps}
              onChange={handleChange}
              arrayOptions={eps}
              error={errors.eps}
            />

            <Select
              icon={UsersRound}
              placeholder="Parentesco"
              name="parentesco"
              value={values.parentesco}
              onChange={handleChange}
              arrayOptions={parentescos}
              error={errors.parentesco}
            />

            <Select
              icon={Droplet}
              placeholder="Grupo sanguíneo"
              name="grupoSanguineo"
              value={values.grupoSanguineo}
              onChange={handleChange}
              arrayOptions={gruposSanguineos}
              error={errors.grupoSanguineo}
            />

            <Select
              icon={Flag}
              placeholder="Nacionalidad"
              name="nacionalidad"
              value={values.nacionalidad}
              onChange={handleChange}
              arrayOptions={nacionalidades}
              error={errors.nacionalidad}
            />

            <div className="sm:col-span-2">
              <Input
                icon={Phone}
                type="text"
                placeholder="Celular personal"
                name="celularPersonal"
                value={values.celularPersonal}
                onChange={handleChange}
                error={errors.celularPersonal}
              />
            </div>
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