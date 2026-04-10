import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Clock3,
  MapPinned,
  Navigation,
  Sparkles,
  TrafficCone,
} from 'lucide-react';
import lahoreMap from '../assets/lahore-map.svg';
import ScrollReveal from './ScrollReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const trafficLocations = [
  // ... (remains the same)
  {
    id: 'gulberg',
    name: 'Gulberg',
    status: 'High Traffic',
    level: 'high',
    delay: '20 min delay',
    x: '26%',
    y: '30%',
    note: 'Heavy rush near the main boulevard and signal crossings.',
  },
  {
    id: 'dha',
    name: 'DHA',
    status: 'Medium Traffic',
    level: 'medium',
    delay: '10 min delay',
    x: '68%',
    y: '36%',
    note: 'Steady movement with short slowdowns near commercial blocks.',
  },
  {
    id: 'johar-town',
    name: 'Johar Town',
    status: 'Low Traffic',
    level: 'low',
    delay: 'Smooth drive',
    x: '43%',
    y: '70%',
    note: 'Clear inner roads and better traffic flow for now.',
  },
  {
    id: 'model-town',
    name: 'Model Town',
    status: 'Medium Traffic',
    level: 'medium',
    delay: '8 min delay',
    x: '34%',
    y: '54%',
    note: 'Moderate congestion around school and market zones.',
  },
  {
    id: 'cantt',
    name: 'Cantt',
    status: 'Low Traffic',
    level: 'low',
    delay: 'Smooth drive',
    x: '57%',
    y: '22%',
    note: 'Open corridors with lighter traffic volume.',
  },
];

const trafficStyles = {
  low: {
    dot: 'bg-emerald-400',
    ring: 'bg-emerald-400/30',
    border: 'border-emerald-400/50',
    text: 'text-emerald-300',
    badge: 'bg-emerald-400/15 text-emerald-200',
    shadow: 'shadow-[0_0_35px_rgba(52,211,153,0.35)]',
  },
  medium: {
    dot: 'bg-amber-300',
    ring: 'bg-amber-300/30',
    border: 'border-amber-300/50',
    text: 'text-amber-200',
    badge: 'bg-amber-300/15 text-amber-100',
    shadow: 'shadow-[0_0_35px_rgba(252,211,77,0.35)]',
  },
  high: {
    dot: 'bg-rose-500',
    ring: 'bg-rose-500/30',
    border: 'border-rose-500/50',
    text: 'text-rose-200',
    badge: 'bg-rose-500/15 text-rose-100',
    shadow: 'shadow-[0_0_35px_rgba(244,63,94,0.38)]',
  },
};

