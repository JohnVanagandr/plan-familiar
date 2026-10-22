import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Textarea, Alert } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { ScanBox, UploadCloud, Save } from "lucide-react";
import * as api from "@/helpers/api";

export const CrearView = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [guardando, setGuardando] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setAlertVariant("error");
      setAlertMessage("Solo se permiten imágenes JPG, PNG o WEBP.");
      setShowToast(true);
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setAlertVariant("error");
      setAlertMessage("La imagen no puede superar los 2 MB.");
      setShowToast(true);
      e.target.value = "";
      return;
    }

    if (!file) {
      setImageFile(null);
      setPreviewUrl(null);
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // const handleGuardar = () => {
  //   if (!imageFile) {
  //     setError("Debes seleccionar una imagen");
  //     return;
  //   }
  //   setError("");

  //   // Mock: acá iría el POST real (multipart/form-data: path, family_plan_id, description)
  //   console.log("Guardando gráfico de vivienda (mock):", { planId, imageFile, description });

  //   navigate(`/planes-familiares/${planId}/vivienda`);
  // };

  const handleGuardar = async () => {

    if (!imageFile) {
      setAlertVariant("error");
      setAlertMessage("Debes seleccionar una imagen.");
      setShowToast(true);
      return;
    }

    if (!description.trim()) {
      setAlertVariant("error");
      setAlertMessage("Debes escribir una descripción.");
      setShowToast(true);
      return;
    }
  
    setGuardando(true);
  
    try {
      const formData = new FormData();
      formData.append("path", imageFile);
      formData.append("family_plan_id", planId);
      formData.append("description", description.trim());
  
      await api.post("housingGraphics", formData);
  
      setAlertVariant("success");
      setAlertMessage("Gráfico de vivienda guardado con éxito.");
      setShowToast(true);

      setTimeout(() => navigate(`/planes-familiares/${planId}/vivienda`), 1500);

    } catch (error) {

      console.error("Error al guardar el gráfico de vivienda:", error.details ?? error);
      setAlertVariant("error");
      setAlertMessage("No se pudo guardar el gráfico de vivienda.");
      setShowToast(true);
      setGuardando(false); // solo si falla, para poder reintentar
    }
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

        <Button variant="accent" size="lg" onClick={handleGuardar} isLoading={guardando}>
          {!guardando && <Save className="size-5" />} Guardar
        </Button>

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

export default CrearView;