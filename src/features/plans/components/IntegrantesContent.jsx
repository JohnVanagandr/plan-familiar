import { Card, Badge, Button, IconBox } from '@/components/ui';
import { Users, UserPlus, Shield, Phone } from 'lucide-react';

export const IntegrantesContent = () => {
  const familyMembers = [
    { name: "Carlos Mendoza", role: "Jefe de Núcleo / Coordinador", age: 42, phone: "+57 310 456 7890", status: "Activo" },
    { name: "Ana María Ruiz", role: "Encuesta de Suministros y Botiquín", age: 39, phone: "+57 312 987 6543", status: "Activo" },
    { name: "Sofía Mendoza", role: "Apoyo a Menores / Puntos de Encuentro", age: 14, phone: "N/A", status: "Registrado" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Cabecera del Módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Badge variant="primary" size="sm" className="mb-2">Gestión de Hogar</Badge>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Núcleo Familiar</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Administra los roles y responsabilidades de cada integrante del hogar ante emergencias.
          </p>
        </div>
        <Button variant="primary" size="md">
          <UserPlus className="w-4 h-4" />
          Agregar Miembro
        </Button>
      </div>

      {/* GRID DE MIEMBROS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {familyMembers.map((member, index) => (
          
          <Card key={index} variant="default" padding="sm">
            
            <div className="flex items-center justify-between mb-4">
              <IconBox icon={Users} variant="primary" size="md" />
              <Badge variant="success" size="xs">{member.status}</Badge>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
            <p className="text-xs font-semibold text-[#0770CC] mt-0.5">{member.role}</p>
            
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-400" />
                <span>Edad: {member.age} años</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{member.phone}</span>
              </div>
            </div>
            
          </Card>
        ))}
      </div>
      
    </div>
  );
};