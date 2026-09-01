import { Card, Button } from "@/components/ui";
import {
  UserRound,
  UsersRound,
  MapPin,
  ChartPie,
  ChevronDown,
  UserRoundX,
  UserRoundCheck,
  File,
  Bubbles,
  Building,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock: reemplazar por datos reales cuando se reconecte la lógica
const estadoUsuarios = {
  total: 4,
  activos: 3,
  inactivos: 1,
  porRol: {
    voluntarios: { activos: 2, inactivos: 0 },
    supervisores: { activos: 1, inactivos: 0 },
    administradores: { activos: 0, inactivos: 1 },
  },
};

const roles = [
  { key: "voluntarios", label: "Voluntarios", color: "bg-(--color_azul)" },
  { key: "supervisores", label: "Supervisores", color: "bg-green-500" },
  { key: "administradores", label: "Administradores", color: "bg-(--color_naranja)" },
];


export const AdminDashboard = () => {
  const navigate = useNavigate();
    
  const [rolAbierto, setRolAbierto] = useState(null);
  const toggleRol = (key) => setRolAbierto((prev) => (prev === key ? null : key));

  const porcentajeActivos =
    estadoUsuarios.total > 0
      ? (estadoUsuarios.activos / estadoUsuarios.total) * 100
      : 0;

  // Círculo SVG: circunferencia = 2πr, r=80 -> ~502.65
  const circunferencia = 2 * Math.PI * 80;
  const offsetActivos =
    circunferencia - (porcentajeActivos / 100) * circunferencia;

  return (
    <div className="flex flex-col gap-4 lg:flex-row">

      {/* Panel izquierdo: perfil + estado de usuarios + accesos rápidos */}
      <div className="w-full flex flex-col gap-4">

        <section className="flex relative w-full px-5 py-5 rounded-4xl items-center gap-4 sm:px-7">

          <div className="size-16 min-w-16 rounded-full border-4 border-(--color_naranja) bg-white flex items-center justify-center sm:size-20 sm:min-w-20">
            <UserRound className="size-8 text-(--color_azul) sm:size-10" />
          </div>

          <div className="flex flex-col items-start gap-1 relative">
            <UserRound className="size-40 absolute text-(--color_azul)/25 -top-5 left-30 md:-left-10" />

            <span className="text-lg text-(--color_azul) z-10">
              PANEL ADMINISTRADOR
            </span>
            <h1 className="text-2xl font-bold text-white leading-tight sm:text-4xl sm:pr-20 z-10">
              Nombre Administrador
            </h1>
            <span className="text-sm text-white/90 flex items-center gap-1 z-10">
              <MapPin className="size-3.5 shrink-0" /> Nacional · Administrador
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

        <section className="relative w-full pb-12 bg-white/60 rounded-4xl p-5 flex flex-col gap-5 sm:p-7 sm:pb-14 sm:flex-row overflow-hidden items-end">

          <UsersRound className="absolute size-90 -bottom-15 -left-10 text-(--color_azul)/20 animate-float" />

          {/* Usuarios */}
          <div className="z-20 w-full max-w-150 flex flex-col gap-4">


            <div className="flex gap-2 items-center">
              <ChartPie className="text-(--color_azul)" />
              <h2 className="text-(--color_azul) text-2xl z-10">
                Estado de usuarios
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-(--color_naranja) rounded-2xl p-4 flex flex-col gap-2 text-white">
                <span className="text-xs font-bold uppercase tracking-wide sm:text-sm">
                  Total usuarios
                </span>
                <span className="text-3xl font-bold flex items-center gap-2 sm:text-4xl">
                  <UsersRound className="size-7 sm:size-8" />{" "}
                  {estadoUsuarios.total}
                </span>
              </div>

              <div className="bg-green-500 rounded-2xl p-4 flex flex-col gap-2 text-white">
                <span className="text-xs font-bold uppercase tracking-wide sm:text-sm">
                  Activos
                </span>
                <span className="text-3xl font-bold flex items-center gap-2 sm:text-4xl">
                  <UserRoundCheck className="size-7 sm:size-8" />{" "}
                  {estadoUsuarios.activos}
                </span>
              </div>

              <div className="bg-red-500 rounded-2xl p-4 flex flex-col gap-2 text-white">
                <span className="text-xs font-bold uppercase tracking-wide sm:text-sm">
                  Inactivos
                </span>
                <span className="text-3xl font-bold flex items-center gap-2 sm:text-4xl">
                  <UserRoundX className="size-7 sm:size-8" />{" "}
                  {estadoUsuarios.inactivos}
                </span>
              </div>

              <div className="bg-(--color_azul) rounded-2xl p-4 flex flex-col gap-2 text-white">
                <span className="text-xs font-bold uppercase tracking-wide sm:text-sm">
                  Voluntarios
                </span>
                <span className="text-3xl font-bold flex items-center gap-2 sm:text-4xl">
                  <UsersRound className="size-7 sm:size-8" />{" "}
                  {estadoUsuarios.porRol.voluntarios.activos + estadoUsuarios.porRol.voluntarios.inactivos}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 pt-2">
              <span className="text-(--color_azul) font-bold text-sm px-1">
                Gestión rápida
              </span>

              <Button>Peticiones de Activación</Button>
              <Button>Gestión de Usuarios</Button>
            </div>  

          </div>

          {/* estadistica dona */}
          <div className="flex-1 w-full flex flex-col items-center justify-center gap-4 z-10">
            <div className="relative size-56 sm:size-64">
              <svg viewBox="0 0 200 200" className="size-full -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.25"
                  strokeWidth="24"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#FF6600"
                  strokeWidth="24"
                  strokeDasharray={circunferencia}
                  strokeDashoffset={offsetActivos}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-(--color_azul)">
                  {estadoUsuarios.total}
                </span>
                <span className="text-sm text-(--color_azul)/80">Total</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full max-w-56">
                
              {roles.map((rol) => {
                const datos = estadoUsuarios.porRol[rol.key];
                const totalRol = datos.activos + datos.inactivos;
                const abierto = rolAbierto === rol.key;

                return (
                  <div key={rol.key} className="bg-white/90 rounded-xl overflow-hidden">

                    <button
                      type="button"
                      onClick={() => toggleRol(rol.key)}
                      className="w-full flex items-center justify-between px-4 py-2"
                    >
                      <span className="flex items-center gap-2 text-sm font-medium text-(--color_azul)">
                        <span className={`size-3 rounded-full ${rol.color}`}></span>{" "}
                        {rol.label}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="font-bold text-(--color_azul)">{totalRol}</span>
                        <ChevronDown className={`size-4 text-(--color_azul) transition-transform ${abierto ? "rotate-180" : ""}`} />
                      </span>
                    </button>

                    {abierto && (
                      <div className="absolute p-3 flex gap-2 bg-white rounded-xl shadow-black/20 shadow-md -mt-10">
                        <div className="flex-1 bg-green-50 rounded-lg px-3 py-2 flex flex-col items-center">
                          <span className="text-xs text-green-700 font-medium">Activos</span>
                          <span className="font-bold text-green-700">{datos.activos}</span>
                        </div>
                        <div className="flex-1 bg-red-50 rounded-lg px-3 py-2 flex flex-col items-center">
                          <span className="text-xs text-red-700 font-medium">Inactivos</span>
                          <span className="font-bold text-red-700">{datos.inactivos}</span>
                        </div>
                      </div>
                    )}
                  </div>

                ); 
              })}

            </div>

          </div>

        </section>

        <section className="w-full h-fit bg-white rounded-3xl p-5 flex flex-col gap-4 items-start">
            

          <p className="block w-full first-line:text-2xl first-line:font-bold first-line:text-(--color_azul)">

            Los datos maestros <br />
            Son la información base del sistema — catálogos como tipos de documento, 
            ciudades, departamentos y preguntas de vulnerabilidad. 
            Los usan los distintos módulos de la plataforma para mantener 
            la información consistente y evitar duplicados o inconsistencias.
          </p>

          <div className="flex gap-4 items-center">

            <Button className="h-fit w-fit">
              Ir a datos maestros
            </Button>

            <div className="size-8 bg-(--color_azul) rounded-full flex justify-center items-center"><File className="text-white size-5"/></div>
            <div className="size-8 bg-(--color_naranja) rounded-full flex justify-center items-center"><Bubbles className="text-white size-5"/></div>
            <div className="size-8 bg-(--color_azul) rounded-full flex justify-center items-center"><Building className="text-white size-5"/></div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default AdminDashboard;
