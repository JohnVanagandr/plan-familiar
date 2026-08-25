import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DashboardSidebar, DashboardTopbar } from './components';

export const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const location = useLocation();

  // Auto-cierre del menú en dispositivos móviles al cambiar de ruta
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="h-screen flex bg-slate-100 text-slate-900 overflow-hidden relative">
      
      {/* Overlay Oscurecido para Móviles */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Módulo Sidebar Institucional */}
      <DashboardSidebar 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isDesktopCollapsed={isDesktopCollapsed}
        setIsDesktopCollapsed={setIsDesktopCollapsed}
      />

      {/* Contenedor Principal de Trabajo */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 h-full">
        
        {/* Módulo Topbar Fijo (Protegido de colisiones con DashboardHeader) */}
        <DashboardTopbar 
          isMobileOpen={isMobileOpen} 
          setIsMobileOpen={setIsMobileOpen} 
        />

        {/* Zona Dinámica de Vistas con Scroll Independiente */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto bg-slate-50 relative">
          <Outlet />
        </main>
      </div>

    </div>
  );
};