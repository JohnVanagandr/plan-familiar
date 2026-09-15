import { Alert, Button, Card } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { usePaginacion } from "@/features/auth/hooks/usePaginacion";
import { BadgeQuestionMark, MessageCircleQuestionMark, ShieldCheck, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "@/helpers/api";

export const TestVulnerabilidad = () => {

    const {planId} = useParams();
    const navigate = useNavigate();

    const [respuesta, setRespuesta] = useState([]);
    const [testRespondido, setTestRespondido] = useState(false);
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

    useEffect(() => {

        const cargarDato = async () => {

            try {

                const data = await api.get(`vulnerableTest/${planId}`);
                console.log(data);
                
                if (Array.isArray(data) && data.length > 0) {
                    const preguntasRespondidas = data.reduce((respondido, item) => {
                        // Convierte el booleano 'answer' del backend a "1" o "0"
                        respondido[item.vulnerable_question_id] = item.answer ? "1" : "0";
                        return respondido;
                    }, {});

                    setRespuesta(preguntasRespondidas);
                    setTestRespondido(true);
                }
                
            } catch (error) {

                console.error("Error cargando los datos solicitados:", error);
                setAlertVariant("danger");
                setAlertMessage("No se pudieron cargar los datos de preguntas ya respondidas por la familia.");
                setShowToast(true);
            }
        }

        cargarDato();

    }, [planId]);
    
    return (

        <div className="w-full flex flex-col gap-6">

            <HeaderSection
                icon={<MessageCircleQuestionMark />}
                title="Test de Vulnerabilidad"
                description="Responda SÍ o NO a cada una de las preguntas. Si se registran más de 5 respuestas afirmativas, la familia será clasificada como Vulnerable. Las preguntas destacadas en amarillo son informativas y evalúan el nivel de preparación ante una emergencia (no suman al puntaje)."
                image="/svg/ilustracion_voluntario.svg"
            />

            {testRespondido ? (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center gap-3 text-(--color_azul) text-xs font-medium shadow-xs">
                    <ShieldCheck className="w-5 h-5 shrink-0 text-(--color_azul)" />
                    <span>El test de vulnerabilidad ha sido completado. Ya puedes acceder y gestionar todos los módulos del plan familiar.</span>
                </div>
            ) : (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 text-amber-800 text-xs font-medium shadow-xs">
                    <Lock className="w-5 h-5 shrink-0 text-(--color_naranja)" />
                    <span>Para habilitar el acceso a los módulos del plan familiar se debe realizar primero el test de vulnerabilidad. Tenga en cuenta que una vez evaluado no podrá ser modificado.</span>
                </div>
            )}

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

                                <Card key={pregunta.id} padding="md" className={`flex lg:flex-row justify-between gap-4 relative overflow-hidden ${pregunta.question_caution === 1 ? "!bg-amber-100" : ""}`}>

                                    <span className="z-10">
                                        {pregunta.description}
                                    </span>
                                    
                                    <div className="flex gap-6 px-4 z-10">
                                        
                                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-600">
                                            <input
                                                type="radio"
                                                name={`pregunta-${pregunta.id}`}
                                                value="1"
                                                checked={respuesta[pregunta.id] === "1"}
                                                disabled={testRespondido}
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
                                                checked={respuesta[pregunta.id] === "0"}
                                                disabled={testRespondido}
                                                className="size-4 accent-(--color_azul)"
                                                onChange={() => setRespuesta((prev) => ({
                                                    ...prev,
                                                    [pregunta.id]: "0"
                                                }))}
                                            />
                                            No
                                        </label>
                                    </div>

                                    <BadgeQuestionMark className={`absolute size-30 -top-6 -right-6 ${pregunta.question_caution === 1 ? "text-(--color_naranja)/20":"text-(--color_azul)/20"}`}/>
                                    
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

                                {!testRespondido && (

                                    <Button onClick={handleEnviarTest}>
                                        Evaluar
                                    </Button>
                                )}

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