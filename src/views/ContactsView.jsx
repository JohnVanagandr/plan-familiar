import { Card, Badge } from '@/components/ui';
import { DashboardHeader } from '@/layouts/components';
import { PhoneCall } from 'lucide-react';

export const ContactsView = () => {
  const contacts = [
    { name: "Línea Nacional de Emergencia", number: "123", type: "Institucional", desc: "Atención centralizada de emergencias en Colombia." },
    { name: "Defensa Civil Colombiana", number: "144", type: "Socorro", desc: "Línea directa para atención de desastres y gestión del riesgo." },
    { name: "Cruz Roja Colombiana", number: "132", type: "Médica", desc: "Apoyo en primeros auxilios y asistencia humanitaria." },
    { name: "Cuerpo de Bomberos", number: "119", type: "Rescate", desc: "Control de incendios, rescates y materiales peligrosos." },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      <DashboardHeader 
        badgeText="Directorio Operativo"
        badgeVariant="neutral"
        title="Contactos de Emergencia"
        description="Líneas de socorro y autoridades competentes disponibles 24/7."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {contacts.map((contact, index) => (
          
          <Card key={index} padding="sm" className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <Badge variant="primary" size="xs">{contact.type}</Badge>
              <h3 className="text-lg font-bold text-slate-900">{contact.name}</h3>
              <p className="text-xs text-slate-500 max-w-sm">{contact.desc}</p>
            </div>
            
            {/* Contenedor especial del número (Mantenido por su silueta expandida) */}
            <div className="bg-[#0770CC]/10 text-[#0770CC] px-4 py-3 rounded-2xl font-black text-xl tracking-wider flex items-center gap-2 shrink-0">
              <PhoneCall className="w-5 h-5" />
              <span>{contact.number}</span>
            </div>
          </Card>
          
        ))}
      </div>
    </div>
  );
};