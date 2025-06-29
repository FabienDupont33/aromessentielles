// src/components/ClientDetailsModal.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { API_BASE_URL } from "../config";
import type { Appointment, Client } from "../types";

interface Props {
  client: Client;
  onClose: () => void;
  onClientUpdated?: () => void;
}

const statusColors: Record<string, string> = {
  accepted: "bg-green-100",
  rejected: "bg-red-100",
  pending: "bg-orange-100",
};

const ClientDetailsModal = ({ client, onClose, onClientUpdated }: Props) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [formData, setFormData] = useState<Client>(client);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/appointments/client/${client.email}`)
      .then((res) => setAppointments(res.data))
      .catch(() => setAppointments([]));
  }, [client.email]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${API_BASE_URL}/api/clients/${client._id}`, formData);
      onClientUpdated?.();
      onClose();
    } catch (err) {
      console.error("Erreur mise à jour client", err);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (
    appointmentId: string,
    newStatus: string
  ) => {
    try {
      await axios.put(`${API_BASE_URL}/api/appointments/${appointmentId}`, {
        status: newStatus,
      });
      // Refresh the list after update
      const res = await axios.get(
        `${API_BASE_URL}/api/appointments/client/${client.email}`
      );

      setAppointments(res.data);
    } catch (err) {
      console.error("Erreur changement de statut", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Fiche client</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="lastName"
            className="input"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Nom"
          />
          <input
            type="text"
            name="firstName"
            className="input"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Prénom"
          />
          <input
            type="email"
            name="email"
            className="input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="tel"
            name="phone"
            className="input"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Téléphone"
          />
        </div>

        <label className="block font-medium mb-1">Notes :</label>
        <textarea
          name="notes"
          rows={3}
          className="input w-full mb-4"
          value={formData.notes || ""}
          onChange={handleChange}
        />

        <h3 className="text-lg font-semibold mb-2">
          Historique des rendez-vous
        </h3>
        {appointments.length === 0 ? (
          <p className="text-sm text-gray-500">Aucun rendez-vous enregistré.</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {appointments.map((a) => (
              <li
                key={a._id}
                className={`p-3 rounded-md ${
                  statusColors[a.status]
                } flex justify-between items-center`}
              >
                <div>
                  <div className="font-semibold">
                    {format(new Date(`${a.date}T${a.time}`), "dd/MM/yyyy")} à{" "}
                    {a.time}
                  </div>
                  <div className="text-sm text-gray-700">
                    Service : {a.service || "—"}
                  </div>
                  <div className="text-xs text-gray-500 italic">
                    Statut : {a.status}
                  </div>
                </div>
                {a.status === "pending" && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(a._id!, "accepted")}
                      title="Accepter"
                      className="text-green-600 text-xl"
                    >
                      ✔️
                    </button>
                    <button
                      onClick={() => handleStatusChange(a._id!, "rejected")}
                      title="Refuser"
                      className="text-red-600 text-xl"
                    >
                      ❌
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 w-full bg-primary text-white py-2 rounded hover:bg-primary-dark disabled:opacity-50"
        >
          {saving ? "Sauvegarde..." : "Sauvegarder les informations"}
        </button>
      </div>
    </div>
  );
};

export default ClientDetailsModal;
