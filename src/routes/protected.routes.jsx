import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardView } from '@/views/DashboardView';
import { ContactsView } from '@/views/ContactsView';
import { SettingsView } from '@/views/SettingsView';

// Nuevas vistas del ciclo de planes y administración
import { PlansHistoryView } from '@/views/PlansHistoryView';
import { PlanWorkspaceView } from '@/views/PlanWorkspaceView';
import { DatosBasicosView } from '@/views/plans/DatosBasicosView';
import { PresentacionView } from '@/views/plans/PresentacionView';
//INTEGRANTES
import { IntegrantesCreateView, IntegrantesEditView, IntegrantesView } from '@/views/plans/Integrantes';
//Mascotas
import { AnimalCreateView, AnimalEditView, AnimalesView } from '@/views/plans/animales';
//Riesgos
import { RiskFormView, RisksView } from '@/views/plans/riesgos';
import { ResourcesView, ResourceFormView} from '@/views/plans/recursos';
import EntornoGraphicView from '@/views/plans/Entorno/EntornoGraphicView';
import { HousingCreateView, HousingEditView, HousingGraphicView } from '@/views/plans/vivienda';
import GeoreferenceView from '@/views/plans/georeferencia/GeoreferenceView';


export const protectedRoutes = [
  {
    element: <DashboardLayout />,
    children: [
      // Rutas base existentes
      { path: "/dashboard", element: <DashboardView /> },
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

          { path: "animales",
            children: [
              { index: true, element:<AnimalesView /> },
              { path:"crear", element:<AnimalCreateView /> },
              { path:":animalId/editar", element:<AnimalEditView /> }
            ]
          },

          { path: "vivienda",
            children: [
              { index:true, element: <HousingGraphicView /> },
              { path:"crear", element: <HousingCreateView /> },
              { path:":graficoId/editar", element: <HousingEditView /> }
            ]
          },

          { path: "georeferenciacion", element: <GeoreferenceView/> },

          { path: "entorno", element: <EntornoGraphicView /> },

          { path: "riesgos",
            children: [
              { index: true, element: <RisksView />},
              { path:"crear", element: <RiskFormView /> },
              { path:":riesgoId/editar", element: <RiskFormView /> }
            ]
          },

          { path: "recursos",
            children: [
              { index: true, element: <ResourcesView />},
              { path:"crear", element: <ResourceFormView /> },
              { path:":recursoId/editar", element: <ResourceFormView /> }
            ]
          },

          { path: "plan-accion", element: <div>Vista Plan de Acción</div> },
        ]
      },
    ]
  }
];