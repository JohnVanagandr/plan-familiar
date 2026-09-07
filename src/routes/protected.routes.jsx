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
import { MapaView } from '@/views/MapaView';
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
import PlanAccionView from '@/views/plans/plan_accion/PlanAccionView';
import SeccionalesView from '@/views/datos_maestros/seccionales/SeccionalesView';
import SeccionalDetailView from '@/views/datos_maestros/seccionales/SeccionalDetailView';


export const protectedRoutes = [
  {
    element: <DashboardLayout />,
    children: [
      // Rutas base existentes
      { path: "/dashboard", element: <DashboardView /> },
      { path: "/dashboard/contacts", element: <ContactsView /> },
      { path: "/dashboard/settings", element: <SettingsView /> },
      { path: "/dashboard/mapa", element: <MapaView />},

      // --- Rutas de Gestión de Planes ---
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

          { path: "plan-accion", element: <PlanAccionView /> },
        ]
      },

      // --- Rutas de Gestión de Datos Maestros ---

      {
        path: "/datos-maestros",
        children: [
          { index: true, element: <div>Presentación a datos básicos</div> },
      
          {
            path: "seccionales",
            children: [
              { index: true, element: <SeccionalesView /> },
              { path: ":idSeccional", element: <SeccionalDetailView /> },
            ],
          },
          {
            path: "organizaciones",
            children: [
              { index: true, element: <div>listado de organizaciones</div> },
              { path: ":idOrganizacion", element: <div>historial y edición de organización</div> },
            ],
          },
          {
            path: "tipos-documento",
            children: [
              { index: true, element: <div>listado de tipos de documento</div> },
              { path: ":idTipoDocumento", element: <div>historial y edición de tipo de documento</div> },
            ],
          },
          {
            path: "calidades-vivienda",
            children: [
              { index: true, element: <div>listado de calidades de vivienda</div> },
              { path: ":idCalidadVivienda", element: <div>historial y edición de calidad de vivienda</div> },
            ],
          },
          {
            path: "sectores",
            children: [
              { index: true, element: <div>listado de sectores</div> },
              { path: ":idSector", element: <div>historial y edición de sector</div> },
            ],
          },
          {
            path: "preguntas-vulnerabilidad",
            children: [
              { index: true, element: <div>listado de preguntas de vulnerabilidad</div> },
              { path: ":idPregunta", element: <div>historial y edición de pregunta de vulnerabilidad</div> },
            ],
          },
          {
            path: "nacionalidades",
            children: [
              { index: true, element: <div>listado de nacionalidades</div> },
              { path: ":idNacionalidad", element: <div>historial y edición de nacionalidad</div> },
            ],
          },
          {
            path: "tipos-amenaza",
            children: [
              { index: true, element: <div>listado de tipos de amenaza</div> },
              { path: ":idTipoAmenaza", element: <div>historial y edición de tipo de amenaza</div> },
            ],
          },
          {
            path: "especies",
            children: [
              { index: true, element: <div>listado de especies</div> },
              { path: ":idEspecie", element: <div>historial y edición de especie</div> },
            ],
          },
          {
            path: "recursos",
            children: [
              { index: true, element: <div>listado de recursos</div> },
              { path: ":idRecurso", element: <div>historial y edición de recurso</div> },
            ],
          },
          {
            path: "vulnerabilidades",
            children: [
              { index: true, element: <div>listado de vulnerabilidades</div> },
              { path: ":idVulnerabilidad", element: <div>historial y edición de vulnerabilidad</div> },
            ],
          },
          {
            path: "ciudades",
            children: [
              { index: true, element: <div>listado de ciudades</div> },
              { path: ":idCiudad", element: <div>historial y edición de ciudad</div> },
            ],
          },
          {
            path: "departamentos",
            children: [
              { index: true, element: <div>listado de departamentos</div> },
              { path: ":idDepartamento", element: <div>historial y edición de departamento</div> },
            ],
          },
        ],
      }
    ]
  }
];