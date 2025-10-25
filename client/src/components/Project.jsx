import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      description:
        "A responsive portfolio built with React and TailwindCSS to showcase my works and experience.",
      link: "https://www.awandevloper.my.id/",
      tags: ["React", "TailwindCSS", "Vite"],
    },
    {
      title: "Coffee Shop Website",
      description:
        "Node.js + Express backend with Nodemailer for sending emails securely through a contact form.",
      link: "https://stwann05.github.io/kopisenja/",
      tags: ["Node.js", "Express", "Nodemailer"],
    },
    {
      title: "Landing Page",
      description:
        "Full-stack app connected to MongoDB Atlas for storing and retrieving dynamic form submissions.",
      link: "https://www.gibbanjarnegara.id/",
      tags: ["MongoDB", "Express", "API"],
    },
  ];

  return (
    <section
      id="project"
      className="relative isolate overflow-hidden bg-gray-900 text-white py-24 px-6 sm:px-12 lg:px-24"
    >
      {/* 🌌 Background Layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top glow */}
        <div className="absolute top-[-10rem] right-[20%] w-[35rem] h-[35rem] bg-cyan-500/20 rounded-full blur-[120px]" />
        {/* Mid soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/80 to-gray-950" />
        {/* Bottom glow */}
        <div className="absolute bottom-[-10rem] left-[15%] w-[30rem] h-[30rem] bg-blue-500/25 rounded-full blur-[140px]" />
      </div>

      {/* 🧠 Content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          My Projects
        </motion.h2>

        {/* 🧩 Project Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-cyan-500/10 hover:border-cyan-400/40 hover:bg-gray-800/90 transition-all duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex-grow">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs sm:text-sm bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="z-20 mt-auto flex justify-center">
                <motion.button
                  onClick={() => window.open(project.link, "_blank")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-gray-900 font-semibold px-5 py-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Project →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✨ Bottom Accent Glow */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-[5rem] bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent blur-3xl rounded-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
      </div>
    </section>
  );
}
