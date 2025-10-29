import nodemailer from "nodemailer";
import mongoose from "mongoose";

// ====== KONEKSI MONGODB ======
const MONGO_URI = process.env.MONGO_URI;

if (!global._mongoose) {
  global._mongoose = mongoose.connect(MONGO_URI);
}

// ====== DEFINISI MODEL ======
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

// ====== HANDLER ======
export default async function handler(req, res) {
  // ✅ Izinkan request dari frontend kamu
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://awan-developer-3zh3.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Tangani preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ====== BATAS: hanya POST diizinkan ======
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // ====== AMBIL DATA DARI BODY ======
  const { firstName, lastName, company, email, phoneNumber, message } =
    req.body;

  if (!firstName || !lastName || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    // ====== SIMPAN KE MONGODB ======
    const newContact = new Contact({
      firstName,
      lastName,
      company,
      email,
      phoneNumber,
      message,
    });
    await newContact.save();

    // ====== KIRIM EMAIL VIA GMAIL SMTP ======
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

    // ====== KIRIM RESPON BERHASIL ======
    res
      .status(200)
      .json({ success: true, message: "✅ Email sent and saved successfully!" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({
      success: false,
      message: "Error sending or saving contact",
      error: err.message,
    });
  }
}
