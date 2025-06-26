import express from "express";
import Settings from "../models/Settings";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      const newSettings = await Settings.create({ sessionDuration: 60 });
      return res.json(newSettings);
    }
    res.json(settings);
  } catch (err) {
    console.error("Erreur GET /api/settings", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.put("/", async (req, res) => {
  const { sessionDuration } = req.body;

  if (typeof sessionDuration !== "number") {
    return res.status(400).json({ error: "Durée invalide" });
  }

  try {
    const updated = await Settings.findOneAndUpdate(
      {},
      { sessionDuration },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Erreur PUT /api/settings", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
