import express from "express";
import Client from "../models/Client";

const router = express.Router();

// Get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Create a client
router.post("/", async (req, res) => {
  const { firstName, lastName, phone, email, notes } = req.body;
  try {
    const client = new Client({ firstName, lastName, phone, email, notes });
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création du client." });
  }
});

// Update a client
router.put("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
});

// Delete a client
router.delete("/:id", async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client supprimé" });
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la suppression" });
  }
});

export default router;
