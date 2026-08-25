import { useNavigate } from 'react-router-dom';
import { Card, Badge, Button, IconBox } from '@/components/ui';
import { FileText, Plus, ArrowRight } from 'lucide-react';
import { DashboardHeader } from '@/layouts/components';

export const PlansHistoryView = () => {
  const navigate = useNavigate();

  // Mock de planes de ejemplo (En producción vendría de tu API/Backend)
  const plans = [
    { id: "1", name: "Plan Familiar Principal - Casa", status: "Aceptado", date: "2026-05-10", role: "Creador" },
    { id: "2", name: "Plan Contingencia Secundaria", status: "Borrador", date: "2026-08-15", role: "Creador" },
  ];

  const handleCreateNew = () => {
    // Genera un ID temporal y redirige al primer módulo del nuevo plan
    const newId = Date.now().toString();
    navigate(`/dashboard/plans/${newId}/datos-principales`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      <DashboardHeader 
        badgeText="Gestión Documental"
        badgeVariant="primary"
        title="Historial de Planes"
        description="Administra, crea y consulta el estado de validación de tus planes de emergencia familiares."
      >
        <Button variant="primary" size="md" onClick={handleCreateNew}>
          <Plus className="w-4 h-4" />
          Crear Nuevo Plan
        </Button>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} padding="md" className="space-y-4">
            
            <div className="flex items-center justify-between">
              <IconBox icon={FileText} variant="primary" size="sm" />
              <Badge 
                variant={plan.status === 'Aceptado' ? 'success' : 'neutral'} 
                size="xs"
              >
                {plan.status}
              </Badge>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
              <p className="text-xs text-slate-500 mt-1">Ref. ID: #{plan.id} • Actualizado: {plan.date}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Rol: {plan.role}</span>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => navigate(`/dashboard/plans/${plan.id}/datos-principales`)}
              >
                <span>Administrar Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

          </Card>
        ))}
      </div>
    </div>
  );
};