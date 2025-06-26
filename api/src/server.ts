import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import appointmentsRouter from "./routes/appointments";
import workingHoursRoutes from "./routes/workingHours";
import settingsRoutes from "./routes/settings";
import clientRoutes from "./routes/client";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(cors());
app.use(express.json());

app.use("/api/appointments", appointmentsRouter);
app.use("/api/working-hours", workingHoursRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/clients", clientRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
