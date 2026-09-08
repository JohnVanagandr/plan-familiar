import { Button } from "@/components/ui";
import { Bubbles, File } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "@/helpers/api";

export const PresentacionView = () => {
  const { planId } = useParams();
  
  const [familiaData, setFamiliaData] = useState(null);

  useEffect(()=>{

    const cargarPlan = async () => {
      try {

        const familiaPlan = await api.get(`familyPlans/${planId}`);
        setFamiliaData(familiaPlan);
        
      } catch (error) {
        console.error("Error al cargar la familia:", error);
        
      }
    }

    cargarPlan();
  },[planId])


    return (
      <div className="relative h-full min-h-fit max-h-200 w-full rounded-2xl flex justify-between items-center flex-col px-10 pt-30 xl:flex-row lg:px-5">
        <div className="w-full flex gap-2 relative">
          <Bubbles className="size-40 text-white/25 mt-10 absolute left-40 -top-5"/>
          <div className="w-full text-4xl flex gap-2 text-white text-start flex-col z-10">

            <span className="w-45 min-h-4 text-end py-0.5 px-4 bg-(--color_azul) rounded-r-full text-lg -translate-x-15 lg:rounded-full lg:w-fit lg:translate-x-0 lg:text-center">
              {/* {familia.statusPlan.name} */}
              {familiaData?.status}
            </span>

            <h1 className="font-bold">
                Familia <br />
                {/* {familia.last_names} */}
                {familiaData?.last_names}
            </h1>

            <p className="text-(--color_azul) text-xl">
              Llene los datos con la información inicial de la familia.
            </p>
            <div className="w-30">

                <Button
                  variant="primary"
                >
                    Ver pdf
                </Button>
            </div>
          </div>
        </div>

        <div className="size-20 rounded-full bg-(image:--white-gra) absolute bottom-5 left-20 z-10 animate-float" />
        <div className="size-10 rounded-full bg-(image:--white-gra) absolute bottom-20 left-10 z-10 animate-float" />
        <div className="size-20 rounded-full bg-(image:--white-gra) absolute top-10 right-10 z-10 animate-float" />
        <div className="size-10 rounded-full bg-(image:--white-gra) absolute top-5 left-1/2 z-10 animate-float" />

        <img
          src="/svg/ilustracion_familia_a.svg"
          alt=""
          className="w-150 animate-float"
        />
      </div>
    );
};