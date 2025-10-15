import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { firstName, lastName, company, email, phoneNumber, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // transporter Nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_ACCOUNT,    // email penerima
      pass: process.env.EMAIL_PASSWORD,   // app password Gmail
    },
  });

  try {
    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${email}>`,  // dari form
      to: process.env.EMAIL_ACCOUNT,                 // tujuan sama
      subject: `New contact from ${firstName} ${lastName}`,
      text: `
Name: ${firstName} ${lastName}
Company: ${company || '-'}
Email: ${email}
Phone: ${phoneNumber || '-'}
Message: ${message}
      `,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
