import { format } from "date-fns";
import type { Appointment } from "../types";

const CalendarEventDetails = (eventInfo: any, appointments: Appointment[]) => {
  const time = format(eventInfo.event.start, "HH'h'mm");
  const [titlePart] = eventInfo.event.title.split(" - ");
  const isAvailable = titlePart === "Créneau disponible";

  const wrapper = document.createElement("div");
  wrapper.className = "flex rounded overflow-hidden shadow-sm";
  wrapper.style.backgroundColor = isAvailable
    ? "#E0F2FE"
    : eventInfo.event.backgroundColor || "#F3F4F6";
  wrapper.style.color = isAvailable ? "#0C4A6E" : "#111827";
  wrapper.style.maxWidth = "100%";
  wrapper.style.overflow = "hidden";

  const timeDiv = document.createElement("div");
  timeDiv.textContent = time;
  timeDiv.style.width = "60px";
  timeDiv.style.textAlign = "center";
  timeDiv.style.padding = "0.5rem";
  timeDiv.style.fontWeight = "600";
  timeDiv.style.borderRight = "1px solid rgba(0,0,0,0.1)";

  const contentDiv = document.createElement("div");
  contentDiv.style.flex = "1";
  contentDiv.style.padding = "0.5rem";
  contentDiv.style.wordWrap = "break-word";
  contentDiv.style.whiteSpace = "normal";

  if (isAvailable) {
    contentDiv.innerHTML = `<div class="font-medium">Créneau disponible</div>`;
  } else {
    const appt = appointments.find(
      (a) =>
        `${a.date}T${a.time}` ===
        format(eventInfo.event.start, "yyyy-MM-dd'T'HH:mm")
    );
    contentDiv.innerHTML = `
      <div class="font-medium">${appt?.name}</div>
      <div class="text-sm">${appt?.service}</div>
      <div class="text-xs text-gray-600">${appt?.phone}</div>
    `;
  }

  wrapper.appendChild(timeDiv);
  wrapper.appendChild(contentDiv);

  return { domNodes: [wrapper] }; // <- FullCalendar s'attend à ça
};

export default CalendarEventDetails;
