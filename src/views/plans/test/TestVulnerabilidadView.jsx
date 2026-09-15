import { Alert, Button, Card } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { usePaginacion } from "@/features/auth/hooks/usePaginacion";
import { MessageCircleQuestionMark } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const TestVulnerabilidad = () => {

    const {planId} = useParams();
    const navigate = useNavigate

    const [respuesta, setRespuesta] = useState([]);
    const [alertVariant, setAlertVariant] = useState([]);
    const [alertMessage, setAlertMessage] = useState([]);
    const [showToast, setShowToast] = useState(false);





    const {
    items: preguntas,
    loading,
    error,
    paginaActual,
    rangoPaginas,
    navegarPagina,
    hayMultiplesPaginas,
    } = usePaginacion("vulnerableQuestions/paginate", false);

    console.log(preguntas);

    const handleEnviarTest = async () => {

        // Trae TODAS las preguntas activas, no solo las de la página actual
        const todasLasPreguntas = await api.get("vulnerableQuestions");
        const preguntasActivas = todasLasPreguntas.filter((p) => p.is_active);

        // Verifica que ninguna quede sin responder
        const faltantes = preguntasActivas.filter((p) => respuesta[p.id] === undefined);

        if (faltantes.length > 0) {
            setAlertVariant("danger");
            setAlertMessage(`Faltan por responder ${faltantes.length} de ${preguntasActivas.length} preguntas.`);
            setShowToast(true);
            return;
        }

        const puntos = preguntasActivas.reduce((total, p) => {
            if (p.question_caution === 0 && respuesta[p.id] === "1") {
                return total + 1;
            }
            return total;
        }, 0);
        
        const esVulnerable = puntos > 5;

        console.log(`Puntaje: ${puntos} — Familia ${esVulnerable ? "VULNERABLE" : "NO VULNERABLE"}`);

        try {
            // Enviar cada respuesta
            for (const p of preguntasActivas) {
                await api.post("vulnerableTest", {
                    vulnerable_question_id: p.id,
                    family_plan_id: planId,
                    answer: respuesta[p.id] === "1",
                });
            }

            // Actualizar estado y tipo de familia según el resultado
            await api.patch(`familyPlans/${planId}/change-status`, {
                status_plan_id: 3,
            });

            await api.patch(`familyPlans/${planId}/change-family-type`, {
                family_type_id: esVulnerable ? 1 : 2,
            });

            setAlertVariant("success");
            setAlertMessage(`La familia fue catalogada como ${esVulnerable ? "VULNERABLE" : "NO VULNERABLE"}.`);
            setShowToast(true);

            navigate(`/planes-familiares/${planId}`);

        } catch (error) {
            console.error("Error enviando el test:", error);
            setAlertVariant("danger");
            setAlertMessage("No se pudo procesar el test de vulnerabilidad.");
            setShowToast(true);
        }
    };
    
    return (

        <div className="w-full flex flex-col gap-6">

            <HeaderSection
                icon={<MessageCircleQuestionMark />}
                title="Test de Vulnerabilidad"
                description="Responda las siguientes preguntas según su apreciación haciendo click en SI o NO."
            />

            {loading ? (
                <Card padding="md" className="w-full text-center text-slate-500">
                    Cargando preguntas...
                </Card>
                ) : error ? (
                <Card padding="md" className="w-full text-center text-red-500">
                    {error}
                </Card>
                ) : (
                    <>
                        <div className="w-full flex flex-col gap-6">

                            {preguntas.map((pregunta) => (

                                <Card key={pregunta.id} padding="md" className="flex gap-4 relative">

                                    <span>
                                        {pregunta.description}
                                    </span>
                                    
                                    <div className="flex gap-6">
                                        
                                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600">
                                            <input
                                                type="radio"
                                                name={`pregunta-${pregunta.id}`}
                                                value="1"
                                                className="size-4 accent-(--color_azul)"
                                                onChange={() => setRespuesta((prev) => ({
                                                    ...prev,
                                                    [pregunta.id]: "1"
                                                }))}
                                            />
                                            Sí
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600">
                                            <input
                                                type="radio"
                                                name={`pregunta-${pregunta.id}`}
                                                value="0"
                                                className="size-4 accent-(--color_azul)"
                                                onChange={() => setRespuesta((prev) => ({
                                                    ...prev,
                                                    [pregunta.id]: "0"
                                                }))}
                                            />
                                            No
                                        </label>
                                    </div>
                                    
                                </Card>
                            ))}
                            
                        </div>
            
                        {hayMultiplesPaginas && (

                            <div className="flex justify-center gap-2 w-full">

                                {rangoPaginas.map((n) => (
                                    <button
                                    key={n}
                                    onClick={() => navegarPagina(n)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        n === paginaActual
                                        ? "bg-(--color_azul) text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                    >
                                        {n}
                                        
                                    </button>
                                ))}

                                <Button onClick={handleEnviarTest}>

                                    Evaluar
                                </Button>

                            </div>
                        )}
            
                    </>
            )}

            <Alert
                variant={alertVariant}
                text={alertMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
      </div>
    );
}