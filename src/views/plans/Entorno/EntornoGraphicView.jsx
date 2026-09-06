import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { Compass, UploadCloud, Save } from "lucide-react";

// Mock: reemplazar por la petición real (GET /housingInfo/plan/:id/type/2) cuando se reconecte la lógica
const entornoExistenteMock = "https://picsum.photos/seed/entorno12/600/400";

export const EntornoGraphicView = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(entornoExistenteMock);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImageFile(null);
      setPreviewUrl(entornoExistenteMock);
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleGuardar = () => {
    // Mock: acá iría el PATCH real /housingInfo/plan/:id/type/2
    console.log("Guardando gráfico de entorno (mock):", { planId, imageFile });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<Compass />}
        title="Gráfico de Entorno"
        description="Sube una foto que muestre el entorno donde se ubica la vivienda: accesos, calles, riesgos cercanos."
        image="/svg/ilustracion_voluntaria_b.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(-1)}
      />

      <Card padding="none" className="w-full p-5 sm:p-7 flex flex-col gap-5 items-center">

        <div className="w-full max-w-2xl h-72 rounded-2xl bg-(--color_azul)/10 overflow-hidden flex items-center justify-center">
          {previewUrl ? (
            <img src={previewUrl} alt="Vista previa del gráfico de entorno" className="w-full h-full object-cover" />
          ) : (
            <Compass className="size-20 text-(--color_azul)/30" />
          )}
        </div>

        <label className="w-full max-w-2xl flex items-center gap-3 px-4 py-3 rounded-full border border-slate-200 bg-white cursor-pointer hover:border-(--color_azul)/50 transition-colors">
          <UploadCloud className="size-5 text-(--color_azul) shrink-0" />
          <span className="text-slate-500 text-sm">
            {imageFile ? imageFile.name : "Seleccionar una imagen"}
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>

        {imageFile && (
          <Button variant="accent" size="lg" onClick={handleGuardar} className="w-full max-w-2xl">
            <Save className="size-5" /> Guardar
          </Button>
        )}
      </Card>
    </div>
  );
};

export default EntornoGraphicView;