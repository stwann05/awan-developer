import nodemailer from "nodemailer";
import mongoose from "mongoose";

let isConnected = false;

// Skema Mongoose
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Hindari model duplikat di serverless
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default async function handler(req, res) {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  }

  if (req.method === "POST") {
    const { firstName, lastName, company, email, phoneNumber, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
      // Simpan ke MongoDB
      const newContact = new Contact({ firstName, lastName, company, email, phoneNumber, message });
      await newContact.save();

      // Kirim email ke owner
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

      res.status(200).json({ success: true, message: "✅ Email sent and saved successfully!" });
    } catch (err) {
      console.error("❌ Error:", err);
      res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
