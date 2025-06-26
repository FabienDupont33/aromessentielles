import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Test Mail" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: "Test de mail",
    html: "<h1>Ça fonctionne !</h1><p>Ceci est un test</p>",
  });

  console.log("✅ Email envoyé:", info.messageId);
}

main().catch(console.error);
