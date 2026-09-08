import AdminDashboard from "./dashboards/AdminDashboard";
import SupervisorDashboard from "./dashboards/SupervisorDashboard";
import { VoluntarioDashboard } from "./dashboards/VoluntarioDashboard";

export const DashboardView = () => {

  const rol = localStorage.getItem("rol");

      return (
        <>
            {rol === "Administrador" && <AdminDashboard />}
            {rol === "Supervisor" && <SupervisorDashboard />}
            {rol === "voluntario" && <VoluntarioDashboard />}
        </>
    );
};