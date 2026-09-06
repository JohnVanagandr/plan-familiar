import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Textarea } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { ScanBox, UploadCloud, Save } from "lucide-react";

export const CrearView = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImageFile(null);
      setPreviewUrl(null);
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleGuardar = () => {
    if (!imageFile) {
      setError("Debes seleccionar una imagen");
      return;
    }
    setError("");

    // Mock: acá iría el POST real (multipart/form-data: path, family_plan_id, description)
    console.log("Guardando gráfico de vivienda (mock):", { planId, imageFile, description });

    navigate(`/planes-familiares/${planId}/vivienda`);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<ScanBox />}
        title="Nuevo Gráfico de Vivienda"
        description="Sube el plano de la vivienda y describe brevemente lo que muestra."
        image="/svg/ilustracion_vivienda.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(`/planes-familiares/${planId}/vivienda`)}
      />

      <Card padding="none" className="w-full p-5 sm:p-7 flex flex-col gap-5">

        <div className="w-full h-72 rounded-2xl bg-(--color_azul)/10 overflow-hidden flex items-center justify-center">
          {previewUrl ? (
            <img src={previewUrl} alt="Vista previa" className="w-full h-full object-cover" />
          ) : (
            <ScanBox className="size-20 text-(--color_azul)/30" />
          )}
        </div>

        <label className="w-full flex items-center gap-3 px-4 py-3 rounded-full border border-slate-200 bg-white cursor-pointer hover:border-(--color_azul)/50 transition-colors">
          <UploadCloud className="size-5 text-(--color_azul) shrink-0" />
          <span className="text-slate-500 text-sm">
            {imageFile ? imageFile.name : "Seleccionar una imagen"}
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>

        <Textarea
          placeholder="Descripción (ej. Fachada principal, techo en mal estado)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && <span className="text-xs text-red-600">{error}</span>}

        <Button variant="accent" size="lg" onClick={handleGuardar}>
          <Save className="size-5" /> Guardar
        </Button>
      </Card>
    </div>
  );
};

export default CrearView;