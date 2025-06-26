import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AppointmentsPage from "./pages/AppointmentsPage";
import WorkingHoursPage from "./pages/WorkingHoursPage";
import ClientsPage from "./pages/ClientsPage"; // ✅ ajout

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/appointments" />} />
      <Route element={<AdminLayout />}>
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/working-hours" element={<WorkingHoursPage />} />
        <Route path="/clients" element={<ClientsPage />} />{" "}
        {/* ✅ nouvelle route */}
      </Route>
    </Routes>
  );
}

export default App;
