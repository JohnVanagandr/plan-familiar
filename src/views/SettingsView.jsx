import { Card, Button, Input, IconBox } from '@/components/ui';
import { DashboardHeader } from '@/layouts/components';
import { Lock, UserCheck } from 'lucide-react';

export const SettingsView = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* ✨ Consumo de ViewHeader */}
      <DashboardHeader 
        badgeText="Administración"
        badgeVariant="primary"
        title="Configuración del Sistema"
        description="Actualiza las credenciales de tu cuenta y los parámetros generales del plan."
      />

      {/* ✨ Consumo Inteligente de Card con padding="md" */}
      <Card padding="md" className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          
          {/* ✨ Consumo Limpio de IconBox */}
          <IconBox icon={UserCheck} variant="primary" size="sm" />
          
          <div>
            <h3 className="text-lg font-bold text-slate-900">Información del Administrador</h3>
            <p className="text-xs text-slate-500">Datos principales de contacto institucional.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Nombre Completo" defaultValue="Usuario Institucional" />
          <Input label="Correo Electrónico" defaultValue="admin@defensacivil.gov.co" />
        </div>

        <div className="pt-2">
          <Button variant="primary" size="md">Guardar Cambios</Button>
        </div>
      </Card>

      {/* ✨ Consumo Inteligente de Card con padding="md" */}
      <Card padding="md" className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          
          {/* ✨ Consumo Limpio de IconBox */}
          <IconBox icon={Lock} variant="accent" size="sm" />
          
          <div>
            <h3 className="text-lg font-bold text-slate-900">Seguridad y Contraseña</h3>
            <p className="text-xs text-slate-500">Modifica tu clave de acceso al sistema.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Contraseña Actual" type="password" placeholder="••••••••" />
          <Input label="Nueva Contraseña" type="password" placeholder="••••••••" />
        </div>

        <div className="pt-2">
          <Button variant="accent" size="md">Actualizar Contraseña</Button>
        </div>
      </Card>
      
    </div>
  );
};