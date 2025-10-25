import nodemailer from 'nodemailer'
import Contact from '../models/Contact.js'

export const handleContact = async (req, res) => {
  const { name, email, message } = req.body

  try {
    // Simpan ke MongoDB
    const newContact = new Contact({ name, email, message })
    await newContact.save()

    // Kirim email pakai nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_ACCOUNT,
      subject: `New Contact from ${name}`,
      text: message
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ success: true, message: 'Pesan berhasil dikirim dan disimpan!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengirim pesan.' })
  }
}
