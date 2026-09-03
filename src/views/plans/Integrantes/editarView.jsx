import { useState } from "react";
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
import { memberSchema } from "@/features/plans/schemas/member.schema"; // Ajusta según tu esquema
import { hash } from "zod";

export const EditarView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Opciones estáticas para maquetación visual
  const tiposDocumento = [{ value: "1", label: "Cédula de Ciudadanía" }];
  const generos = [{ value: "1", label: "Masculino" }];
  const parentescos = [{ value: "1", label: "Cabeza de familia" }];
  const gruposSanguineos = [{ value: "1", label: "A+" }];
  const nacionalidades = [{ value: "1", label: "Colombiana" }];
  const eps = [{ value: "1", label: "Sura" }];
  
  const tiposCondicion = [
    { value: "1", label: "Alergia" },
    { value: "2", label: "Enfermedad Crónica" },
    { value: "3", label: "Discapacidad" },
  ];

  // Datos mock visuales iniciales del integrante
  const initialValues = {
    nombres: "Carlos Andrés",
    apellidos: "García Pérez",
    tipoDocumento: "1",
    numeroDocumento: "1098765432",
    genero: "1",
    nacimiento: "1980-05-14",
    eps: "1",
    parentesco: "1",
    grupoSanguineo: "1",
    nacionalidad: "1",
    celularPersonal: "3001234567",
  };

  const { values, errors, handleChange, validate } = useFormValidation(
    initialValues,
    memberSchema
  );

  const [afecciones, setAfecciones] = useState([
    { id: 1, typeLabel: "Alergia", name: "Penicilina" },
    { id: 2, typeLabel: "Enfermedad Crónica", name: "Hipertensión" },
  ]);

  const [formAfeccion, setFormAfeccion] = useState(false);
  const [nuevaAfeccion, setNuevaAfeccion] = useState({ condition_type_id: "", name: "" });
  const [errorAfeccion, setErrorAfeccion] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setAlertMessage("Datos del integrante actualizados con éxito.");
      setShowToast(true);
    } else {
      console.warn("El formulario contiene errores de validación.");
    }
  };

  const handleAgregarAfeccion = () => {
    if (!nuevaAfeccion.condition_type_id || !nuevaAfeccion.name.trim()) {
      setErrorAfeccion("Selecciona un tipo y escribe el nombre de la afección.");
      return;
    }

    const tipoSeleccionado = tiposCondicion.find(
      (t) => String(t.value) === String(nuevaAfeccion.condition_type_id)
    );

    setErrorAfeccion("");
    setAfecciones((prev) => [
      ...prev,
      {
        id: Date.now(),
        typeLabel: tipoSeleccionado?.label || "Afección",
        name: nuevaAfeccion.name.trim(),
      },
    ]);

    setNuevaAfeccion({ condition_type_id: "", name: "" });
    setFormAfeccion(false);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<UserRoundPen />}
        title={`${values.nombres} ${values.apellidos}`}
        description="Edita y gestiona los datos del integrante seleccionado."
        image="/svg/ilustracion_familia_c.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(`/planes-familiares/${id}/integrantes`)}
      />

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

        {/* Panel de Afecciones */}
        <Card padding="none" className="w-full p-5 sm:p-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-(--color_azul) flex items-center gap-2">
              <Pill className="size-5 text-(--color_naranja)" />
              Afecciones
            </h2>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFormAfeccion((prev) => !prev)}
            >
              <Plus className="size-4" />
              {formAfeccion ? "Cancelar" : "Agregar nueva"}
            </Button>
          </div>

          {formAfeccion && (
            <div className="flex flex-col gap-3 p-4 border border-slate-200 rounded-2xl bg-slate-50/50">
              <Select
                icon={Pill}
                placeholder="Tipo de afección"
                name="condition_type_id"
                value={nuevaAfeccion.condition_type_id}
                onChange={(e) =>
                  setNuevaAfeccion((prev) => ({ ...prev, condition_type_id: e.target.value }))
                }
                arrayOptions={tiposCondicion}
              />

              <Input
                icon={Info}
                type="text"
                placeholder="Nombre de la afección (ej. Diabetes tipo 2)"
                name="name"
                value={nuevaAfeccion.name}
                onChange={(e) =>
                  setNuevaAfeccion((prev) => ({ ...prev, name: e.target.value }))
                }
                error={errorAfeccion}
              />

              <Button type="button" variant="accent" onClick={handleAgregarAfeccion}>
                Guardar afección
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {afecciones.length === 0 ? (
              <p className="text-sm text-slate-400">
                Este integrante no tiene afecciones registradas.
              </p>
            ) : (
              afecciones.map((item) => (
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