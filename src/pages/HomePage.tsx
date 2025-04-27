import React from 'react';
import { ArrowDown, Briefcase, Code, Mail, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 z-0" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fadeIn">
                Hi, I'm <span className="text-blue-600 dark:text-blue-400">Your Name</span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-6 animate-fadeIn animation-delay-200">
                Full Stack Developer
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg animate-fadeIn animation-delay-400">
                I build beautiful, responsive web applications with modern technologies.
                Passionate about creating elegant solutions to complex problems.
              </p>
              <div className="flex flex-wrap gap-4 animate-fadeIn animation-delay-600">
                <Link to="/projects">
                  <Button variant="primary" size="lg">
                    View My Work <Briefcase size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="#contact">
                  <Button variant="outline" size="lg">
                    Contact Me <Mail size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl animate-fadeIn animation-delay-600">
                <img
                  src="https://images.pexels.com/photos/3772623/pexels-photo-3772623.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#about" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <ArrowDown size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
            <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <img
                src="https://img.freepik.com/free-photo/caucasian-businessman-office-shoot_53876-23471.jpg?t=st=1745779322~exp=1745782922~hmac=8d193d746f4e072b86cf25b74e055a25b7f5a2ad888e5e2986ca391eef88d93b&w=996"
                alt="Working"
                className="rounded-lg shadow-xl w-full h-auto max-w-lg mx-auto"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-10">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                I'm a passionate Full Stack Developer with a love for creating efficient,
                user-friendly applications. With over 5 years of experience in web development,
                I specialize in React, Node.js, and modern frontend technologies.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                My journey in programming started when I was in college, and since then,
                I've worked on a variety of projects, from small business websites to complex
                enterprise applications. I'm constantly learning and exploring new technologies
                to improve my skills.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Skills</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    <li>React & React Native</li>
                    <li>Node.js & Express</li>
                    <li>TypeScript</li>
                    <li>Firebase & MongoDB</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Interests</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    <li>Web Development</li>
                    <li>UI/UX Design</li>
                    <li>Mobile App Development</li>
                    <li>Open Source</li>
                    <li>Machine Learning</li>
                  </ul>
                </div>
              </div>
              <Link to="/projects">
                <Button variant="primary">
                  View Projects <Code size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Take a look at some of my recent projects. These represent my best work and the technologies I'm most passionate about.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project cards will be fetched from Firebase in final implementation */}
            {/* This is just a placeholder */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/projects">
              <Button variant="outline" size="lg">
                View All Projects <ArrowDown size={18} className="ml-2 transform rotate-90" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? Feel free to reach out to me.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <form className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
                  id="message"
                  rows={6}
                  placeholder="Your Message"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <Button variant="primary" size="lg">
                  Send Message <Send size={18} className="ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;