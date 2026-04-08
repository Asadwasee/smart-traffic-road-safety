import { motion } from "framer-motion";
import { Car, BotMessageSquare, Zap } from "lucide-react"; // Import Icons

export default function Hero() {
  const lanes = [
    { id: 1, speedL: 5, speedR: 6, delayL: 0, delayR: 1.5, colorL: "text-emerald-400", shadowL: "0 0 15px rgba(52,211,153,0.7)", colorR: "text-rose-500", shadowR: "0 0 15px rgba(244,63,94,0.7)" },
    { id: 2, speedL: 7, speedR: 5, delayL: 2.5, delayR: 0.8, colorL: "text-sky-400", shadowL: "0 0 15px rgba(56,189,248,0.7)", colorR: "text-amber-500", shadowR: "0 0 15px rgba(251,191,36,0.7)" },
    { id: 3, speedL: 4.5, speedR: 7.5, delayL: 1.2, delayR: 3, colorL: "text-teal-400", shadowL: "0 0 15px rgba(45,212,191,0.7)", colorR: "text-pink-500", shadowR: "0 0 15px rgba(236,72,153,0.7)" },
    { id: 4, speedL: 6, speedR: 5.5, delayL: 0.8, delayR: 2, colorL: "text-violet-400", shadowL: "0 0 15px rgba(167,139,250,0.7)", colorR: "text-yellow-400", shadowR: "0 0 15px rgba(250,204,21,0.7)" },
    { id: 5, speedL: 5.5, speedR: 4, delayL: 2, delayR: 0.5, colorL: "text-emerald-400", shadowL: "0 0 15px rgba(52,211,153,0.7)", colorR: "text-rose-500", shadowR: "0 0 15px rgba(244,63,94,0.7)" },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center pt-24 bg-[#020617] text-white overflow-hidden font-sans">
      
      {/* 🔹 DYNAMIC ROAD BACKGROUND ANIMATION */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 flex flex-col justify-evenly transform -skew-y-12 scale-150">
          {lanes.map((lane) => (
            <div key={lane.id} className="relative w-full h-24 border-y border-white/5 bg-slate-900/30 flex items-center">
              
              {/* Central Dashed Road Line */}
              <div className="absolute w-full h-[2px] opacity-10" style={{ backgroundImage: 'linear-gradient(90deg, #fff 50%, transparent 50%)', backgroundSize: '60px 100%' }}></div>
              
              {/* Car moving Left to Right (Top Half) */}
              <motion.div
                className={`absolute ${lane.colorL}`}
                style={{ top: "15%", filter: `drop-shadow(${lane.shadowL})` }}
                initial={{ left: "-10%", rotateY: 0 }}
                animate={{ left: "110%" }}
                transition={{
                  duration: lane.speedL,
                  repeat: Infinity,
                  ease: "linear",
                  delay: lane.delayL,
                }}
              >
                <Car size={36} fill="currentColor" fillOpacity={0.15} strokeWidth={1.5} />
              </motion.div>

              {/* Car moving Right to Left (Bottom Half) */}
              <motion.div
                className={`absolute ${lane.colorR}`}
                style={{ bottom: "15%", filter: `drop-shadow(${lane.shadowR})` }}
                initial={{ right: "-10%", rotateY: 180 }} // Flip car horizontally to face left
                animate={{ right: "110%" }}
                transition={{
                  duration: lane.speedR,
                  repeat: Infinity,
                  ease: "linear",
                  delay: lane.delayR,
                }}
              >
                <Car size={36} fill="currentColor" fillOpacity={0.15} strokeWidth={1.5} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* HERO CONTENT */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-4xl backdrop-blur-xl bg-black/10 p-12 rounded-[50px] border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)]"
      >
        
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tighter"
          >
            Smart Traffic & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 animate-pulse">
              Road Safety
            </span> 🚦
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 text-slate-200 text-xl md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
        >
          Leveraging AI analytics for optimized urban mobility and real-time safety insights.
        </motion.p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(16,185,129,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white text-lg font-bold rounded-2xl transition-all flex items-center gap-3 shadow-lg"
          >
            <Zap size={24} className="text-amber-300" />
            Check Live Traffic
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.12)" }}
            className="px-12 py-5 border border-white/20 text-white text-xl font-bold rounded-2xl backdrop-blur-sm"
          >
            Explore Map
          </motion.button>
        </div>

      </motion.div>
    </section>
  );
}