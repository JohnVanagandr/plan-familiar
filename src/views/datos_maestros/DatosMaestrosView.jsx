import { Info } from "lucide-react";

export const DatosMaestrosView = () => {

    return (
      <div className="relative h-full min-h-fit max-h-200 w-full rounded-2xl flex justify-between items-center flex-col px-10 pt-30 lg:px-5">
        <div className="w-full flex gap-2 relative">
          <Info className="size-40 text-white/25 mt-10 absolute left-40 -top-5"/>
          <div className="w-full text-4xl flex gap-2 text-white text-start flex-col z-10">


            <div className="flex gap-2 items-end">
                <h1 className="font-bold">
                    Datos Maestros
                </h1>

                < div className="size-6 rounded-full bg-(--color_naranja)" />
                < div className="size-6 rounded-full bg-(--color_azul)" />
                < div className="size-6 rounded-full bg-(--color_naranja)" />

            </div>

            <p className="text-(--color_azul) text-xl">
                Gestiona los datos maestros del sistema, incluyendo departamentos, ciudades, preguntas de vulnerabilidad, seccionales, entre otros.
            </p>

          </div>
        </div>

        <div className="size-20 rounded-full bg-(image:--white-gra) absolute bottom-5 left-20 z-10 animate-float" />
        <div className="size-10 rounded-full bg-(image:--white-gra) absolute bottom-20 left-10 z-10 animate-float" />
        <div className="size-20 rounded-full bg-(image:--white-gra) absolute top-10 right-10 z-10 animate-float" />
        <div className="size-10 rounded-full bg-(image:--white-gra) absolute top-5 left-1/2 z-10 animate-float" />

        <img
          src="/svg/ilustracion_voluntarios_b.svg"
          alt=""
          className="w-100"
        />
      </div>
    );
};