function TrafficMapSection() {
  const [selectedLocation, setSelectedLocation] = useState(trafficLocations[0]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".decoration-pill", {
        y: (i) => (i % 2 === 0 ? -100 : 100),
        rotate: (i) => (i % 2 === 0 ? 45 : -45),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="hero"
        className="relative overflow-hidden border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] pt-32 transition-colors duration-500"
      >
        <div className="absolute inset-x-0 top-20 h-72 bg-[radial-gradient(circle,_rgba(250,204,21,0.14),_transparent_55%)] blur-3xl" />
        
        {/* Decorative elements with parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="decoration-pill absolute left-[5%] top-[20%] w-32 h-8 bg-emerald-500/20 rounded-full blur-xl" />
          <div className="decoration-pill absolute right-[10%] top-[40%] w-48 h-12 bg-amber-500/20 rounded-full blur-2xl" />
          <div className="decoration-pill absolute left-[15%] bottom-[30%] w-40 h-10 bg-blue-500/20 rounded-full blur-xl" />
        </div>

        <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <ScrollReveal direction="left">
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-600 dark:text-emerald-200">
                <Sparkles size={16} />
                Interactive Smart Traffic Dashboard
              </div>
              <h1 className="max-w-2xl text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl px-2">
                Understanding live traffic <br/> on a map is now <span className="text-emerald-500 italic">simple.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Color-coded traffic points, clickable location details, and polished animations
                give this section the feel of a live smart city traffic dashboard.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#traffic"
                  className="rounded-full bg-emerald-500 px-8 py-4 font-bold text-slate-950 transition shadow-lg shadow-emerald-500/20"
                >
                  Check Traffic
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#traffic"
                  className="rounded-full border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 px-8 py-4 font-bold text-slate-700 dark:text-white transition hover:border-amber-400/50 hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  Explore Traffic Map
                </motion.a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ['5', 'Live points'],
                  ['3', 'Traffic levels'],
                  ['100%', 'Animated UI'],
                ].map(([value, label], idx) => (
                  <ScrollReveal key={label} delay={idx * 0.1} distance={20}>
                    <div
                      className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-6 backdrop-blur shadow-sm dark:shadow-none transition-all hover:bg-white hover:dark:bg-white/10"
                    >
                      <p className="text-4xl font-black text-slate-900 dark:text-white">{value}</p>
                      <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" blur={30}>
            <div className="relative transform hover:scale-[1.02] transition-transform duration-700">
              <div className="absolute -inset-6 rounded-[3rem] bg-emerald-400/10 blur-3xl" />
              <div className="relative rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
                      Traffic Snapshot
                    </p>
                    <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">City Heat Overview</h2>
                  </div>
                  <div className="p-3 bg-amber-100 dark:bg-amber-400/10 rounded-2xl">
                    <TrafficCone className="text-amber-600 dark:text-amber-300" size={32} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ['Low', 'bg-emerald-400'],
                    ['Medium', 'bg-amber-400'],
                    ['High', 'bg-rose-500'],
                  ].map(([label, swatch]) => (
                    <div key={label} className="rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-950/70 p-4">
                      <div className={`mb-3 h-2 w-10 rounded-full ${swatch} shadow-sm shadow-black/10`} />
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
                      <p className="font-bold text-slate-900 dark:text-white">Indicator</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 p-2 shadow-inner">
                  <div className="relative h-80 overflow-hidden rounded-[1.75rem]">
                    <img
                      src={lahoreMap}
                      alt="Lahore traffic map"
                      className="h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100"
                    />
                    {trafficLocations.map((location) => {
                      const style = trafficStyles[location.level];

                      return (
                        <button
                          key={location.id}
                          type="button"
                          onClick={() => setSelectedLocation(location)}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{ left: location.x, top: location.y }}
                        >
                          <motion.span
                            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0.1, 0.6] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            className={`absolute inset-0 rounded-full ${style.ring}`}
                          />
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-xl ${style.dot} ${style.shadow}`}
                          >
                            <span className="h-2 w-2 rounded-full bg-white shadow-sm" />
                          </motion.div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* DETAILED TRAFFIC INFO SECTION */}
      <section id="traffic" className="bg-white dark:bg-[#020617] px-6 py-32 transition-colors duration-500">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-20 max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-600 dark:text-amber-200">
                <MapPinned size={18} />
                Live Network Analysis
              </div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl">
                Real-time traffic <span className="text-emerald-500">visualization</span>
              </h2>
              <p className="mt-6 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
                Our AI systems monitor street-level congestion across key zones in Lahore, 
                providing you with a seamless view of city dynamics.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-12 xl:grid-cols-[1.5fr_0.7fr]">
            <ScrollReveal direction="left" blur={30}>
              <div className="overflow-hidden rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 shadow-2xl backdrop-blur-sm">
                <div className="flex flex-col gap-6 border-b border-slate-100 dark:border-white/5 px-8 py-8 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Monitoring Zone</p>
                    <h3 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Smart Traffic Grid</h3>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-500 px-4 py-2 bg-emerald-500/10 rounded-xl">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Low
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-amber-500 px-4 py-2 bg-amber-500/10 rounded-xl">
                      <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" /> Med
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-rose-500 px-4 py-2 bg-rose-500/10 rounded-xl">
                      <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" /> High
                    </div>
                  </div>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
                  <div className="absolute inset-6 overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-inner">
                    <img
                      src={lahoreMap}
                      alt="Detailed Lahore street map"
                      className="h-full w-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                  </div>

                  {/* Animated Path Overlay */}
                  <svg
                    viewBox="0 0 100 100"
                    className="pointer-events-none absolute inset-10 h-[calc(100%-5rem)] w-[calc(100%-5rem)]"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#FACC15" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    <motion.path
                      d="M 26 30 C 40 25, 50 35, 60 50 S 80 80, 85 90"
                      fill="none"
                      stroke="url(#routeGlow)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                    />
                  </svg>

                  {trafficLocations.map((location, index) => {
                    const isActive = selectedLocation.id === location.id;
                    const style = trafficStyles[location.level];

                    return (
                      <motion.button
                        key={location.id}
                        type="button"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                        onClick={() => setSelectedLocation(location)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group`}
                        style={{ left: location.x, top: location.y }}
                      >
                        <motion.span
                          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          className={`absolute inset-0 rounded-full ${style.ring}`}
                        />
                        <div
                          className={`relative flex h-8 w-8 items-center justify-center rounded-full border-4 border-slate-950 transition-all duration-300 shadow-2xl ${
                            isActive ? 'scale-125 rotate-[360deg]' : ''
                          } ${style.dot}`}
                        >
                          <div className={`h-2 w-2 rounded-full bg-white ${isActive ? 'scale-150' : ''}`} />
                        </div>
                        
                        <div className="absolute left-1/2 top-12 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform duration-300 origin-top">
                          <div className="whitespace-nowrap rounded-2xl border border-white/20 bg-slate-950/90 px-4 py-2 text-xs font-bold text-white backdrop-blur shadow-2xl">
                            {location.name}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}

                  <div className="absolute bottom-10 right-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/80 px-6 py-4 text-sm font-bold text-slate-300 backdrop-blur shadow-2xl">
                    <div className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live System Active
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2} blur={30}>
              <div className="space-y-8">
                <div className="rounded-[3rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-10 shadow-2xl backdrop-blur-sm">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Active Selection</p>
                      <h3 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">{selectedLocation.name}</h3>
                    </div>
                    <motion.div
                      key={selectedLocation.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`rounded-full px-6 py-2 text-xs font-black uppercase tracking-widest ${trafficStyles[selectedLocation.level].badge}`}
                    >
                      {selectedLocation.status}
                    </motion.div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedLocation.id}
                      initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="mt-10 space-y-8"
                    >
                      <div className={`rounded-[2rem] border-2 p-8 transition-colors duration-500 ${trafficStyles[selectedLocation.level].border} bg-slate-50 dark:bg-slate-950/60 shadow-inner`}>
                        <div className="flex items-center gap-6">
                          <div className={`flex h-16 w-16 items-center justify-center rounded-3xl ${trafficStyles[selectedLocation.level].badge} shadow-2xl`}>
                            <AlertTriangle size={32} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Status</p>
                            <p className={`text-3xl font-black ${trafficStyles[selectedLocation.level].text}`}>
                              {selectedLocation.status}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-6">
                        <div className="rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 p-8 transition-all hover:bg-white hover:dark:bg-white/10">
                          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-300 font-bold uppercase tracking-widest text-xs">
                            <Clock3 size={20} className="text-amber-500" />
                            Estimated Delay
                          </div>
                          <p className="mt-4 text-4xl font-black text-slate-900 dark:text-white">{selectedLocation.delay}</p>
                        </div>

                        <div className="rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 p-8 transition-all hover:bg-white hover:dark:bg-white/10">
                          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-300 font-bold uppercase tracking-widest text-xs">
                            <Navigation size={20} className="text-emerald-500" />
                            Intelligence Note
                          </div>
                          <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-300 italic">
                            "{selectedLocation.note}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Quick Switch List */}
                <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 p-10 shadow-xl backdrop-blur-sm">
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Quick Locations</p>
                  <div className="space-y-4">
                    {trafficLocations.map((location) => {
                      const active = selectedLocation.id === location.id;

                      return (
                        <motion.button
                          key={location.id}
                          whileHover={{ x: 8 }}
                          onClick={() => setSelectedLocation(location)}
                          className={`flex w-full items-center justify-between rounded-2xl border-2 px-6 py-5 text-left transition-all duration-300 ${
                            active
                              ? 'border-emerald-500 bg-emerald-500/10'
                              : 'border-slate-100 dark:border-white/5 bg-white dark:bg-slate-950/20 hover:border-slate-300 dark:hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`h-3 w-3 rounded-full ${trafficStyles[location.level].dot} ${active ? 'animate-ping' : ''}`} />
                            <div>
                              <p className={`font-black ${active ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>{location.name}</p>
                              <p className="text-xs font-bold text-slate-400">{location.delay}</p>
                            </div>
                          </div>
                          <Sparkles size={16} className={active ? 'text-emerald-500 opacity-100' : 'opacity-0'} />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

export default TrafficMapSection;

