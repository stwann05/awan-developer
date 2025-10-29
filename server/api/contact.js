import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Koneksi MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Route test
app.get("/", (req, res) => {
  res.send("✅ Server is running fine!");
});

// ✅ Route Contact
app.post("/contact", async (req, res) => {
  const { firstName, lastName, company, email, phoneNumber, message } = req.body;

  if (!firstName || !lastName || !email || !message)
    return res.status(400).json({ success: false, message: "Missing required fields" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.EMAIL_ACCOUNT,
      subject: `New Contact Message from ${firstName} ${lastName}`,
      text: `
Name: ${firstName} ${lastName}
Company: ${company || "-"}
Email: ${email}
Phone: ${phoneNumber || "-"}
Message: ${message}
      `,
    });

    res.json({ success: true, message: "✅ Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
});

export const handler = serverless(app);
