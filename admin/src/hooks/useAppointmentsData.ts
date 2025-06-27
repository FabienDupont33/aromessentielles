import { useEffect, useState } from "react";
import axios from "axios";
import type { Appointment, WorkingHours } from "../types";

export const useAppointmentsData = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([]);
  const [sessionDuration, setSessionDuration] = useState<number>(60);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resAppointments, resHours, resSettings] = await Promise.all([
        axios.get("http://localhost:5000/api/appointments"),
        axios.get("http://localhost:5000/api/working-hours"),
        axios.get("http://localhost:5000/api/settings"),
      ]);
      setAppointments(resAppointments.data);
      setWorkingHours(resHours.data);
      setSessionDuration(resSettings.data.sessionDuration || 60);
    } catch (err) {
      console.error("Erreur lors du chargement des données", err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error("Erreur lors du rechargement des rendez-vous", err);
    }
  };

  const updateAppointmentStatus = async (
    id: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/appointments/${id}`,
        { status }
      );
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === id ? res.data : appt))
      );
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut", err);
      throw err;
    }
  };

  return {
    appointments,
    workingHours,
    sessionDuration,
    fetchAppointments,
    updateAppointmentStatus,
  };
};
