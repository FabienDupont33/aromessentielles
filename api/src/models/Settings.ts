import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  sessionDuration: { type: Number, required: true, default: 60 },
});

export default mongoose.model("Settings", SettingsSchema);
