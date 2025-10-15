'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import avatar from './assets/ivan.jpg';

    export default function Navbar() {
      const [scrolled, setScrolled] = useState(false)
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

      // useEffect untuk scroll
      useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      }, [])

      const navigation = [
        { name: 'Home', href: '#home' },
        { name: 'Project', href: '#project' },
        { name: 'Contact', href: '#contact' },
      ]

      const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => { 
    e.preventDefault(); // mencegah reload halaman
    setLoading(true);
    setStatus('');

    const formData = {
      firstName: e.target['first-name'].value,
      lastName: e.target['last-name'].value,
      company: e.target.company.value,
      email: e.target.email.value,
      phoneNumber: e.target['phone-number'].value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setStatus('Message sent successfully!');
        e.target.reset(); // reset form
      } else {
        setStatus('Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      setStatus('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white scroll-smooth">
      {/* HEADER */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-gray-900/90 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="backdrop-blur-sm">
          {/* navbar content */}
        </div>

        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
           <a href="#home" className="-m-1.5 p-1.5">
              <h1 className="text-xl font-bold text-white">Awan.Dev</h1>
          </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            >
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white hover:text-indigo-400 transition"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>

        {/* MOBILE MENU */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#home" className="-m-1.5 p-1.5">
                <h1 className="text-xl font-bold text-white">Awan.Dev</h1>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-200"
              >
               <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* HERO SECTION (tetap seperti versi awal) */}
      <div
        id="home"
        className="relative isolate min-h-screen flex flex-col items-center justify-center px-6 lg:px-8"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Hello, I’m Ivan Setiawan
          </h1>
          <p className="mt-8 text-lg font-medium text-gray-400 sm:text-xl">
            <span className="text-indigo-400">Full-Stack</span> MERN Developer
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#project"
              className="rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-400 transition"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold text-white hover:text-indigo-400 transition"
            >
              Contact Me →
            </a>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72rem]"
          />
        </div>
      </div>

      <section id="about" className="bg-gray-800 text-white py-24 px-6 sm:px-12 lg:px-24">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    
    {/* Foto */}
    <div className="flex justify-center lg:justify-start">
        <img
        className="w-80 h-100 rounded-md mr-4"
        src={avatar}  // <- pakai variable import
        alt="Avatar"
      />
    </div>

    {/* Konten */}
    <div className="text-center lg:text-left">
      <h2 className="text-4xl font-bold mb-4 text-indigo-400">About Me</h2>
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
          className="inline-block rounded-md bg-indigo-500 px-6 py-2 text-white font-semibold hover:bg-indigo-400 transition"
        >
          Contact Me
        </a>
      </div>
    </div>

  </div>
</section>


          {/* PROJECT SECTION */}
      <section
        id="project"
        className="bg-gray-800 py-32 px-6 sm:px-12 lg:px-24 flex flex-col items-center text-gray-900"
      >
        <h2 className="text-4xl font-bold mb-12 text-white">My Projects</h2>

        <div className="grid gap-10 sm:grid-cols-1 lg:grid-cols-2 max-w-6xl w-full">
          {/* Card 1 */}
          <div className="max-w-sm w-full lg:max-w-full lg:flex bg-white rounded-lg shadow-lg overflow-hidden">
            <div
              className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80")',
              }}
              title="Project 1"
            ></div>
            <div className="border-gray-200 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-6 flex flex-col justify-between leading-normal">
              <div className="mb-6">
                <p className="text-sm text-gray-500 flex items-center">
                  <svg
                    className="fill-current text-gray-400 w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Frontend Project
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  Portfolio Website
                </div>
                <p className="text-gray-700 text-base">
                  Website portofolio pribadi yang dibangun menggunakan React dan
                  TailwindCSS untuk tampilan modern dan responsif.
                </p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src={avatar}  // <- pakai variable import
                  alt="Avatar"
                />
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">Ivan Setiawan</p>
                  <p className="text-gray-500">October 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="max-w-sm w-full lg:max-w-full lg:flex bg-white rounded-lg shadow-lg overflow-hidden">
            <div
              className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1581093588401-22dedea7c79a?auto=format&fit=crop&w=600&q=80")',
              }}
              title="Project 2"
            ></div>
            <div className="border-gray-200 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-6 flex flex-col justify-between leading-normal">
              <div className="mb-6">
                <p className="text-sm text-gray-500 flex items-center">
                  <svg
                    className="fill-current text-gray-400 w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Full Stack Project
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  Task Management App
                </div>
                <p className="text-gray-700 text-base">
                  Aplikasi task management berbasis MERN Stack untuk mengelola proyek
                  dan kolaborasi tim.
                </p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  src={avatar}  // <- pakai variable import
                  alt="Avatar"
                />
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">Ivan Setiawan</p>
                  <p className="text-gray-500">September 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CONTACT SECTION */}
      <section id="contact" className="isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
  <div
    aria-hidden="true"
    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
  >
    <div
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
      className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-288.75"
    />
  </div>

  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Contact Me</h2>
    <p className="mt-2 text-lg text-gray-400">Feel free to reach out to me!</p>
  </div>

  <form
    onSubmit={handleSubmit}
    className="mx-auto mt-16 max-w-xl sm:mt-20"
  >
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      {/* First Name */}
      <div>
        <label htmlFor="first-name" className="block text-sm font-semibold text-white">
          First name
        </label>
        <div className="mt-2.5">
          <input
            id="first-name"
            name="first-name"
            type="text"
            autoComplete="given-name"
            required
            className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
          />
        </div>
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="last-name" className="block text-sm font-semibold text-white">
          Last name
        </label>
        <div className="mt-2.5">
          <input
            id="last-name"
            name="last-name"
            type="text"
            autoComplete="family-name"
            required
            className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
          />
        </div>
      </div>

      {/* Company */}
      <div className="sm:col-span-2">
        <label htmlFor="company" className="block text-sm font-semibold text-white">
          Company
        </label>
        <div className="mt-2.5">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
          />
        </div>
      </div>

      {/* Email */}
      <div className="sm:col-span-2">
        <label htmlFor="email" className="block text-sm font-semibold text-white">
          Email
        </label>
        <div className="mt-2.5">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="sm:col-span-2">
        <label htmlFor="phone-number" className="block text-sm font-semibold text-white">
          Phone number
        </label>
        <div className="mt-2.5">
          <input
            id="phone-number"
            name="phone-number"
            type="text"
            placeholder="123-456-7890"
            className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
          />
        </div>
      </div>

      {/* Message */}
      <div className="sm:col-span-2">
        <label htmlFor="message" className="block text-sm font-semibold text-white">
          Message
        </label>
        <div className="mt-2.5">
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
          />
        </div>
      </div>

      {/* Agree Checkbox */}
      <div className="flex gap-x-4 sm:col-span-2">
        <div className="flex h-6 items-center">
          <input
            id="agree-to-policies"
            name="agree-to-policies"
            type="checkbox"
            required
            className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
          />
        </div>
        <label htmlFor="agree-to-policies" className="text-sm text-gray-400">
          By selecting this, you agree to our{' '}
          <a href="#" className="font-semibold text-indigo-400">
            privacy policy
          </a>.
        </label>
      </div>
    </div>

    <div className="mt-10">
      <button
        type="submit"
        disabled={loading}
        className={`block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow hover:bg-indigo-400 focus:outline-2 focus:outline-indigo-500 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Sending...' : "Let's talk"}
      </button>
    </div>

    {status && <p className="mt-4 text-center text-white">{status}</p>}
  </form>
      </section>

    </div>
  )
}
