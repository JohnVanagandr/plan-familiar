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

import { SeccionalesView, SeccionalDetailView } from '@/views/datos_maestros/seccionales';
import { OrganizacionDetailView, OrganizacionesView } from '@/views/datos_maestros/organizaciones';
import { TipoDocumentoDetailView, TiposDocumentoView } from '@/views/datos_maestros/documentos';
import { CalidadesViviendaView, CalidadViviendaDetailView } from '@/views/datos_maestros/calidades';
import { SectorDetailView, SectoresView } from '@/views/datos_maestros/sectores';
import { PreguntasVulnerabilidadView, PreguntaVulnerabilidadDetailView } from '@/views/datos_maestros/preguntas';
import { NacionalidadDetailView, NacionalidadesView } from '@/views/datos_maestros/nacionalidades';
import { TipoAmenazaDetailView, TiposAmenazaView } from '@/views/datos_maestros/amenazas';
import { EspecieDetailView, EspeciesView } from '@/views/datos_maestros/especies';
import { RecursoDetailView, RecursosView } from '@/views/datos_maestros/recursos';
import { VulnerabilidadDetailView, VulnerabilidadesView } from '@/views/datos_maestros/vulnerabilidades';
import { CiudadDetailView, CiudadesView } from '@/views/datos_maestros/ciudades';
import { DepartamentoDetailView, DepartamentosView } from '@/views/datos_maestros/departamentos';
import { DatosMaestrosView } from '@/views/datos_maestros/DatosMaestrosView';


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
          { index: true, element: <DatosMaestrosView/> },
      
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
              { index: true, element: <OrganizacionesView /> },
              { path: ":idOrganizacion", element: <OrganizacionDetailView /> },
            ],
          },
          {
            path: "tipos-documento",
            children: [
              { index: true, element: <TiposDocumentoView /> },
              { path: ":idTipoDocumento", element: <TipoDocumentoDetailView /> },
            ],
          },
          {
            path: "calidades-vivienda",
            children: [
              { index: true, element: <CalidadesViviendaView /> },
              { path: ":idCalidadVivienda", element: <CalidadViviendaDetailView /> },
            ],
          },
          {
            path: "sectores",
            children: [
              { index: true, element: <SectoresView /> },
              { path: ":idSector", element: <SectorDetailView /> },
            ],
          },
          {
            path: "preguntas-vulnerabilidad",
            children: [
              { index: true, element: <PreguntasVulnerabilidadView /> },
              { path: ":idPregunta", element: <PreguntaVulnerabilidadDetailView /> },
            ],
          },
          {
            path: "nacionalidades",
            children: [
              { index: true, element: <NacionalidadesView /> },
              { path: ":idNacionalidad", element: <NacionalidadDetailView /> },
            ],
          },
          {
            path: "tipos-amenaza",
            children: [
              { index: true, element: <TiposAmenazaView /> },
              { path: ":idTipoAmenaza", element: <TipoAmenazaDetailView /> },
            ],
          },
          {
            path: "especies",
            children: [
              { index: true, element: <EspeciesView /> },
              { path: ":idEspecie", element: <EspecieDetailView /> },
            ],
          },
          {
            path: "recursos",
            children: [
              { index: true, element: <RecursosView /> },
              { path: ":idRecurso", element: <RecursoDetailView /> },
            ],
          },
          {
            path: "vulnerabilidades",
            children: [
              { index: true, element: <VulnerabilidadesView /> },
              { path: ":idVulnerabilidad", element: <VulnerabilidadDetailView /> },
            ],
          },
          {
            path: "ciudades",
            children: [
              { index: true, element: <CiudadesView /> },
              { path: ":idCiudad", element: <CiudadDetailView /> },
            ],
          },
          {
            path: "departamentos",
            children: [
              { index: true, element: <DepartamentosView /> },
              { path: ":idDepartamento", element: <DepartamentoDetailView /> },
            ],
          },
        ],
      }
    ]
  }
];