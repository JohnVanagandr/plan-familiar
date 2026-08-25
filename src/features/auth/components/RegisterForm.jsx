import { useState } from 'react';
import { Button, Input, Badge, Link, Card } from '@/components/ui';
import { useRegister } from '../hooks/useRegister';

export const RegisterForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { register, loading, error, fieldErrors } = useRegister();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <Card padding="lg" className="w-full shadow-2xl shadow-slate-900/15">
      
      <div className="mb-8 space-y-3">
        <Badge variant="accent" size="sm" className="gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600]"></span>
          Registro Comunitario
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Crear Cuenta</h2>
        <p className="text-slate-500 text-sm font-normal leading-relaxed">
          Registra tus datos para habilitar la plataforma de prevención y respuesta familiar.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
          {error}
        </div>
      )}
      
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <Input 
          label="Nombre Completo" 
          type="text" 
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ej. Carlos Mendoza" 
          error={fieldErrors.name}
        />
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
          label="Contraseña de Acceso" 
          type="password" 
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Crea una contraseña segura" 
          error={fieldErrors.password}
        />
        
        <div className="pt-3">
          <Button 
            type="submit" 
            variant="accent" 
            fullWidth
            size="lg"
            isLoading={loading}
          >
            Registrarme Ahora
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-500 flex items-center justify-center gap-1">
        ¿Ya cuentas con un usuario activo?
        <Link href="/login" variant="link">
          Inicia sesión aquí
        </Link>
      </div>
    </Card>
  );
};