import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { Compass, UploadCloud, Save } from "lucide-react";
import * as api from "@/helpers/api";

export const EntornoGraphicView = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagenExiste, setImagenExiste] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  useEffect(() => {
    const cargarEntorno = async () => {
      try {
        const entornoData = await api.get(`housingInfo/${planId}/type/2`);

        if (entornoData) {
          setPreviewUrl(entornoData.path ?? null);
          setImagenExiste(true);
        }
      } catch (error) {
        // Un 404 solo significa que todavía no hay imagen cargada
        if (error?.code !== 404) {
          console.error("Error al cargar el gráfico de entorno:", error.details ?? error);
        }
      } finally {
        setLoading(false);
      }
    };

    cargarEntorno();
  }, [planId]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Mismas reglas que el backend: jpg, jpeg, png o webp, máximo 2 MB
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

    setShowToast(false);
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleGuardar = async () => {
    try {
      const formData = new FormData();
      formData.append("path", imageFile);
      formData.append("family_plan_id", planId);
      formData.append("housing_info_type_id", 2);

      if (imagenExiste) {
        // Ya hay una imagen de este tipo: se actualiza
        await api.post(`housingInfo/${planId}/type/2`, formData);
      } else {
        await api.post("housingInfo", formData);
        setImagenExiste(true);
      }

      setImageFile(null);
      setAlertVariant("success");
      setAlertMessage("Gráfico de entorno guardado con éxito.");
      setShowToast(true);
    } catch (error) {
      console.error("Error al guardar el gráfico de entorno:", error.details ?? error);
      setAlertVariant("error");
      setAlertMessage("No se pudo guardar el gráfico de entorno.");
      setShowToast(true);
    }
  };

  if (loading) {
    return <p className="text-(--color_azul)">Cargando gráfico de entorno...</p>;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<Compass />}
        title="Gráfico de Entorno"
        description="Sube una imagen que muestre el entorno de la vivienda y sus alrededores."
        image="/svg/ilustracion_voluntaria_b.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(-1)}
      />

      <Card padding="none" className="w-full p-5 sm:p-7 flex flex-col gap-5 items-center">
        <div className="w-full max-w-2xl h-72 rounded-2xl bg-(--color_azul)/10 overflow-hidden flex items-center justify-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Vista previa del gráfico de entorno"
              className="w-full h-full object-cover"
            />
          ) : (
            <Compass className="size-20 text-(--color_azul)/30" />
          )}
        </div>

        <label className="w-full max-w-2xl flex items-center gap-3 px-4 py-3 rounded-full border border-slate-200 bg-white cursor-pointer hover:border-(--color_azul)/50 transition-colors">
          <UploadCloud className="size-5 text-(--color_azul) shrink-0" />
          <span className="text-slate-500 text-sm">
            {imageFile
              ? imageFile.name
              : imagenExiste
                ? "Cambiar imagen"
                : "Seleccionar una imagen"}
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {imageFile && (
          <Button variant="accent" size="lg" onClick={handleGuardar} className="w-full max-w-2xl">
            <Save className="size-5" /> Guardar
          </Button>
        )}
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

export default EntornoGraphicView;