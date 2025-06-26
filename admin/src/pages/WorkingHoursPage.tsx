import { useEffect, useState } from "react";
import axios from "axios";
import type { WorkingHours } from "../types";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const WorkingHoursPage = () => {
  const [hours, setHours] = useState<WorkingHours[]>([]);
  const [sessionDuration, setSessionDuration] = useState(60);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/working-hours")
      .then((res) => {
        const existing: Record<string, WorkingHours> = {};
        res.data.forEach((h: WorkingHours) => {
          existing[h.day] = h;
        });

        const complete = days.map(
          (day) =>
            existing[day] || {
              day,
              isWorkingDay: false,
              morning: { start: "", end: "" },
              afternoon: { start: "", end: "" },
            }
        );

        setHours(complete);
      })
      .catch((err) => console.error("Erreur chargement horaires:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/settings")
      .then((res) => setSessionDuration(res.data.sessionDuration || 60))
      .catch((err) => console.error("Erreur chargement durée:", err));
  }, []);

  const handleChange = (day: string, field: keyof WorkingHours, value: any) => {
    setHours((prev) =>
      prev.map((h) => (h.day === day ? { ...h, [field]: value } : h))
    );
  };

  const handleTimeChange = (
    day: string,
    slot: "morning" | "afternoon",
    subfield: "start" | "end",
    value: string
  ) => {
    setHours((prev) =>
      prev.map((h) =>
        h.day === day
          ? {
              ...h,
              [slot]: {
                ...h[slot],
                [subfield]: value,
              },
            }
          : h
      )
    );
  };

  const handleSave = async () => {
    try {
      await Promise.all(
        hours.map((h) =>
          axios.put(`http://localhost:5000/api/working-hours/${h.day}`, h)
        )
      );
      alert("Horaires enregistrés !");
    } catch (err) {
      console.error("Erreur enregistrement:", err);
      alert("Erreur lors de l’enregistrement");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <label className="font-semibold mr-2">
          Durée des séances (minutes) :
        </label>
        <input
          type="number"
          className="border p-1 w-20"
          value={sessionDuration}
          onChange={(e) => setSessionDuration(parseInt(e.target.value))}
          min={15}
          step={15}
        />
        <button
          onClick={() => {
            axios
              .put("http://localhost:5000/api/settings", { sessionDuration })
              .then(() => alert("Durée mise à jour !"))
              .catch(() => alert("Erreur lors de la sauvegarde"));
          }}
          className="ml-4 px-4 py-1 bg-primary text-white rounded"
        >
          Enregistrer
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">
        Paramétrage des horaires de travail
      </h2>

      <div className="space-y-4">
        {days.map((day) => {
          const dayData = hours.find((h) => h.day === day) || {
            day,
            isWorkingDay: false,
          };

          return (
            <div key={day} className="border rounded p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{capitalize(day)}</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={dayData.isWorkingDay}
                    onChange={(e) =>
                      handleChange(day, "isWorkingDay", e.target.checked)
                    }
                  />
                  Travaille ce jour
                </label>
              </div>

              {dayData.isWorkingDay && (
                <div className="grid grid-cols-2 gap-4">
                  {/* Matin */}
                  <div>
                    <h4 className="font-medium mb-1">Matin</h4>
                    <div className="flex gap-2 items-center">
                      <input
                        type="time"
                        value={dayData.morning?.start || ""}
                        onChange={(e) =>
                          handleTimeChange(
                            day,
                            "morning",
                            "start",
                            e.target.value
                          )
                        }
                        className="border px-2 py-1 rounded"
                      />
                      <span>→</span>
                      <input
                        type="time"
                        value={dayData.morning?.end || ""}
                        onChange={(e) =>
                          handleTimeChange(
                            day,
                            "morning",
                            "end",
                            e.target.value
                          )
                        }
                        className="border px-2 py-1 rounded"
                      />
                    </div>
                  </div>

                  {/* Après-midi */}
                  <div>
                    <h4 className="font-medium mb-1">Après-midi</h4>
                    <div className="flex gap-2 items-center">
                      <input
                        type="time"
                        value={dayData.afternoon?.start || ""}
                        onChange={(e) =>
                          handleTimeChange(
                            day,
                            "afternoon",
                            "start",
                            e.target.value
                          )
                        }
                        className="border px-2 py-1 rounded"
                      />
                      <span>→</span>
                      <input
                        type="time"
                        value={dayData.afternoon?.end || ""}
                        onChange={(e) =>
                          handleTimeChange(
                            day,
                            "afternoon",
                            "end",
                            e.target.value
                          )
                        }
                        className="border px-2 py-1 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-right">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleSave}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default WorkingHoursPage;
