import { PublicLayout } from '@/layouts/PublicLayout';
import { HomeView } from '@/views/HomeView';

export const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      { 
        path: "/", 
        element: <HomeView />,
        handle: { hideHeader: true } // <-- Oculta el header solo en el Home
      }
    ]
  }
];