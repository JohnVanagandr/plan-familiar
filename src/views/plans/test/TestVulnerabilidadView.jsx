import { Card } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { usePaginacion } from "@/features/auth/hooks/usePaginacion";
import { MessageCircleQuestionMark } from "lucide-react";
import { useState } from "react";

export const TestVulnerabilidad = () => {

        //     vulnerable_question_id: p.id,
        // family_plan_id: id,
        // answer: testRespuestas.respuesta[`opcion-${p.id}`] === "true",
    const [respuesta, setRespuesta] = useState([]);


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

    const calcularPuntaje = () => {
        return Object.values(respuesta).reduce((total, valor) => {
            return valor === "1" ? total + 1 : total - 1;
        }, 0);
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

                            <div className="flex justify-center gap-2 mt-4">

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

                            </div>
                        )}
            
                    </>
            )}
      </div>
    );
}