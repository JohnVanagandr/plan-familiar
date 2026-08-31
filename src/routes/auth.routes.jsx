import { AuthLayout } from '@/layouts/AuthLayout';
import { LoginRegisterView, RecoverView } from '@/views/auth';

// --- RUTAS DE AUTENTICACIÓN ---
export const authRoutes = [
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginRegisterView /> },
      { path: "/register", element: <LoginRegisterView /> },
      { path: "/recover-user", element: <RecoverView /> }
    ]
  }
];