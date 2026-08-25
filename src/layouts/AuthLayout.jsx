import { Outlet } from 'react-router-dom';
import { Badge, Card } from '@/components/ui'; // <-- 1. Importamos el componente Card
import { ShieldAlert, Lock, CheckCircle2 } from 'lucide-react'; //

export const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-[#055194] relative overflow-hidden">
      
      {/* 1. LUCES AMBIENTALES DE FONDO (Efecto de profundidad avanzada) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0770CC] rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#FF6600] rounded-full blur-3xl opacity-15 pointer-events-none"></div>
      
      {/* 2. TRAMA GEOMÉTRICA DE ALTA DENSIDAD */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      {/* 3. SECCIÓN IZQUIERDA: HERO EDITORIAL INSTITUCIONAL */}
      <div className="hidden lg:flex lg:col-span-7 flex-col justify-between p-16 text-white relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge variant="glass" size="md" className="gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Plataforma Oficial Institucional
            </Badge>
          </div>
          
          <div className="space-y-3 max-w-xl">
            <h1 className="text-5xl font-extrabold tracking-tight leading-[1.1] text-white">
              Plan Familiar de <span className="text-[#FF6600]">Emergencia</span>
            </h1>
            <p className="text-lg text-blue-100/90 leading-relaxed font-normal pt-2">
              Herramienta preventiva esencial para la gestión integral del riesgo, coordinando la respuesta familiar y comunitaria ante situaciones críticas.
            </p>
          </div>
        </div>

        {/* 4. Tarjetas de métricas migradas al componente <Card> */}
        <div className="grid grid-cols-2 gap-4 my-auto max-w-lg py-8">
          
          {/* Card 1: Reemplazamos el div con nuestra UI estandarizada */}
          <Card variant="glass-subtle" padding="sm">
            <div className="flex items-center gap-3 mb-2 text-[#FF6600]">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Protocolo</span>
            </div>
            <p className="text-xs text-blue-100/90 font-medium leading-relaxed">
              Gestión activa de amenazas y prevención en el hogar.
            </p>
          </Card>

          {/* Card 2: Reemplazamos el div con nuestra UI estandarizada */}
          <Card variant="glass-subtle" padding="sm">
            <div className="flex items-center gap-3 mb-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Seguridad</span>
            </div>
            <p className="text-xs text-blue-100/90 font-medium leading-relaxed">
              Control de acceso cifrado para administradores.
            </p>
          </Card>

        </div>

        {/* Footer institucional minimalista */}
        <div className="pt-6 border-t border-white/15 flex items-center justify-between text-xs text-blue-200 tracking-wide">
          <span className="font-semibold uppercase tracking-wider">Defensa Civil Colombiana</span>
          <span className="font-medium flex items-center gap-1.5 text-blue-100">
            <Lock className="w-3.5 h-3.5 text-[#FF6600]" /> Listos en paz o emergencia
          </span>
        </div>
      </div>

      {/* 5. SECCIÓN DERECHA: CONTENEDOR DEL FORMULARIO */}
      <div className="lg:col-span-5 flex items-center justify-center p-6 sm:p-12 relative z-10 bg-transparent">
        <div className="w-full max-w-md">
          <Outlet /> {/* Renderiza las vistas de login, registro o recuperación[cite: 6] */}
        </div>
      </div>

    </div>
  );
};