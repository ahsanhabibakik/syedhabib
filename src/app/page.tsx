'use client';

import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="font-sans bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="p-6 bg-gray-800">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="text-2xl font-semibold">Syed Mir Ahsan Habib</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="hover:text-gray-400">About</a>
            <a href="#projects" className="hover:text-gray-400">Projects</a>
            <a href="#contact" className="hover:text-gray-400">Contact</a>
          </nav>
          {/* Hamburger menu for small screens */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
            >
              {isMenuOpen ? <FiX className="text-white text-3xl" /> : <FiMenu className="text-white text-3xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-0 right-0 w-3/4 bg-gray-800 p-6 space-y-4 md:hidden">
            <a href="#about" className="block text-lg text-white hover:text-gray-400">About</a>
            <a href="#projects" className="block text-lg text-white hover:text-gray-400">Projects</a>
            <a href="#contact" className="block text-lg text-white hover:text-gray-400">Contact</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 text-center bg-gradient-to-br from-[#2a4365] to-[#4e73df]">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Personal Website</h1>
        <p className="text-xl mb-8">I'm Syed Mir Ahsan Habib, a passionate web developer, entrepreneur, and lifelong learner.</p>
        <a href="#contact" className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-full text-lg hover:bg-yellow-500 transition-all">
          Contact Me
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">About Me</h2>
          <p className="text-xl text-gray-300 mb-4">
            I'm a web developer with a passion for creating innovative, user-friendly websites. Currently, I'm learning new technologies like HTML, CSS, JavaScript, React, and more.
          </p>
          <p className="text-lg text-gray-400">
            I enjoy working on projects that challenge my skills and allow me to explore new trends in technology. My goal is to contribute to impactful projects and help businesses grow through technology.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-700">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">My Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Example Project */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white">Project One</h3>
              <p className="text-gray-400 mt-4">Description of the first project I worked on.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white">Project Two</h3>
              <p className="text-gray-400 mt-4">Description of the second project I worked on.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white">Project Three</h3>
              <p className="text-gray-400 mt-4">Description of the third project I worked on.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Contact Me</h2>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-lg bg-gray-600 text-white placeholder-gray-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-lg bg-gray-600 text-white placeholder-gray-400"
              required
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-4 rounded-lg bg-gray-600 text-white placeholder-gray-400"
              rows="6"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-yellow-400 text-gray-900 font-semibold text-lg hover:bg-yellow-500 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-center py-6">
        <p className="text-white text-sm">
          &copy; 2025 Syed Mir Ahsan Habib. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
