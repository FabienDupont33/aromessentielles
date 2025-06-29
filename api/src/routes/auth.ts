import express from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = (await User.findOne({ email })) as IUser | null;
  if (!user) return res.status(401).json({ error: "Utilisateur inconnu" });

  const isValid = await user.validatePassword(password);
  if (!isValid)
    return res.status(401).json({ error: "Mot de passe incorrect" });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

  res.json({ token });
});

router.get("/verify", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token manquant" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "object" && "email" in decoded) {
      return res.json({ valid: true, email: decoded.email });
    } else {
      return res.json({ valid: true, email: null });
    }
  } catch (err) {
    return res.status(401).json({ error: "Token invalide" });
  }
});

export default router;
