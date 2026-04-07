import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, Car, AlertCircle, MapPin, Shield, PhoneCall } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', icon: <Car size={18} />, href: '#' },
    { name: 'Traffic', icon: <MapPin size={18} />, href: '#traffic' },
    { name: 'Routes', icon: <AlertCircle size={18} />, href: '#routes' },
    { name: 'Safety Tips', icon: <Shield size={18} />, href: '#safety' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-700 py-3' : 'bg-transparent py-5'
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Animated Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-emerald-500 p-2 rounded-lg">
            <Car className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Code<span className="text-emerald-500">Celix</span>
          </span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -2 }}
              className="text-slate-300 hover:text-emerald-400 font-medium transition-colors flex items-center gap-2"
            >
              {link.name}
            </motion.a>
          ))}
          
          {/* Emergency CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg shadow-rose-900/20"
          >
            <PhoneCall size={18} />
            Emergency
          </motion.button>

          {/* Traffic CTA */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(16, 185, 129, 0.5)" }}
            className="border-2 border-emerald-500 text-emerald-500 px-5 py-2 rounded-full font-semibold"
          >
            Check Traffic
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800 border-b border-slate-700 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-slate-300 text-lg flex items-center gap-3">
                  {link.icon} {link.name}
                </a>
              ))}
              <hr className="border-slate-700" />
              <button className="bg-rose-600 text-white p-3 rounded-xl font-bold">Emergency Help</button>
              <button className="bg-emerald-500 text-white p-3 rounded-xl font-bold">Check Traffic</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;