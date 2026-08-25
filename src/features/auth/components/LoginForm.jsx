import { useState } from 'react';
import { Button, Input, Badge, Link, Card } from '@/components/ui'; 
import { useLogin } from '../hooks/useLogin';

export const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, loading, error, fieldErrors } = useLogin();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <Card padding="lg" className="w-full shadow-2xl shadow-slate-900/15">
      
      <div className="mb-8 space-y-3">
        <Badge variant="primary" size="sm" className="gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0770CC]"></span>
          Portal Oficial de Acceso
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Iniciar Sesión</h2>
        <p className="text-slate-500 text-sm font-normal leading-relaxed">
          Introduce tus credenciales institucionales para gestionar tu plan familiar de emergencia.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
          {error}
        </div>
      )}
      
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <Input 
          label="Correo Electrónico" 
          type="email" 
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="nombre@defensacivil.gov.co" 
          error={fieldErrors.email}
        />
        <Input 
          label="Contraseña" 
          type="password" 
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••••••" 
          error={fieldErrors.password}
        />
        
        <div className="pt-3">
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth
            size="lg"
            isLoading={loading}
          >
            Acceder al Sistema
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-3 text-sm">
        <Link href="/recover-user" variant="link" className="text-slate-500">
          ¿Olvidaste tu contraseña?
        </Link>
        <div className="text-slate-500 text-xs flex items-center gap-1">
          ¿No tienes una cuenta registrada?
          <Link href="/register" variant="link">
            Solicitar alta institucional
          </Link>
        </div>
      </div>
    </Card>
  );
};