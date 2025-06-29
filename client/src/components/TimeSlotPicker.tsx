import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  selectedDate: string;
  onTimeSelected: (time: string) => void;
}

const TimeSlotPicker = ({ selectedDate, onTimeSelected }: Props) => {
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const [workingHoursRes, settingsRes, appointmentsRes] =
          await Promise.all([
            axios.get("http://localhost:5000/api/working-hours"),
            axios.get("http://localhost:5000/api/settings"),
            axios.get(
              `http://localhost:5000/api/appointments/date/${selectedDate}`
            ),
          ]);

        const workingHours = workingHoursRes.data;
        const sessionDuration = settingsRes.data.sessionDuration;
        const takenAppointments = appointmentsRes.data.map((a: any) => a.time);

        const [year, month, day] = selectedDate.split("-").map(Number);
        const jsDate = new Date(year, month - 1, day);
        const dayIndex = jsDate.getDay();

        const dayName = [
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ][dayIndex];

        const dayConfig = workingHours.find((h: any) => h.day === dayName);

        if (!dayConfig || !dayConfig.isWorkingDay) {
          setSlots([]);
          return;
        }

        const generateSlots = (start: string, end: string): string[] => {
          const result: string[] = [];

          const [startHour, startMinute] = start.split(":").map(Number);
          const [endHour, endMinute] = end.split(":").map(Number);

          const startDate = new Date(
            year,
            month - 1,
            day,
            startHour,
            startMinute
          );
          const endDate = new Date(year, month - 1, day, endHour, endMinute);

          let current = new Date(startDate);

          while (current < endDate) {
            const timeStr = current.toTimeString().slice(0, 5);
            if (!takenAppointments.includes(timeStr)) {
              result.push(timeStr);
            }
            current = new Date(current.getTime() + sessionDuration * 60000);
          }

          return result;
        };

        const morningSlots =
          dayConfig.morning?.start && dayConfig.morning?.end
            ? generateSlots(dayConfig.morning.start, dayConfig.morning.end)
            : [];

        const afternoonSlots =
          dayConfig.afternoon?.start && dayConfig.afternoon?.end
            ? generateSlots(dayConfig.afternoon.start, dayConfig.afternoon.end)
            : [];

        setSlots([...morningSlots, ...afternoonSlots]);
        setSelectedTime(""); // Réinitialiser la sélection si on change de jour
      } catch (err) {
        console.error("Erreur chargement des créneaux :", err);
        setSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDate]);

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    onTimeSelected(time);
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500">Chargement des créneaux...</p>
    );
  }

  if (slots.length === 0) {
    return (
      <p className="text-center text-red-500">
        Aucun créneau disponible ce jour.
      </p>
    );
  }

  return (
    <div>
      <label className="block mb-2 font-medium">Choisissez un horaire :</label>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => handleSelectTime(time)}
            className={`border px-4 py-2 rounded transition ${
              selectedTime === time
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
