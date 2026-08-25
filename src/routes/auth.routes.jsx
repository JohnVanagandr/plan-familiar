import { AuthLayout } from '@/layouts/AuthLayout';
import { LoginView, RegisterView, RecoverView } from '@/views/auth';

// --- RUTAS DE AUTENTICACIÓN ---
export const authRoutes = [
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginView /> },
      { path: "/register", element: <RegisterView /> },
      { path: "/recover-user", element: <RecoverView /> }
    ]
  }
];