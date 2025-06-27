import type { Appointment } from "../types";
import { format } from "date-fns";

interface Props {
  appointment: Appointment;
  onClose: () => void;
  onStatusChange: (newStatus: "accepted" | "rejected") => void;
}

const formatTime = (timeStr: string) => {
  const [hour, minute] = timeStr.split(":");
  return `${hour}h${minute}`;
};

const AppointmentDetailsModal = ({
  appointment,
  onClose,
  onStatusChange,
}: Props) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Détails du rendez-vous</h2>
        <p>
          <strong>Nom :</strong> {appointment.name}
        </p>
        <p>
          <strong>Email :</strong> {appointment.email}
        </p>
        <p>
          <strong>Téléphone :</strong> {appointment.phone}
        </p>
        <p>
          <strong>Service :</strong> {appointment.service}
        </p>
        <p>
          <strong>Date :</strong> {appointment.date}
        </p>
        <p>
          <strong>Heure :</strong> {formatTime(appointment.time)}
        </p>
        <p>
          <strong>Message :</strong> {appointment.message}
        </p>
        <p>
          <strong>Statut :</strong> {appointment.status}
        </p>

        {(appointment.status === "pending" ||
          appointment.status === "accepted") && (
          <div className="mt-4 flex gap-2">
            {appointment.status === "pending" && (
              <>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => onStatusChange("accepted")}
                >
                  Accepter
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => onStatusChange("rejected")}
                >
                  Refuser
                </button>
              </>
            )}
            {appointment.status === "accepted" && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => onStatusChange("rejected")}
              >
                Annuler
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
