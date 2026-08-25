import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { loginSchema } from '../schemas/auth.schema';

export const useLogin = () => {
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

  const login = async (credentials) => {
    setError(null);
    setFieldErrors({});

    const result = loginSchema.safeParse(credentials);
    if (!result.success) {
      setFieldErrors(formatZodErrors(result.error));
      return;
    }

    setLoading(true);
    try {
      const data = await authService.login(result.data);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || "Ocurrió un error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, fieldErrors };
};