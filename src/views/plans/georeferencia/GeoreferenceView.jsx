import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Input } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { MapPin, UploadCloud, Save, Locate } from "lucide-react";

// Mock: reemplazar por la petición real (GET /housingInfo/plan/:id/type/1) cuando se reconecte la lógica
const georefExistenteMock = {
  path: "https://picsum.photos/seed/georef12/600/400",
  latitud: "7.0631",
  longitud: "-73.0864",
};

export const GeoreferenceView = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(georefExistenteMock.path);

  const [latitud, setLatitud] = useState(georefExistenteMock.latitud);
  const [longitud, setLongitud] = useState(georefExistenteMock.longitud);
  const [errores, setErrores] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImageFile(null);
      setPreviewUrl(georefExistenteMock.path);
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

  const handleGuardar = () => {
    if (!validarCoordenadas()) return;

    // Mock: acá iría el PATCH real /housingInfo/plan/:id/type/1
    // georeference se guarda como "latitud,longitud" según el modelo real (string único)
    const georeference = `${latitud},${longitud}`;
    console.log("Guardando georreferenciación (mock):", { planId, imageFile, georeference });
  };

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

        <Button variant="accent" size="lg" onClick={handleGuardar} className="w-full max-w-2xl">
          <Save className="size-5" /> Guardar
        </Button>
      </Card>
    </div>
  );
};

export default GeoreferenceView;