import { format } from "date-fns";
import type { Appointment, WorkingHours } from "../types";

// Génère les événements FullCalendar à partir des rendez-vous existants
export const getCalendarEvents = (appointments: Appointment[]) => {
  return appointments
    .filter((appt) => appt.status !== "rejected")
    .map((appt) => ({
      title: `${appt.name} - ${formatTime(appt.time)}`,
      start: `${appt.date}T${appt.time}`,
      backgroundColor:
        appt.status === "pending"
          ? "#FEF9C3"
          : appt.status === "accepted"
          ? "#DCFCE7"
          : "#FCA5A5",
      textColor: "#000000",
      borderColor: "transparent",
    }));
};

// Génère les créneaux disponibles
export const generateAvailableSlots = (
  appointments: Appointment[],
  workingHours: WorkingHours[],
  sessionDuration: number
) => {
  const slots: any[] = [];
  const today = new Date();
  const daysToRender = 30;

  const existingSlots = new Set(
    appointments
      .filter((a) => a.status !== "rejected")
      .map((a) => `${a.date}T${a.time}`)
  );

  const addSlots = (
    dateStr: string,
    range?: { start: string; end: string }
  ) => {
    if (!range) return;
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
          backgroundColor: "#E0F2FE",
          textColor: "#0C4A6E",
          className: "event-available",
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
      addSlots(dateStr, h.morning);
      addSlots(dateStr, h.afternoon);
    }
  }

  return slots;
};

// Format une heure de type "14:30" vers "14h30"
export const formatTime = (timeStr: string) => {
  const [hour, minute] = timeStr.split(":");
  return `${hour}h${minute}`;
};
