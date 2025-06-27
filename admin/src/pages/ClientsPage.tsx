// src/pages/ClientsPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import type { Client } from "../types";

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState<Client>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clients");
      setClients(res.data);
    } catch (err) {
      console.error("Erreur chargement clients", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/clients/${editingId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/clients", formData);
      }
      fetchClients();
      setShowModal(false);
      setFormData({ firstName: "", lastName: "", phone: "", email: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Erreur sauvegarde client", err);
    }
  };

  const handleEdit = (client: Client) => {
    setFormData(client);
    setEditingId(client._id || null);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce client ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/clients/${id}`);
      fetchClients();
    } catch (err) {
      console.error("Erreur suppression client", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des clients</h1>
      <button
        className="mb-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        onClick={() => {
          setShowModal(true);
          setFormData({ firstName: "", lastName: "", phone: "", email: "" });
          setEditingId(null);
        }}
      >
        + Nouveau client
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Nom</th>
              <th className="px-4 py-2 text-left">Prénom</th>
              <th className="px-4 py-2 text-left">Téléphone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id} className="border-t">
                <td className="px-4 py-2">{client.lastName}</td>
                <td className="px-4 py-2">{client.firstName}</td>
                <td className="px-4 py-2">{client.phone}</td>
                <td className="px-4 py-2">{client.email}</td>
                <td className="px-4 py-2 space-x-2 text-center">
                  <button
                    onClick={() => handleEdit(client)}
                    className="text-blue-600 hover:underline"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(client._id!)}
                    className="text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-4">
                  Aucun client pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Modifier le client" : "Ajouter un client"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="lastName"
                required
                placeholder="Nom"
                className="input w-full"
                value={formData.lastName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="firstName"
                required
                placeholder="Prénom"
                className="input w-full"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Téléphone"
                className="input w-full"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="input w-full"
                value={formData.email}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
              >
                {editingId
                  ? "Enregistrer les modifications"
                  : "Ajouter le client"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
