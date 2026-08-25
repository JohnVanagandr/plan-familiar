import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, PhoneCall, ArrowLeft, 
  FileText, Home, MapPin, Compass, AlertTriangle, PackageCheck, 
  ListOrdered, Heart, X, ChevronLeft, ChevronRight 
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
  const isPlansRoute = pathSegments[1] === 'dashboard' && pathSegments[2] === 'plans';
  const currentPlanId = isPlansRoute && pathSegments[3] && pathSegments[3] !== 'new' ? pathSegments[3] : null;
  const isInPlanWorkspace = Boolean(currentPlanId);

  // Clases dinámicas con indicador visual de acento institucional (#FF6600)
  const navLinkClasses = ({ isActive }) => `
    flex items-center rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 ease-out relative group overflow-hidden
    ${isActive 
      ? "bg-white/10 text-white shadow-sm font-semibold border-l-4 border-[#FF6600]" 
      : "text-blue-100/70 hover:bg-white/5 hover:text-white"
    }
    ${isDesktopCollapsed ? "lg:justify-center lg:w-12 lg:h-12 lg:mx-auto lg:p-0 lg:border-l-0" : "px-4 py-2.5 gap-3 w-full"}
    px-4 py-2.5 gap-3 w-full
  `;

  // Los 9 módulos de administración secundaria del plan
  const planWorkspaceModules = [
    { label: "Datos Principales", path: "datos-principales", icon: FileText },
    { label: "Integrantes", path: "integrantes", icon: Users },
    { label: "Mascotas y Animales", path: "mascotas", icon: Heart },
    { label: "Gráfico de Vivienda", path: "vivienda", icon: Home },
    { label: "Georreferenciación", path: "georeferenciacion", icon: MapPin },
    { label: "Gráfico de Entorno", path: "entorno", icon: Compass },
    { label: "Factores de Riesgo", path: "riesgos", icon: AlertTriangle },
    { label: "Recursos Disponibles", path: "recursos", icon: PackageCheck },
    { label: "Plan de Acción", path: "plan-accion", icon: ListOrdered },
  ];

  return (
    <aside 
      className={`fixed lg:static inset-y-0 left-0 z-40 bg-gradient-to-b from-[#055194] via-[#044078] to-[#02284d] text-white flex flex-col border-r border-blue-900/40 shadow-2xl shadow-slate-900/20 transform transition-all duration-300 ease-in-out shrink-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isDesktopCollapsed ? "lg:w-20" : "lg:w-72"} w-72
      `}
    >
      {/* Luz ambiental sutil */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6600] rounded-full blur-3xl opacity-10 pointer-events-none"></div>

      {/* Cabecera del Sidebar */}
      <div className={`p-4 h-16 border-b border-white/10 flex items-center justify-between relative z-10 ${isDesktopCollapsed ? 'lg:justify-center' : ''}`}>
        
        <div className={`flex flex-col overflow-hidden transition-all duration-300 whitespace-nowrap ${isDesktopCollapsed ? 'lg:w-0 lg:opacity-0 lg:hidden' : 'w-auto opacity-100'}`}>
          <Badge variant="glass" size="sm" className="w-fit text-[9px] tracking-widest border-[#FF6600]/30 text-blue-100">
            {isInPlanWorkspace ? `Ref. Plan #${currentPlanId}` : 'Defensa Civil'}
          </Badge>
          <h2 className="text-base font-extrabold tracking-tight mt-1 text-white flex items-center gap-1.5 truncate">
            {isInPlanWorkspace ? 'Workspace' : 'Plan Familiar'} 
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600] inline-block shrink-0"></span>
          </h2>
        </div>

        {/* Botón de contraer (Desktop) */}
        <div className="hidden lg:flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            shape="square"
            className="text-white hover:bg-white/10 hover:text-[#FF6600] !p-2 transition-colors"
            onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
            title={isDesktopCollapsed ? "Expandir menú" : "Contraer menú"}
          >
            {isDesktopCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </div>

        {/* Botón de cerrar en Móviles */}
        <div className="flex lg:hidden items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            shape="square"
            className="text-white hover:bg-white/10 !p-2"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Navegación Condicional */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto overflow-x-hidden relative z-10">
        
        {!isInPlanWorkspace ? (
          // --- MENÚ DE NAVEGACIÓN GLOBAL ---
          <>
            <NavLink to="/dashboard" end title="Panel Principal" className={navLinkClasses}>
              {({ isActive }) => (
                <>
                  <LayoutDashboard className={`w-5 h-5 shrink-0 transition-colors duration-300 ${isActive ? 'text-[#FF6600]' : 'text-blue-200 group-hover:text-white'}`} />
                  <span className={`whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? 'lg:hidden' : 'block'}`}>
                    Panel Principal
                  </span>
                </>
              )}
            </NavLink>
            
            <NavLink to="/dashboard/plans" title="Historial de Planes" className={navLinkClasses}>
              {({ isActive }) => (
                <>
                  <FileText className={`w-5 h-5 shrink-0 transition-colors duration-300 ${isActive ? 'text-[#FF6600]' : 'text-blue-200 group-hover:text-white'}`} />
                  <span className={`whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? 'lg:hidden' : 'block'}`}>
                    Historial de Planes
                  </span>
                </>
              )}
            </NavLink>

            <NavLink to="/dashboard/contacts" title="Contactos Operativos" className={navLinkClasses}>
              {({ isActive }) => (
                <>
                  <PhoneCall className={`w-5 h-5 shrink-0 transition-colors duration-300 ${isActive ? 'text-[#FF6600]' : 'text-blue-200 group-hover:text-white'}`} />
                  <span className={`whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? 'lg:hidden' : 'block'}`}>
                    Contactos Operativos
                  </span>
                </>
              )}
            </NavLink>
          </>
        ) : (
          // --- NAVEGACIÓN SECUNDARIA (LOS 9 MÓDULOS DE ADMINISTRACIÓN) ---
          <div className="space-y-1.5">
            
            {/* BOTÓN DE RETORNO AL HISTORIAL USANDO EL COMPONENTE UI <Button /> */}
            <div className="mb-2">
              <Button 
                variant="sidebar" 
                size="sm"
                className={`w-full text-amber-300 hover:bg-amber-400/10 hover:text-amber-200 border border-amber-400/20 justify-start ${
                  isDesktopCollapsed ? "lg:justify-center lg:w-12 lg:h-12 lg:p-0" : "px-4 py-2.5 gap-3"
                }`}
                onClick={() => navigate('/dashboard/plans')}
                title="Regresar al historial de planes"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? 'lg:hidden' : 'block'}`}>
                  Volver al Historial
                </span>
              </Button>
            </div>

            {!isDesktopCollapsed && (
              <div className="px-3 py-1 text-[10px] uppercase font-extrabold tracking-wider text-blue-300/60">
                Módulos del Plan
              </div>
            )}
            
            {planWorkspaceModules.map((module, idx) => {
              const Icon = module.icon;
              const targetPath = `/dashboard/plans/${currentPlanId}/${module.path}`;

              return (
                <NavLink 
                  key={idx} 
                  to={targetPath} 
                  title={module.label} 
                  className={navLinkClasses}
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-4 h-4 shrink-0 transition-colors duration-300 ${isActive ? 'text-[#FF6600]' : 'text-blue-200 group-hover:text-white'}`} />
                      <span className={`whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? 'lg:hidden' : 'block'}`}>
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

    </aside>
  );
};