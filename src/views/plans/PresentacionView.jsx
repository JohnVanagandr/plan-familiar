import { Button } from "@/components/ui";
import { Bubbles, File } from "lucide-react";

export const PresentacionView = () => {

    return (
      <div className="relative h-full min-h-fit max-h-200 w-full rounded-2xl flex justify-between items-center">
        <div className="w-full flex gap-2">
          <Bubbles className="size-20 text-(--color_azul) mt-10"/>
          <div className="w-full text-4xl flex gap-2 text-white text-start flex-col">

            <span className="w-fit py-0.5 px-4 bg-(--color_azul) rounded-r-full text-lg">
              {/* {familia.statusPlan.name} */}
              En desarrollo
            </span>

            <h1>
                Familia <br />
                {/* {familia.last_names} */}
                Garcia Ramirez
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
          className="w-120 animate-float"
        />
      </div>
    );
};