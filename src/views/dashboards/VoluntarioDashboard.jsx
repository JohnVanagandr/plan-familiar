import { Card, Button} from "@/components/ui";
import {
  HouseHeart,
  UsersRound,
  Bell,
  UserRound,
  HomeIcon,
  Group,
  Heart,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const VoluntarioDashboard = () => {

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col justify-center gap-4 p-4 bg-(image:--white-gra-l) rounded-4xl sm:p-6 lg:p-10 relative">

      <Home className="size-50 absolute right-10 top-2 rotate-6 text-white/30"/>

      <section className="flex flex-col gap-1 items-start relative">

        <UserRound className=" hidden absolute size-25 text-(--color_azul)/20 left-0 -top-2 sm:block "/>

        <span className="text-sm text-(--color_naranja) sm:text-base z-10">
          PANEL DE VOLUNTARIO
        </span>

        <h1 className="text-2xl font-bold text-(--color_azul) sm:text-3xl lg:text-4xl z-10">
          Nombre del voluntario
        </h1>

        <span className="text-sm text-(--color_azul) sm:text-base z-10">
          <i class="ri-map-pin-2-fill"></i> Seccional · Voluntario activo
        </span>

        <div className="w-full max-w-xl h-1 bg-white rounded-full z-10"></div>
      </section>

      <section className="flex flex-col gap-4 lg:flex-row lg:h-150">

        <div className="w-full flex flex-col justify-between gap-4 lg:gap-0">
          <img
            src="../../public/svg/ilustracion_ave_b.svg"
            alt=""
            className="absolute w-16 top-5 right-5 sm:w-25 animate-float"
          />

          <div className="relative w-full h-fit min-h-100 min-w-0 bg-(image:--blue-gra-r) px-5 py-5 rounded-4xl flex flex-col gap-6 justify-between sm:px-7 lg:h-135 lg:min-w-87.5">

            <div className="flex flex-col items-center gap-5 justify-between">
              <div className="flex flex-col items-center gap-4">
                <span className="text-base text-white font-bold text-center sm:text-xl">
                  Total Planes Familiares Realizados
                </span>

                <div className="flex flex-col gap-5 items-center justify-between sm:gap-7">
                  <h1 className="text-3xl text-white font-bold flex items-center gap-2 sm:text-5xl">
                    <UsersRound className="size-7 sm:size-10" /> 12
                  </h1>
                  <div className="flex flex-wrap gap-2 justify-center sm:gap-4">
                    <p className="py-1.5 px-4 rounded-full bg-red-700 flex gap-2 text-nowrap text-white text-sm sm:px-5 sm:text-base">
                      <HouseHeart className="size-5 shrink-0" /> 7 Vulnerables
                    </p>
                    <p className="py-1.5 px-4 rounded-full bg-green-700 flex gap-2 text-nowrap text-white text-sm sm:px-5 sm:text-base">
                      <HouseHeart className="size-5 shrink-0" /> 5 No
                      vulnerables
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center relative">
              <div className="hidden size-15 rounded-full bg-(image:--white-gra) absolute top-1 left-0 animate-float sm:block" />
              <div className="hidden size-10 rounded-full bg-(image:--white-gra) absolute top-40 -left-10 animate-float sm:block" />
              <div className="hidden size-5 rounded-full bg-(image:--white-gra) absolute top-30 left-5 animate-float sm:block" />

              <img
                src="../../public/svg/ilustracion_familia_c.svg"
                alt=""
                className="w-56 translate-y-5 sm:w-72 lg:w-90 z-20"
              />
            </div>
          </div>

          <div className="w-full flex gap-3 justify-center relative sm:gap-4 xl:justify-start">
            <Button onClick={() => navigate("/dashboard/plans")}>
              Planes Familiares
            </Button>

            <Button variant="secondary" >Crear nuevo plan</Button>

            {/* Circulos decorativos: menos cantidad y más chicos en mobile, todos visibles desde lg */}
            <div className="hidden size-10 bg-(--color_naranja) rounded-full xl:flex justify-center items-center"> <HomeIcon className="text-white"/> </div>
            <div className="hidden size-10 bg-(--color_azul) rounded-full xl:flex justify-center items-center" > <Heart className="text-white"/> </div>
            <div className="hidden size-10 bg-(--color_naranja) rounded-full xl:flex justify-center items-center" > <UsersRound className="text-white"/> </div>
            <div className="hidden size-10 bg-(--color_azul) rounded-full 2xl:flex justify-center items-center" > <Group className="text-white"/> </div>
          </div>
        </div>

        {/* Notificaciones: se oculta en mobile/tablet, aparece desde lg como panel lateral */}
        <div className="hidden h-full w-full max-w-80 bg-white px-7 py-5 rounded-4xl flex-col gap-6 justify-between lg:flex">
          <div className="w-full">
            <h1 className="text-(--color_azul) text-xl w-full flex justify-between items-center gap-1 text-nowrap">
              <Bell /> Notificaciones recientes
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 px-4 h-full">
            <span> No hay notificaciones recientes </span>

            <Button> Ver más </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
