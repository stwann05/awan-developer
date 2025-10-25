import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate min-h-screen flex flex-col items-center justify-center px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Layer 1 — soft cyan blur */}
        <div className="absolute top-[-10rem] left-[10%] w-[30rem] h-[30rem] bg-cyan-500/30 rounded-full blur-[120px]" />

        {/* Layer 2 — subtle animated glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-[25rem] h-[25rem] bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-[60%] blur-3xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Animated content */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}          // mulai transparan dan agak turun
        whileInView={{ opacity: 1, y: 0 }}       // muncul dan naik perlahan
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}                // animasi hanya muncul sekali
      >
        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          Hello, I’m Ivan Setiawan
        </h1>
        <p className="mt-8 text-lg font-medium text-gray-400 sm:text-xl">
          <span className="text-indigo-400">Full-Stack</span> MERN Developer
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#project"
            className="rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white 
            hover:bg-indigo-400 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors"
          >
            Contact Me →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
