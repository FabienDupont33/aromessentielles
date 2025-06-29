// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AppointmentsPage from "./pages/AppointmentsPage";
import WorkingHoursPage from "./pages/WorkingHoursPage";
import ClientsPage from "./pages/ClientsPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Navigate to="/appointments" />
          </PrivateRoute>
        }
      />

      <Route
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/working-hours" element={<WorkingHoursPage />} />
        <Route path="/clients" element={<ClientsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
