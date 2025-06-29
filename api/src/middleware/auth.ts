// Vérifie le token JWT
import jwt from "jsonwebtoken";
import express from "express";
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

router.get("/verify", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("🧪 Token reçu:", token);

  if (!token) return res.status(401).json({ error: "Token manquant" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Décodé :", decoded);
    if (typeof decoded === "object" && "email" in decoded) {
      return res.json({ valid: true, email: decoded.email });
    } else {
      return res.json({ valid: true, email: null });
    }
  } catch (err) {
    console.error("❌ Token invalide:", err);
    return res.status(401).json({ error: "Token invalide" });
  }
});

export default router;
