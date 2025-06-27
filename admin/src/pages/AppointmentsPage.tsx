import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { format } from "date-fns";

import "../styles/calendar.css";

import type { Appointment } from "../types";
import AddAppointmentModal from "../components/AddAppointmentModal";
import AppointmentDetailsModal from "../components/AppointmentDetailsModal";
import CalendarEventDetails from "../components/CalendarEventDetails";

import { useAppointmentsData } from "../hooks/useAppointmentsData";
import {
  generateAvailableSlots,
  getCalendarEvents,
} from "../utils/calendarUtils";

const AppointmentsPage = () => {
  const {
    appointments,
    workingHours,
    sessionDuration,
    fetchAppointments,
    updateAppointmentStatus,
  } = useAppointmentsData();

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    time: string;
  } | null>(null);

  const events = [
    ...getCalendarEvents(appointments),
    ...generateAvailableSlots(appointments, workingHours, sessionDuration),
  ];

  const handleEventClick = (info: any) => {
    const clickedDateTime = format(info.event.start, "yyyy-MM-dd'T'HH:mm");

    if (info.event.title === "Créneau disponible") {
      const [date, time] = clickedDateTime.split("T");
      setSelectedSlot({ date, time });
    } else {
      const clicked = appointments.find(
        (a) => `${a.date}T${a.time}` === clickedDateTime
      );
      if (clicked) setSelectedAppointment(clicked);
    }
  };

  const handleStatusChange = async (newStatus: "accepted" | "rejected") => {
    if (!selectedAppointment) return;
    await updateAppointmentStatus(selectedAppointment._id, newStatus);
    setSelectedAppointment(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Planning des rendez-vous</h1>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={localStorage.getItem("calendarView") || "timeGridWeek"}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        events={events}
        eventClick={handleEventClick}
        eventContent={(eventInfo) =>
          CalendarEventDetails(eventInfo, appointments)
        }
        locale={frLocale}
        height="auto"
        eventDisplay="block"
        dayMaxEventRows={true}
        datesSet={(arg) => {
          localStorage.setItem("calendarView", arg.view.type);
        }}
      />

      {selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {selectedSlot && (
        <AddAppointmentModal
          date={selectedSlot.date}
          time={selectedSlot.time}
          defaultStatus="accepted"
          onClose={() => setSelectedSlot(null)}
          onSuccess={() => {
            setSelectedSlot(null);
            fetchAppointments();
          }}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
