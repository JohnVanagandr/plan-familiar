import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Input, Select, Alert } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { 
  UserRound, 
  IdCard, 
  Info, 
  Calendar, 
  Activity, 
  Flag, 
  Phone, 
  Pill, 
  Plus, 
  Eye,
  VenusAndMars,
  Droplet,
  UsersRound,
  Hash,
  UserRoundPen
} from "lucide-react";
import { useFormValidation } from "@/features/auth/hooks/useFormValidation.js";
import { memberSchema } from "@/features/plans/schemas/member.schema";
import * as api from "@/helpers/api";

export const EditarView = () => {
  const { planId, integranteId } = useParams();
  const navigate = useNavigate();

  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [parentescos, setParentescos] = useState([]);
  const [gruposSanguineos, setGruposSanguineos] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);
  const [eps, setEps] = useState([]);
  const [tiposCondicion, setTiposCondicion] = useState([]);
  const [condiciones, setCondiciones] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const { values, errors, handleChange, validate, setValues } = useFormValidation(
    initialValues,
    memberSchema
  );

  const [formCondicion, setFormCondicion] = useState(false);
  const [nuevaCondicion, setNuevaCondicion] = useState({ condition_type_id: "", name: "" });
  const [errorCondicion, setErrorCondicion] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [miembro, tiposDoc, generosData, parentescosData, gruposSanguineosData, nacionalidadesData, epsData, conditionData, conditionsData] = await Promise.all([
          api.get(`members/${integranteId}`),
          api.get("documentTypes"),
          api.get("genders"),
          api.get("kinships"),
          api.get("bloodGroups"),
          api.get("nationalities"),
          api.get("eps"),
          api.get("conditionTypes"),
          api.get(`conditionMembers/member/${integranteId}`)
        ]);

        setTiposDocumento((tiposDoc || []).map((item) => ({ value: String(item.id), label: item.name })));
        setGeneros((generosData || []).map((item) => ({ value: String(item.id), label: item.name })));
        setParentescos((parentescosData || []).map((item) => ({ value: String(item.id), label: item.name })));
        setGruposSanguineos((gruposSanguineosData || []).map((item) => ({ value: String(item.id), label: item.name })));
        setNacionalidades((nacionalidadesData || []).map((item) => ({ value: String(item.id), label: item.name })));
        setEps((epsData || []).map((item) => ({ value: String(item.id), label: item.name })));
        setTiposCondicion((conditionData || []).map((item) => ({ value: String(item.id), label: item.name })));
        setCondiciones((conditionsData || []).map((item) => ({ id: item.id, typeLabel: item.condition_type?.name ?? item.condition_type_name ?? "Afección", name: item.name})));

        setValues({
          nombres: miembro.names ?? "",
          apellidos: miembro.last_names ?? "",
          tipoDocumento: String(miembro.document_type_id ?? ""),
          numeroDocumento: miembro.document_number ?? "",
          genero: String(miembro.gender_id ?? ""),
          nacimiento: miembro.birth_date ?? "",
          eps: String(miembro.eps_id ?? ""),
          parentesco: String(miembro.kinship_id ?? ""),
          grupoSanguineo: String(miembro.blood_group_id ?? ""),
          nacionalidad: String(miembro.nationality_id ?? ""),
          celularPersonal: miembro.phone ?? "",
        });
      } catch (error) {
        console.error("Error al cargar el integrante:", error.details ?? error);
        setAlertVariant("danger");
        setAlertMessage("No se pudieron cargar los datos del integrante.");
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    if (integranteId) cargarDatos();
  }, [integranteId, setValues]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      console.warn("El formulario contiene errores de validación.");
      return;
    }

    try {
      await api.patch(`members/${integranteId}`, {
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

      setAlertVariant("success");
      setAlertMessage("Datos del integrante actualizados con éxito.");
      setShowToast(true);
    } catch (error) {
      console.error("Error al actualizar el integrante:", error.details ?? error);
      setAlertVariant("danger");
      setAlertMessage("No se pudieron actualizar los datos del integrante.");
      setShowToast(true);
    }
  };

  const handleCondicion = async () => {
    if (!nuevaCondicion.condition_type_id || !nuevaCondicion.name.trim()) {
      setErrorCondicion("Selecciona un tipo y escribe el nombre de la condición.");
      return;
    }
  
    try {
      const afeccionCreada = await api.post("conditionMembers", {
        member_id: integranteId,
        condition_type_id: nuevaCondicion.condition_type_id,
        name: nuevaCondicion.name.trim(),
      });
  
      const tipoSeleccionado = tiposCondicion.find(
        (t) => String(t.value) === String(nuevaCondicion.condition_type_id)
      );
  
      setErrorCondicion("");
      setCondiciones((prev) => [
        ...prev,
        {
          id: afeccionCreada.id,
          typeLabel: tipoSeleccionado?.label || "Afección",
          name: afeccionCreada.name,
        },
      ]);
  
      setNuevaCondicion({ condition_type_id: "", name: "" });
      setFormCondicion(false);
    } catch (error) {
      console.error("Error al guardar la afección:", error.details ?? error);
      setErrorCondicion(error.message || "No se pudo guardar la afección.");
    }
  };

  if (loading) {
    return <p className="text-(--color_azul)">Cargando datos del integrante...</p>;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<UserRoundPen />}
        title={`${values.nombres} ${values.apellidos}`}
        description="Edita y gestiona los datos del integrante seleccionado."
        image="/svg/ilustracion_familia_c.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(`/planes-familiares/${planId}/integrantes`)}
      />

      {/* ... el resto del JSX del formulario queda igual ... */}
      <div className="flex flex-col gap-6">
        {/* Formulario Principal */}
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
              Guardar cambios
            </Button>
          </form>
        </Card>

        {/* Panel de condiciones */}
        <Card padding="none" className="w-full p-5 sm:p-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-(--color_azul) flex items-center gap-2">
              <Pill className="size-5 text-(--color_naranja)" />
              Condiciones Medicas
            </h2>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFormCondicion((prev) => !prev)}
            >
              <Plus className="size-4" />
              {formCondicion ? "Cancelar" : "Agregar nueva"}
            </Button>
          </div>

          {formCondicion && (
            <div className="flex flex-col gap-3 p-4 border border-slate-200 rounded-2xl bg-slate-50/50">
              <Select
                icon={Pill}
                placeholder="Tipo de condición"
                name="condition_type_id"
                value={nuevaCondicion.condition_type_id}
                onChange={(e) =>
                  setNuevaCondicion((prev) => ({ ...prev, condition_type_id: e.target.value }))
                }
                arrayOptions={tiposCondicion}
              />

              <Input
                icon={Info}
                type="text"
                placeholder="Nombre de la afección (ej. Diabetes tipo 2)"
                name="name"
                value={nuevaCondicion.name}
                onChange={(e) =>
                  setNuevaCondicion((prev) => ({ ...prev, name: e.target.value }))
                }
                error={errorCondicion}
              />

              <Button type="button" variant="accent" onClick={handleCondicion}>
                Guardar condición
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {condiciones.length === 0 ? (
              <p className="text-sm text-slate-400">
                Este integrante no tiene condiciones medicas registradas.
              </p>
            ) : (
              condiciones.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-(--color_azul)/10 text-(--color_azul) font-medium text-sm"
                >
                  <Eye className="size-4 text-(--color_azul) shrink-0" />
                  <span>
                    {item.typeLabel} - {item.name}
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