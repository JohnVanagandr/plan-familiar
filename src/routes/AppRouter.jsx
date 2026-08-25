import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { authRoutes } from '@/routes/auth.routes';
import { publicRoutes } from '@/routes/public.routes';
import { protectedRoutes } from '@/routes/protected.routes';

export const AppRouter = () => {
  const router = createBrowserRouter([
    ...publicRoutes,
    ...authRoutes,
    ...protectedRoutes,
    { path: "*", element: <Navigate to="/" replace /> }
  ]);

  return <RouterProvider router={router} />;
};