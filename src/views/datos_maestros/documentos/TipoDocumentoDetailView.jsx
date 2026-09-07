// TipoDocumentoDetailView.jsx
import { useParams } from "react-router-dom";
import { IdCard } from "lucide-react";
import DatosMaestrosDetail from "@/components/layout/DatosMaestrosDetail";
import { tipoDocumentoSchema } from "@/features/datos_maestros/schemas/tipoDocumento.schema";

const mock = [
  { id: 1, nombre: "Cédula de Ciudadanía", acronimo: "CC", estado: "Activo" },
  { id: 2, nombre: "Tarjeta de Identidad", acronimo: "TI", estado: "Activo" },
];

export const TipoDocumentoDetailView = () => {
  const { idTipoDocumento } = useParams();
  const tipoDocumento = mock.find((t) => String(t.id) === idTipoDocumento);

  return (
    <DatosMaestrosDetail
      icon={IdCard}
      title="Tipos de Documento"
      data={tipoDocumento}
      schema={tipoDocumentoSchema}
      fields={[
        { name: "nombre", label: "Nombre del Documento", type: "text" },
        { name: "acronimo", label: "Acrónimo", type: "text" },
      ]}
      onSave={(formData) => console.log("Guardando tipo de documento (mock):", formData)}
      onToggleEstado={(estado) => console.log("Cambiando estado (mock):", estado)}
      onDelete={() => console.log("Eliminando tipo de documento (mock)")}
    />
  );
};

export default TipoDocumentoDetailView;