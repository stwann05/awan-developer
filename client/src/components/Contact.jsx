'use client'

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setAlert({ type: "success", message: "Message sent successfully!" });
        setFormData({
          firstName: "",
          lastName: "",
          company: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setAlert({ type: "error", message: data.error || "Failed to send message." });
      }
    } catch (err) {
      setAlert({ type: "error", message: "Server not reachable." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate bg-gray-900 text-white px-6 py-24 sm:py-32 lg:px-8 overflow-hidden"
    >
      {/* ✨ Background transition — menyambung dari Projects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Glow atas (nyambung dari bawah Projects) */}
        <div className="absolute top-[-6rem] left-1/2 -translate-x-1/2 w-[50rem] h-[25rem] bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent blur-[100px]" />

        {/* Gradient dasar */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-950" />

        {/* Efek samping lembut */}
        <div className="absolute bottom-[10%] left-[15%] w-[25rem] h-[25rem] bg-cyan-500/15 rounded-full blur-[120px]" />
        <motion.div
          className="absolute bottom-[-8rem] right-[10%] w-[28rem] h-[28rem] bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-[50%] blur-[140px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* 🧭 Header */}
      <motion.div
        className="mx-auto max-w-2xl text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Contact Me
        </h2>
        <p className="mt-3 text-lg text-gray-400">
          Feel free to reach out — I’ll get back to you soon!
        </p>
      </motion.div>

      {/* 📝 FORM */}
      <motion.form
        onSubmit={handleSubmit}
        className="mx-auto mt-16 max-w-xl sm:mt-20 bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl border border-cyan-500/10 shadow-lg relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {[
            { id: "firstName", label: "First name", required: true },
            { id: "lastName", label: "Last name", required: true },
            { id: "company", label: "Company" },
            { id: "email", label: "Email", type: "email", required: true },
            { id: "phone", label: "Phone number", placeholder: "123-456-7890" },
          ].map((field) => (
            <div key={field.id} className={field.id === "company" || field.id === "email" || field.id === "phone" ? "sm:col-span-2" : ""}>
              <label htmlFor={field.id} className="block text-sm font-semibold text-white">
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type || "text"}
                required={field.required}
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={handleChange}
                className="mt-2.5 block w-full rounded-md bg-gray-900/40 border border-cyan-500/20 px-3.5 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          ))}

          {/* Message */}
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold text-white">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="mt-2.5 block w-full rounded-md bg-gray-900/40 border border-cyan-500/20 px-3.5 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 px-3.5 py-2.5 text-center text-sm font-semibold text-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Let's Talk"}
          </motion.button>
        </div>

        {/* Alert */}
        {alert.message && (
          <p
            className={`mt-4 text-center ${
              alert.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {alert.message}
          </p>
        )}
      </motion.form>

      {/* 🔆 Cahaya bawah biar smooth ke footer */}
      <motion.div
        className="absolute bottom-[-4rem] left-1/2 -translate-x-1/2 w-[60%] h-[6rem] bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent blur-3xl rounded-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
      />
    </section>
  );
}
