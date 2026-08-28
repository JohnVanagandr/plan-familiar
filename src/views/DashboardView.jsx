import { Card, Badge, Button, IconBox } from '@/components/ui';
import { ShieldCheck, Users, AlertTriangle, PhoneCall, ArrowRight, CheckCircle } from 'lucide-react';

export const DashboardView = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. BANNER DE BIENVENIDA */}
      <div className="bg-gradient-to-r from-[#0770CC] to-[#055194] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 space-y-2">
          <Badge variant="glass" size="sm">Panel de Control Activo</Badge>
          <h2 className="text-3xl font-extrabold tracking-tight">Bienvenido al Plan Familiar</h2>
          <p className="text-blue-100 text-sm max-w-xl leading-relaxed">
            Su núcleo familiar se encuentra registrado. Actualmente el nivel de preparación preventiva se encuentra en un <span className="font-bold text-[#FF6600]">75%</span>.
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-blue-100 block">Estado del Protocolo</span>
            <span className="text-sm font-bold text-white flex items-center gap-1.5 justify-end">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Operativo
            </span>
          </div>
        </div>
      </div>

      {/* 2. TARJETAS DE MÉTRICAS (GRID) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Card variant="default" padding="sm">
          <div className="flex items-center justify-between mb-4">
            {/* ✨ Consumo Limpio de IconBox */}
            <IconBox icon={Users} variant="primary" size="md" />
            <Badge variant="primary" size="xs">Hogar</Badge>
          </div>
          <h3 className="text-2xl font-black text-slate-900">4 Miembros</h3>
          <p className="text-xs text-slate-500 mt-1">Roles y perfiles asignados</p>
        </Card>

        <Card variant="default" padding="sm">
          <div className="flex items-center justify-between mb-4">
            {/* ✨ Consumo Limpio de IconBox */}
            <IconBox icon={AlertTriangle} variant="accent" size="md" />
            <Badge variant="accent" size="xs">Zona</Badge>
          </div>
          <h3 className="text-2xl font-black text-slate-900">2 Riesgos</h3>
          <p className="text-xs text-slate-500 mt-1">Identificados y evaluados</p>
        </Card>

        <Card variant="default" padding="sm">
          <div className="flex items-center justify-between mb-4">
            {/* ✨ Consumo Limpio de IconBox */}
            <IconBox icon={ShieldCheck} variant="success" size="md" />
            <Badge variant="success" size="xs">Seguridad</Badge>
          </div>
          <h3 className="text-2xl font-black text-slate-900">Mochila Lista</h3>
          <p className="text-xs text-slate-500 mt-1">Kit de emergencia verificado</p>
        </Card>

        <Card variant="default" padding="sm">
          <div className="flex items-center justify-between mb-4">
            {/* ✨ Consumo Limpio de IconBox con variante purpura integrada */}
            <IconBox icon={PhoneCall} variant="purple" size="md" />
            <Badge variant="neutral" size="xs">Enlaces</Badge>
          </div>
          <h3 className="text-2xl font-black text-slate-900">5 Contactos</h3>
          <p className="text-xs text-slate-500 mt-1">Líneas de emergencia guardadas</p>
        </Card>

      </div>

      {/* 3. SECCIÓN INFERIOR: PUNTOS CRÍTICOS Y ACCIONES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Puntos críticos del plan */}
        <Card variant="default" padding="md" className="lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Puntos Críticos del Plan Familiar</h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* ✨ Consumo Limpio de IconBox (usado para texto/número) */}
                <IconBox variant="primary" size="sm" className="text-sm">1</IconBox>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Definición de Punto de Encuentro</h4>
                  <p className="text-xs text-slate-500">Parque central del barrio - Zona segura asignada.</p>
                </div>
              </div>
              <Badge variant="success" size="sm">Completado</Badge>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* ✨ Consumo Limpio de IconBox (usado para texto/número) */}
                <IconBox variant="accent" size="sm" className="text-sm">2</IconBox>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Asignación de Roles ante Evacuación</h4>
                  <p className="text-xs text-slate-500">Revisión de botiquín y corte de suministros.</p>
                </div>
              </div>
              <Badge variant="accent" size="sm">Pendiente</Badge>
            </div>
          </div>
        </Card>

        {/* Acciones rápidas de gestión */}
        <Card variant="default" padding="md" className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Acciones Rápidas</h3>
            <p className="text-slate-500 text-sm mb-6">Herramientas de gestión inmediata para simulacros y emergencias reales.</p>
          </div>
          
          <div className="space-y-3">
            <Button variant="secondary" fullWidth>
              Iniciar sesión
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button variant="secondary" fullWidth>
              Descargar Protocolo PDF
            </Button>
          </div>
        </Card>

      </div>

    </div>
  );
};