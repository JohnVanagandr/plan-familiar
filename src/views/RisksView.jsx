import { Card, Badge, IconBox } from '@/components/ui';
import { DashboardHeader } from '@/layouts/components';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const RisksView = () => {
  // Los datos se mantienen idénticos[cite: 11]
  const risks = [
    { title: "Inundación por Crecuenta / Lluvias", level: "Alto", status: "Mitigado", desc: "Vivienda ubicada en zona de influencia cercana a fuentes hídricas. Se cuenta con rutas de evacuación altas." },
    { title: "Movimiento en Masa / Deslizamiento", level: "Medio", status: "En Monitoreo", desc: "Vía de acceso principal con taludes inestables en temporada de invierno estricta." },
    { title: "Fuga de Gas / Incendio Estructural", level: "Bajo", status: "Controlado", desc: "Revisión técnica de válvulas de gas realizada semestralmente con extintor operativo en cocina." }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* ✨ 1. Consumo del Nuevo Componente ViewHeader */}
      <DashboardHeader 
        badgeText="Análisis de Entorno"
        badgeVariant="accent"
        title="Riesgos y Amenazas"
        description="Evaluación y calificación de vulnerabilidades identificadas en la zona de residencia."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {risks.map((risk, index) => (
          
          <Card key={index} padding="sm">
            <div className="flex items-center justify-between mb-4">
              
              {/* ✨ 3. Consumo Limpio de IconBox (Reemplaza al div naranja hardcodeado) */}
              <IconBox icon={AlertTriangle} variant="accent" size="md" />
              
              <Badge variant={risk.level === 'Alto' ? 'accent' : 'primary'} size="xs">
                Nivel {risk.level}
              </Badge>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2">{risk.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">{risk.desc}</p>
            
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Estado actual</span>
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {risk.status}
              </span>
            </div>
          </Card>
          
        ))}
      </div>
    </div>
  );
};