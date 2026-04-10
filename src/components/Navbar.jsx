import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  Menu,
  X,
  Car,
  AlertCircle,
  MapPin,
  Shield,
  PhoneCall,
  Sun,
  Moon
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../utils/ThemeProvider'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', icon: <Car size={18} />, href: '/', isRoute: true },
    {
      name: 'Traffic',
      icon: <MapPin size={18} />,
      href: '/traffic',
      isRoute: false
    },
    {
      name: 'Routes',
      icon: <AlertCircle size={18} />,
      href: '/routes',
      isRoute: true
    },
    {
      name: 'Safety Tips',
      icon: <Shield size={18} />,
      href: '/road-safety',
      isRoute: true
    }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Car className="text-white" size={24} />
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
              Code<span className="text-emerald-500">Celix</span>
            </span>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link key={link.name} to={link.href}>
                <motion.span
                  whileHover={{ y: -2 }}
                  className={`font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                    location.pathname === link.href
                      ? "text-emerald-500"
                      : scrolled
                        ? "text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                        : "text-slate-200 hover:text-emerald-400"
                  }`}
                >
                  {link.name}
                </motion.span>
              </Link>
            ) : (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className={`font-medium transition-colors flex items-center gap-2 ${
                  scrolled
                    ? "text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                    : "text-slate-200 hover:text-emerald-400"
                }`}
              >
                {link.name}
              </motion.a>
            )
          )}

          <Link to="/emergency">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg shadow-rose-900/20"
            >
              <PhoneCall size={18} />
              Emergency
            </motion.button>
          </Link>

          <a href="/traffic">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 15px rgba(16,185,129,0.5)",
              }}
              className="border-2 border-emerald-500 text-emerald-500 px-5 py-2 rounded-full font-semibold"
            >
              Check Traffic
            </motion.button>
          </a>

          <motion.button
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              scrolled
                ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400"
                : "bg-white/10 text-yellow-400"
            }`}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              scrolled ? "text-slate-600 dark:text-yellow-400" : "text-yellow-400"
            }`}
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </motion.button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={scrolled ? "text-slate-900 dark:text-white" : "text-white"}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg flex items-center gap-3 transition-colors ${
                      location.pathname === link.href
                        ? "text-emerald-500"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {link.icon} {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-slate-600 dark:text-slate-300 text-lg flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon} {link.name}
                  </a>
                )
              )}

              <hr className="border-slate-200 dark:border-slate-800" />

              <button className="bg-rose-600 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2">
                <PhoneCall size={18} /> Emergency Help
              </button>

              <a href="/traffic" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-emerald-500 text-white p-3 rounded-xl font-bold">
                  Check Traffic
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
