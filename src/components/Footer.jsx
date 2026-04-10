import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaShieldAlt } from 'react-icons/fa';
import { Car } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import ParallaxSection from './ParallaxSection';

const Footer = () => {

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 transition-colors duration-500">
      
      <ParallaxSection speed={-0.05}>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
      </ParallaxSection>

      <ScrollReveal blur={true} distance={40}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

        {/* About */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-lg">
            <Car className="text-white" size={24} />
            </div>
             <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Code<span className="text-emerald-500">Celix</span>
            </span>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Revolutionizing road safety through real-time AI analytics and smart route optimization.
          </p>

          <div className="flex gap-4 pt-2">
            {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, idx) => (
              <motion.a 
                key={idx}
                whileHover={{ scale: 1.2 }}
                className="text-slate-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 cursor-pointer"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h4 className="text-slate-900 dark:text-white font-bold text-lg">Quick Links</h4>

          <ul className="space-y-2">
            {['Traffic Map', 'Route Planner', 'Safety Tips', 'Live Updates'].map((link) => (
              <li key={link}>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 text-sm">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Emergency */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h4 className="text-slate-900 dark:text-white font-bold text-lg">Emergency</h4>

          <div className="space-y-3">

            <div className="flex items-center gap-3 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
              <FaPhoneAlt className="text-rose-500" size={16} />
              <div>
                <p className="text-rose-500 font-bold text-sm">1122</p>
                <p className="text-slate-500 text-xs">Emergency Service</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
              <FaShieldAlt className="text-amber-500" size={16} />
              <div>
                <p className="text-amber-500 font-bold text-sm">Police</p>
                <p className="text-slate-500 text-xs">Quick Response</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h4 className="text-slate-900 dark:text-white font-bold text-lg">Stay Updated</h4>

          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Get traffic alerts in your inbox.
          </p>

          <div className="flex flex-col gap-2">
            <input 
              type="email"
              placeholder="Enter email"
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />

            <button className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg font-bold">
              Subscribe
            </button>
          </div>
        </motion.div>

        </div>
      </ScrollReveal>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 dark:border-slate-900 text-center">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} CodeCelix. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;