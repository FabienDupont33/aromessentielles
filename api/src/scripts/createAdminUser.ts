// src/scripts/createAdminUser.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/aromessentielles";

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const email = "melissadenoux@gmail.com"; // remplace par le vrai email
    const plainPassword = "MelFab33240/"; // choisis un mot de passe fort

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Un utilisateur avec cet email existe déjà.");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(plainPassword, 10);

    await User.create({ email, passwordHash });

    console.log("✅ Compte admin créé avec succès !");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur création admin :", err);
    process.exit(1);
  }
};

createAdmin();
