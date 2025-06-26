import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import TimeSlotPicker from "../components/TimeSlotPicker";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/working-hours")
      .then((res) => {
        const days = res.data
          .filter((d: any) => d.isWorkingDay)
          .map((d: any) => d.day); // ex: "monday", "tuesday"
        setWorkingDays(days);
      })
      .catch((err) => {
        console.error("Erreur récupération jours ouvrés :", err);
        setWorkingDays([]); // fallback
      });
  }, []);

  const isDayDisabled = (date: Date) => {
    const weekday = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    return !workingDays.includes(weekday);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Votre demande de rendez-vous a bien été envoyée !");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          time: "",
          message: "",
        });
        setSelectedDate(null);
      } else {
        setError(data.error || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Impossible de contacter le serveur.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-6 py-8 bg-white shadow-lg rounded-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Prendre rendez-vous
      </h2>

      {success && <p className="text-green-600 text-center mb-4">{success}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          required
          placeholder="Nom complet"
          className="input"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Adresse e-mail"
          className="input"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          type="tel"
          required
          placeholder="Téléphone"
          className="input"
          value={formData.phone}
          onChange={handleChange}
        />

        <select
          name="service"
          required
          className="input"
          value={formData.service}
          onChange={handleChange}
        >
          <option value="">Choisissez un service</option>
          <option value="Massage aromathérapeutique">
            Massage aromathérapeutique
          </option>
          <option value="Conseil personnalisé">Conseil personnalisé</option>
          <option value="Bilan bien-être">Bilan bien-être</option>
        </select>

        <div className="relative">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => {
              setSelectedDate(date);
              setFormData((prev) => ({
                ...prev,
                date: date.toISOString().split("T")[0],
                time: "",
              }));
            }}
            filterDate={(date: Date) => !isDayDisabled(date)}
            placeholderText="Choisissez une date"
            className="input w-full"
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            popperPlacement="bottom-start"
            popperClassName="z-50"
            portalId="root-portal"
            withPortal
          />
        </div>

        {formData.date && (
          <TimeSlotPicker
            selectedDate={formData.date}
            onTimeSelected={(time) =>
              setFormData((prev) => ({ ...prev, time }))
            }
          />
        )}

        <textarea
          name="message"
          rows={4}
          placeholder="Message complémentaire (facultatif)"
          className="input"
          value={formData.message}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition"
        >
          Envoyer la demande
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
