import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Textarea, Alert } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { ScanBox, Trash2, Save } from "lucide-react";

// Mock: reemplazar por la petición real (GET /housingGraphics/:id) cuando se reconecte la lógica
const graficosMock = [
  { id: 1, description: "Fachada principal de la vivienda", path: "https://picsum.photos/seed/vivienda12a/600/500" },
  { id: 2, description: "Interior - sala comedor", path: "https://picsum.photos/seed/vivienda12b/600/500" },
  { id: 3, description: "Techo en mal estado, zona vulnerable", path: "https://picsum.photos/seed/vivienda12c/600/500" },
];

export const EditarView = () => {
  const { planId, graficoId } = useParams();
  const navigate = useNavigate();

  const grafico = graficosMock.find((g) => g.id === Number(graficoId));

  const [description, setDescription] = useState(grafico?.description ?? "");
  const [alertConfig, setAlertConfig] = useState({
    isVisible: false,
    variant: "yesno",
    text: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  if (!grafico) {
    return (
      <Card padding="md" className="w-full text-center text-slate-500">
        Gráfico no encontrado.
      </Card>
    );
  }

  const handleGuardar = () => {
    // Mock: acá iría el PATCH real /housingGraphics/:id/description
    setAlertConfig({
      isVisible: true,
      variant: "info",
      text: "Descripción actualizada con éxito.",
      onConfirm: () => setAlertConfig((prev) => ({ ...prev, isVisible: false })),
      onConfirm: () => {
        setAlertConfig((prev) => ({ ...prev, isVisible: false }));
        navigate(`/planes-familiares/${id}/vivienda`);
      },
    });
  };

  const handleEliminar = () => {
    setAlertConfig({
      isVisible: true,
      variant: "yesno",
      text: "¿Eliminar este gráfico de vivienda? Esta acción no se puede deshacer.",
      onConfirm: () => {
        // Mock: acá iría el DELETE real /housingGraphics/:id
        navigate(`/planes-familiares/${planId}/vivienda`);
      },
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<ScanBox />}
        title="Editar Gráfico de Vivienda"
        description="La imagen no se puede reemplazar — si necesitas cambiarla, elimina este registro y crea uno nuevo."
        image="/svg/ilustracion_vivienda.svg"
        buttonSection
        buttonText="Volver"
        onButtonClick={() => navigate(`/planes-familiares/${planId}/vivienda`)}
      />

      <Card padding="none" className="w-full p-5 sm:p-7 flex flex-col gap-5">

        <div className="w-full h-72 rounded-2xl overflow-hidden">
          <img src={grafico.path} alt={description || "Gráfico de vivienda"} className="w-full h-full object-cover" />
        </div>

        <Textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-3">
          <Button variant="accent" size="lg" onClick={handleGuardar} className="flex-1">
            <Save className="size-5" /> Guardar descripción
          </Button>
          <Button variant="outline" size="lg" onClick={handleEliminar}>
            <Trash2 className="size-5" /> Eliminar
          </Button>
        </div>
      </Card>

      <Alert
        isVisible={alertConfig.isVisible}
        variant={alertConfig.variant}
        text={alertConfig.text}
        onConfirm={alertConfig.onConfirm}
        onClose={() => setAlertConfig((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default EditarView;