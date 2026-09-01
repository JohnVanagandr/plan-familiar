import { Card, Button } from "@/components/ui";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Copy,
  Building2,
  UsersRound,
  ClipboardList,
  BarChart3,
  MapPin,
  Calendar,
  User,
  UserRound,
  ChartPie,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock: reemplazar por datos reales cuando se reconecte la lógica

const estadoPlanes = {
  aprobados: 0,
  rechazados: 0,
  pendientes: 0,
  recibidos: 0,
};

const totalRevisados = 0;
const voluntariosActivos = 1;
const promedioPlanesPorVoluntario = "8%";

const planesRecientes = [
  {
    id: 1,
    familia: "HERNANDEZ",
    departamento: "Antioquia",
    fechaRecibido: "18/08/2026",
    voluntario: "Iván Ramiro",
    estado: "En Proceso",
  },
  {
    id: 2,
    familia: "MANIZALES",
    departamento: "Antioquia",
    fechaRecibido: "18/08/2026",
    voluntario: "Iván Ramiro",
    estado: "En Proceso",
  },
  {
    id: 3,
    familia: "GUARÍN",
    departamento: "Antioquia",
    fechaRecibido: "18/08/2026",
    voluntario: "Iván Ramiro",
    estado: "En Proceso",
  },
  {
    id: 4,
    familia: "GARCIA RAMIREZ",
    departamento: "Quindío",
    fechaRecibido: "18/08/2026",
    voluntario: "Iván Ramiro",
    estado: "En Proceso",
  },
];

