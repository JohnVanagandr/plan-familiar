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
import { PresentacionView } from '@/views/plans/PresentacionView';
//INTEGRANTES
import { IntegrantesCreateView, IntegrantesEditView, IntegrantesView } from '@/views/plans/Integrantes';


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
        path: "/planes-familiares", 
        element: <PlansHistoryView /> 
      },
      { 
        path: "/planes-familiares/:planId", 
        // element: <PlanWorkspaceView />,
        children: [
          // Redirección por defecto al primer módulo del plan, la presentación
          { index: true, element: <PresentacionView /> },
          
          // Los 9 módulos de administración del plan
          { path: "datos-basicos", element: <DatosBasicosView /> },

          { path: "integrantes",
            children: [
              { index: true, element: <IntegrantesView /> },
              { path:"crear", element:<IntegrantesCreateView /> },
              { path:":integranteId/editar", element:<IntegrantesEditView /> }
            ]
          },

          { path: "mascotas", element: <div>Vista Mascotas y Animales</div>,
            children: [
              { index: true, },
              { path:"crear", },
              { path:":animalId/editar" }
            ]
          },

          { path: "vivienda", element: <div>Vista Gráfico de Vivienda</div> },

          { path: "georeferenciacion", element: <div>Vista Georreferenciación</div> },

          { path: "entorno", element: <div>Vista Gráfico de Entorno</div> },

          { path: "riesgos", element: <RisksView /> ,
            children: [
              { index: true, },
              { path:"crear", },
              { path:":riesgoId/editar" }
            ]
          },

          { path: "recursos", element: <div>Vista Recursos Disponibles</div>,
            children: [
              { index: true, },
              { path:"crear", },
              { path:":recursoId/editar" }
            ]
          },

          { path: "plan-accion", element: <div>Vista Plan de Acción</div> },
        ]
      },
    ]
  }
];