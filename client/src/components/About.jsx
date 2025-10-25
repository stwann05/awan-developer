import avatar from "../assets/ivan.jpg";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative isolate text-white py-24 px-6 sm:px-12 lg:px-24 overflow-hidden bg-gray-900"
    >
      {/* Background gradient — sama gaya dengan Hero & Projects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-8rem] left-[10%] w-[25rem] h-[25rem] bg-cyan-500/20 rounded-full blur-[120px]" />
        <motion.div
          className="absolute bottom-[-8rem] right-[10%] w-[30rem] h-[30rem] bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-[60%] blur-3xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Foto dengan animasi */}
        <motion.div
          className="flex justify-center lg:justify-start"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            className="w-80 h-100 rounded-md shadow-lg border border-cyan-500/10"
            src={avatar}
            alt="Avatar"
          />
        </motion.div>

        {/* Konten dengan animasi */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Hi! I’m <span className="font-semibold text-white">Ivan Setiawan</span>, a passionate
            Full-Stack MERN Developer. I love building clean, modern, and responsive web applications.
            My focus is on creating seamless user experiences and writing maintainable code.
          </p>
          <ul className="text-gray-400 space-y-2">
            <li>💻 React, Node.js, Express, MongoDB</li>
            <li>🎨 TailwindCSS, CSS, HTML</li>
            <li>🚀 Responsive & Mobile-First Design</li>
            <li>🤝 Team Collaboration & Agile Workflow</li>
          </ul>
          <div className="mt-6">
            <a
              href="#contact"
              className="inline-block rounded-md bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 px-6 py-2 text-white font-semibold shadow-md transition"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
