import { Link, Card, Button, Badge } from '../components/ui';
import { ShieldCheck, Users, Settings, ArrowRight } from 'lucide-react';

export const HomeView = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-between">
      
      <div className="w-full max-w-[1500px] px-10">

        {/* SECCIÓN HERO */}
        <section className="w-full h-[600px] bg-(image:--blue-gra-r) rounded-4xl flex p-8 items-center justify-between relative mb-25">

                <div className="flex flex-col items-start relative">

                    <i className="ri-road-map-fill text-[400px] absolute -right-40 opacity-20 rotate-12"></i>

                    <img src="/svg/ilustracion_ave_a.svg" alt="" className="size-20 absolute -top-15 -left-10 z-50 animate-float"/>

                    <span className="text-4xl text-(--color_azul) font-bold w-full flex items-center text-nowrap gap-5 z-50">
                        Defensa Civil Colombiana

                        <div className="w-full flex gap-4">
                            <div className="min-w-1.5 min-h-1.5 bg-(--color_naranja) rounded-full"/>
                            <div className="min-w-1.5 min-h-1.5 bg-(--color_naranja) rounded-full"/>
                            <div className="min-w-1.5 min-h-1.5 bg-(--color_naranja) rounded-full"/>
                            <div className="w-full h-1.5 bg-(--color_naranja) rounded-full"/>
                            <div className="w-full h-1.5 bg-(--color_naranja) rounded-full"/>
                            <div className="w-full h-1.5 bg-(--color_naranja) rounded-full"/>
                            <div className="min-w-1.5 min-h-1.5 bg-(--color_naranja) rounded-full"/>
                            <div className="min-w-1.5 min-h-1.5 bg-(--color_naranja) rounded-full"/>
                            <div className="min-w-1.5 min-h-1.5 bg-(--color_naranja) rounded-full"/>
                        </div>

                    </span>

                    <h1 className="text-5xl font-bold text-left text-white z-50 text-nowrap">
                        PLAN FAMILIAR DE EMERGENCIA
                    </h1>

                    <div className="pt-10 flex gap-4">
                      <Button variant="accent" fullWidth>
                          Iniciar sesión
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      <Button variant="primary" fullWidth>
                          Registrarse
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>

                </div>

                <img src="/svg/ilustracion_voluntarios_b.svg" alt="" className="h-160 z-50 translate-y-10"/>
 
                <div className="size-20 rounded-full bg-(image:--white-gra) absolute -bottom-3 -left-3 animate-float"/>
                <div className="size-10 rounded-full bg-(image:--white-gra) absolute bottom-10 left-20 animate-float"/>
                <div className="size-120 rounded-full bg-(image:--white-gra) absolute -top-70 -right-20"/>
                <div className="size-15 rounded-full bg-(image:--white-gra) absolute -top-30 right-110 animate-float"/>

                <img src="/svg/ilustracion_ave_b.svg" alt="" className="size-30 absolute -top-12 -right-10 z-50 animate-float"/>
        </section>

        {/* SECCIÓN presentacion */}
        <section className="w-full flex items-center gap-15 relative mb-28">
                
                <div className="size-100 min-w-100 overflow-hidden rounded-full z-50">
                    <img src="image/img_voluntario.jpg" alt="" className="size-full object-cover transition-transform duration-300 hover:scale-105"/>
                </div>

                <div className="size-100 rounded-full bg-(image:--white-gra) absolute top-10 left-10"/>
                <div className="size-20 rounded-full bg-(image:--white-gra) absolute top-2 left-5 z-60 animate-float"/>
                <div className="size-10 rounded-full bg-(image:--white-gra) absolute -bottom-20 -right-5 z-60 animate-float"/>
                <div className="size-30 rounded-full bg-(image:--white-gra) absolute -bottom-20 right-4 z-60 animate-float"/>

                <div className="w-full flex flex-col gap-7 items-center relative">

                    <i className="ri-file-unknow-fill absolute text-9xl right-70 -top-10 opacity-50"></i>

                    <h1 className="w-full text-start text-5xl font-bold z-50">
                        ¿Qué es el aplicativo de <br /> Plan Familiar de Emergencia?
                    </h1>
                    
                    <p className="text-start text-(--blue) text-xl">
                        El Plan Familiar de Emergencia es una guía de organización para el hogar, diseñada para prevenir, reducir y responder de forma ordenada ante un desastre o situación de peligro.

                        A través de él, cada miembro de la familia conoce sus tareas específicas, las rutas de salida y los puntos de encuentro establecidos. <br /> <br />

                        Este aplicativo digitaliza y amplifica ese proceso, haciéndolo más accesible y fácil de mantener actualizado.
                    </p>
                    
                </div>

        </section>

        {/* SECCIÓN DE CUALIDADES */}
        <section className="py-24 px-6 sm:px-12 flex-1">
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

      </div>

      {/* SECCIÓN INFERIOR */}
      <section className="w-full bg-white border-t border-slate-200/80 py-20 px-6 text-center">
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