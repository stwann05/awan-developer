export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Name */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-white">Ivan Setiawan</h3>
            <p className="mt-1 text-sm text-gray-500">
              Full-Stack MERN Developer
            </p>
          </div>

          {/* Navigation */}
          <ul className="flex flex-wrap justify-center md:justify-end gap-6 text-sm font-medium text-gray-400">
            <li>
              <a href="#home" className="hover:text-indigo-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-indigo-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="#project" className="hover:text-indigo-400 transition">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-800" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Ivan Setiawan. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="https://github.com/stwann05"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <i className="fa-brands fa-github text-xl"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <i className="fa-brands fa-linkedin text-xl"></i>
            </a>
            <a
              href="mailto:forwork4805@gmail.com"
              className="hover:text-white transition"
            >
              <i className="fa-solid fa-envelope text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
