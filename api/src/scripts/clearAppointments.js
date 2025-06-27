// scripts/clearAppointments.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Appointment = require("../models/Appointment");

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Appointment.deleteMany({});
  console.log("Tous les rendez-vous ont été supprimés !");
  await mongoose.disconnect();
};

run();
