import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Cerrar el menú si se hace clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón disparador (Trigger) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 pl-4 border-l border-slate-200 focus-visible:outline-none group"
      >
        <div className="w-9 h-9 rounded-xl bg-[#0770CC]/10 text-[#0770CC] flex items-center justify-center font-bold transition-transform group-active:scale-95">
          <User className="w-5 h-5" />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-bold text-slate-900 group-hover:text-[#0770CC] transition-colors">Usuario Institucional</p>
          <p className="text-[10px] text-slate-500">Administrador de Hogar</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 hidden sm:block transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Cuerpo del Dropdown */}
      <div 
        className={`absolute right-0 mt-3 w-56 bg-white border border-slate-200 shadow-2xl shadow-slate-900/10 rounded-2xl p-2 transition-all duration-300 ease-out origin-top-right z-50 ${
          isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
      >
        <div className="px-3 py-2 border-b border-slate-100 mb-2 sm:hidden">
          <p className="text-xs font-bold text-slate-900">Usuario Institucional</p>
          <p className="text-[10px] text-slate-500">Administrador</p>
        </div>

        <button 
          onClick={() => { setIsOpen(false); navigate('/dashboard/settings'); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-[#0770CC] transition-colors text-sm font-medium"
        >
          <Settings className="w-4 h-4" />
          <span>Configuración</span>
        </button>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-sm font-medium mt-1"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};