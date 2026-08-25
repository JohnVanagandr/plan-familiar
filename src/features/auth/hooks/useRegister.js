import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { registerSchema } from '../schemas/auth.schema';

export const useRegister = () => {
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

  const register = async (userData) => {
    setError(null);
    setFieldErrors({});

    const result = registerSchema.safeParse(userData);
    if (!result.success) {
      setFieldErrors(formatZodErrors(result.error));
      return;
    }

    setLoading(true);
    try {
      await authService.register(result.data);
      navigate('/login');
    } catch (err) {
      setError(err.message || "Error al procesar el registro.");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, fieldErrors };
};