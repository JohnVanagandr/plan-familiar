import { Link, Card, Badge } from '../components/ui';
import { ShieldCheck, Users, Settings, ArrowRight } from 'lucide-react';

export const HomeView = () => {
  return (
    <div className="flex-1 flex flex-col">
      
      {/* SECCIÓN HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0770CC] to-[#055194] text-white py-24 px-6 sm:px-12 flex items-center justify-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <Badge variant="glass" size="md">
            Defensa Civil Colombiana
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Plan Familiar de <span className="text-[#FF6600]">Emergencia</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto font-normal leading-relaxed">
            Es una herramienta preventiva esencial para organizar a familias ante riesgos, fortaleciendo la capacidad de respuesta y la cultura de prevención comunitaria.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <Link href="/login" variant="accent" size="lg" className="w-full sm:w-auto min-w-[180px]">
              Iniciar Sesión
            </Link>
            
            <Link href="/register" variant="glass" size="lg" className="w-full sm:w-auto min-w-[180px]">
              Registrarse
            </Link>

          </div>
        </div>
      </section>

      {/* SECCIÓN DE CUALIDADES */}
      <section className="py-24 px-6 sm:px-12 bg-slate-50/60 flex-1">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Arquitectura de Protección y Control
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Diseñado bajo estrictos estándares institucionales para la gestión integral del riesgo y la coordinación familiar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Tarjeta 1 */}
            <Card variant="editorial">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#0770CC]/10 text-[#0770CC] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="text-3xl font-black text-slate-200 group-hover:text-[#0770CC]/20 transition-colors duration-300">
                  01
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Prevención de Riesgos</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                Identifica amenazas en tu entorno y establece protocolos de acción claros antes de que ocurra una emergencia.
              </p>
              
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Eje estratégico</span>
                <Badge variant="primary" size="sm">Preventivo</Badge>
              </div>
            </Card>

            {/* Tarjeta 2 */}
            <Card variant="editorial">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#FF6600]/10 text-[#FF6600] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <Users className="w-7 h-7" />
                </div>
                <span className="text-3xl font-black text-slate-200 group-hover:text-[#FF6600]/20 transition-colors duration-300">
                  02
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Organización Familiar</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                Asigna roles específicos a cada miembro del hogar, define puntos de encuentro y mantén contactos de emergencia a la mano.
              </p>
              
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Eje estratégico</span>
                <Badge variant="accent" size="sm">Comunitario</Badge>
              </div>
            </Card>

            {/* Tarjeta 3 */}
            <Card variant="editorial">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-slate-900/5 text-slate-900 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <Settings className="w-7 h-7" />
                </div>
                <span className="text-3xl font-black text-slate-200 group-hover:text-slate-900/20 transition-colors duration-300">
                  03
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Administración y Control</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                Accede al panel de administración institucional para supervisar planes, reportes y gestionar los registros de manera segura.
              </p>
              
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Eje estratégico</span>
                <Badge variant="neutral" size="sm">Operativo</Badge>
              </div>
            </Card>

          </div>
        </div>
      </section>

      {/* SECCIÓN INFERIOR */}
      <section className="bg-white border-t border-slate-200/80 py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">¿Listo para proteger a los tuyos?</h3>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            Ingresa a la plataforma institucional y comienza a gestionar tu plan familiar hoy mismo con los más altos estándares de seguridad y control.
          </p>
          <div className="pt-2 flex justify-center">
            <Link href="/login" variant="primary" size="lg">
              <span>Acceder al Sistema</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};