import { useEffect, useState } from "react";
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
import * as api from "@/helpers/api";
import { set } from "zod";
import { tr } from "zod/v4/locales";

export const CrearView = () => {
  const { planId } = useParams();
  const navigate = useNavigate();


  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [parentescos, setParentescos] = useState([]);
  const [gruposSanguineos, setGruposSanguineos] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);
  const [eps, setEps] = useState([]);

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const [tiposDoc, generosData, parentescosData, gruposSanguineosData, nacionalidadesData, epsData] = await Promise.all([
          api.get("documentTypes"),
          api.get("genders"),
          api.get("kinships"),
          api.get("bloodGroups"),
          api.get("nationalities"),
          api.get("eps")
        ]);

        setTiposDocumento(
          (tiposDoc || []).map((item) => ({ value: item.id, label: item.name }))
        );
        setGeneros(
          (generosData || []).map((item) => ({ value: item.id, label: item.name }))
        );
        setParentescos(
          (parentescosData || []).map((item) => ({ value: item.id, label: item.name }))
        );
        setGruposSanguineos(
          (gruposSanguineosData || []).map((item) => ({ value: item.id, label: item.name }))
        );
        setNacionalidades(
          (nacionalidadesData || []).map((item) => ({ value: item.id, label: item.name }))
        );
        setEps(
          (epsData || []).map((item) => ({ value: item.id, label: item.name }))
        );

      }
      catch (error) {
        console.error("Error al cargar los catálogos:", error);
      }
    };

    cargarCatalogos();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.warn("El formulario tiene errores de validación que deben corregirse.");
      return;
    }

    try {
      const responce = await api.post(`members/${planId}`, {
        names: values.nombres,
        last_names: values.apellidos,
        document_type_id: values.tipoDocumento,
        document_number: values.numeroDocumento,
        gender_id: values.genero,
        birth_date: values.nacimiento,
        eps_id: values.eps,
        kinship_id: values.parentesco,
        blood_group_id: values.grupoSanguineo,
        nationality_id: values.nacionalidad,
        phone: values.celularPersonal,
      });

      setAlertConfig({
        isVisible: true,
        variant: "yesno",
        text: "¿Deseas agregar enfermedades o afecciones que padezca el integrante?",
        onConfirm: () => {
          setAlertConfig((prev) => ({ ...prev, isVisible: false }));
          navigate(`/planes-familiares/${planId}/integrantes/${responce.id}/editar`);
        },
        onCancel: () => {
          navigate(`/planes-familiares/${planId}/integrantes`);
        },
      });

    } catch (error) {
      console.error("Error al guardar el integrante:", error);
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