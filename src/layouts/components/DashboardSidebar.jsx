import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, PhoneCall, ArrowLeft, 
  FileText, Home, MapPin, Compass, AlertTriangle, 
  ListOrdered, X, ChevronLeft, ChevronRight, 
  PawPrint,
  Hospital,
  ScanBox
} from 'lucide-react';
import { Badge, Button } from '@/components/ui';

export const DashboardSidebar = ({ 
  isMobileOpen, 
  setIsMobileOpen, 
  isDesktopCollapsed, 
  setIsDesktopCollapsed 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Detección segura del workspace del plan mediante segmentos de URL
  const pathSegments = location.pathname.split('/');
  // const isPlansRoute = pathSegments[1] === 'dashboard' && pathSegments[2] === 'plans';
  // const currentPlanId = isPlansRoute && pathSegments[3] && pathSegments[3] !== 'new' ? pathSegments[3] : null;
  // const isInPlanWorkspace = Boolean(currentPlanId);

  // Buscamos el índice exacto donde aparece 'planes-familiares' dentro de la URL
  const plansIndex = pathSegments.findIndex(segment => segment === 'planes-familiares');
  
  // Verificamos si existe 'planes-familiares' en la URL
  const isPlansRoute = plansIndex !== -1;
  
  // El ID del plan siempre será la palabra que está justo DESPUÉS de 'planes-familiares'
  const possiblePlanId = isPlansRoute ? pathSegments[plansIndex + 1] : null;
  
  // Validamos que el ID exista y no sea una subruta fija de creación como "new"
  const currentPlanId = possiblePlanId && possiblePlanId !== 'new' ? possiblePlanId : null;
  
  // Si encontramos un ID válido, se activan los 10 módulos del plan
  const isInPlanWorkspace = Boolean(currentPlanId);

  // Reconstruimos la ruta base dinámica del plan (ej: "/planes-familiares/1" o "/dashboard/planes-familiares/1")
  const planBasePath = isPlansRoute 
    ? `/${pathSegments.slice(0, plansIndex + 2).join('/')}` 
    : '/planes-familiares';

  // Clases dinámicas con indicador visual de acento institucional (#FF6600)
  const navLinkClasses = ({ isActive }) => `
    flex items-center rounded-full font-medium text-xs sm:text-sm transition-all duration-300 ease-out relative group overflow-hidden
    ${isActive 
      ? "bg-(--color_azul) font-semibold text-white" 
      : "text-slate-500 hover:bg-(--color_azul)/10"
    }
    ${isDesktopCollapsed ? "lg:justify-center lg:w-12 lg:h-12 lg:mx-auto lg:p-0 lg:border-l-0" : "px-4 py-2.5 gap-3 w-full"}
    px-4 py-2.5 gap-3 w-full
  `;

  // Los 9 módulos de administración secundaria del plan
  const planWorkspaceModules = [
    { label: "Prensentación", path: "", icon: Home },
    { label: "Datos Básicos", path: "datos-basicos", icon: FileText },
    { label: "Integrantes", path: "integrantes", icon: Users },
    { label: "Mascotas y Animales", path: "mascotas", icon: PawPrint },
    { label: "Gráfico de Vivienda", path: "vivienda", icon: ScanBox },
    { label: "Georreferenciación", path: "georeferenciacion", icon: MapPin },
    { label: "Gráfico de Entorno", path: "entorno", icon: Compass },
    { label: "Factores de Riesgo", path: "riesgos", icon: AlertTriangle },
    { label: "Recursos Disponibles", path: "recursos", icon: Hospital },
    { label: "Plan de Acción", path: "plan-accion", icon: ListOrdered },
  ];

  return (
    <aside
      className={`p-5 fixed lg:static inset-y-0 left-0 z-40 flex flex-col transform transition-all duration-300 ease-in-out shrink-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isDesktopCollapsed ? "lg:w-35" : "lg:w-72"} w-72
      `}
    >

      <div className="bg-white h-full min-h-100 max-h-250 rounded-3xl p-5 flex flex-col gap-3 overflow-hidden">

        {/* Luz ambiental sutil */}
        {/* <div className="absolute top-0 right-0 w-32 h-32 bg-(--color_naranja) rounded-full blur-3xl opacity-10 pointer-events-none"></div> */}

        {/* Cabecera del Sidebar */}
        <div
          className={` h-16 border-b border-slate-100 flex items-center justify-between relative z-10 ${         
            isDesktopCollapsed ? "lg:justify-center" : ""
          }`}
        >
          <div
              className={`flex items-start gap-1 overflow-hidden transition-all duration-300 whitespace-nowrap ${
                isDesktopCollapsed ? "lg:w-0 lg:opacity-0 lg:hidden" : "w-auto opacity-100"
              }`}
          >

            <span className="size-1.5 rounded-full bg-(--color_naranja) inline-block shrink-0"></span>
            <div className="text-nowrap font-extrabold tracking-tight mt-1 text-(--color_azul) flex flex-col items-left truncate">
              {/* {isInPlanWorkspace ? "Workspace" : "PLAN FAMILIAR DE EMERGENCIA"} */}
              <h2 className='text-xs'>PLAN FAMILIAR DE</h2>
              <h2 className='text-lg text-(--color_naranja)'>EMERGENCIA</h2>
            </div>
          </div>

          {/* Botón de contraer (Desktop) */}
          <div className="hidden lg:flex items-center">
            <Button
              variant="ghost"
              size="sm"
              shape="square"
              className="text-(--color_azul) hover:bg-white/10 hover:text-(--color_naranja) p-2! transition-colors"
              onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
              title={isDesktopCollapsed ? "Expandir menú" : "Contraer menú"}
            >
              {isDesktopCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Botón de cerrar en Móviles */}
          <div className="flex lg:hidden items-center">
            <Button
              variant="ghost"
              size="sm"
              shape="square"
              className="text-(--color_azul) hover:bg-white/10 p-2!"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navegación Condicional */}
        <nav className="flex-1 space-y-1.5 relative z-10 overflow-y-auto rounded-t-3xl">
          {!isInPlanWorkspace ? (
            // --- MENÚ DE NAVEGACIÓN GLOBAL ---
            <>
              <NavLink
                to="/dashboard"
                end
                title="Panel Principal"
                className={navLinkClasses}
              >
                {({ isActive }) => (
                  <>
                    <LayoutDashboard
                      className={`w-5 h-5 min-h-5 shrink-0 transition-colors duration-300 ${isActive ? "text-white" : "text-blue-400 group-hover:text-(--color_azul)"}`}
                    />
                    <span
                      className={`whitespace-nowrap transition-all duration-300 ${isActive ? "text-white" : "text-(--color_azul)"} ${isDesktopCollapsed ? "lg:hidden" : "block"}`}
                    >
                      Panel Principal
                    </span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/planes-familiares"
                title="Historial de Planes"
                className={navLinkClasses}
              >
                {({ isActive }) => (
                  <>
                    <FileText
                      className={`w-5 h-5 min-h-5 shrink-0 transition-colors duration-300 ${isActive ? "text-white" : "text-blue-400 group-hover:text-(--color_azul)"}`}
                    />
                    <span
                      className={`whitespace-nowrap transition-all duration-300 ${isActive ? "text-white" : "text-(--color_azul)"} ${isDesktopCollapsed ? "lg:hidden" : "block"}`}
                    >
                      Historial de Planes
                    </span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/dashboard/contacts"
                title="Contactos Operativos"
                className={navLinkClasses}
              >
                {({ isActive }) => (
                  <>
                    <PhoneCall
                      className={`w-5 h-5 min-h-5 shrink-0 transition-colors duration-300 ${isActive ? "text-white" : "text-blue-400 group-hover:text-(--color_azul)"}`}
                    />
                    <span
                      className={`whitespace-nowrap transition-all duration-300 ${isActive ? "text-white" : "text-(--color_azul)"} ${isDesktopCollapsed ? "lg:hidden" : "block"}`}
                    >
                      Contactos Operativos
                    </span>
                  </>
                )}
              </NavLink>
            </>
          ) : (
            // --- NAVEGACIÓN SECUNDARIA (LOS 9 MÓDULOS DE ADMINISTRACIÓN) ---
            <div className="space-y-1.5 bg-(--color_azul)/5 p-1.5 w-full rounded-3xl">
              {/* BOTÓN DE RETORNO AL HISTORIAL USANDO EL COMPONENTE UI <Button /> */}
              <div className="mb-2 w-full flex justify-center">
                <Button
                  variant="sidebar"
                  size="sm"
                  className={`w-full justify-start rounded-full! ${
                    isDesktopCollapsed
                      ? "lg:justify-center lg:w-12 lg:h-12 lg:p-0"
                      : "px-4 py-2.5 gap-3"
                  }`}
                  onClick={() => navigate("/planes-familiares")}
                  title="Regresar al historial de planes"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                  <span
                    className={`whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? "lg:hidden" : "block"}`}
                  >
                    Volver al Historial
                  </span>
                </Button>
              </div>

              {!isDesktopCollapsed && (
                <div className="px-3 py-1 text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                  Módulos del Plan
                </div>
              )}

              {planWorkspaceModules.map((module, idx) => {
                const Icon = module.icon;
                const targetPath = `/planes-familiares/${currentPlanId}/${module.path}`;

                return (
                  <NavLink
                    key={idx}
                    to={targetPath}
                    end={module.path === ""}
                    title={module.label}
                    className={navLinkClasses}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors duration-300 ${isActive ? "text-white" : "text-blue-200 group-hover:text-(--color_naranja)"}`}
                        />
                        <span
                          className={`whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? "lg:hidden" : "block"}`}
                        >
                          {module.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          )}
        </nav>

      </div>

    </aside>
  );
};