import { Outlet, useParams } from 'react-router-dom';
import { Card, Badge } from '@/components/ui';
import { Lock, ShieldCheck } from 'lucide-react';

export const PlanWorkspaceView = () => {
  const { planId } = useParams();
  
  // Simulación de control por roles: Si el plan ya fue validado por la institución, se bloquea la edición
  const isLocked = false; 

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Banner informativo de estado de validación */}
      {isLocked ? (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 text-amber-800 text-xs font-medium shadow-xs">
          <Lock className="w-5 h-5 shrink-0 text-amber-600" />
          <span>Este plan ha sido validado y aceptado por la institución. Sus módulos se encuentran bloqueados para edición.</span>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center gap-3 text-blue-800 text-xs font-medium shadow-xs">
          <ShieldCheck className="w-5 h-5 shrink-0 text-[#0770CC]" />
          <span>Modo de Edición Activa. Estás configurando los componentes del plan con referencia: <strong>#{planId}</strong></span>
        </div>
      )}

      {/* Contenedor dinámico donde se renderizan los 9 submódulos mediante rutas anidadas */}
      <div className="transition-all duration-300">
        <Outlet />
      </div>

    </div>
  );
};