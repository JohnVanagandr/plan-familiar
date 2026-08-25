import { useNavigate } from 'react-router-dom';
import { Bell, Menu, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button, Dropdown } from '@/components/ui';

export const DashboardTopbar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Configuración limpia: Sin cabeceras repetidas, directo a las acciones de usuario
  const userMenuSections = [
    {
      options: [
        {
          label: "Configuración",
          icon: Settings,
          onClick: () => navigate('/dashboard/settings')
        }
      ]
    },
    {
      options: [
        {
          label: "Cerrar Sesión",
          icon: LogOut,
          danger: true,
          onClick: handleLogout
        }
      ]
    }
  ];

  // Elemento disparador (Trigger) que ya informa el usuario actual
  const userTriggerElement = (
    <div className="flex items-center gap-3 pl-4 border-l border-slate-200 group cursor-pointer">
      <div className="w-9 h-9 rounded-xl bg-[#0770CC]/10 text-[#0770CC] flex items-center justify-center font-bold transition-transform group-active:scale-95">
        <User className="w-5 h-5" />
      </div>
      <div className="hidden sm:block text-left">
        <p className="text-xs font-bold text-slate-900 group-hover:text-[#0770CC] transition-colors">Usuario Institucional</p>
        <p className="text-[10px] text-slate-500">Administrador de Hogar</p>
      </div>
      <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block transition-transform duration-300" />
    </div>
  );

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shadow-xs sticky top-0 z-20 shrink-0">
      
      {/* Sección Izquierda: Menú Móvil y Título */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          shape="square"
          className="lg:hidden text-slate-700 hover:bg-slate-100 !p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <Menu className="w-6 h-6" />
        </Button>
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
          Sistema de Gestión Integral
        </h1>
      </div>
      
      {/* Sección Derecha: Notificaciones y Menú Desplegable */}
      <div className="flex items-center gap-4">
        <Button variant="secondary" shape="square" size="sm" className="relative !p-2">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF6600] border-2 border-white"></span>
        </Button>
        
        {/* Dropdown limpio sin información duplicada */}
        <Dropdown trigger={userTriggerElement} items={userMenuSections} align="right" />
      </div>

    </header>
  );
};