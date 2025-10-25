import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ====== KONEKSI MONGODB ======
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ====== DEFINISI MODEL CONTACT ======
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// ====== ROUTES ======

// Root route
app.get("/", (req, res) => {
  res.send("✅ Server is running fine!");
});

// Contact form route
app.post("/contact", async (req, res) => {
  const { firstName, lastName, company, email, phoneNumber, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    // Simpan ke MongoDB
    const newContact = new Contact({ firstName, lastName, company, email, phoneNumber, message });
    await newContact.save();

    // Kirim email via Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
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
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "✅ Email sent and saved successfully!" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Error sending or saving contact", error: err.message });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
