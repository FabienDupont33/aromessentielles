import express, { Request, Response } from "express";
import Appointment from "../models/Appointment";
import { sendAppointmentEmail } from "../utils/mailer";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, service, date, time, message } = req.body;

    if (!name || !email || !phone || !service || !date || !time) {
      return res.status(400).json({ error: "Champs requis manquants." });
    }

    const appointment = new Appointment({
      name,
      email,
      phone,
      service,
      date,
      time,
      message,
      status: "pending",
    });

    await appointment.save();

    console.log("📨 Tentative d'envoi de mail avec les données :", {
      name,
      email,
      phone,
      service,
      date,
      time,
      message,
    });
    console.log("📨 Vers :", process.env.NOTIFY_EMAIL);

    await sendAppointmentEmail({
      to: process.env.NOTIFY_EMAIL!,
      appointmentId: appointment._id.toString(),
      name,
      email,
      phone,
      service,
      date,
      time,
      message,
    });

    res.status(201).json({
      message: "Rendez-vous enregistré et email envoyé",
      appointment,
    });
  } catch (err) {
    console.error("Erreur lors de l’envoi :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Statut invalide" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Rendez-vous non trouvé" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/date/:date", async (req, res) => {
  const { date } = req.params;
  const appointments = await Appointment.find({ date });
  res.json(appointments);
});

export default router;
