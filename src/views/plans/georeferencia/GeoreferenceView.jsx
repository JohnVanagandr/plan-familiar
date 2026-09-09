import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Input } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { MapPin, UploadCloud, Save, Locate } from "lucide-react";
import * as api from "@/helpers/api";

export const GeoreferenceView = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imagenExiste, setImagenExiste] = useState(false);
  const [coordinatesId, setCoordinatesId] = useState(null);
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const cargarGeoreferencia = async () => {
      try {
        const [georreferenciaData, coordinateData] = await Promise.all([
          api.get(`housingInfo/${planId}/type/${1}`),
          api.get(`coordinates/familyPlan/${planId}`),
        ]);

        if (georreferenciaData) {
          setPreviewUrl(georreferenciaData.path ?? null);
          setImagenExiste(true);
        }

        if (coordinateData) {
          setCoordinatesId(coordinateData.id ?? null);
          setLatitud(String(coordinateData.latitude ?? ""));
          setLongitud(String(coordinateData.longitude ?? ""));
        }
      } catch (error) {
        console.error("Error al cargar la georreferenciación:", error.details ?? error);
      } finally {
        setLoading(false);
      }
    };

    cargarGeoreferencia();
  }, [planId]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImageFile(null);
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const validarCoordenadas = () => {
    const nuevosErrores = {};

    if (!latitud.trim()) nuevosErrores.latitud = "La latitud es obligatoria";
    else if (isNaN(Number(latitud))) nuevosErrores.latitud = "La latitud debe ser un número";

    if (!longitud.trim()) nuevosErrores.longitud = "La longitud es obligatoria";
    else if (isNaN(Number(longitud))) nuevosErrores.longitud = "La longitud debe ser un número";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardar = async () => {
    if (!validarCoordenadas()) return;

    if (!imageFile && !imagenExiste) {
      setErrores((prev) => ({ ...prev, imagen: "Selecciona un archivo primero" }));
      return;
    }

    setGuardando(true);
    try {
      // 1. Imagen → housingInfo
      if (imageFile) {
        const formData = new FormData();
        formData.append("path", imageFile);
        formData.append("family_plan_id", planId);
        formData.append("housing_info_type_id", 1);

        if (imagenExiste) {
          await api.post(`housingInfo/${planId}/type/${1}`, formData);
        } else {
          await api.post(`housingInfo`, formData);
          setImagenExiste(true);
        }
      }

      // 2. Coordenadas → coordinates
      const payloadCoordenadas = {
        family_plan_id: planId,
        latitude: latitud,
        longitude: longitud,
      };

      if (coordinatesId) {
        await api.put(`coordinates/${coordinatesId}`, payloadCoordenadas);
      } else {
        const nuevaCoordenada = await api.post(`coordinates`, payloadCoordenadas);
        setCoordinatesId(nuevaCoordenada.id);
      }
    } catch (error) {
      console.error("Error al guardar la georreferenciación:", error.details ?? error);
    } finally {
      setGuardando(false);
    }
  };

  if (loading) {
    return <p className="text-(--color_azul)">Cargando georreferenciación...</p>;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<MapPin />}
        title="Georreferenciación"
        description="Ingresa una captura y las coordenadas que permitan la geolocalización exacta de la vivienda."
        image="/svg/ilustracion_voluntaria_b.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(-1)}
      />

      <Card padding="none" className="w-full p-5 sm:p-7 flex flex-col gap-5 items-center">
        <div className="w-full max-w-2xl h-72 rounded-2xl bg-(--color_azul)/10 overflow-hidden flex items-center justify-center">
          {previewUrl ? (
            <img src={previewUrl} alt="Vista previa de georreferenciación" className="w-full h-full object-cover" />
          ) : (
            <MapPin className="size-20 text-(--color_azul)/30" />
          )}
        </div>

        <label className="w-full max-w-2xl flex items-center gap-3 px-4 py-3 rounded-full border border-slate-200 bg-white cursor-pointer hover:border-(--color_azul)/50 transition-colors">
          <UploadCloud className="size-5 text-(--color_azul) shrink-0" />
          <span className="text-slate-500 text-sm">
            {imageFile ? imageFile.name : "Seleccionar una imagen"}
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
        {errores.imagen && <p className="text-sm text-red-500">{errores.imagen}</p>}

        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            icon={Locate}
            type="text"
            placeholder="Latitud (ej. 7.0631)"
            value={latitud}
            onChange={(e) => setLatitud(e.target.value)}
            error={errores.latitud}
          />

          <Input
            icon={Locate}
            type="text"
            placeholder="Longitud (ej. -73.0864)"
            value={longitud}
            onChange={(e) => setLongitud(e.target.value)}
            error={errores.longitud}
          />
        </div>

        <Button variant="accent" size="lg" onClick={handleGuardar} disabled={guardando} className="w-full max-w-2xl">
          <Save className="size-5" /> {guardando ? "Guardando..." : "Guardar"}
        </Button>
      </Card>
    </div>
  );
};

export default GeoreferenceView;