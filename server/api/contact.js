import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Koneksi ke MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Route test
app.get("/", (req, res) => {
  res.send("✅ Server is running fine!");
});

// ✅ Route Contact
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields are required" });

  // kirim email pakai nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_ACCOUNT,
      to: process.env.EMAIL_ACCOUNT,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
});

// ✅ Export serverless handler
export const handler = serverless(app);
