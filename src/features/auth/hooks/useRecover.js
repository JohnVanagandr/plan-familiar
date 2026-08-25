import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { recoverSchema } from '../schemas';
import { toast } from 'sonner';

export const useRecover = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const formatZodErrors = (zodError) => {
    const errors = {};
    zodError.issues.forEach((err) => {
      const field = err.path[0];
      if (field && !errors[field]) {
        errors[field] = err.message;
      }
    });
    return errors;
  };

  const recoverPassword = async (payload) => {
    setError(null);
    setFieldErrors({});

    const result = recoverSchema.safeParse(payload);
    if (!result.success) {
      setFieldErrors(formatZodErrors(result.error));
      return;
    }

    setLoading(true);
    try {
      await authService.recoverPassword(result.data.email);
      
      toast.success("Protocolo Iniciado", {
        description: "Se han enviado las instrucciones seguras a tu correo institucional."
      });
      
      navigate('/login');
    } catch (err) {
      const errorMessage = err.message || "Error al enviar el correo de recuperación.";
      setError(errorMessage);
      
      toast.error("Fallo de Seguridad", {
        description: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return { recoverPassword, loading, error, fieldErrors };
};