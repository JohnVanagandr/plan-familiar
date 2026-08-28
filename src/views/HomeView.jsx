import { Link, Card, Button, Badge } from '../components/ui';
import { ShieldCheck, Users, Settings, ArrowRight, FileQuestionMark, HeartHandshake, ShieldUser, Eye, UsersRound, MapPin, Heart, Globe } from 'lucide-react';

export const HomeView = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-between">
      <div className="w-full max-w-375 px-3 flex flex-col gap-10 md:gap-10">
        {/* SECCIÓN HERO */}
        <section className="w-full h-fit min-h-170 bg-(image:--blue-gra-d) rounded-4xl flex flex-col p-8 items-center justify-between relative sm:h-[calc(100vh-55px)] sm:max-h-250 sm:p-10 lg:p-12 2xl:flex-row ">
            <img 
              src="svg/ilustracion_colombia.svg"
              alt=""
              className="absolute h-200 left-0 top-10 filter-[invert(100%)_opacity(30%)] sm:-left-20 "
            />
          <div className="flex flex-col items-center relative gap-2 2xl:items-start">

            <i className="ri-road-map-fill text-[400px] absolute -right-40 opacity-20 rotate-12"></i>

            <img
              src="/svg/ilustracion_ave_a.svg"
              alt=""
              className="size-20 absolute -top-15 -left-10 z-50 animate-float"
            />

            <span className="text-xl text-(--color_azul) font-bold w-full flex flex-col text-nowrap text-center gap-2 z-50 sm:gap-5 sm:flex-row sm:items-center md:text-xl 2xl:text-4xl">
              Defensa Civil Colombiana
              <div className="w-80 flex gap-4 m-auto sm:w-full">
                <div className="min-w-1.5 min-h-1.5 bg-(--color_naranja) rounded-full" />
                <div className="min-w-1.5 min-h-1.5 bg-(--color_naranja) rounded-full" />
                <div className="min-w-1.5 min-h-1.5 bg-(--color_naranja) rounded-full" />
                <div className="w-full h-1.5 bg-(--color_naranja) rounded-full" />
                <div className="w-full h-1.5 bg-(--color_naranja) rounded-full" />
                <div className="w-full h-1.5 bg-(--color_naranja) rounded-full" />
                <div className="min-w-1.5 min-h-1.5 bg-(--color_naranja) rounded-full" />
                <div className="min-w-1.5 min-h-1.5 bg-(--color_naranja) rounded-full" />
                <div className="min-w-1.5 min-h-1.5 bg-(--color_naranja) rounded-full" />
              </div>
            </span>

            <h1 className="text-3xl text-center font-bold text-white z-50 text-wrap md:text-nowrap sm:text-left md:text-4xl 2xl:text-5xl">
              PLAN FAMILIAR DE EMERGENCIA
            </h1>

            <div className="pt-10 flex gap-4">

              <Link href="/login" variant="accent" size="lg" className="w-full sm:w-auto min-w-0 sm:min-w-fit px-4 py-2 text-center rounded-lg">
                Iniciar Sesión
              </Link>

              <Link href="/register" variant="accent_blue" size="lg" className="w-full sm:w-auto min-w-0 sm:min-w-fit px-4 py-2 text-center rounded-lg">
                Registrarse
              </Link>

            </div>
          </div>

          <img
            src="/svg/ilustracion_voluntarios_b.svg"
            alt=""
            className="h-160 z-50"
          />

          <div className="size-20 rounded-full bg-(image:--white-gra) absolute -bottom-3 -left-3 animate-float" />
          <div className="size-10 rounded-full bg-(image:--white-gra) absolute bottom-10 left-20 animate-float" />
          <div className="size-120 rounded-full bg-(image:--white-gra) absolute -top-70 -right-20 animate-float" />
          <div className="size-20 rounded-full bg-(image:--white-gra) absolute top-10 right-10 animate-float xl:top-10 xl:right-100" />
          <div className="size-10 rounded-full bg-(image:--white-gra) absolute top-40 right-5 animate-float xl:top-35 xl:right-100" />

          <img
            src="/svg/ilustracion_ave_b.svg"
            alt=""
            className="size-30 absolute top-70 right-2 z-50 animate-float sm:top-60 sm:right-30 md:top-30 2xl:top-5 2xl:right-10"
          />
        </section>

        {/* SECCIÓN presentacion */}
        <section className="w-full h-screen max-h-250 flex items-center gap-15 relative group">
          <div className="size-100 min-w-100 overflow-hidden rounded-full z-50">
            <img
              src="image/img_voluntario.jpg"
              alt=""
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="size-100 rounded-full bg-(image:--white-gra) absolute top-70 left-10" />
          <div className="size-20 rounded-full bg-(image:--white-gra) absolute top-50 left-5 z-60 animate-float" />
          <div className="size-10 rounded-full bg-(image:--white-gra) absolute bottom-5 -right-5 z-60 animate-float" />
          <div className="size-30 rounded-full bg-(image:--white-gra) absolute bottom-10 right-4 z-60 animate-float" />

          <div className="w-full flex flex-col gap-7 items-center relative">
            {/* <i className="ri-file-unknow-fill absolute text-9xl right-70 -top-10 opacity-50"></i> */}
            <FileQuestionMark className="ri-file-unknow-fill absolute size-30 right-70 -top-10 opacity-40 text-(--color_azul) rotate-12"/>

            <h1 className="w-full text-start text-5xl font-bold z-50">
              ¿Qué es el aplicativo de <br /> Plan Familiar de Emergencia?
            </h1>

            <p className="text-start text-(--blue) text-xl">
              El Plan Familiar de Emergencia es una guía de organización para el
              hogar, diseñada para prevenir, reducir y responder de forma
              ordenada ante un desastre o situación de peligro. A través de él,
              cada miembro de la familia conoce sus tareas específicas, las
              rutas de salida y los puntos de encuentro establecidos. <br />{" "}
              <br />
              Este aplicativo digitaliza y amplifica ese proceso, haciéndolo más
              accesible y fácil de mantener actualizado.
            </p>
          </div>
        </section>

        {/* SECCIÓN DE CUALIDADES */}
        <section className="py-24 px-6 sm:px-12 h-screen max-h-250 relative  min-h-fit">

          <div className="size-30 rounded-full bg-(image:--white-gra) absolute bottom-10 right-40 z-20 animate-float" />
          <div className="size-10 rounded-full bg-(image:--white-gra) absolute bottom-40 right-20 z-20 animate-float" />
          <div className="size-15 rounded-full bg-(image:--white-gra) absolute bottom-20 left-20 z-20 animate-float" />

          <div className="max-w-6xl mx-auto z-50">

            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3 relative">

              <UsersRound className='absolute size-30 -top-15 right-3.5 text-(--color_azul)/30'/>
              <h2 className="text-5xl sm:text-5xl font-bold tracking-tight z-60">
                Roles, gestión y control
              </h2>
              <p className="text-slate-600 text-xl leading-relaxed">
                Diseñado bajo estrictos estándares institucionales para la
                gestión integral del riesgo y la coordinación familiar.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tarjeta 1 */}
              <Card variant="editorial">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#0770CC]/10 text-[#0770CC] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <HeartHandshake className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-[#0770CC]/20 transition-colors duration-300">
                    01
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                  Voluntarios
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  El rol del voluntario de Defensa Civil al registrar un Plan Familiar en un aplicativo digital 
                  es el de asesor técnico y digitador oficial. Su objetivo es transformar el diagnóstico físico 
                  del hogar en datos estructurados dentro de la plataforma institucional para que el sistema de 
                  gestión de riesgo local esté actualizado.
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    Eje estratégico
                  </span>
                  <Badge variant="primary" size="sm">
                    Prevención
                  </Badge>
                </div>
              </Card>

              {/* Tarjeta 2 */}
              <Card variant="editorial">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF6600]/10 text-[#FF6600] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <Eye className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-[#FF6600]/20 transition-colors duration-300">
                    02
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                  Supervisor
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  El rol del supervisor en la plataforma de gestión de riesgo es el de auditor de calidad 
                  y coordinador estratégico. Su función principal es validar la veracidad de los planes familiares 
                  cargados por los voluntarios, analizar las métricas de vulnerabilidad del territorio y coordinar 
                  al personal en campo para garantizar la cobertura de la población.
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    Eje estratégico
                  </span>
                  <Badge variant="accent" size="sm">
                    Coordinación
                  </Badge>
                </div>
              </Card>

              {/* Tarjeta 3 */}
              <Card variant="editorial">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900/5 text-slate-900 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <ShieldUser className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-slate-900/20 transition-colors duration-300">
                    03
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                  Administrador
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  El rol del administrador tiene la función principal de garantizar la continuidad operativa del 
                  aplicativo, controlar el acceso de los supervisores y voluntarios, y gestionar de forma exclusiva 
                  los datos maestros que estructuran y estandarizan toda la recolección de información sobre 
                  la gestión del riesgo familiar.
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    Eje estratégico
                  </span>
                  <Badge variant="neutral" size="sm">
                    Gestión
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* SECCIÓN INFERIOR */}
      <section className="w-full min-h-200 bg-white border-t border-slate-200/80 py-20 px-20 text-center z-70">

        <div className="mx-auto flex gap-4 justify-between items-end max-w-350">

          <div className='flex flex-col gap-4 items-start'>
            <div className='flex gap-4 items-center mb-7'>
              <img src="logo.png" alt="" className='size-30' />
              <h1 className='text-3xl font-bold text-start text-(--color_azul)'>
                PLAN FAMILIAR DE<br />
                <span className='text-5xl text-(--color_naranja)'>EMERGENCIA</span>
              </h1>
            </div>

            <h2 className='text-start w-full text-2xl font-bold flex items-center gap-2'> <MapPin/> Dirección General</h2>

            <p className='text-start w-full'>
              Bogotá D.C., Colombia <br />
              Código postal: 111311
            </p>

            <div className='w-full'>
              <h2 className='text-start w-full font-bold'>Horario de atención presencial</h2>
              <p className='text-start w-full'>
                Atención al público: Lunes a viernes de 8:00 am. a 5:00 pm <br />
                Correspondencia: Calle 52 No. 14-67 Bogotá D.C., Colombia.
              </p>
            </div>

            <div className='w-full'>
              <h2 className='text-start w-full font-bold'>Líneas de atención</h2>
              <p className='text-start w-full'>
                Teléfono conmutador: (601 319 9000) Ext. 124 <br />
                Línea de emergencia: 144 <br />
                Línea Anticorrupción Nacional: 157 <br />
              </p>
            </div>

            <div className='flex flex-col items-start'>
              <p className='flex items-start'>
                <span className='font-bold'>Correo institucional:</span> orientacionciudadana@defensacivil.gov.co
              </p>
              <p className='text-start'>
                <span className='font-bold'>Correo notificaciones judiciales:</span>notificacionesjudiciales@defensacivil.gov.co
              </p>
            </div>

          </div>
          
          <div className='flex flex-col gap-7 items-center'>

            <h1 className='text-2xl font-bold'>Siguenos en nuestros canales oficiales</h1>

            <div className='flex gap-4'>

              <a 
                href="https://www.defensacivil.gov.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 w-fit hover:bg-(--color_naranja) hover:text-white text-slate-700 rounded-full transition-colors duration-200"
                aria-label="Sitio Web Oficial"
              >
                <Globe className="size-12 stroke-[1.5]" />
              </a>

              <a 
                href="https://www.facebook.com/defensacivil.secsantander/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 w-fit hover:bg-[#0770CC] hover:text-white text-slate-700 rounded-full transition-colors duration-200"
                aria-label="Facebook"
              >
              <svg className="size-12 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              </a>

              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 w-fit hover:bg-[#E4405F] hover:text-white text-slate-700 rounded-full transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="size-12 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a 
                href="https://x.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 w-fit hover:bg-slate-900 hover:text-white text-slate-700 rounded-full transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                <svg className="size-12 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a 
                href="https://www.youtube.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 w-fit hover:bg-[#FF0000] hover:text-white text-slate-700 rounded-full transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="size-12 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

            </div>

            <img src="/svg/ilustracion_familia_b.svg" alt="" className='w-150'/>
          </div>
        </div>
      </section>
    </div>
  );
};