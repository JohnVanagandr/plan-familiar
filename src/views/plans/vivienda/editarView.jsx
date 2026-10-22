import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Textarea, Alert } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { ScanBox, Trash2, Save } from "lucide-react";
import * as api from "@/helpers/api";

export const EditarView = () => {
  const { planId, graficoId } = useParams();
  const navigate = useNavigate();

  const [grafico, setGrafico] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // const [description, setDescription] = useState(grafico?.description ?? "");
  const [alertConfig, setAlertConfig] = useState({
    isVisible: false,
    variant: "yesno",
    text: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  useEffect(() => {
    const cargarGrafico = async () => {
      try {
        const data = await api.get(`housingGraphics/${graficoId}`);
        setGrafico(data);
        setDescription(data?.description ?? "");
      } catch (error) {
        // Un 404 significa que el gráfico no existe: se muestra "Gráfico no encontrado."
        if (error?.code !== 404) {
          console.error("Error al cargar el gráfico de vivienda:", error.details ?? error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (graficoId) {
      cargarGrafico();
    } else {
      setLoading(false);
    }
  }, [graficoId]);


  const mostrarAlerta = (variant, text, extra = {}) =>
    setAlertConfig({
      isVisible: true,
      variant,
      text,
      onConfirm: () => {},
      onCancel: () => {},
      ...extra,
    });
  
  // AGREGAR 7: mientras carga, antes del "if (!grafico)" (si no, parpadearía "no encontrado"):
  if (loading) {
    return <p className="text-(--color_azul)">Cargando gráfico de vivienda...</p>;
  }

  if (!grafico) {
    return (
      <Card padding="md" className="w-full text-center text-slate-500">
        Gráfico no encontrado.
      </Card>
    );
  }

  // const handleGuardar = () => {
  //   // Mock: acá iría el PATCH real /housingGraphics/:id/description
  //   setAlertConfig({
  //     isVisible: true,
  //     variant: "info",
  //     text: "Descripción actualizada con éxito.",
  //     onConfirm: () => setAlertConfig((prev) => ({ ...prev, isVisible: false })),
  //     onConfirm: () => {
  //       setAlertConfig((prev) => ({ ...prev, isVisible: false }));
  //       navigate(`/planes-familiares/${id}/vivienda`);
  //     },
  //   });
  // };

  const handleGuardar = async () => {
    if (!description.trim()) {
      mostrarAlerta("error", "Debes escribir una descripción.");
      return;
    }
  
    try {
      await api.patch(`housingGraphics/${graficoId}/description`, {
        description: description.trim(),
      });
  
      mostrarAlerta("success", "Descripción actualizada con éxito.");
      
      setTimeout(() => navigate(`/planes-familiares/${planId}/vivienda`), 1500);
    } catch (error) {
      console.error("Error al actualizar la descripción:", error.details ?? error);
      mostrarAlerta("error", "No se pudo actualizar la descripción.");
    }
  };

  // const handleEliminar = () => {
  //   setAlertConfig({
  //     isVisible: true,
  //     variant: "yesno",
  //     text: "¿Eliminar este gráfico de vivienda? Esta acción no se puede deshacer.",
  //     onConfirm: () => {
  //       // Mock: acá iría el DELETE real /housingGraphics/:id
  //       navigate(`/planes-familiares/${planId}/vivienda`);
  //     },
  //   });
  // };

  const handleEliminar = () => {
    mostrarAlerta("yesno", "¿Eliminar este gráfico de vivienda? Esta acción no se puede deshacer.", {
      onConfirm: async () => {
        try {
          await api.del(`housingGraphics/${graficoId}`);
          mostrarAlerta("success", "Gráfico eliminado con éxito.");
          setTimeout(() => navigate(`/planes-familiares/${planId}/vivienda`), 1500);
        } catch (error) {
          console.error("Error al eliminar el gráfico de vivienda:", error.details ?? error);
          mostrarAlerta("error", "No se pudo eliminar el gráfico de vivienda.");
        }
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