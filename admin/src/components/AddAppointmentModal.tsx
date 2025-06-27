import { useState, useEffect } from "react";
import axios from "axios";
import type { Client } from "../types";

interface Props {
  date: string;
  time: string;
  onClose: () => void;
  onSuccess: () => void;
  defaultStatus?: "pending" | "accepted";
}

const AddAppointmentModal = ({
  date,
  time,
  onClose,
  onSuccess,
  defaultStatus = "accepted",
}: Props) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date,
    time,
    message: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/clients").then((res) => {
      setClients(res.data);
    });
  }, []);

  const handleClientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedClientId(id);
    const client = clients.find((c) => c._id === id);
    if (client) {
      setFormData((prev) => ({
        ...prev,
        name: `${client.firstName} ${client.lastName}`,
        email: client.email,
        phone: client.phone,
      }));
    }
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
    try {
      await axios.post("http://localhost:5000/api/appointments", {
        ...formData,
        status: "accepted",
      });
      onSuccess();
      onClose();
    } catch (err) {
      alert("Erreur lors de la création du rendez-vous");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Créer un rendez-vous</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={selectedClientId}
            onChange={handleClientSelect}
            className="input w-full"
          >
            <option value="">Sélectionner un client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.firstName} {client.lastName} - {client.email}
              </option>
            ))}
          </select>

          <input
            name="name"
            type="text"
            placeholder="Nom complet"
            className="input w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            type="tel"
            placeholder="Téléphone"
            className="input w-full"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="input w-full"
            required
          >
            <option value="">Choisir un service</option>
            <option value="Massage aromathérapeutique">
              Massage aromathérapeutique
            </option>
            <option value="Conseil personnalisé">Conseil personnalisé</option>
            <option value="Bilan bien-être">Bilan bien-être</option>
          </select>

          <textarea
            name="message"
            rows={3}
            placeholder="Message"
            className="input w-full"
            value={formData.message}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
          >
            Créer le rendez-vous
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
