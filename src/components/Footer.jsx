import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaShieldAlt } from 'react-icons/fa';
import { FaBolt } from 'react-icons/fa';

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
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
      >

        {/* About */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2">
            <FaBolt className="text-amber-500" size={24} />
            <span className="text-2xl font-bold text-white">SmartWay</span>
          </div>

          <p className="text-slate-400 text-sm">
            Revolutionizing road safety through real-time AI analytics and smart route optimization.
          </p>

          <div className="flex gap-4 pt-2">
            {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, idx) => (
              <motion.a 
                key={idx}
                whileHover={{ scale: 1.2 }}
                className="text-slate-500 hover:text-emerald-400 cursor-pointer"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h4 className="text-white font-bold text-lg">Quick Links</h4>

          <ul className="space-y-2">
            {['Traffic Map', 'Route Planner', 'Safety Tips', 'Live Updates'].map((link) => (
              <li key={link}>
                <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Emergency */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h4 className="text-white font-bold text-lg">Emergency</h4>

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
          <h4 className="text-white font-bold text-lg">Stay Updated</h4>

          <p className="text-slate-400 text-sm">
            Get traffic alerts in your inbox.
          </p>

          <div className="flex flex-col gap-2">
            <input 
              type="email"
              placeholder="Enter email"
              className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            />

            <button className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg font-bold">
              Subscribe
            </button>
          </div>
        </motion.div>

      </motion.div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-900 text-center">
        <p className="text-slate-600 text-xs">
          © {new Date().getFullYear()} CodeCelix. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;