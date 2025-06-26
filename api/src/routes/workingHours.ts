import express from "express";
import WorkingHours from "../models/WorkingHours";

const router = express.Router();

// GET all working hours
router.get("/", async (req, res) => {
  try {
    const hours = await WorkingHours.find().sort({ day: 1 });
    res.json(hours);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des horaires" });
  }
});

// PUT update working hours for a specific day
router.put("/:day", async (req, res) => {
  try {
    const { day } = req.params;
    const { isWorkingDay, morning, afternoon } = req.body;

    const updated = await WorkingHours.findOneAndUpdate(
      { day },
      { isWorkingDay, morning, afternoon },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour des horaires" });
  }
});

export default router;
