import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendAppointmentEmail = async ({
  to,
  appointmentId,
  name,
  email,
  phone,
  service,
  date,
  time,
  message,
}: {
  to: string;
  appointmentId: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}) => {
  const html = `
    <h2>Nouvelle demande de rendez-vous</h2>
    <p><strong>Nom :</strong> ${name}</p>
    <p><strong>Email :</strong> ${email}</p>
    <p><strong>Téléphone :</strong> ${phone}</p>
    <p><strong>Service :</strong> ${service}</p>
    <p><strong>Date :</strong> ${date}</p>
    <p><strong>Heure :</strong> ${time}</p>
    <p><strong>Message :</strong> ${message || "(aucun)"}</p>
    <br/>
    <p>
      <a href="${
        process.env.FRONT_URL
      }/api/appointments/${appointmentId}/accept"
         style="padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; margin-right: 10px;">Accepter</a>
      <a href="${
        process.env.FRONT_URL
      }/api/appointments/${appointmentId}/reject"
         style="padding: 10px 15px; background-color: #F44336; color: white; text-decoration: none;">Refuser</a>
    </p>
  `;

  console.log("✅ Email config:", {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? "OK" : "MISSING",
  });

  await transporter.sendMail({
    from: `"Arom Essenti’Elles" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Nouvelle demande de rendez-vous",
    html,
  });
};
