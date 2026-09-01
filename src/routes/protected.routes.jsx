import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardView } from '@/views/DashboardView';
import { RisksView } from '@/views/RisksView';
import { ContactsView } from '@/views/ContactsView';
import { SettingsView } from '@/views/SettingsView';

// Nuevas vistas del ciclo de planes y administración
import { PlansHistoryView } from '@/views/PlansHistoryView';
import { PlanWorkspaceView } from '@/views/PlanWorkspaceView';
import { DatosBasicosView } from '@/views/plans/DatosBasicosView';
import { IntegrantesView } from '@/views/plans/IntegrantesView';
import { PresentacionView } from '@/views/plans/PresentacionView';

export const protectedRoutes = [
  {
    element: <DashboardLayout />,
    children: [
      // Rutas base existentes
      { path: "/dashboard", element: <DashboardView /> },
      { path: "/dashboard/risks", element: <RisksView /> },
      { path: "/dashboard/contacts", element: <ContactsView /> },
      { path: "/dashboard/settings", element: <SettingsView /> },

      // --- Nuevas Rutas de Gestión de Planes ---
      { 
        path: "/dashboard/plans", 
        element: <PlansHistoryView /> 
      },
      { 
        path: "/dashboard/plans/:planId", 
        // element: <PlanWorkspaceView />,
        children: [
          // Redirección por defecto al primer módulo del plan
          { index: true, element: <Navigate to="datos-principales" replace /> },
          
          // Los 9 módulos de administración del plan
          { path: "presentacion-familia", element: <PresentacionView /> },
          { path: "datos-basicos", element: <DatosBasicosView /> },
          { path: "integrantes", element: <IntegrantesView /> },
          { path: "mascotas", element: <div>Vista Mascotas y Animales</div> },
          { path: "vivienda", element: <div>Vista Gráfico de Vivienda</div> },
          { path: "georeferenciacion", element: <div>Vista Georreferenciación</div> },
          { path: "entorno", element: <div>Vista Gráfico de Entorno</div> },
          { path: "riesgos", element: <RisksView /> }, // Reutilizando componentes institucionales
          { path: "recursos", element: <div>Vista Recursos Disponibles</div> },
          { path: "plan-accion", element: <div>Vista Plan de Acción</div> },
        ]
      },
    ]
  }
];