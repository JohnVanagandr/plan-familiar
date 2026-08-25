import { Card, ViewHeader } from '@/components/ui';

export const ModulePlaceholder = ({ title, description }) => {
  return (
    <div className="space-y-6">
      <ViewHeader 
        badgeText="Módulo de Plan"
        badgeVariant="neutral"
        title={title}
        description={description}
      />
      <Card padding="lg" className="text-center py-16 space-y-3">
        <h3 className="text-base font-bold text-slate-800">Sección en desarrollo estructural</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Este módulo está preparado para recibir los formularios de control, tablas relacionales e interfaces interactivas correspondientes.
        </p>
      </Card>
    </div>
  );
};