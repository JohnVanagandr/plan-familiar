import { useState } from 'react';
import { Button, Input, Badge, Link, Card } from '@/components/ui';
import { useRecover } from '../hooks/useRecover';

export const RecoverForm = () => {
  const [form, setForm] = useState({ email: '' });
  const { recoverPassword, loading, error, fieldErrors } = useRecover();

  const onSubmit = (e) => {
    e.preventDefault();
    recoverPassword(form);
  };

  return (
    <Card padding="lg" className="w-full shadow-2xl shadow-slate-900/15">
      
      <div className="mb-8 space-y-3">
        <Badge variant="neutral" size="sm" className="gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
          Protocolo de Seguridad
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Recuperar Acceso</h2>
        <p className="text-slate-500 text-sm font-normal leading-relaxed">
          Ingresa tu correo institucional para recibir un enlace cifrado de restablecimiento.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
          {error}
        </div>
      )}
      
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <Input 
          label="Correo Electrónico Institucional" 
          type="email" 
          name="email"
          value={form.email}
          onChange={(e) => setForm({ email: e.target.value })}
          placeholder="nombre@defensacivil.gov.co" 
          error={fieldErrors.email}
        />
        
        <div className="pt-3">
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            size="lg"
            isLoading={loading}
          >
            Enviar Instrucciones
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs flex justify-center">
        <Link href="/login" variant="link" className="text-slate-600">
          <span>&larr;</span> Regresar al inicio de sesión
        </Link>
      </div>
    </Card>
  );
};