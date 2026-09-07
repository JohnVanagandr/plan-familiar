import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Input, Select, Alert } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { History, Trash2, EyeOff, Eye } from "lucide-react";

/**
 * Panel editable + historial, reutilizable para cualquier catálogo de Datos Maestros.
 * El layout (columnas) se DERIVA de `fields`.
 *
 * @param {object} props
 * @param {React.ComponentType} props.icon
 * @param {string} props.title
 * @param {object} props.data - registro actual (mock o API), incluye `estado`
 * @param {Array} props.fields - [{ name, label, type: "text"|"select", icon?, options?: [{value,label}] }]
 * @param {import("zod").ZodObject} props.schema
 * @param {Function} props.onSave - callback(formData)
 * @param {Function} props.onToggleEstado - callback(nuevoEstado) — activar/desactivar
 * @param {Function} props.onDelete - callback() — solo se llama tras confirmar en el Alert
 */
export const DatosMaestrosDetail = ({
  icon: Icon,
  title,
  data,
  fields,
  schema,
  onSave,
  onToggleEstado,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(data ?? {});
  const [errores, setErrores] = useState({});
  const [confirmandoEliminar, setConfirmandoEliminar] = useState(false);

  const estaActivo = formData.estado === "Activo";

  useEffect(() => {
    if (import.meta.env.DEV && schema) {
      const clavesSchema = Object.keys(schema.shape);
      const clavesFaltantes = fields
        .map((f) => f.name)
        .filter((name) => !clavesSchema.includes(name));

      if (clavesFaltantes.length > 0) {
        console.warn(
          `[CatalogDetail] "${title}": campos sin match en el schema: ${clavesFaltantes.join(", ")}`
        );
      }
    }
  }, [fields, schema, title]);

  const layoutClasses = fields.length <= 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleGuardar = () => {
    if (!schema) {
      onSave(formData);
      return;
    }

    const resultado = schema.safeParse(formData);

    if (!resultado.success) {
      const nuevosErrores = {};
      resultado.error.issues.forEach((issue) => {
        const campo = issue.path[0];
        if (!nuevosErrores[campo]) nuevosErrores[campo] = issue.message;
      });
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    onSave(resultado.data);
  };

  const handleToggleEstado = () => {
    const nuevoEstado = estaActivo ? "Inactivo" : "Activo";
    setFormData((prev) => ({ ...prev, estado: nuevoEstado }));
    onToggleEstado?.(nuevoEstado);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<Icon />}
        title={title}
        description="Consulta y edita este registro del catálogo."
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(-1)}
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="md" className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-(--color_azul) text-sm uppercase tracking-wide">
              Editar registro
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${estaActivo ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
              {formData.estado ?? "Activo"}
            </span>
          </div>

          <div className={`grid ${layoutClasses} gap-4`}>
            {fields.map((field) =>
              field.type === "select" ? (
                <Select
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  icon={field.icon}
                  value={formData[field.name]}
                  arrayOptions={field.options}
                  onChange={handleChange}
                  error={errores[field.name]}
                  placeholder={`Selecciona ${field.label.toLowerCase()}`}
                />
              ) : (
                <Input
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  icon={field.icon}
                  type="text"
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                  error={errores[field.name]}
                />
              )
            )}
          </div>

          {/* Fila de acciones: Guardar / Desactivar / Eliminar */}
          <div className="flex flex-wrap gap-2 justify-end mt-2">
            
            <Button
              variant="danger"
              shape="circle"
              // tooltip="Eliminar"
              onClick={() => setConfirmandoEliminar(true)}
            >
              <Trash2 className="size-4" />
            </Button>

            <Button
              variant={estaActivo ? "outline-secondary" : "success"}
              onClick={handleToggleEstado}
            >
              {estaActivo ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              {estaActivo ? "Desactivar" : "Activar"}
            </Button>

            <Button variant="accent" onClick={handleGuardar}>
              Guardar cambios
            </Button>
          </div>
        </Card>

        {/* Historial — placeholder por ahora */}
        <Card padding="md" className="w-full flex flex-col gap-3 items-center justify-center text-center text-slate-400 min-h-60">
          <History className="size-10 text-(--color_azul)/30" />
          <span className="text-sm">Historial de cambios</span>
          <span className="text-xs">Próximamente</span>
        </Card>
      </div>

      {/* Confirmación antes de borrar — usa tu Alert existente */}
      <Alert
        isVisible={confirmandoEliminar}
        variant="confirm"
        text={`¿Seguro que deseas eliminar "${formData[fields[0]?.name] ?? "este registro"}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={() => onDelete?.()}
        onCancel={() => setConfirmandoEliminar(false)}
        onClose={() => setConfirmandoEliminar(false)}
      />
    </div>
  );
};

export default DatosMaestrosDetail;