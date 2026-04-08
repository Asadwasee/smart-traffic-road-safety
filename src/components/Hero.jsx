import { motion } from "framer-motion";

export default function Hero() {
  const lanes = [
    { id: 1, speedL: 4, speedR: 5, delayL: 0, delayR: 1, colorL: "bg-green-400", shadowL: "rgba(74,222,128,0.8)", colorR: "bg-red-500", shadowR: "rgba(239,68,68,0.8)" },
    { id: 2, speedL: 6, speedR: 4, delayL: 2, delayR: 0.5, colorL: "bg-blue-400", shadowL: "rgba(96,165,250,0.8)", colorR: "bg-orange-500", shadowR: "rgba(249,115,22,0.8)" },
    { id: 3, speedL: 3.5, speedR: 6, delayL: 1, delayR: 2.5, colorL: "bg-teal-400", shadowL: "rgba(45,212,191,0.8)", colorR: "bg-pink-500", shadowR: "rgba(236,72,153,0.8)" },
    { id: 4, speedL: 5, speedR: 4.5, delayL: 0.5, delayR: 1.5, colorL: "bg-purple-400", shadowL: "rgba(192,132,252,0.8)", colorR: "bg-yellow-500", shadowR: "rgba(234,179,8,0.8)" },
    { id: 5, speedL: 4.5, speedR: 3.5, delayL: 1.5, delayR: 0, colorL: "bg-green-400", shadowL: "rgba(74,222,128,0.8)", colorR: "bg-red-500", shadowR: "rgba(239,68,68,0.8)" },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      
      {/* 🔹 BACKGROUND TRAFFIC ANIMATION */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 flex flex-col justify-evenly transform -skew-y-12 scale-125">
          {lanes.map((lane) => (
            <div key={lane.id} className="relative w-full h-16 border-y border-white/5 bg-slate-800/20 flex items-center">
              {/* Lane Divider */}
              <div className="absolute w-full h-[2px] opacity-20" style={{ backgroundImage: 'linear-gradient(90deg, #fff 50%, transparent 50%)', backgroundSize: '40px 100%' }}></div>
              
              {/* Car moving Left to Right */}
              <motion.div
                className={`absolute w-16 h-2 ${lane.colorL} rounded-full`}
                style={{ top: "10px", boxShadow: `0 0 20px ${lane.shadowL}` }}
                initial={{ left: "-10%" }}
                animate={{ left: "110%" }}
                transition={{
                  duration: lane.speedL,
                  repeat: Infinity,
                  ease: "linear",
                  delay: lane.delayL,
                }}
              />
              {/* Car moving Right to Left */}
              <motion.div
                className={`absolute w-20 h-2 ${lane.colorR} rounded-full`}
                style={{ bottom: "10px", boxShadow: `0 0 20px ${lane.shadowR}` }}
                initial={{ right: "-10%" }}
                animate={{ right: "110%" }}
                transition={{
                  duration: lane.speedR,
                  repeat: Infinity,
                  ease: "linear",
                  delay: lane.delayR,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 HERO CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-3xl backdrop-blur-sm bg-black/20 p-8 rounded-3xl border border-white/10 shadow-2xl">
        
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg"
        >
          Smart Traffic & <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Road Safety</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-gray-200 text-lg md:text-xl font-medium drop-shadow-md"
        >
          Check traffic conditions, find safer routes, and improve road awareness
          with our smart city solution.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white text-lg font-bold rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <span className="text-xl">🚦</span> Check Traffic
        </motion.button>

      </div>
    </section>
  );
}