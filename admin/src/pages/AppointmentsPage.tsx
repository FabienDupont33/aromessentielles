import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { format } from "date-fns";
import type { Appointment, WorkingHours } from "../types";
import "../styles/calendar.css";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([]);
  const [sessionDuration, setSessionDuration] = useState(60);

  useEffect(() => {
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

    fetchData();
  }, []);

  const formatTime = (timeStr: string) => {
    const [hour, minute] = timeStr.split(":");
    return `${hour}h${minute}`;
  };

  const generateAvailableSlots = (): any[] => {
    const slots: any[] = [];
    const today = new Date();
    const daysToRender = 30;

    const existingSlots = new Set(
      appointments.map((a) => `${a.date}T${a.time}`)
    );

    const addSlots = (
      dateStr: string,
      range: { start: string; end: string },
      _status: "available"
    ) => {
      let [hStart, mStart] = range.start.split(":").map(Number);
      const [hEnd, mEnd] = range.end.split(":").map(Number);

      const endTotalMinutes = hEnd * 60 + mEnd;

      while (hStart * 60 + mStart + sessionDuration <= endTotalMinutes) {
        const slotTime = `${String(hStart).padStart(2, "0")}:${String(
          mStart
        ).padStart(2, "0")}`;
        const iso = `${dateStr}T${slotTime}`;
        if (!existingSlots.has(iso)) {
          slots.push({
            title: "Créneau disponible",
            start: iso,
            className: "event-available",
            backgroundColor: "#e0f7fa",
            textColor: "#000000",
          });
        }

        mStart += sessionDuration;
        if (mStart >= 60) {
          hStart += Math.floor(mStart / 60);
          mStart %= 60;
        }
      }
    };

    for (let i = 0; i < daysToRender; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      const weekday = d
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();

      const h = workingHours.find((w) => w.day === weekday);
      if (h && h.isWorkingDay) {
        if (h.morning?.start && h.morning?.end)
          addSlots(dateStr, h.morning, "available");
        if (h.afternoon?.start && h.afternoon?.end)
          addSlots(dateStr, h.afternoon, "available");
      }
    }

    return slots;
  };

  const events = [
    ...appointments
      .filter((appt) => appt.status !== "rejected")
      .map((appt) => ({
        title: `${appt.name} - ${formatTime(appt.time)}`,
        start: `${appt.date}T${appt.time}`,
        backgroundColor:
          appt.status === "pending"
            ? "#fde68a"
            : appt.status === "accepted"
            ? "#a7f3d0"
            : "#fca5a5",
        textColor: "#000000",
        borderColor: "transparent",
      })),
    ...generateAvailableSlots(),
  ];

  const handleEventClick = (info: any) => {
    const clickedDateTime = format(info.event.start, "yyyy-MM-dd'T'HH:mm");
    const clicked = appointments.find(
      (a) => `${a.date}T${a.time}` === clickedDateTime
    );
    if (clicked) setSelectedAppointment(clicked);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Planning des rendez-vous</h1>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        dayMaxEventRows={true}
        height="auto"
        eventDisplay="block"
        locale="fr"
      />

      {selectedAppointment && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative">
            <button
              onClick={() => setSelectedAppointment(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Détails du rendez-vous</h2>
            <p>
              <strong>Nom :</strong> {selectedAppointment.name}
            </p>
            <p>
              <strong>Email :</strong> {selectedAppointment.email}
            </p>
            <p>
              <strong>Téléphone :</strong> {selectedAppointment.phone}
            </p>
            <p>
              <strong>Service :</strong> {selectedAppointment.service}
            </p>
            <p>
              <strong>Date :</strong> {selectedAppointment.date}
            </p>
            <p>
              <strong>Heure :</strong> {formatTime(selectedAppointment.time)}
            </p>
            <p>
              <strong>Message :</strong> {selectedAppointment.message}
            </p>
            <p>
              <strong>Statut :</strong> {selectedAppointment.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