export const SupervisorDashboard = () => {
  const navigate = useNavigate();

  return (
    
    <div className="flex flex-col gap-4">
      {/* Panel izquierdo: perfil + estado de planes */}
      <div className="w-full flex flex-col gap-4 ">

        <section className="relative w-full px-5 py-5 rounded-4xl flex items-center gap-4 sm:px-7">
          
          <div className="size-16 min-w-16 rounded-full border-4 border-(--color_naranja) bg-white flex items-center justify-center sm:size-20 sm:min-w-20">
            <UserRound className="size-8 text-(--color_azul) sm:size-10" />
          </div>

          <div className="flex flex-col items-start gap-1 relative">

            <UserRound className="size-40 absolute text-(--color_azul)/25 -top-5 left-30 md:-left-10"/>

            <span className="text-lg text-(--color_azul) z-10">
              PANEL SUPERVISOR
            </span>
            <h1 className="text-2xl font-bold text-white leading-tight sm:text-4xl sm:pr-20 z-10">
              Nombre Supervisor
            </h1>
            <span className="text-sm text-white/90 flex items-center gap-1 z-10">
              <MapPin className="size-3.5 shrink-0" /> seccional · Supervisor
              activo
            </span>
            <div className="w-full max-w-100 h-1 bg-(--color_naranja) rounded-full mt-1 z-10" />

          </div>

          <img
            src="/svg/ilustracion_voluntarios.svg"
            alt=""
            className="hidden h-40 md:block absolute right-4 -bottom-4"
          />

        </section>

        <section className="relative w-full bg-white/60 rounded-4xl p-5 flex flex-col gap-5 sm:p-7 overflow-hidden">

          <ChartPie className="absolute size-90 -bottom-15 -left-10 text-(--color_azul)/20 animate-float"/>

          <div className="flex gap-2 items-center">
            <ChartPie className="text-(--color_azul)"/>
            <h2 className="text-(--color_azul) text-2xl z-10">
              Estado planes familiares
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 z-10">
            <div className="bg-green-500 rounded-2xl p-4 flex flex-col gap-2 text-white">
              <span className="text-xs font-bold uppercase tracking-wide sm:text-sm">
                Planes aprobados
              </span>
              <span className="text-3xl font-bold flex items-center gap-2 sm:text-4xl">
                <CheckCircle2 className="size-7 sm:size-8" />{" "}
                {estadoPlanes.aprobados}
              </span>
            </div>

            <div className="bg-red-700 rounded-2xl p-4 flex flex-col gap-2 text-white">
              <span className="text-xs font-bold uppercase tracking-wide sm:text-sm">
                Planes rechazados
              </span>
              <span className="text-3xl font-bold flex items-center gap-2 sm:text-4xl">
                <XCircle className="size-7 sm:size-8" />{" "}
                {estadoPlanes.rechazados}
              </span>
            </div>

            <div className="bg-amber-400 rounded-2xl p-4 flex flex-col gap-2 text-white">
              <span className="text-xs font-bold uppercase tracking-wide sm:text-sm">
                Planes pendientes
              </span>
              <span className="text-3xl font-bold flex items-center gap-2 sm:text-4xl">
                <Clock className="size-7 sm:size-8" /> {estadoPlanes.pendientes}
              </span>
            </div>

            <div className="bg-(--color_azul) rounded-2xl p-4 flex flex-col gap-2 text-white">
              <span className="text-xs font-bold uppercase tracking-wide sm:text-sm">
                Planes recibidos
              </span>
              <span className="text-3xl font-bold flex items-center gap-2 sm:text-4xl">
                <Copy className="size-7 sm:size-8" /> {estadoPlanes.recibidos}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 pt-2 z-10">
            <span className="text-(--color_azul) font-bold flex items-center gap-2">
              <Building2 className="size-5 text-(--color_naranja)" /> Total
              planes revisados
            </span>
            <span className="text-4xl font-bold text-(--color_azul) sm:text-5xl">
              {totalRevisados}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 justify-center sm:gap-4 z-10">
            <div className="bg-white rounded-2xl px-4 py-3 flex flex-col items-center gap-1 shadow-sm">
              <span className="text-(--color_azul) text-xs font-medium flex items-center gap-1 sm:text-sm">
                <UsersRound className="size-4" /> Voluntarios activos
              </span>
              <span className="text-2xl font-bold text-(--color_azul)">
                {voluntariosActivos}
              </span>
            </div>

            <div className="bg-white rounded-2xl px-4 py-3 flex flex-col items-center gap-1 shadow-sm">
              <span className="text-(--color_azul) text-xs font-medium flex items-center gap-1 sm:text-sm">
                <ClipboardList className="size-4" /> Promedio planes por
                Voluntario
              </span>
              <span className="text-2xl font-bold text-(--color_azul)">
                {promedioPlanesPorVoluntario}
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center pt-2 z-10">
            <Button
              icon={<BarChart3 className="size-5" />}
              onClick={() => navigate("/estadisticas")}
            >
              Ver estadísticas
            </Button>
          </div>
        </section>

        {/* Panel derecho: listado de planes familiares recientes */}
        <section className="w-full bg-(image:--blue-gra-r) rounded-4xl p-5 flex flex-col gap-4 sm:p-7">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-white text-2xl font-bold">
              Planes Familiares
            </h2>
            <UsersRound className="text-white size-6" />
          </div>
          <div className="w-full h-0.5 bg-(--color_azul) rounded-full -mt-2" />

          <div className="flex flex-col gap-3 overflow lg:flex-1">
            {planesRecientes.map((plan) => (
              <Card
                key={plan.id}
                variant="default"
                padding="sm"
                className="flex-row! items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-10 min-w-10 rounded-full bg-(--color_azul) flex items-center justify-center">
                    <Building2 className="size-5 text-white" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-bold text-(--color_azul) truncate">
                      Familia {plan.familia}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="size-3 shrink-0" /> {plan.departamento}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="size-3 shrink-0" /> Recibido:{" "}
                      {plan.fechaRecibido}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <User className="size-3 shrink-0" /> Voluntario:{" "}
                      {plan.voluntario}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-xs text-gray-400 hidden sm:block">
                    {plan.fechaRecibido}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-nowrap">
                    {plan.estado}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          <div className="w-full flex justify-center pt-2">
            <Button
              icon={<UsersRound className="size-5" />}
              onClick={() => navigate("/dashboard/plans")}
            >
              Ver todos los planes
            </Button>
          </div>
        </section>

      </div>

    </div>
  );
};

export default SupervisorDashboard;
