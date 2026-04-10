import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Car, Zap, MousePointer2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../utils/ThemeProvider";
import ScrollReveal from "./ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const floatingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main background parallax
      gsap.to(bgRef.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Independent floating parallax for ambient elements
      gsap.to(".parallax-layer-1", {
        y: "-50%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".parallax-layer-2", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const lanes = [
    { id: 1, speedL: 5, speedR: 6, delayL: 0, delayR: 1.5, colorL: "text-emerald-400", shadowL: "0 0 15px rgba(52,211,153,0.7)", colorR: "text-rose-500", shadowR: "0 0 15px rgba(244,63,94,0.7)" },
    { id: 2, speedL: 7, speedR: 5, delayL: 2.5, delayR: 0.8, colorL: "text-sky-400", shadowL: "0 0 15px rgba(56,189,248,0.7)", colorR: "text-amber-500", shadowR: "0 0 15px rgba(251,191,36,0.7)" },
    { id: 3, speedL: 4.5, speedR: 7.5, delayL: 1.2, delayR: 3, colorL: "text-teal-400", shadowL: "0 0 15px rgba(45,212,191,0.7)", colorR: "text-pink-500", shadowR: "0 0 15px rgba(236,72,153,0.7)" },
    { id: 4, speedL: 6, speedR: 5.5, delayL: 0.8, delayR: 2, colorL: "text-violet-400", shadowL: "0 0 15px rgba(167,139,250,0.7)", colorR: "text-yellow-400", shadowR: "0 0 15px rgba(250,204,21,0.7)" },
    { id: 5, speedL: 5.5, speedR: 4, delayL: 2, delayR: 0.5, colorL: "text-emerald-400", shadowL: "0 0 15px rgba(52,211,153,0.7)", colorR: "text-rose-500", shadowR: "0 0 15px rgba(244,63,94,0.7)" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 bg-white dark:bg-[#020617] text-slate-900 dark:text-white overflow-hidden font-sans"
    >
      
      {/* 🔹 AMBIENT PARALLAX LAYERS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="parallax-layer-1 absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="parallax-layer-2 absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="parallax-layer-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      {/* 🔹 DYNAMIC ROAD BACKGROUND ANIMATION */}
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-20 dark:opacity-40 pointer-events-none">
        <div className="absolute inset-0 flex flex-col justify-evenly transform -skew-y-12 scale-150">
          {lanes.map((lane) => (
            <div key={lane.id} className="relative w-full h-24 border-y border-slate-200/20 dark:border-white/5 bg-slate-100/30 dark:bg-slate-900/30 flex items-center">
              
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
                initial={{ right: "-10%", rotateY: 180 }}
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
      <ScrollReveal blur={40} distance={100}>
        <div className="relative z-10 text-center px-6 max-w-5xl backdrop-blur-xl bg-white/40 dark:bg-black/20 p-8 md:p-16 rounded-[40px] md:rounded-[60px] border border-slate-200/50 dark:border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
          
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <h1 className="text-4xl md:text-8xl font-black leading-[1.1] tracking-tighter">
              Smart Traffic & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-600 to-teal-500">
                Road Safety
              </span> 🚦
            </h1>
          </motion.div>

          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-slate-600 dark:text-slate-300 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
              Revolutionizing urban mobility through AI-driven analytics, real-time safety monitoring, and optimized infrastructure.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(16,185,129,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white text-xl font-bold rounded-2xl transition-all flex items-center gap-3 shadow-xl"
              >
                <Zap size={24} className="text-amber-300 fill-amber-300" />
                Get Started
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.03)" }}
                className="px-12 py-5 border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white text-xl font-bold rounded-2xl backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <MousePointer2 size={24} />
                Explore Map
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <div className="w-6 h-10 border-2 border-slate-400 dark:border-white/30 rounded-full flex justify-center p-1">
          <motion.div className="w-1 h-2 bg-emerald-500 rounded-full" />
        </div>
        <span className="text-xs uppercase tracking-widest font-bold">Scroll</span>
      </motion.div>
    </section>
  );
}