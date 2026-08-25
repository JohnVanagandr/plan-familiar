import { Card, Input, Button } from '@/components/ui';
import { DashboardHeader } from '@/layouts/components';
import { Save } from 'lucide-react';

export const DatosPrincipalesForm = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader 
        badgeText="Datos Principales"
        badgeVariant="primary"
        title="Datos Principales del Hogar"
        description="Registra la información general y ubicación base del núcleo familiar."
      />
      <Card padding="md" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Identificador del Plan" defaultValue="Plan Familiar Principal" />
          <Input label="Dirección" defaultValue="Calle 45 # 28-15" />
        </div>
        <div className="flex justify-end">
          <Button variant="primary">
            <Save className="w-4 h-4" /> Guardar Datos
          </Button>
        </div>
      </Card>
    </div>
  );
};